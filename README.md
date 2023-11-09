# AutoMailer

Automate email responses for your Gmail mailbox during your vacation.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Libraries and Technologies](#libraries-and-technologies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Gmail Autoresponder is a Node.js-based application that automates email responses in your Gmail mailbox while you're on vacation. It periodically checks for new emails, sends replies to email threads with no prior responses, adds labels to emails, and moves them to the designated label.

## Features

- Check for new emails in your Gmail mailbox.
- Send replies to email threads with no prior responses.
- Add labels to emails and move them to the designated label.
- Automate the process at random intervals (45 to 120 seconds).

## Prerequisites

Before getting started with the application, you will need:

- A Google Cloud Console project with the Gmail API enabled.
- OAuth 2.0 credentials (client ID and client secret) for your project.
- Node.js and npm installed on your machine.
- A Gmail account that you want to configure for autoresponses.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gmail-autoresponder.git
   cd gmail-autoresponder

2. Install the project dependencies:

   ```npm install```

## Configuration

1.  Set up your OAuth 2.0 credentials:

    1.  Create a Google Cloud Console project.
    
    2.  Enable the Gmail API for your project.
    
    3.  Create OAuth 2.0 credentials (Download the JSON file).
    
    4. Configure the application by creating a .env file in the project root and provide the following details:

```env
    CLIENT_ID=your_client_id
    CLIENT_SECRET=your_client_secret
    REDIRECT_URL=your_redirect_url
    ACCESS_TOKEN=your_access_token
```
## Usage

To start the program use:

```npm start or node ./app.js```

## Libraries and Technologies

-   [NodeJS](https://nodejs.org/en)
-   [googleapi](https://www.npmjs.com/package/googleapis)
-   [google-auth-library](https://www.npmjs.com/package/google-auth-library)

## Contributing

We welcome contributions from the community. If you have any suggestions, improvements, or issues to report, please feel free to create a pull request or open an issue on our GitHub repository.

## License

This project is licensed under MIT standard Project Licensing Guidelines. 



