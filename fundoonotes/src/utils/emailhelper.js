require('dotenv').config();
const nodemailer = require('nodemailer');

const html = `
<h1>Hello World</h1>
<p>Nodemailer uses</p>
your token is 
`;

export async function mailSender(mail, token) {
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
            to: mail,
            subject: 'forget password Link',
            html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/api/${process.env.api_version}/users/forget_password">click here</a></h1>`
        });

        console.log("Message sent: " + info.messageId);
    } catch (error) {
        console.log("Error sending email: ", error);
    }
}
