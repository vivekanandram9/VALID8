import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://valid8-oypy.onrender.com",
});

// Automatically attach token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;