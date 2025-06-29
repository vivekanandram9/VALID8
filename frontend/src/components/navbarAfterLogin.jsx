import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "../utils/axiosInstance";

import logo01 from '../assets/VALID8LOGO.png';
import userlogo from '../assets/userlogo.png';




const NavbarUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [username, setUsername] = useState("user");
    const [useremail, setUseremail] = useState("valid8user@gmail.com");

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
        navigate("/Login");
    };

    const scrollTosection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRes = await axios.get("/api/auth/user");
               
                const username = userRes.data.name;
                const userEmail = userRes.data.email;
                setUsername(username.split(" ")[0]);
                setUseremail(userEmail);
            } catch (error) {
                console.error("failed to fetch user info:", error);
            }
        };
        fetchUser();


        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navClasses = `fixed top-0  z-50 flex items-center justify-between px-4 py-3 text-white transition-colors duration-500 h-[5.5rem] ${isScrolled
        ? 'bg-[rgba(18,18,18,0.6)] backdrop-blur-xl border-b border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)] mt-5 border rounded-3xl w-[91%] xl:w-[65%] left-[1rem] sm:w-[90%] sm:left-[2rem] lg:w-[80%] lg:left-[7rem] xl:left-[18.5rem]'
        : 'bg-transparent w-[100%] xl:w-[80%] xl:left-[11.5rem]'
        }`;

    return (
        <nav className={navClasses}>
            {/* Logo */}
            <div className="flex items-center space-x-4">
                {isScrolled ? (<a href="/"><img className="h-16 w-auto" src={logo01} alt="logo" /></a>) : (<h1 className="text-xl sm:text-2xl">VALID<span className="text-lred">8</span></h1>)}


            </div>

            {/* Desktop Nav */}
            <ul className="hidden sm:flex items-center space-x-6 text-lg">
                <li><NavLink className={({ isActive }) =>
                    `block px-4 py-2 rounded transition-all duration-200 ${isActive ? '  font-semibold border-b-4 border-lred' : 'hover:bg-cardDark'
                    }`
                } to="/" onClick={() => scrollTosection("hero")}>Home</NavLink></li>

                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor"
                            className="size-9 relative ">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 
                  20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 
                  12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute  bottom-[0.5rem] w-48 bg-cardDarker border border-cardDark text-foreground rounded-xl shadow-lg p-5 z-50 right-[0rem] top-[4rem] h-52 items-center flex flex-col" >
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
                </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="sm:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl font-bold">
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-[5.5rem] left-1/2 transform -translate-x-1/2 w-[90%] bg-cardDark text-foreground shadow-glass p-4 shadow-xl rounded-xl z-40">
                    <NavLink to="/" onClick={() => scrollTosection("hero")} className="block py-2 hover:text-orange-800">Home</NavLink>
                    <NavLink onClick={() => scrollTosection("features")} className="block py-2 hover:text-orange-800">Features</NavLink>
                    <NavLink to="/dashboard" className="block py-2 hover:text-orange-800">Dashboard</NavLink>
                    <div className="border-t mt-3 pt-3 text-center">
                        <img src={userlogo} alt="user" className="w-10 h-10 mx-auto mb-2" />
                        <h2 className="text-center">Hi, {username}</h2>

                        <div className="flex items-center justify-center gap-2 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                            <button onClick={handleLogout} className="text-red-600">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarUser;
