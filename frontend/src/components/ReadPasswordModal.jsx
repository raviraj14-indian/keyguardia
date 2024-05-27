import React from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

const ReadPasswordModal = ({ credential }) => {
  const [openModal, setOpenModal] = useState(false);
  const [copy, setCopy] = useState(false);
  const $defaultMessage = document.getElementById("default-message");
  const $successMessage = document.getElementById("success-message");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(credential.password);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <>
      <Button size="sm" outline onClick={() => setOpenModal(true)}>
        Show
      </Button>
      <Modal
        position="center"
        dismissible
        size="sm"
        show={openModal}
        className="fixed top-[40vh]"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Password For {credential.serviceName}</Modal.Header>
        <Modal.Body>
          <div class="w-full max-w-sm">
            <div class="relative">
              <label for="password" class="sr-only">
                Label
              </label>
              <input
                id="password"
                type="text"
                class="col-span-6 font-semibold bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={credential.password}
                readonly
              />
              <button
                data-copy-to-clipboard-target="password"
                onClick={copyToClipboard}
                class="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
              >
                {copy ? (
                  <span id="success-message" class=" inline-flex items-center">
                    <svg
                      class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span class="text-xs font-semibold text-blue-700 dark:text-blue-500">
                      Copied
                    </span>
                  </span>
                ) : (
                  <span id="default-message" class="inline-flex items-center">
                    <svg
                      class="w-3 h-3 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    <span class="text-xs font-semibold">Copy</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button size={"md"} color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ReadPasswordModal;
