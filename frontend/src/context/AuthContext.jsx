// UserContext.js

import Cookies from "js-cookie";
import React, { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const verifyMfa = () => {
    setUser({ mfaValidated: true, ...user });
  };
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, verifyMfa }}>
      {children}
    </AuthContext.Provider>
  );
};
