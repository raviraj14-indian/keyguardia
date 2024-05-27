import { Button } from "flowbite-react";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigateTo = useNavigate();
  return (
    <>
      <section className="bg-center bg-no-repeat  bg-[url('/blob-scene-haikei.svg')] bg-gray-100 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl text-[#21697c] font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl">
            Safeguard Your Digital World
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Streamlined Password Management and Advanced Security Solutions{" "}
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/signup"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#21697c] hover:opacity-90 focus:ring-4 focus:ring-[#21697c] dark:focus:ring-[#21697c]"
            >
              Sign Up
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>

            <Link
              className="inline-flex justify-center dark:hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-[#21697c] hover:bg-[#21697c] focus:ring-4 focus:ring-primary-darker"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            explore a <br /> simpler and secure life
          </h1>
          <div className="mt-2">
            <span className="inline-block w-40 h-1 bg-[#21697c] rounded-full" />
            <span className="inline-block w-3 h-1 ml-1 bg-[#21697c] rounded-full" />
            <span className="inline-block w-1 h-1 ml-1 bg-[#21697c] rounded-full" />
          </div>
          <div className="mt-8 xl:mt-12 lg:flex lg:items-center">
            <div className="grid w-full grid-cols-1 gap-8 lg:w-1/2 xl:gap-16 md:grid-cols-2">
              <div className="space-y-3">
                <span className="inline-block p-3 text-[#21697c] bg-blue-100 rounded-xl dark:text-white dark:bg-[#21697c]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  Strong Password Generator
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ab nulla quod dignissimos vel non corrupti doloribus
                  voluptatum eveniet
                </p>
              </div>
              <div className="space-y-3">
                <span className="inline-block p-3 text-[#21697c] bg-blue-100 rounded-xl dark:text-white dark:bg-[#21697c]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  Multi-Factor Authentication
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ab nulla quod dignissimos vel non corrupti doloribus
                  voluptatum eveniet
                </p>
              </div>
              <div className="space-y-3">
                <span className="inline-block p-3 text-[#21697c] bg-blue-100 rounded-xl dark:text-white dark:bg-[#21697c]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  Easy to customiztions
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ab nulla quod dignissimos vel non corrupti doloribus
                  voluptatum eveniet
                </p>
              </div>
              <div className="space-y-3">
                <span className="inline-block p-3 text-[#21697c] bg-blue-100 rounded-xl dark:text-white dark:bg-[#21697c]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  Simple &amp; clean designs
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ab nulla quod dignissimos vel non corrupti doloribus
                  voluptatum eveniet
                </p>
              </div>
            </div>
            <div className="hidden lg:flex lg:w-1/2 lg:justify-center">
              <img
                className="w-[28rem] h-[28rem] flex-shrink-0 object-cover xl:w-[34rem] xl:h-[34rem] rounded-full"
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            What our <span className="text-[#21697c] ">clients</span> say
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            incidunt ex placeat modi magni quia error alias, adipisci rem
            similique, at omnis eligendi optio eos harum.
          </p>
          <div className="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
            <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8">
              <p className="leading-loose text-gray-500 dark:text-gray-300">
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore quibusdam ducimus libero ad tempora doloribus expedita
                laborum saepe voluptas perferendis delectus assumenda rerum,
                culpa aperiam dolorum, obcaecati corrupti aspernatur a.”.
              </p>
              <div className="flex items-center mt-6">
                <img
                  className="object-cover rounded-full w-14 h-14"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />
                <div className="mx-4">
                  <h1 className="font-semibold text-[#21697c]">Robbert</h1>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    CTO, Robert Consultency
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8">
              <p className="leading-loose text-gray-500 dark:text-gray-300">
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore quibusdam ducimus libero ad tempora doloribus expedita
                laborum saepe voluptas perferendis delectus assumenda rerum,
                culpa aperiam dolorum, obcaecati corrupti aspernatur a.”.
              </p>
              <div className="flex items-center mt-6">
                <img
                  className="object-cover rounded-full w-14 h-14"
                  src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />
                <div className="mx-4">
                  <h1 className="font-semibold text-[#21697c]">Mia Brown</h1>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    Marketing Manager at Stech
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="relative w-full bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <img
              src="/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="KeyGuardia Logo"
            />
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
              "Never Forget a Password Again. Securely Manage All Your Accounts
              with <span> KeyGuardia</span>."
            </h1>
            <p className="mt-8 text-lg text-gray-700">
              Your all-in-one password manager for a safer, simpler online life.
            </p>
            <form action="" className="mt-8 flex items-start space-x-2">
              <div>
                <input
                  className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                ></input>
                <p className="mt-2 text-sm text-gray-500">
                  We care about your privacy
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
            <img
              className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
              src="https://plus.unsplash.com/premium_photo-1679079456783-5d862f755557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQ3fHxtYW4lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              alt=""
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
