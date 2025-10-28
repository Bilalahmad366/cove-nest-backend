// controllers/expert.controller.js
const Expert = require("../models/expert.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true if port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// optional: verify transporter on startup (helps surface auth errors quickly)
transporter.verify((err, success) => {
    if (err) {
        console.error("✖️ Mailer verify failed:", err.message || err);
    } else {
        console.log("✔️ Mailer is ready to send messages");
    }
});

const createExpert = async (data) => {
    const expert = new Expert(data);
    const savedExpert = await expert.save();

    try {
        // Use the authenticated address as the 'from' to avoid Gmail rejecting/spoofing.
        // Put user's email in replyTo so you can Reply-To them.
        const mailOptions = {
            from: `"${data.name || 'Unknown User'}" <info@thecovenest.com>`,
            to: ["info@thecovenest.com", "zain.ooober@gmail.com"],
            subject: "📩 New Expert Form Submission",
            html: `
        <h2>New Expert Form Submission</h2>
        <p><strong>Name:</strong> ${data.name || "N/A"}</p>
        <p><strong>Email:</strong> ${data.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${data.mobile_no || "N/A"}</p>
        <p><strong>Message:</strong> ${data.message || "N/A"}</p>
        <hr>
        <p>🕒 Submitted on: ${new Date().toLocaleString()}</p>
      `,
            replyTo: data.email || process.env.EMAIL_USER,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email(s) sent:", info.messageId);
    } catch (err) {
        // more verbose error output to help debugging
        console.error("❌ Email sending failed:", err && err.response ? err.response : err.message || err);
    }

    return savedExpert;
};

const getAllExperts = async () => {
    return await Expert.find();
};

module.exports = {
    createExpert,
    getAllExperts,
};
