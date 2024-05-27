// securityQuestionsController.js
const User = require("../models/userModel");

// Set Security Questions
exports.setSecurityQuestions = async (req, res) => {
  const user = req.user;
  const { securityQuestions } = req.body;

  try {
    user.securityQuestions = securityQuestions;
    await user.save();
    res.status(200).json({ message: "Security questions set successfully" });
  } catch (error) {
    console.error("Set security questions error:", error);
    res.status(500).json({ message: "Failed to set security questions" });
  }
};

// Verify Security Questions Answers
exports.verifySecurityQuestions = async (req, res) => {
  const { securityAnswers } = req.body;
  const user = req.user;

  try {
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
