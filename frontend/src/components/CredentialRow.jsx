import {
  ArrowTopRightOnSquareIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Dropdown,
  DropdownItem,
  TableCell,
  TableRow,
  Tooltip,
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import ReadPasswordModal from "./ReadPasswordModal";
import EditCredentialForm from "./EditCredentialForm";
import axios from "../api/axiosInstance";

const CredentialRow = ({ credential, handleEdit, key, fetchCredentials }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/credentials/${id}`
      );
      fetchCredentials(); // Fetch credentials after deleting one
    } catch (error) {
      console.error("Error deleting credential:", error);
    }
  };
  return (
    <>
      <TableRow
        key={credential._id}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <TableCell className="table-cell px-4 py-2 whitespace-nowrap  flex-col gap-5  font-medium text-gray-900 dark:text-white">
          <div className="flex justify-between font-bold w-full font">
            {credential.serviceName}
            {credential.serviceUrl && (
              <Link
                className="text-slate-500 hover:text-slate-800 "
                to={credential.serviceUrl}
              >
                <ArrowTopRightOnSquareIcon className="text-sm size-5" />
              </Link>
            )}
          </div>
          <p className="text-sm block font-normal md:hidden">
            {credential.username}
          </p>
        </TableCell>
        {/* <TableCell>{credential.username}</TableCell> */}
        <TableCell className="hidden md:table-cell ">
          {credential.username}
        </TableCell>
        {/* <TableCell>{credential.password} </TableCell> */}
        <TableCell className="table-cell px-4 py-2 ">
          <ReadPasswordModal credential={credential} />
        </TableCell>
        <TableCell className="table-cell px-4 py-2 ">
          <div className="inline-block md:hidden">
            <Dropdown
              dismissOnClick={false}
              renderTrigger={() => (
                <EllipsisVerticalIcon className="text-sm size-5" />
              )}
              inline
            >
              <DropdownItem onClick={() => handleEdit(credential._id)}>
                <PencilSquareIcon className="text-sm size-5" />
              </DropdownItem>
              <DropdownItem onClick={() => handleDelete(credential._id)}>
                <TrashIcon className="text-sm size-5" />
              </DropdownItem>
            </Dropdown>
          </div>
          <div className="hidden md:flex gap-2">
            <EditCredentialForm key={key} credential={credential} />
            <Tooltip content="Edit">
              <Button
                outline
                size={"sm"}
                onClick={() => handleEdit(credential._id)}
              >
                <PencilSquareIcon className="text-sm size-5" />
              </Button>
            </Tooltip>
            <Tooltip content="Delete">
              <Button
                size={"sm"}
                color="failure"
                outline
                onClick={() => handleDelete(credential._id)}
              >
                <TrashIcon className="text-sm size-5" />
              </Button>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CredentialRow;
