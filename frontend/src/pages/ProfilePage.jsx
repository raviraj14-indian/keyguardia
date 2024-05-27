// pages/ProfilePage.js

import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateDetails = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/profile/update-details`,
        formData
      );
      setSuccessMessage("Details updated successfully.");
    } catch (error) {
      setError("Failed to update details. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/profile/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );
      setSuccessMessage("Password changed successfully.");
    } catch (error) {
      setError("Failed to change password. Please try again.");
    }
  };

  const handlePurgeCredentials = async () => {
    try {
      console.log("Purging");
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/credentials/purge`
      );
      console.log(response);
      navigateTo("/dashboard");
      setSuccessMessage("All credentials purged successfully.");
    } catch (error) {
      setError("Failed to purge credentials. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/profile/delete-account`
        );
        // Redirect user to login page after deleting account
        // window.location.href = "/login";
        // navigateTo("/login");
      } catch (error) {
        setError("Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <h3>Update Details</h3>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button onClick={handleUpdateDetails}>Update Details</button>
      </div>
      <div>
        <h3>Change Password</h3>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div>
        <h3>Purge Credentials</h3>
        <button onClick={handlePurgeCredentials}>Purge Credentials</button>
      </div>
      <div>
        <h3>Delete Account</h3>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default ProfilePage;
