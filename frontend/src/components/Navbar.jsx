"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function NavBar() {
  const { user, logout } = useAuth();
  const navigateTo = useNavigate();
  const handleLogout = () => {
    logout();
    navigateTo("/login");
  };
  return (
    <Navbar rounded className="w-full  mb-8 rounded-b-lg">
      <Navbar.Brand href="/">
        <img
          src="/logo-no-background.svg"
          className=" h-7 sm:h-12"
          alt="KeyGuardia Logo"
        />
      </Navbar.Brand>
      <div className="flex gap-4 md:order-2 items-center">
        {/* <Navbar.Collapse>
          <Link
            className="text-black hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-black hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-black hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
            to="/profile"
          >
            Profile
          </Link>
        </Navbar.Collapse> */}
        <DarkThemeToggle />
        {user != null ? (
          <>
            <Navbar.Collapse>
              <Link
                className="text-black hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
                to="/"
              >
                Home
              </Link>
              {/* <Link className="text-black hover:text-slate-700 dark:text-white dark:hover:text-slate-300" to="#">About</Link> */}
              <Link
                className="text-black hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
                to="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="text-black hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
                to="/profile"
              >
                Profile
              </Link>
            </Navbar.Collapse>
            <h3 className="text-black dark:text-white ml-14">
              Hi, {user.firstName}
            </h3>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">
                  {user.firstname} {user.lastname}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </DropdownHeader>
              {/* <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem> */}
              {/* <DropdownDivider /> */}
              <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
            </Dropdown>
          </>
        ) : (
          <>
            <Button outline as={Link} to="/login">
              Login
            </Button>
            <Button as={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
