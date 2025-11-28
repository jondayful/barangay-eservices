const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: `"Barangay E-Services" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    });
    console.log("✅ Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("cX Error sending email:", error);
    return false;
  }
};

module.exports = sendEmail;
