import React from 'react'
import { useState } from 'react';
import axios from "axios";
import logo01 from "../assets/logo01.png"

import { useNavigate } from 'react-router-dom';
//import logo from './src/assets/logo01.png';

function Login() {
  const [formData, setFormData] = useState({
    
    email: "",
    password:"",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log("Submitting form data:", formData); // Debugging log
    try{
      const response = await axios.post("https://valid8-oypy.onrender.com/api/auth/Login", formData);
      /*localStorage.setItem("token", response.data.token);
      console.log("Response:", response.data); // Debugging log
      alert("Login Succesful");
      console.log( navigate("/Dashboard"));
      navigate("/Dashboard");*/
      if (response.data.token){
        localStorage.setItem("token", response.data.token); // store token
        window.dispatchEvent(new Event("storage")); // Notify all components about login
        

        console.log("token stored:", response.data.token);
        alert("Login Succesful");
        navigate("/Dashboard");
      }else{
        console.error("Login successful but no token received.");
      }
    } catch(error){
      console.error("Error signing in:", error.response?.data || error.message);
    }
  };
  return (
    <>
    
     <div  className="mainContainer w-screen h-screen bg-black flex  justify-center overflow-hidden pt-[6.9rem]">
        <div className="signup-container  bg-black w-[30rem] h-[35rem] border-solid border border-lred rounded-2xl border-[4px] relative mt-20">
          <div className="logo mb-4 w-24 h-24 flex justify-center items-center relative left-[11.5rem] top-[2rem]">
            <img className='w-full h-ful object-contain' src={logo01} alt="Logo" />
          </div>
          <form className=' relative top-[5rem]'  onSubmit={handleSubmit}>
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
              required/>

            </div>
            <div className="submitButton relative left-[12rem] top-[3rem] ">
              <button className='border-solid  border w-[6rem] h-[2.5rem] rounded-xl border-lred text-white border-2  ' type="submit">Login</button>
            </div>
            
          </form>
        </div>
     </div>    
    </>
  )
}

export default Login

