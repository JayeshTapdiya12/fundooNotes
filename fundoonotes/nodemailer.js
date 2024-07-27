require('dotenv').config();
const nodemailer = require('nodemailer');

const html = `
<h1>Hello World</h1>
<p>Nodemailer uses</p>
`;

async function main() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        debug: true,
        logger: true
    });

    try {
        const info = await transporter.sendMail({
            from: 'jayeshrakesh12@gmail.com',
            to: 'jayesh121220@gmail.com',
            subject: 'Testing, testing 1 2 3',
            html: html,
        });

        console.log("Message sent: " + info.messageId);
    } catch (error) {
        console.log("Error sending email: ", error);
    }
}

main().catch(e => console.log(e));