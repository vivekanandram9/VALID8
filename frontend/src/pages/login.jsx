import React from 'react'
import { useState } from 'react';
import axios from "axios";
import logo01 from "../assets/logo01.png"

import { useNavigate } from 'react-router-dom';
//import logo from './src/assets/logo01.png';

function Login() {
  const [formData, setFormData] = useState({

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
      const response = await axios.post("https://valid8-oypy.onrender.com/api/auth/Login", formData);
    
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // store token
        window.dispatchEvent(new Event("storage")); // Notify all components about login


       
        alert("Login Succesful");
        navigate("/Dashboard");
      } else {
        console.error("Login successful but no token received.");
      }
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
    }
  };
  return (
    <>

      <div className="mainContainer w-screen h-screen bg-black flex  justify-center overflow-visible pt-[6.9rem]">
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
          {/* Top-left red glow */}
          <div className="absolute w-[600px] h-[600px] bg-[#f91515]/20 rounded-full blur-[200px] top-[-150px] left-[-150px]"></div>

          {/* Bottom-right soft white glow */}
          <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-[150px] bottom-[-100px] right-[-100px]"></div>
        </div>


        <div className="signup-container  bg-[rgba(255,255,255,0.05)] w-[25rem] h-[30rem] border-solid   rounded-2xl border-[4px] border-white/10 relative mt-20 backdrop-blur-md text-white">
          <div className="logo mb-4 w-24 h-24 flex justify-center items-center relative left-[9.5rem] top-[2rem]">
            <img className='w-full h-ful object-contain' src={logo01} alt="Logo" />
          </div>
          <form className=' relative top-[5rem]' onSubmit={handleSubmit}>
            <div className="inputContainer flex flex-col">

              <input className='m-4 p-2 border border-lred bg-black text-lred rounded-xl'
                type="email"
                name="email"
                value={formData.email}
                placeholder='Enter your Email ID' onChange={handleChange}
                required
              />
              <input className='m-4 p-2 border border-lred bg-black text-lred rounded-xl'
                type="password"
                name="password"
                value={formData.password}
                placeholder='Password'
                onChange={handleChange}
                required />

            </div>
            <div className="submitButton relative left-[9rem] top-[1rem] ">
              <button className='border-solid  border w-[6rem] h-[2.5rem] rounded-xl border-lred text-white border-2  ' type="submit">Login</button>
            </div>

          </form>
          <hr className='relative top-[7rem] border-[2px] w-[21rem] border-white/10 left-[1.8rem]' />
          <div className='relative top-[7.5rem] left-[2rem] text-[#e04c4c] hover:text-red-400 cursor-pointer'>
            <p>don't have an account ?</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

