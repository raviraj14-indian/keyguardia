const jwt = require("jsonwebtoken");
// Function to generate JWT token
const generateJwtToken = (data) => {
  const {
    password,
    mfaSecret,
    securityQuestions,
    emailVerificationToken,
    passwordResetToken,
    passwordResetTokenExpires,
    ...payload
  } = data;
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  var isMfaSetup;
  if (!mfaSecret) {
    isMfaSetup = false;
  } else {
    isMfaSetup = true;
  }
  return { token, ...payload, isMfaSetup };
};

module.exports = generateJwtToken;
