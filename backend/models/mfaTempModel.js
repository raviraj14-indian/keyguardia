// models/Credential.js
const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  temp_mfaSecret: {
    type: String,
    // required: true,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  //   expiresAfterSeconds: "3600",
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: "1h",
  },
});

const MfaTempSecret = mongoose.model("MfaTempSecret", credentialSchema);

module.exports = MfaTempSecret;
