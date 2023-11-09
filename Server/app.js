require('dotenv').config()
const express=require('express')
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;
const app= express()
const port=3000
const addedScope='https://www.googleapis.com/auth/gmail.readonly'
//authorize via Google OAuth
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDIRECT_URL,
  );
const refreshToken = process.env.GOOGLE_CLIENT_REFRESH_TOKEN
const access_token = process.env.GOOGLE_CLIENT_ACCESS_TOKEN

oauth2Client.setCredentials({ refresh_token_token: refreshToken,access_token:access_token,scope:addedScope });


const processingInterval=process.env.SET_PROCESSING_INTERVAL || 300000
// Define a global object to track thread and reply status
const threadStatus = {};

const gmail = google.gmail({version:'v1', auth:oauth2Client});

app.get("/",(req,res)=>{
  res.send("Server is running")
})


// Function to check if this is the first reply to the email thread
function isFirstReply(threadId) {
  if (!threadStatus[threadId]) {
    threadStatus[threadId] = true;
    return true;
  }

  return false;
}
async function sendReply(emailId, sender, replyText, updatedSubject) {
    try{  
      const message={
        raw:Buffer.from(
          `To:${sender}\r\n`+
          `Subject:${updatedSubject}\r\n`+
          `In-Reply-To: ${emailId}\r\n` + 
          `References: ${emailId}\r\n` +
          `Content-type:text/plain;charset="UTF-8"\r\n`+
          '\r\n'+
          replyText
        ).toString('base64')
      }
      const sendResponse = await gmail.users.messages.send({
        userId: 'me',
        resource: message,
        threadId:emailId
      });
  
      console.log('Reply sent:', sendResponse.data);
    } catch (error) {
      console.error('Error sending reply:', error);
    }
}


// Function to add a label to an email
async function addLabel(emailId, labelName) {
  try {
    // Get the label ID based on the label name
    const labelResponse = await gmail.users.labels.list({
      userId: 'me',
    });
    const labels = labelResponse.data.labels;
    const label = labels.find((l) => l.name === labelName);

    if (!label) {
      // If the label does not exist, you can create it
      const createLabelResponse = await gmail.users.labels.create({
        userId: 'me',
        resource: { name: labelName },
      });
      const labelId = createLabelResponse.data.id;

      // Add the newly created label to the email
      await gmail.users.messages.modify({
        userId: 'me',
        id: emailId,
        resource: { addLabelIds: [labelId] },
      });
    } else {
      // If the label already exists, add it to the email
      await gmail.users.messages.modify({
        userId: 'me',
        id: emailId,
        resource: { addLabelIds: [label.id] },
      });
    }
  } catch (error) {
    console.error('Error adding label to email:', error);
  }
}



async function checkAndReplyToEmails() {
  try {
    // Fetch a list of unread emails
    const response = await gmail.users.messages.list({
      userId: 'me',
      labelIds:['UNREAD','INBOX','CATEGORY_UPDATES'],
      maxResults:13
      //q: 'is:unread', // You can customize the search criteria as needed
    });

    const emails = response.data.messages;
    console.log(emails)
    for (const email of emails) {
      // Fetch the full email message to obtain the thread ID, sender, and subject
      const message = await gmail.users.messages.get({
        userId: 'me',
        id: email.id,
      });
      
      
      const senderHeader= message.data.payload.headers.find(header=> header.name==='From')
      const threadId = message.data.threadId;
      console.log(threadId)
      const sender = senderHeader.value
      console.log(sender)

      // Check if this is the first reply to the email thread
      if (isFirstReply(threadId)) {
        console.log("in sending mail prodcedure")
        // Send a reply to the email
        const replyText = "Hello,\n\nThank you for your email.\n\n I am currently on vacation and will not be available until 7-12-2023.\N If your matter is urgent, please contact the office at learnit.django@gmail.com. I'll respond to your email upon my return.\n\nBest regards,\nPratham Patel"
        const updatedSubject = 'Out of Office';

        sendReply(email.id, sender, replyText, updatedSubject);

        // Add a label to the email and move it
        const labelName = 'INBOX';
        addLabel(email.id, labelName);
      }
    }
  } catch (error) {
    console.error('Error checking and replying to emails:', error);
    if(error.code===429){
      console.log("Gmail API Waiting limit exceeded. Waiting for next interval")
    }
  }
}

function startProcessingLoop() {
  checkAndReplyToEmails(); 

  setInterval(() => {
    checkAndReplyToEmails(); 
  }, processingInterval);
}

process.on('unhandledRejection',(error)=>{
  console.log("Unhandled Rejection: ",error)
})

app.listen(port,()=>{
console.log("Server running on http://127.0.0.1/")
startProcessingLoop()
})


