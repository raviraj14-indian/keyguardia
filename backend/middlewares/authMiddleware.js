const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  // Check if authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }
  // Extract token from authorization header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Bearer token is missing" });
  }
  try {
    // Verify token
    const { payload } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload._id).lean();
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    // Attaching user data to request
    req.body.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
module.exports = authMiddleware;
