import React from "react";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signupPage";

import {Outlet} from 'react-router-dom'

function Layout(){
    return (
        <>
        <Navbar></Navbar>
        <main>
            <Outlet></Outlet>
        </main>
        
        </>
    )
}

export default Layout;