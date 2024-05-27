import React, { Suspense, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const ProtectedRoutes = () => {
  const { user } = useAuth();
  console.log(user);
  if (user === undefined) {
    return <Loading />;
  }
  return user ? (
    user.emailVerified ? (
      // <Outlet />
      user.mfaEnabled ? (
        // <Navigate to="/verify-email" />
        user.mfaValidated ? (
          <Outlet />
        ) : (
          <Navigate to="/verify-mfa" />
        )
      ) : (
        <Outlet />
      )
    ) : (
      <Navigate to="/verify-email" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
