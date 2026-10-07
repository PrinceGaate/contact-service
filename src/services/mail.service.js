require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async (name, email, message) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
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
        `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = sendContactEmail;
