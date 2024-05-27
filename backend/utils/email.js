// utils/email.js

const nodemailer = require("nodemailer");

// Function to send email using Nodemailer
const sendEmail = async (to, subject, htmlBody) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    // Send email
    const info = await transporter.sendMail({
      from: `KeyGuardia <${process.env.EMAIL_USERNAME}>`,
      to: to,
      subject: subject,
      html: htmlBody,
    });

    console.log("Email sent:", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
