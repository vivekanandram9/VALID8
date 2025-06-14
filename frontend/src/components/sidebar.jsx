
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
        {<div className=" flex navContainer flex-col  justify-between bg-black p-4 text-xl text-white  w-[10rem]   h-screen border-r fixed">


          <div className="logo  items-center  flex flex-row w-full">

            <div className="logoImg mr-2 ">
              <a href="/"><img className='h-[4rem] w-[3rem]  ' src={logo01} alt="" /></a>
            </div>
            { /*<div className="logoText  ">
              <a href="/"><h1>VALID<span className="text-lred">8</span></h1></a>
            </div>*/}
            <hr className="border-t absolute border-gray-300  left-0 top-[6rem] w-full" />




          </div>



          <ul className="flex flex-col space-y-4 mt-12">
            <li>
              <NavLink to="/" onClick={() => scrollTosection("hero")} className="block px-4 py-2 hover:bg-gray-800 rounded">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-800 rounded">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/SavedApis" className="block px-4 py-2 hover:bg-gray-800 rounded">
                Saved APIs
              </NavLink>
            </li>
            <li>
              <NavLink to="/MonitorApis" className="block px-4 py-2 hover:bg-gray-800 rounded">
                Monitor APIs
              </NavLink>
            </li>
            <li>
              <NavLink className="block px-4 py-2 hover:bg-gray-800 rounded">
                Analytics
              </NavLink>
            </li>
          </ul>


          {<div className="userSection  ">
            <div className="userDP w-[4rem] h-[4rem]  relative">
              <button onClick={() => setIsOpen(!isOpen)}>
                {/*<img src={userlogo} alt="" />*/}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
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



        </div>}


      </main>
    </>
  )
}

export default Sidebar
