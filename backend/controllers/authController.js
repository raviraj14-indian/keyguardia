// authController.js
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const EmailToken = require("../models/emailTokenModel");
// const SecurityQuestion = require("../models/SecurityQuestion");
const { sendEmail } = require("../utils/email");
const generateJwtToken = require("../utils/generateJwtToken");
const generateVerificationToken = require("../utils/generateVerificationToken");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

// Function to verify Google reCAPTCHA
const verifyRecaptcha = async (token) => {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECURITY_KEY}&response=${token}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  console.log("Recaptcha JSON data: ", data);

  if (!data || !data.success) {
    throw new Error("reCAPTCHA verification failed");
  }
  // return true;
};

// Signup function
exports.signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    securityQuestions,
    recaptchaToken,
    enableTFA,
  } = req.body;

  console.log("Signup :", req.body);
  try {
    // Verify Google reCAPTCHA
    await verifyRecaptcha(recaptchaToken);
    console.log("captcha verified");
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("Signup existing:", existingUser);
    if (existingUser) {
      return res.status(400).json({
        message:
          "This Email has already been registerd. Try Logging in or use a different Email Address",
        success: false,
      });
    }

    // const emailVerificationToken = generateVerificationToken();
    // Save user to database
    // const user = new User({
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   emailVerificationToken,
    //   securityQuestions,
    // });
    const user = await new User({
      firstName,
      lastName,
      email,
      password,
      securityQuestions,
      mfaEnabled: enableTFA,
    }).save();
    const emailToken = await new EmailToken({
      userId: user._id,
      token: generateVerificationToken(),
    }).save();
    console.log("EmailToken:", emailToken);
    await sendVerificationEmail(
      user._id,
      user.email,
      user.firstName,
      emailToken.token
    );
    console.log("Email has been sent :authcontroller 77");

    res.status(201).json({
      message:
        "Verification Email has been send at you email address. Please verify your email.",
      success: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Signup failed. Please try again later.",
      success: false,
    });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by  email
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const { token, ...userData } = generateJwtToken(user);
    res.status(200).json({ success: true, token, userData });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};

// Forgot password function
exports.forgotPassword = async (req, res) => {
  const { email, recaptchaToken } = req.body;

  try {
    // Verify Google reCAPTCHA
    await verifyRecaptcha(recaptchaToken);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate password reset token
    const passwordResetToken = user.generateVerificationToken();
    user.passwordResetToken = passwordResetToken;
    user.passwordResetTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send password reset email
    const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${passwordResetToken}`;
    const emailHtml = `<p>Click <a href="${resetPasswordLink}">here</a> to reset your password.</p>`;
    await sendEmail(email, "Password Reset", emailHtml);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res
      .status(500)
      .json({ message: "Failed to process forgot password request" });
  }
};

// Reset password function
exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Find user by password reset token
    const user = await User.findOne({
      passwordResetToken: resetToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token" });
    }

    // Hash new password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    // user.password = hashedPassword;
    console.log("RESET controller. CHECK HASHING OF PASSWORD IN DATABASE");
    user.password = newPassword;
    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

// Email verification function
exports.verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    // Find user by email verification token
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email verification token" });
    }

    // Update user email verification status
    user.emailVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Failed to verify email" });
  }
};

// Security questions verification function
exports.verifySecurityQuestions = async (req, res) => {
  const { userId, securityAnswers } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare security question answers
    for (const answer of securityAnswers) {
      const question = user.securityQuestions.find(
        (q) => q.question === answer.question
      );
      if (!question || question.answer !== answer.answer) {
        return res
          .status(400)
          .json({ message: "Invalid security question answer" });
      }
    }

    res
      .status(200)
      .json({ message: "Security questions verification successful" });
  } catch (error) {
    console.error("Security questions verification error:", error);
    res.status(500).json({ message: "Failed to verify security questions" });
  }
};
