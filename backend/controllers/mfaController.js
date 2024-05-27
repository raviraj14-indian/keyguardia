// mfaController.js
const speakeasy = require("speakeasy");
const { authenticator } = require("otplib");

const User = require("../models/userModel");
const MfaTempSecret = require("../models/mfaTempModel");

authenticator.options = { window: 2 };

// Setup Multi-Factor Authentication (MFA)
exports.setupMFA = async (req, res) => {
  try {
    authenticator.options = { window: 2 };
    const user = await User.findOne({ _id: req.body.user._id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "This email is not yet registered." });
    } else if (user.mfaSecret) {
      return res.status(400).json({
        success: false,
        message:
          "Two Factor Authentication has already been setup on this account.",
      });
    }
    const secret = authenticator.generateSecret();
    // Save MFA secret to user profile
    await MfaTempSecret.deleteMany({ userId: req.body.user._id });
    await new MfaTempSecret({
      userId: req.body.user._id,
      temp_mfaSecret: secret,
    }).save();
    const qrUrl = authenticator.keyuri(user.email, "KeyGuardia", secret);
    return res.status(200).json({ success: true, qrUrl, secret });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to setup MFA" });
  }
};

exports.verifyAndEnableMFA = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Failed to setup Two Factor Authentication.",
      });
    }
    const tempToken = await MfaTempSecret.findOne({
      temp_mfaSecret: req.body.secret,
      userId: req.body.user._id,
    });
    const isValid = authenticator.verify({
      token: req.body.token,
      secret: tempToken.temp_mfaSecret,
    });
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Failed to setup Two Factor Authentication.",
      });
    }
    await User.findByIdAndUpdate(user._id, {
      mfaEnabled: true,
      mfaSecret: tempToken.temp_mfaSecret,
    });
    await MfaTempSecret.findByIdAndDelete(tempToken._id);
    return res
      .status(200)
      .json({ success: true, message: "MFA token verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Setup MFA token" });
  }
};

// Verify Multi-Factor Authentication (MFA) Token
exports.verifyMFA = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Failed to setup Two Factor Authentication.",
      });
    }
    const isValid = authenticator.verify({
      token: req.body.token,
      secret: user.mfaSecret,
    });
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Failed to Validate Two Factor Authentication.",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "MFA Validated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Setup MFA token" });
  }
};

// Disable Multi-Factor Authentication (MFA)
exports.disableMFA = async (req, res) => {
  const user = req.user;

  try {
    // Remove MFA secret from user profile
    const UpdatedUser = User.findOneAndUpdate(
      { _id: user._id },
      { $set: { mfaSecret: null, mfaEnabled: false } }
    );
    console.log(UpdatedUser);
    // user.mfaSecret = undefined;
    // await user.save();

    res.status(200).json({ message: "MFA disabled successfully" });
  } catch (error) {
    console.error("MFA disable error:", error);
    res.status(500).json({ message: "Failed to disable MFA" });
  }
};
