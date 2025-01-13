const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// OAuth2 Configuration use env later 
const CLIENT_ID = '670066476993 - 5kbga1edr1jofgn8o3jcujqbgs2ht8ih.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04wWI_sEq0GeeCgYIARAAGAQSNwF-L9IrKD6l4LJmEGxyivM-JvDgqqc5CfLvFSj0qy5wG9ti6Y2qDQe3_XnPLg1LPjWqnJJ9amA';

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(Useremail, html) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        // Create Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'davidsoberekon66@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        // Mail Options
        const mailOptions = {
            from: 'David soberekon davidsoberekon66@gmail.com',
            to: 'elenakolisnyk6@gmail.com',
            subject: 'Test Email with OAuth2',
            text: 'Hello, this is a test email sent using Nodemailer with OAuth2!',
            html: '<p>Hello, this is a <b>test email</b> sent using Nodemailer with OAuth2!</p>',
        };

        // Send Email
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Run the function
sendEmail();



// module.exports = { AttachCookie, sendMail }