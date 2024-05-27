const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes.js");
const userRoutes = require("./userRoutes.js");
const credentialRoutes = require("./credentialRoutes.js");
const mfaRoutes = require("./mfaRoutes.js");
const emailVerificationRoutes = require("./emailVerificationRoutes.js");
const securityQuestionsRoutes = require("./securityQuestionsRoutes.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// Mount authentication routes
router.use("/auth", authRoutes);

// Mount user routes
router.use("/users", authMiddleware, userRoutes);

// Mount Credentials routes
router.use("/credentials", authMiddleware, credentialRoutes);

// Mount MFA routes
router.use("/mfa", authMiddleware, mfaRoutes);

// Mount Email Verification routes
router.use("/email", emailVerificationRoutes);

// Mount Credentials routes
router.use("/security-questions", authMiddleware, securityQuestionsRoutes);

module.exports = router;
