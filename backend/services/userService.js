const User = require("../models/userModel.js");

// Service function to create a new user
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    // {password, newUserData...} = newUser
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

// Service function to retrieve a user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to retrieve user");
  }
};

// Service function to update a user by ID
const updateUserById = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

// Service function to delete a user by ID
const deleteUserById = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
