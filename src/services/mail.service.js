const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const sendContactEmail = async (name, email, message) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        replyTo: email,
        subject: `[PRINCE.OS] New message from ${name}`,
        html: `
            <h2>PRINCE.OS — New Contact Message</h2>

            <hr>

            <h3>Contact Details</h3>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>

            <h3>Message</h3>

            <p>${message}</p>

            <hr>

            <p>
                Reply directly to this email to respond to ${name}.
            </p>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendContactEmail;