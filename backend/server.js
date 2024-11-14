require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === "587", // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP configuration error:", error);
    } else {
        console.log("SMTP transporter is configured and ready to send emails.");
    }
});

app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log("Email sent:", info.response);
        res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);  // Log detailed error
        res.status(500).json({ success: false, message: "Error sending email", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
