// emailVerificationController.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const EmailToken = require("../models/emailTokenModel");
const generateVerificationToken = require("../utils/generateVerificationToken");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

// Send Email Verification Link
exports.sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "This email is not yet registered." });
    }
    // const user = req.body.user;
    const emailToken = await new EmailToken({
      userId: user._id,
      token: generateVerificationToken(),
    }).save();
    await sendVerificationEmail(
      // Function to send Email
      user._id,
      user.email,
      user.firstName,
      emailToken.token
    );
    res
      .status(200)
      .json({ message: "Email verification link sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email verification link" });
  }
};

// Verify Email Verification Token
exports.verifyEmailToken = async (req, res) => {
  try {
    // Find user by decoded token's userId
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found. Invalid Link" });
    }
    if (user.emailVerified) {
      return res.status(200).json({
        success: true,
        message: "Email has already been verified successfully",
      });
    }
    const token = await EmailToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User not found. Invalid or Expired Link",
      });
    }
    await User.updateOne({ _id: user._id }, { emailVerified: true });
    await EmailToken.deleteMany({ userId: user._id });
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
