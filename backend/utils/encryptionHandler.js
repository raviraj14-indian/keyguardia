// const crypto = require("crypto");

// exports.encrypt = ({ username, password }) => {
//   const algorithm = process.env.ENCRYPTION_ALGORITHM;
//   const key = process.env.ENCRYPTION_KEY;
//   //   const iv = crypto.randomBytes(16);
//   const iv = crypto
//     .createHash("sha512")
//     .update(secret_iv)
//     .digest("hex")
//     .substring(0, 16);
//   // Encrypt username
//   let cipher = crypto.createCipheriv(algorithm, key, iv);
//   //   let encryptedUsername = cipher.update(username, "utf8", "hex");
//   //   encryptedUsername += cipher.final("hex");
//   let encryptedUsername = Buffer.from(
//     cipher.update(password, "utf8", "hex") + cipher.final("hex")
//   ).toString("base64");

//   // Encrypt password
//   cipher = crypto.createCipheriv(algorithm, key, iv);
//   //   let encryptedPassword = cipher.update(password, "utf8", "hex");
//   //   encryptedPassword += cipher.final("hex");
//   let encryptedPassword = Buffer.from(
//     cipher.update(password, "utf8", "hex") + cipher.final("hex")
//   ).toString("base64");

//   //   ivString = iv.toString("hex"); // Store IV as hexadecimal string
//   ivString = iv.toString("base64"); // Store IV as hexadecimal string
//   return { encryptedUsername, encryptedPassword, ivString };
// };

// exports.decrypt = ({ encryptedUsername, encryptedPassword, ivString }) => {
//   const algorithm = process.env.ENCRYPTION_ALGORITHM;
//   const key = process.env.ENCRYPTION_ALGORITHM;
//   const iv = Buffer.from(ivString, "hex");
//   const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

//   let username = decipher.update(encryptedUsername, "hex", "utf8");
//   username += decipher.final("utf8");

//   let password = decipher.update(encryptedPassword, "hex", "utf8");
//   password += decipher.final("utf8");

//   return { username, password };
// };

// // // Method to decrypt username
// // credentialSchema.methods.decryptUsername = function () {
// //   const credential = this;
// // };

// // // Method to decrypt password
// // credentialSchema.methods.decryptPassword = function () {
// //   const credential = this;
// //   const algorithm = process.env.ENCRYPTION_ALGORITHM;
// //   const key = process.env.ENCRYPTION_KEY;
// //   const iv = Buffer.from(credential.iv, "hex");
// //   const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
// //   return decryptedPassword;
// // };

const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Replace with your own encryption key
const IV_LENGTH = 16;

const encrypt = ({ username, password }) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    process.env.ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let encryptedUsername = cipher.update(username, "utf8", "hex");
  encryptedUsername += cipher.final("hex");

  cipher = crypto.createCipheriv(
    process.env.ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encryptedPassword = cipher.update(password, "utf8", "hex");
  encryptedPassword += cipher.final("hex");

  return { encryptedUsername, encryptedPassword, ivString: iv.toString("hex") };
};

const decrypt = ({ encryptedUsername, encryptedPassword, ivString }) => {
  const iv = Buffer.from(ivString, "hex");
  //   const iv = ivString;
  let decipher = crypto.createDecipheriv(
    process.env.ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let username = decipher.update(encryptedUsername, "hex", "utf8");
  username += decipher.final("utf8");

  decipher = crypto.createDecipheriv(
    process.env.ENCRYPTION_ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let password = decipher.update(encryptedPassword, "hex", "utf8");
  password += decipher.final("utf8");

  return { username, password };
};

module.exports = { encrypt, decrypt };
