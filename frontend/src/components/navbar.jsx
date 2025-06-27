import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import logo01 from '../assets/VALID8LOGO.png';
import Login from '../pages/login';


import userlogo from '../assets/userlogo.png';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [loginPageOpen, setLoginPageOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTosection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false); // close menu on mobile
    };

    const navClasses = `fixed top-0  z-50 flex items-center justify-between px-4 py-3 text-white transition-colors transition-opacity transition-shadow ease-in-out duration-500 h-[5.5rem]  ${isScrolled
            ? 'bg-[rgba(18,18,18,0.6)] backdrop-blur-xl border-b border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)] mt-5 border rounded-3xl w-[89.5%] left-[1.2rem] sm:w-[90%] sm:left-[2rem] lg:w-[80%] lg:left-[10rem]'
            : 'bg-transparent w-full'
        }`;

    return (
        <header className={navClasses}>
            {/* Logo */}

            <div className="flex items-center space-x-3">
                {isScrolled ? (<a href="/"><img src={logo01} alt="logo" className="h-16 w-auto" /></a>) : (<a href="/"><h1 className="text-2xl font-semibold">VALID<span className="text-lred">8</span></h1></a>)}
                {/*<a href="/"><img src={logo01} alt="logo" className="h-16 w-auto" /></a>
                <a href="/"><h1 className="text-2xl font-semibold">VALID<span className="text-lred">8</span></h1></a>*/}
            </div>

            {/* Hamburger for mobile */}
            <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-3xl focus:outline-none">
                ☰
            </button>

            {/* Desktop nav */}
            <ul className="hidden sm:flex space-x-6 items-center text-lg">
                <li><NavLink to="/" onClick={() => scrollTosection("hero")}>Home</NavLink></li>
                <li><NavLink onClick={() => scrollTosection("features")}>Features</NavLink></li>
                <li><NavLink to="/Signup">
                    <button className="p-1 w-20 border-2 rounded-3xl text-sm bg-black hover:border-lred">Sign-up</button>
                </NavLink></li>
                <li><NavLink to="/Login" >
                    <button className="p-1 w-20 border-2 rounded-3xl text-sm bg-black hover:border-lred">Login</button>
                </NavLink></li>
            </ul>


            {/* Mobile menu */}
            {isOpen && (
                <div className="absolute top-[5.5rem] left-1/2 transform -translate-x-1/2 w-[90%] bg-white text-black p-4 shadow-xl rounded-xl z-40">
                    <NavLink to="/" onClick={() => scrollTosection("hero")} className="block py-2 hover:text-orange-800">Home</NavLink>
                    <NavLink onClick={() => scrollTosection("features")} className="block py-2 hover:text-orange-800">Features</NavLink>
                    <NavLink to="/dashboard" className="block py-2 hover:text-orange-800">Dashboard</NavLink>
                    <NavLink to="/Signup">
                        <button className="block p-2 w-20  rounded-3xl text-sm bg-lred text-white shadow-glow">Sign-up</button>
                    </NavLink>
                    <NavLink to="/Login" >
                        <button className="block p-2  w-20  rounded-3xl text-sm  bg-lred text-white shadow-glow mt-2">Login</button>
                    </NavLink>
                    
                </div>
            )}
        </header>
    );
}

export default Navbar;
