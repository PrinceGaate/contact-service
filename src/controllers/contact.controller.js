const sendContactEmail = require("../services/mail.service");

const handleContact = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Name, email and message are required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address"
        });
    }

    try {
        await sendContactEmail(name, email, message);

        res.json({
            success: true,
            message: "Message sent successfully"
        });
    } catch (error) {
        console.error("Email sending failed:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }
};

module.exports = handleContact;