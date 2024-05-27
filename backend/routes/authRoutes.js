const express = require("express");
const router = express.Router();
// const { signup, login } = require("../controllers/authController");
const authController = require("../controllers/authController.js");

// Authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
// router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
