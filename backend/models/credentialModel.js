// models/Credential.js
const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceUrl: {
      type: String,
      default: null,
    },
    encryptedUsername: {
      type: String,
      required: true,
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
    ivString: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Method to encrypt username and password before saving credential
// credentialSchema.pre("save", function (next) {
//   const credential = this;
//   const algorithm = process.env.ENCRYPTION_ALGORITHM;
//   const key = process.env.ENCRYPTION_KEY; // Your encryption key (ensure it's kept secure)
//   const iv = crypto.randomBytes(16);
//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

//   // Encrypt username
//   let username = cipher.update(credential.username, "utf8", "hex");
//   username += cipher.final("hex");
//   credential.username = username;

//   // Encrypt password
//   let password = cipher.update(credential.password, "utf8", "hex");
//   password += cipher.final("hex");
//   credential.password = password;

//   credential.iv = iv.toString("hex"); // Store IV as hexadecimal string
//   next();
// });

// // Method to decrypt username
// credentialSchema.methods.decryptUsername = function () {
//   const credential = this;
//   const algorithm = process.env.ENCRYPTION_ALGORITHM;
//   const key = process.env.ENCRYPTION_ALGORITHM; // Your encryption key
//   const iv = Buffer.from(credential.iv, "hex");
//   const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//   let decryptedUsername = decipher.update(credential.Username, "hex", "utf8");
//   decryptedUsername += decipher.final("utf8");
//   return decryptedUsername;
// };

// // Method to decrypt password
// credentialSchema.methods.decryptPassword = function () {
//   const credential = this;
//   const algorithm = process.env.ENCRYPTION_ALGORITHM;
//   const key = process.env.ENCRYPTION_KEY; // Your encryption key
//   const iv = Buffer.from(credential.iv, "hex");
//   const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//   let decryptedPassword = decipher.update(credential.Password, "hex", "utf8");
//   decryptedPassword += decipher.final("utf8");
//   return decryptedPassword;
// };

const Credential = mongoose.model("Credential", credentialSchema);

module.exports = Credential;
