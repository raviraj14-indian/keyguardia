import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const AuthRoutes = () => {
  const { user } = useAuth();
  if (user === undefined) {
    return <Loading />;
  }
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AuthRoutes;
