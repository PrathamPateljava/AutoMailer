require('dotenv').config()
const express=require('express')
const userRoute=require('./Routes/userRoutes')
const bodyparser=require('body-parser')
const cors=require('cors')
const app=express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.json());
app.use(cors())
app.use("/user",userRoute)

const { google } = require('googleapis');
const gmail = google.gmail('v1');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

const accessToken = 'YOUR_ACCESS_TOKEN';
oauth2Client.setCredentials({ access_token: accessToken });

const checkAndRespondToEmails = async () => {
  try {
    // Implement email checking and responding logic here
    // Use the Gmail API to list emails, check for prior replies, send replies, and add labels.
  } catch (error) {
    console.error('An error occurred:', error);
  }

  // Schedule the next check and response in a random interval (45-120 seconds).
  const randomInterval = Math.floor(Math.random() * (120 - 45 + 1) + 45) * 1000;
  setTimeout(checkAndRespondToEmails, randomInterval);
};

// Start the process
checkAndRespondToEmails();






app.listen(4000);
console.log('Server listening on http://127.0.0.1:4000/')


