// src/api/axiosInstance.js

import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create();

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use((config) => {
  // const token = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
