const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

// User routes
router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.put("/password", userController.changePassword);

module.exports = router;
