import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "../utils/axiosInstance";

import logo01 from '../assets/VALID8LOGO.png';
import userlogo from '../assets/userlogo.png';


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("user");
  const [useremail, setUserEmail] = useState("valid8@gmail.com")
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/Login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get("/api/auth/user");
        const username = userRes.data.name;
        const useremail = userRes.data.email;
        setUsername(username.split(" ")[0]);
        setUserEmail(useremail);
      } catch (error) {
        console.error("failed to fetch user info:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <main>
      <div className="flex navContainer flex-col justify-between bg-background text-foreground w-[10rem] h-screen border-r border-cardDark p-4 text-xl fixed ">

        {/* Logo */}
        <div className="logo items-center flex flex-row w-full relative">
          <div className="logoImg mr-2">
            <a href="/">
              <img className="h-[6rem] w-[6rem] absolute top-0 left-8" src={logo01} alt="logo" />
            </a>
          </div>
          <hr className="border-t border-cardDarker absolute top-[6rem] left-0 w-full" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-4 mt-40 text-base">
          <li>
            <NavLink to="/" className="block px-4 py-2 rounded hover:bg-cardDark transition-all duration-200">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-all duration-200 ${isActive ? 'bg-cardDark text-lred font-semibold border-l-4 border-lred' : 'hover:bg-cardDark'
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/SavedApis" className={({ isActive }) =>
              `block px-4 py-2 rounded transition-all duration-200 ${isActive ? 'bg-cardDark text-lred font-semibold border-l-4 border-lred' : 'hover:bg-cardDark'
              }`
            }>
              Saved APIs
            </NavLink>
          </li>
          <li>
            <NavLink to="/MonitorApis" className={({ isActive }) =>
              `block px-4 py-2 rounded transition-all duration-200 ${isActive ? 'bg-cardDark text-lred font-semibold border-l-4 border-lred' : 'hover:bg-cardDark'
              }`
            }>
              Monitor APIs
            </NavLink>
          </li>
          <li>
            <NavLink to="/Analytics" className={({ isActive }) =>
              `block px-4 py-2 rounded transition-all duration-200 ${isActive ? 'bg-cardDark text-lred font-semibold border-l-4 border-lred' : 'hover:bg-cardDark'
              }`
            }>
              Analytics
            </NavLink>
          </li>
        </ul>

        {/* User Section */}
        <div className="userSection mt-auto">
          <div className="userDP w-[4rem] h-[4rem]">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor"
                className="size-9 relative left-[2rem] ">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 
                  20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 
                  12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute  bottom-8 w-48 bg-cardDarker border border-cardDark text-foreground rounded-xl shadow-lg p-5 z-50 left-28  h-52 items-center flex flex-col" >
                <div className="userimg mb-2 ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor"
                className="size-9 relative ">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 
                  20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 
                  12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>

                </div>
                <hr className='w-36' />
                <div className='text-sm relative right-5 mt-2 font-thin mb-2'>
                  <h2>{useremail}</h2>
                </div>
                <div className="greetUser mb-2 text-xl relative right-11">
                  <h2>Hi, {username}</h2>
                </div>

                <div className="flex items-center space-x-2 cursor-pointer hover:text-lred transition relative right-11">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                  <button onClick={handleLogout} className="text-sm text-lred">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default Sidebar;
