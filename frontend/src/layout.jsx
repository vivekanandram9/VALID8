import React, {useState, useEffect } from "react";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import NavbarUser from "./components/navbarAfterLogin"


import {Outlet} from 'react-router-dom'


function Layout(){
    /*const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = document.cookie.includes("authToken") || localStorage.getItem("authToken");
        setIsAuthenticated(token);
    }, []);*/
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token); // update stae when token changes
        };
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth); // cleanup listner
        };
    }, []);
    return (
        <>
        {isAuthenticated ? <NavbarUser setIsAuthenticated={setIsAuthenticated}/> : <Navbar/>}
        <main>
            <Outlet></Outlet>
        </main>
        
        </>
    )
}

export default Layout;