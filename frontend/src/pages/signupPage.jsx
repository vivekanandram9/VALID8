import React, { useState } from 'react';
import axios from "../utils/axiosInstance";
import logo01 from "../assets/VALID8LOGO.png";
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function Signup() {
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      await axios.post("/api/auth/Signup", formData);
      setSuccess(true);
      setTimeout(() => {
          navigate("/Login");
      }, 1500);
      
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || "Sign-up Failed");
      setSuccess(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#161616] flex justify-center items-start pt-28 overflow-hidden">
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
        

        <p className="text-5xl font-extrabold text-[#b1b8c2] ">
          We validate APIs. 
        </p>
        <p className=' text-5xl font-extrabold text-[#b1b8c2] '> Want clean APIs?</p>
        <p className='text-4xl font-bold text-[#d5e0f0] '>P.S. We sell soap too.</p>
      </div>
      <div className="w-[30rem] h-[32rem] bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-3xl lg:rounded-br-3xl relative ml-4 lg:ml-0 mr-4 mb-3 text-[#b1b8c2] lg:rounded-none ">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto mt-2">
          <img className="w-full h-full object-contain lg:hidden" src={logo01} alt="Logo" />
        </div>
        <h1 className='p-3 font-semibold text-2xl sm:text-3xl text-center sm:mt-2 lg:mt-6 relative lg:bottom-20 '>Ready to scrub those bugs?</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 px-8 relative lg:bottom-8">
          <div className="flex flex-col gap-4">
            <input
              className="p-3 rounded-xl border border-lred bg-[#161616] text-[#b1b8c2] placeholder:text-[#b1b8c2] focus:outline-none focus:ring-2 focus:ring-lred"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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

          <div className="mt-5 flex justify-center">
            <button
              type="submit"
              className="w-[6rem] h-[2.5rem] border-2 border-lred text-white rounded-xl hover:bg-lred transition"
            >
              Signup
            </button>
          </div>
        </form>
        <hr className="mt-6 mx-6 border-white/10 relative lg:bottom-5"/>

        {/* Login Redirect */}
        <div className="absolute bottom-6 left-44  transform -translate-x-1/2 w-[65%] text-sm flex  text-[#b1b8c2]">
          <Link to="/Login">
                <p>Already have an account?<span className='text-lred ml-1'>Login</span></p>
          </Link>
           
        </div>
      </div>
    </div>
  );
}

export default Signup;
