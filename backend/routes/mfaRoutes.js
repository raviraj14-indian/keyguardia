const express = require("express");
const router = express.Router();
const mfaController = require("../controllers/mfaController");

router.post("/setup", mfaController.setupMFA);
router.post("/verify-enable", mfaController.verifyAndEnableMFA);
router.post("/verify", mfaController.verifyMFA);
router.post("/disable", mfaController.disableMFA);

module.exports = router;
