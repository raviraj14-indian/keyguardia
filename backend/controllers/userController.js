// userController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Get user profile details
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Exclude sensitive fields like password, verification tokens, etc. from the response
    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // Add other fields as needed
    };
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Failed to get user profile" });
  }
};

// Update user profile information
exports.updateProfile = async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      { firstName, lastName },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update user profile" });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(req.body.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
};

//
//
//
//
//
//
//
//

// const User = require("../models/userModel");

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     if (!users) {
//       return res.status(404).json({ error: "No Users Found", success: false });
//     }
//     res.status(200).json({ users, success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve users", success: false });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found", success: false });
//     }
//     res.status(200).json({ user, success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve user", success: false });
//   }
// };

// const updateUserById = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found", success: false });
//     }
//     res.status(200).json({ updatedUser, success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update user", success: false });
//   }
// };

// const deleteUserById = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).json({ error: "User not found", success: false });
//     }
//     res.status(200).json({ deletedUser, success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete user", success: false });
//   }
// };

// module.exports = {
//   getAllUsers,
//   getUserById,
//   updateUserById,
//   deleteUserById,
// };
