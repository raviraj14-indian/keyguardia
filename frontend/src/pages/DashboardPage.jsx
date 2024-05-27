// pages/DashboardPage.js

import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import AddCredentialForm from "../components/AddCredentialForm";
import CredentialsTable from "../components/CredentialsTable";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Label, TextInput } from "flowbite-react";

const DashboardPage = () => {
  const [credentials, setCredentials] = useState([]);
  const [filteredCredentials, setFilteredCredentials] = useState([]);

  const fetchCredentials = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/credentials`
      );
      setCredentials(response.data);
      setFilteredCredentials(response.data);
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleEdit = (id) => {
    //  logic to edit credential
    console.log("Edit credential:", id);
  };

  const handleFilter = (e) => {
    const filteredCredentials = credentials.filter((credential) =>
      credential.serviceName
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredCredentials(filteredCredentials);
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(
  //       `${import.meta.env.VITE_SERVER_URL}/api/credentials/${id}`
  //     );
  //     fetchCredentials(); // Fetch credentials after deleting one
  //   } catch (error) {
  //     console.error("Error deleting credential:", error);
  //   }
  // };

  return (
    <div className="mx-auto md:mx-7 flex flex-col gap-5">
      <div className="flex flex-col justify-between md:flex-row">
        <AddCredentialForm fetchCredentials={fetchCredentials} />
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="search" value="" />
          </div>
          <TextInput
            id="search"
            type="text"
            name="search"
            sizing="md"
            icon={MagnifyingGlassIcon}
            placeholder="Search"
            onChange={handleFilter}
          />
        </div>
      </div>
      <CredentialsTable
        credentials={filteredCredentials}
        handleEdit={handleEdit}
        fetchCredentials={fetchCredentials}
        // handleDelete={handleDelete}
      />
    </div>
  );
};

export default DashboardPage;
