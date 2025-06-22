import React from 'react'
import logo from "../assets/VALID8LOGO.png"
import { TextHoverEffect } from "../components/textHover.jsx";

function Footer() {
    return (
        <footer className="bg-black text-[#b1b8c2] py-6">
            <div className="container mx-auto px-4 flex flex-col items-center space-y-6">
                
                {/* Logo */}
                <img className="w-24 h-24 object-contain" src={logo} alt="valid8-logo" />

                {/* Created by line */}
                <p className="flex items-center gap-2 text-sm text-center flex-wrap justify-center">
                    Created with
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-lred" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    by <a className="text-lred underline" href="https://www.linkedin.com/in/vivek-anand-ram-2a160a1ba/" target="_blank" rel="noopener noreferrer">this guy</a>
                </p>

                {/* Social Media Icons */}
                <div className="flex space-x-6">
                    {/* X (Twitter) */}
                    <a href="https://x.com/yourhandle" target="_blank" rel="noopener noreferrer">
                        <svg className="w-6 h-6 fill-current text-white  transition" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <title>X</title>
                            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
                        <svg className='w-6 h-6 fill-current text-white' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-xs text-center">© {new Date().getFullYear()} VALID8. All rights reserved.</p>
            </div>

            {/* Hover Effect Title */}
            <div className=" flex items-center justify-center bg-black">
                <TextHoverEffect className="h-[10rem]" text="VALID8" />
            </div>
        </footer>
    )
}

export default Footer
