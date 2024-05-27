import { Button, Card, Spinner } from "flowbite-react";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const { user, verifyMfa } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBtnLoading(true);
    try {
      if (!otp) {
        setError("Please Enter OTP");
        return;
      }
      if (otp.length < 6) {
        setError("Please Enter all 6 digits");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/mfa/verify`,
        {
          token: otp,
        }
      );
      verifyMfa();
      navigateTo("/dashboard");
    } catch (error) {
      console.error("Error Validating MFA", error);
      setError(error.response.data.message);
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <>
      <Card
        className="max-w-md mx-auto "
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="/Enter OTP-pana.svg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Enter OTP
        </h5>
        {error && (
          <p className="text-red-700 text-center dark:text-red-500">{error}</p>
        )}
        {message && (
          <p className="text-green-700 text-center dark:text-green-500">
            {message}
          </p>
        )}
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Please enter otp provided by your authenticator app.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="pl-5  sm:pl-4">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType={"tel"}
              shouldAutoFocus={true}
              skipDefaultStyles={true}
              inputStyle=" block w-12 h-12 py-3 text-lg font-bold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              containerStyle="my-7 block w-12 h-12 py-3 text-lg font-bold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              renderSeparator={
                <span className="text-gray-900 dark:text-gray-600 mx-0 sm:mx-1">
                  -
                </span>
              }
              renderInput={(props) => <input {...props} />}
            />
          </div>
          {/* <Button onClick={handleSubmit} type="submit">
            {isBtnLoading ? " Please Wait" : "Submit"}
          </Button> */}
          {isBtnLoading ? (
            <Button disabled>Please Wait</Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Card>
    </>
  );
};

export default OtpForm;
