import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../utils/axiosInstance";
import LoadingBar from "./loadingbar.jsx";

const Protectedroute = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthChecked(true);
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await axios.get("/api/auth/user");
        setIsAuthenticated(true);
      } catch (err) {
        console.log("Invalid token:", err.message);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) return <LoadingBar />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default Protectedroute;
