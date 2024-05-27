// pages/VerifyEmailPage.js

import React, { useEffect, useState } from "react";
import VerifyEmailForm from "../components/VerifyEmailForm";
import { useSearchParams } from "react-router-dom";
import { Button, Card, Label, TextInput } from "flowbite-react";
import axios from "../api/axiosInstance";

const VerifyEmailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const [email, setEmail] = useState();

  const verifyEmailOnVisit = async () => {
    try {
      console.log("running req verify email pg 16");

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/email/verify/${id}/${token}`
      );
      console.log(response);
      // setCredentials(response.data);
    } catch (error) {
      console.error("Error Verifying Email", error);
    }
  };

  // useEffect(() => {
  //   console.log(searchParams);
  //   console.log(token);
  //   console.log(id);
  //   verifyEmailOnVisit();
  // }, []);

  const handleResendEmail = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/email/send`,
      {
        email,
      }
    );
    console.log("mail send");
    console.log(response);
  };
  return (
    <>
      <Card
        className="max-w-md mx-auto "
        imgAlt="Verification Email Send"
        imgSrc="/verificationEmailSend.svg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Reset Password
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          A link has been send to you email. Please click on the link to reset
          your Master Password.
        </p>
        <form
          onSubmit={handleResendEmail}
          className="flex text-center max-w-md flex-col gap-4"
        >
          <div>
            <p className="font-normal text-gray-600 dark:text-gray-500">
              Didn't recieve the email?
            </p>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="" />
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="youremail@example.com"
              required
            />
          </div>
          <Button type="submit"> Resend Email </Button>
        </form>
      </Card>
    </>
  );
};

export default VerifyEmailPage;
