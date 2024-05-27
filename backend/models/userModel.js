// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mfaSecret: {
      type: String,
      default: null,
    },
    mfaEnabled: {
      type: Boolean,
      default: false,
    },
    securityQuestions: [
      {
        question: String,
        answer: String,
      },
    ],
    emailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetTokenExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Method to hash password before saving user
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate random verification token
userSchema.methods.generateVerificationToken = function () {
  return crypto.randomBytes(20).toString("hex");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
