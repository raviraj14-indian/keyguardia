// components/LoginForm.js

import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

const LoginForm = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBtnLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        formData
      );
      const { success, token, userData } = response.data;
      const userString = JSON.stringify(userData);
      login(userData);
      if (success) {
        setMessage("Login Successful");
        // Check if MFA is enabled
        if (!userData.emailVerified) {
          // Redirect to verify email page if MFA secret is present
          navigateTo("/verify-email");
        } else {
          Cookies.set("token", token);
          if (userData.mfaEnabled) {
            // Check if MFA secret is present
            if (userData.isMfaSetup) {
              // Redirect to verify MFA/OTP page if MFA secret is present
              navigateTo("/verify-mfa");
              localStorage.setItem("user", userString);
            } else {
              // Redirect to setup MFA page if MFA is not setup
              navigateTo("/setup-mfa");
            }
          } else {
            // Save user data and redirect to dashboard page if MFA is not enabled
            localStorage.setItem("user", userString);
          }
        }
      } else {
        // setUser(null);
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <>
      <Card className="max-w-md  mx-auto">
        {/* <div className="block w-full flex-grow p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "> */}
        <h5 className="mb-2  text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Login
        </h5>
        {error && <p className="text-lg text-red-500 ">{error}</p>}
        {message && <p className="text-lg text-green-500 ">{message}</p>}

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              placeholder="name@example.com"
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* <Button type="submit">Submit</Button> */}
          {/* <Button type="submit">
            {isBtnLoading ? " Please Wait" : "Submit"}
          </Button> */}
          {isBtnLoading ? (
            <Button disabled type="submit">
              Please Wait
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
