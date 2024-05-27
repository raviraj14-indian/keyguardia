// components/VerifyEmailForm.js

import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmailForm = () => {
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigateTo = useNavigate();

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.get(`/api/verify/${token}`);
      const { success, message } = response.data;
      if (success) {
        // Redirect to login page after successful email verification
        navigateTo("/login");
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <p>Please click the button below to verify your email.</p>
      <button onClick={handleVerifyEmail}>Verify Email</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default VerifyEmailForm;
