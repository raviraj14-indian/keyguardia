const express = require("express");
const router = express.Router();
const emailVerificationController = require("../controllers/emailVerificationController");

router.get("/verify/:id/:token", emailVerificationController.verifyEmailToken);
router.post("/send", emailVerificationController.sendVerificationEmail);

module.exports = router;
