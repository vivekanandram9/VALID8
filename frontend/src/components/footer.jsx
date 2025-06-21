import React from 'react'
import logo from "../assets/VALID8LOGO.png"
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { TextHoverEffect } from "../components/textHover.jsx";

function Footer() {
    return (
        <footer className="bg-[#161616] text-[#b1b8c2] text-center py-4">
            <div>
                <div>
                    <img src={logo} alt="valid8-logo" className='w-8 h-8' />
                </div>
                <div>
                    Developed by <span>Vivek Anand Ram</span>
                </div>
                <div>
                    <a href=""><FaTwitter /></a>
                    <a href=""><FaLinkedin /></a>
                </div>
            </div>
            <div>
                <div>
                    <a href="">View on GitHub</a>
                </div>

                <p>© {new Date().getFullYear()} VALID8. All rights reserved.</p>
                <p>Version 0.1.0</p>
            </div>
            <div className="h-[40rem] flex items-center justify-center bg-black">
                <TextHoverEffect text="VALID8" />
            </div>
        </footer>
    )
}

export default Footer
