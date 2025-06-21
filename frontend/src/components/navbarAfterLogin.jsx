import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import logoutIcon from '../assets/logout.png';
import logo01 from '../assets/VALID8LOGO.png';
import userlogo from '../assets/userlogo.png';
import resume from '../assets/resume.png';

const NavbarUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [username, setUsername] = useState("user");
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
              const userRes = await axios.get("https://valid8-oypy.onrender.com/api/auth/user", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
              const username = userRes.data.name;
              setUsername(username.split(" ")[0]);
            } catch (error) {
              console.error("failed to fetch user info:", error);
            }
        };
        fetchUser();


        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navClasses = `fixed top-0 w-full z-50 flex items-center justify-between px-4 py-3 text-white transition-colors duration-500 h-[5.5rem] ${
        isScrolled
            ? 'bg-[rgba(18,18,18,0.6)] backdrop-blur-xl border-b border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)] mt-5 border rounded-3xl w-[89.5%] left-[1rem] sm:w-[90%] sm:left-[2rem] lg:w-[80%] lg:left-[10rem]'
            : 'bg-transparent'
    }`;

    return (
        <nav className={navClasses}>
            {/* Logo */}
            <div className="flex items-center space-x-4">
                {isScrolled ? (<a href="/"><img className="h-16 w-auto" src={logo01} alt="logo" /></a>) : (<h1 className="text-xl sm:text-2xl">VALID<span className="text-lred">8</span></h1>)}
                
                
            </div>

            {/* Desktop Nav */}
            <ul className="hidden sm:flex items-center space-x-6 text-lg">
                <li><NavLink to="/" onClick={() => scrollTosection("hero")}>Home</NavLink></li>
                <li><NavLink onClick={() => scrollTosection("features")}>Features</NavLink></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <img src={userlogo} alt="User" className="w-10 h-10 rounded-full" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg text-black px-4 py-2 z-50">
                            <h2 className="font-medium text-center mb-2">Hi, {username}</h2>
                            <div className="flex items-center gap-2 py-1">
                                <img src={resume} alt="Profile" className="w-4 h-4" />
                                <button onClick={() => navigate("#")}>Profile</button>
                            </div>
                            <div className="flex items-center gap-2 py-1">
                                <img src={logoutIcon} alt="Logout" className="w-4 h-4" />
                                <button onClick={handleLogout} className="text-red-600">Logout</button>
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
                <div className="absolute top-[5.5rem] left-1/2 transform -translate-x-1/2 w-[90%] bg-white text-black p-4 shadow-xl rounded-xl z-40">
                    <NavLink to="/" onClick={() => scrollTosection("hero")} className="block py-2 hover:text-orange-800">Home</NavLink>
                    <NavLink onClick={() => scrollTosection("features")} className="block py-2 hover:text-orange-800">Features</NavLink>
                    <NavLink to="/dashboard" className="block py-2 hover:text-orange-800">Dashboard</NavLink>
                    <div className="border-t mt-3 pt-3 text-center">
                        <img src={userlogo} alt="user" className="w-10 h-10 mx-auto mb-2" />
                        <h2 className="text-center">Hi, {username}</h2>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <img src={resume} alt="" className="w-5 h-5" />
                            <button onClick={() => navigate("#")}>Profile</button>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <img src={logoutIcon} alt="" className="w-5 h-5" />
                            <button onClick={handleLogout} className="text-red-600">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarUser;
