import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button, Card, Label, TextInput } from "flowbite-react";
import axios from "../api/axiosInstance";
import {
  ArrowDownCircleIcon,
  QrCodeIcon,
  CheckBadgeIcon,
  HashtagIcon,
} from "@heroicons/react/24/solid";
import Loading from "./Loading";
import OTPInput from "react-otp-input";

const SetupMfaForm = () => {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  const [otp, setOtp] = useState();
  const [secretToken, setSecretToken] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    handleSetup();
  }, []);
  useEffect(() => {
    GenerateQRCode();
  }, [url]);

  const handleSetup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/mfa/setup`
      );
      setUrl(response.data.qrUrl);
      setSecretToken(response.data.secret);
    } catch (error) {
      console.error("Error Verifying Email", error);
    }
  };

  const handleSubmitOtp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/mfa/verify-enable`,
        {
          token: otp,
          secret: secretToken,
        }
      );
      setUrl(response.data.qrUrl);
    } catch (error) {
      console.error("Error Verifying Email", error);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    console.log(otp);
  };
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 400,
        margin: 2,
        color: {
          dark: "2a2a2a",
          light: "#EEEEEE",
        },
      },
      (err, url) => {
        if (err) return console.error("Here is the error", err);
        setQr(url);
      }
    );
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <h5 className="text-2xl my-2 text-center font-bold tracking-tight text-gray-900 dark:text-white">
          Setting Up Your Two-Factor Authentication
        </h5>
        <div className="flex pb-3 px-2 md:px-7 flex-col justify-evenly md:flex-row gap-12 items-center">
          <div className="flex-grow left">
            {qr ? (
              <Card
                className="max-w-sm"
                imgAlt="Authenticator QR Code"
                imgSrc={qr}
              >
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  Scan this QR Code with Your Authenticator
                </h5>
                <p className="text-md text-gray-700 dark:text-gray-300">
                  Or enter the following Code manually: <br />
                  <span className="text-gray-900 dark:text-white text-lg text-bold">
                    {secretToken}
                  </span>
                </p>

                <div>
                  <div className="mb-2 block">
                    <Label
                      className="text-gray-700 dark:text-gray-300"
                      htmlFor="totp"
                      value="Enter Your OTP"
                    />
                  </div>
                  <TextInput
                    id="totp"
                    type="number"
                    onChange={handleOtpChange}
                    placeholder="123456"
                    required
                  />
                  {/* <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputType={"tel"}
                    shouldAutoFocus={true}
                    skipDefaultStyles={true}
                    // inputStyle="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // containerStyle=
                    inputStyle="mr-1 block w-12 h-12 md:w-8 md:h-8  text-lg font-bold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    containerStyle=" block flex justify-beteen w-full py-3 text-lg font-bold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // renderSeparator={
                    //   <span className="text-gray-900 dark:text-gray-600 mx-0 sm:mx-1">
                    //     -
                    //   </span>
                    // }
                    renderInput={(props) => <input {...props} />}
                  /> */}
                </div>
                <Button onClick={handleSubmitOtp}>Submit</Button>
              </Card>
            ) : (
              <Loading />
            )}
          </div>
          <div className="right max-w-96 pl-7">
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li className="mb-10 ms-6">
                <span className="p-1 absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <ArrowDownCircleIcon />
                </span>
                <h3 className="font-medium leading-tight text-white">
                  Install an Authenticator app on your phone
                </h3>
                <p className="text-sm">
                  Download the TOTP Authenticator app from the Apple App Store
                  or Play Store.
                </p>
              </li>
              <li className="mb-10 ms-6">
                <span className="p-1 absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <QrCodeIcon />
                </span>
                <h3 className="font-medium leading-tight text-white">
                  Scan the QR code with the Authenticator app on your phone
                </h3>
                <p className="text-sm">
                  Open the TOTP Authenticator app and scan the QR code visible
                  on the screen. Alternatively, you can enter the code and
                  account details manually.
                </p>
              </li>
              <li className="mb-10 ms-6">
                <span className="p-1 absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <HashtagIcon />
                </span>
                <h3 className="font-medium leading-tight text-white">
                  Enter your TOTP
                </h3>
                <p className="text-sm">
                  Once the above step is done, your KeyGuardia account will be
                  added to the list on the main screen. Enter the passcode
                  generated by the app into the field on the screen. Each code
                  is valid for 30 seconds, after which a new code is generated
                </p>
              </li>
              <li className="ms-6">
                <span className="p-1 absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <CheckBadgeIcon />
                </span>
                <h3 className="font-medium leading-tight text-white">
                  Confirmation
                </h3>
                <p className="text-sm">
                  Congrats! You've successfully enabled 2-factor authentication.
                  Now you can enjoy your seemless and secure exprerience.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SetupMfaForm;
