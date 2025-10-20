const Expert = require("../models/expert.model");
const nodemailer = require("nodemailer");

// ✅ Gmail transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const createExpert = async (data) => {
    const expert = new Expert(data);
    const savedExpert = await expert.save();

    try {
        // ✅ Send email to admin (yourself)
        const mailOptions = {
            from: `"${data.name || 'Unknown User'}" <${data.email || process.env.EMAIL_USER}>`, // user as sender
            to: "bm625416gg@gmail.com", // you (admin)
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
            replyTo: data.email || process.env.EMAIL_USER, // so you can reply directly to user
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully to admin");
    } catch (err) {
        console.error("❌ Email sending failed:", err.message);
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
