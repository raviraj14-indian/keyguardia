const { sendEmail } = require("./email");

const sendVerificationEmail = async (
  userId,
  to,
  firstName,
  emailVerificationToken
) => {
  const emailVerificationLink = `${process.env.CLIENT_URL}/verify-email/?id=${userId}&token=${emailVerificationToken}`;

  const emailHtml = `Hi ${firstName},
    <br><br>
    Thanks for creating an account with Keyguardia, your all-in-one password manager! To ensure the security of your passwords and access to all of Keyguardia's features, please verify your email address.
    <br><br>
    Click the link below to verify your account:
    <br><br>
    <a href=${emailVerificationLink}>${emailVerificationLink}</a>
    <br><br>
    This link is unique to your account and will expire in 24 hours.
    <br><br>
    If you didn't create an account with Keyguardia, you can safely disregard this email.
    <br><br>
    Welcome to a more secure and simpler online life!
    <br><br>
    Best regards,
    <br><br>
    The Keyguardia Team`;
  await sendEmail(
    to,
    "Verify Your Keyguardia Account to Secure Your Passwords",
    emailHtml
  );
};

module.exports = sendVerificationEmail;
