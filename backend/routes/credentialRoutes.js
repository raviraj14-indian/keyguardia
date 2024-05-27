const express = require("express");
const router = express.Router();
const credentialController = require("../controllers/credentialController");

router.get("/", credentialController.getAllCredentials);
router.post("/", credentialController.addCredential);
router.put("/:id", credentialController.updateCredential);
router.delete("/purge", credentialController.purgeCredentials);
router.delete("/:id", credentialController.deleteCredential);

module.exports = router;
