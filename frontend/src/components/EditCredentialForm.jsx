// components/CredentialForm.js
"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";

import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { generateStrongPassword } from "../utils/generatePassword";
import { PlusIcon } from "@heroicons/react/24/solid";

const EditCredentialForm = ({ fetchCredentials, credential, key }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: credential.serviceName,
    serviceUrl: credential.serviceUrl,
    username: credential.username,
    password: credential.password,
  });
  function onCloseModal() {
    setOpenModal(false);
  }

  const handleGeneratePassword = () => {
    setFormData({ ...formData, password: generateStrongPassword() });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(key);
    // try {
    //   await axios.put(
    //     `${import.meta.env.VITE_SERVER_URL}/api/credentials/${}`,
    //     formData
    //   );
    //   fetchCredentials(); // Fetch credentials after adding a new one
    //   setFormData({
    //     serviceName: "",
    //     serviceUrl: "",
    //     username: "",
    //     password: "",
    //   }); // Clear form fields
    //   setOpenModal(false);
    // } catch (error) {
    //   console.error("Error adding credential:", error);
    // }
  };

  return (
    <>
      <Button size="md" onClick={() => setOpenModal(true)}>
        Edit Credential <PlusIcon className="text-sm size-5" />
      </Button>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Credentials
            </h3>
            <div className="flex flex-col w-full gap-3  justify-between md:flex-row">
              <div className="flex-grow">
                <div className="mb-2 block flex-grow ">
                  <Label htmlFor="serviceName" value="Service name" />
                </div>
                <TextInput
                  type="text"
                  name="serviceName"
                  placeholder="Service Name"
                  value={formData.serviceName}
                  onChange={handleChange}
                />
              </div>
              <p className=" hidden text-xs md:flex flex-col items-center justify-end pb-2">
                <span>And</span>
                <span>/Or</span>
              </p>
              <div className="flex-grow">
                <div className="mb-2 block">
                  <Label htmlFor="serviceUrl" value="Service URL (optional)" />
                </div>
                <TextInput
                  type="text"
                  name="serviceUrl"
                  value={formData.serviceUrl}
                  onChange={handleChange}
                  placeholder="Service URL"
                />
              </div>
            </div>
            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Your username" />
                </div>
                <TextInput
                  id="username"
                  name="username"
                  placeholder="Email/Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  value={formData.password}
                  // type={isPasswordVisible ? "text" : "password"}
                  type="text"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <Button onClick={handleSubmit}>Update Credentials</Button>
              <Button onClick={handleGeneratePassword} outline>
                Generate Password
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditCredentialForm;
