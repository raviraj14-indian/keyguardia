// components/SignupForm.js

import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
// import { Exclamation } from "@heroicons/react/outline";

const SignupForm = () => {
  // TEST KEYS RECAPTCHA
  const testKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    enableTFA: false, // Default to false, checkbox for enabling TFA
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [siteToken, setSiteToken] = useState("");
  const captchaRef = useRef();
  const navigateTo = useNavigate();

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, enableTFA: e.target.checked });
  };

  const captchaCheck = (value) => {
    setSiteToken(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    captchaRef.current.reset();
    setIsBtnLoading(true);
    if (confirmPassword != formData.password) {
      setError(
        "Master Password and Confirm Password do not match. Please Try Again"
      );
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        { ...formData, recaptchaToken: siteToken }
      );
      console.log("res", response);
      const { success, message } = response.data;
      console.log("msg  ", response.data.message);
      setMessage(message);
      if (success) {
        // Redirect to email verification page
        navigateTo("/verify-email");
      } else {
        setError(message);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <>
      <Card className="max-w-lg  mx-auto">
        <h5 className="mb-2  text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign Up
        </h5>
        {error && (
          <p className="text-red-700 text-center dark:text-red-500">{error}</p>
        )}
        {message && (
          <p className="text-green-700 text-center dark:text-green-500">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-grow">
              <div className="mb-2 block">
                <Label htmlFor="firstname" value="First Name" />
              </div>
              <TextInput
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-grow">
              <div className="mb-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
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
              <Label htmlFor="password" value="Master password" />
            </div>
            <TextInput
              type="password"
              placeholder="Master Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Confirm password" />
            </div>
            <TextInput
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="promotion"
              type="checkbox"
              name="enableTFA"
              checked={formData.enableTFA}
              onChange={handleCheckboxChange}
            />
            <Label htmlFor="promotion">
              Enable Two-Factor Authentication (Recommended)
            </Label>
          </div>
          <div className="w-full mx-auto">
            <ReCAPTCHA
              className="flex items-center justify-center"
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              // sitekey={testKey}
              ref={captchaRef}
              onChange={captchaCheck}
              theme={
                localStorage.getItem("flowbite-theme-mode") == "dark"
                  ? "dark"
                  : "light"
              }
            />
          </div>
          <Button type="submit">
            {isBtnLoading ? "Please Wait" : "Submit"}
          </Button>
        </form>
      </Card>

      {/* <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>
            Enable Two-Factor Authentication
            <input
              type="checkbox"
              name="enableTFA"
              checked={formData.enableTFA}
              onChange={handleCheckboxChange}
            />
          </label>
          <div className="">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              // sitekey={testKey}
              ref={captchaRef}
              onChange={captchaCheck}
            />
          </div>
          <button type="submit">{isBtnLoading ? "Loading" : "Sign Up"}</button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div> */}
    </>
  );
};

export default SignupForm;
