// components/CredentialTable.js

import React from "react";
import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

import CredentialRow from "./CredentialRow";
import CredentialForm from "./AddCredentialForm";
const CredentialsTable = ({ credentials, handleEdit, fetchCredentials }) => {
  return (
    <div className="overflow-x-auto">
      {credentials.length ? (
        <>
          <Table hoverable className="mx-auto">
            <TableHead>
              <TableHeadCell>Service name</TableHeadCell>
              <TableHeadCell className="hidden md:table-cell">
                Username
              </TableHeadCell>
              <TableHeadCell>Password</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only md:not-sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {credentials.map((credential) => (
                <CredentialRow
                  key={credential._id}
                  credential={credential}
                  handleEdit={handleEdit}
                  fetchCredentials={fetchCredentials}
                  // handleDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="w-full p-4 col-span-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Oops! Nothing to show yet
          </h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Let's start by adding your first Credentials
          </p>
          <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            <CredentialForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsTable;
