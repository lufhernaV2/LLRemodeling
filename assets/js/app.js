const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your.email@gmail.com',
            pass: 'your-email-password'
        }
    });

    // Setup email data
    const mailOptions = {
        from: 'your.email@gmail.com',
        to: 'recipient.email@example.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log('Email sent:', info.response);
    });

    res.send('Form submitted successfully!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
