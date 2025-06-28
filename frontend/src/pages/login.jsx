import React, { useState } from 'react';
import axios from "../utils/axiosInstance";
import logo01 from "../assets/VALID8LOGO.png";
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/Login", formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("storage"));
        setSuccess(true);
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1500);
        
      } else {
        console.error("Login successful but no token received.");
      }
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || "Login failed");
      setSuccess(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#161616] flex justify-center items-start pt-28 overflow-visible flex-row ">
     {/* Floating Alerts */}
<div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
  {success && (
    <Alert
      icon={<CheckIcon fontSize="inherit" />}
      severity="success"
      className="shadow-lg"
    >
      Login Successful!
    </Alert>
  )}
  {errorMsg && (
    <Alert severity="error" className="shadow-lg">
      {errorMsg}
    </Alert>
  )}
</div>

      <div className=" hidden lg:block space-y-4 text-center w-[30rem] h-[32rem] bg-white ml-9 border rounded-tl-3xl ">
         <div className="w-40 h-40 mx-auto mt-2  items-end ">
          <img className=" object-contain" src={logo01} alt="Logo" />
          
        </div>
        

        <p className="text-7xl font-extrabold text-wrap text-[#b1b8c2] leading-none text-left p-7">
          Catch bugs before they crawl !! 
        </p>
      </div>

      <div className="w-[30rem] h-[32rem] bg-[rgba(255,255,255,0.05)] border border-white/10  rounded-3xl lg:rounded-br-3xl backdrop-blur-md  text-[#b1b8c2] flex flex-col  mb-12 ml-4 lg:ml-0 mr-4 lg:rounded-none ">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto mt-2  items-end lg:hidden">
          <img className="w-full h-full object-contain" src={logo01} alt="Logo" />
          
        </div>
        <h1 className='p-3 font-semibold text-2xl sm:text-3xl text-center lg:mt-6'>Welcome back to VALID8</h1>


        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-3 lg:mt-20 px-6">
          <div className="flex flex-col gap-4">
            <input
              className="p-3 rounded-xl border border-lred bg-[#161616] text-[#b1b8c2] placeholder:text-[#b1b8c2] focus:outline-none focus:ring-2 focus:ring-lred"
              type="email"
              name="email"
              placeholder="Enter your Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="p-3 rounded-xl border border-lred bg-[#161616] text-[#b1b8c2] placeholder:text-[#b1b8c2] focus:outline-none focus:ring-2 focus:ring-lred"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-[6rem] h-[2.5rem] border-2 border-lred text-white rounded-xl hover:bg-lred transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Divider */}
        <hr className="mt-10 mx-6 border-white/10" />

        {/* Redirect to Signup */}
        <div className="text-center mt-4 text-foreground transition">
          <Link to="/Signup">
            <p>Don&apos;t have an account? <span className='text-lred'>Signup</span> </p>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Login;
