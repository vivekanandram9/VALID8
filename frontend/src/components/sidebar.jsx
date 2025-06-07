
import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios";
import logout from '../assets/logout.png';
import logo01 from '../assets/logo01.png';
import userlogo from '../assets/userlogo.png';
import resume from '../assets/resume.png';


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // Notify components about logout
    navigate("/Login");
  }
  useEffect(() => {
    const fetchUser = async () => {
    try {
      const userRes = await axios.get("https://valid8-oypy.onrender.com/api/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsername(userRes.data.name);
    } catch (error) {
      console.error("failed to fetch user info:", error);
    }
  };
  fetchUser();
  }, []);
  
  return (
    <>
      <main >
        {<div className=" hidden sm:flex navContainer flex-col  justify-between bg-black p-4 text-xl text-white  w-[10rem]   h-screen border-r fixed">


          <div className="logo  items-center  flex flex-row w-full">

            <div className="logoImg mr-2 ">
              <a href="/"><img className='h-[4rem] w-[3rem]  ' src={logo01} alt="" /></a>
            </div>
            <div className="logoText  ">
              <a href="/"><h1>VALID<span className="text-lred">8</span></h1></a>
            </div>
            <hr className="border-t absolute border-gray-300  left-0 top-[6rem] w-full" />




          </div>



          <ul className='flex items-center space-x-5 '>

            <div className=' p-2 flex-row absolute bottom-[20rem]'>
              <li className=''>
                <NavLink to="/" onClick={() => scrollTosection("hero")}>
                  Home
                </NavLink>
              </li>
              <li className=''>
                <NavLink onClick={() => scrollTosection("features")}>
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            </div>

            <li>
              {<div className="userSection  ">
                <div className="userDP w-[4rem] h-[4rem]  relative">
                  <button onClick={() => setIsOpen(!isOpen)}>
                    <img src={userlogo} alt="" />
                  </button>

                  {isOpen && (
                    <div className="absolute right-0  w-40 bg-slate-950 border rounded-lg shadow-lg text-white px-4 
                    bottom-[0.5rem] left-[5rem]">
                      <div className="userimg">
                        <img src={userlogo} alt="" />
                      </div>
                      <div className="greetUser"><h2>Hi, {username}</h2></div>
                      <div className='flex w-[2rem] p-1'>
                        <img src={resume} alt="" />
                        <button className='block  px-4'
                          onClick={() => navigate("#")}
                        >Profile</button>
                      </div>
                      <div className='flex w-[2rem] p-1'>
                        <img src={logout} alt="" />
                        <button onClick={handleLogout} className='block w-full text-left px-4  text-red-600 '>Logout</button>
                      </div>



                    </div>
                  )}


                </div>
              </div>}
            </li>


          </ul>


        </div>}
        {/*Mobile Navbar*/}
        {<div className=" sm:hidden navContainer flex  justify-between bg-black p-4 text-xl text-white  fixed top-0 w-full z-50    h-[5.5rem]  ">

          <div className="logo flex  items-center space-x-4 ">
            <a href="/"><img className='h-20 w-16 p-[0.5rem]' src={logo01} alt="" /></a>

          </div>

          <button onClick={() => setIsOpen(!isOpen)} className='text-white text-3xl font-bold focus:outline-none '>
            ☰
          </button>
          {isOpen && (
            <div className="absolute top-[5.5rem] left-[9.5rem] w-[200px] bg-white text-black p-4 shadow-md rounded-b-xl z-40 transition delay-150 duration-700 ease-linear ">
              <NavLink to="/" onClick={() => scrollTosection("hero")} className="block py-2 hover:text-orange-800">Home</NavLink>
              <NavLink onClick={() => scrollTosection("features")} className="block py-2 hover:text-orange-800">Features</NavLink>
              <NavLink to="/dashboard" className="block py-2 hover:text-orange-800">Dashboard</NavLink>

              <div className="border-t mt-2 pt-2">
                <img src={userlogo} alt="user" className="w-10 h-10 mx-auto" />
                <h2 className="text-center mt-2">Hi, user</h2>
                <div className='flex items-center gap-2 mt-3'>
                  <img src={resume} alt="" className="w-5 h-5" />
                  <button onClick={() => navigate("#")}>Profile</button>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  <img src={logout} alt="" className="w-5 h-5" />
                  <button onClick={handleLogout} className='text-red-600'>Logout</button>
                </div>
              </div>
            </div>
          )}



        </div>}

      </main>
    </>
  )
}

export default Sidebar
