// models/Credential.js
const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: "1d",
  },
});

const EmailToken = mongoose.model("EmailToken", credentialSchema);

module.exports = EmailToken;
