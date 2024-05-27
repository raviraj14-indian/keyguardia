const express = require("express");
const router = express.Router();
const securityQuestionsController = require("../controllers/securityQuestionsController");

router.post("/", securityQuestionsController.setSecurityQuestions);
router.post("/verify", securityQuestionsController.verifySecurityQuestions);

module.exports = router;
