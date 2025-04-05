
import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';
import logout from '../assets/logout.png';

const NavbarUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // Notify components about logout
    navigate("/Login");
  }
  const scrollTosection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth"});
  };
  
  return (
    <>
        <main>
            <div className="navContainer flex  justify-between bg-black p-4 text-xl text-white  fixed top-0 w-full z-50">
                
                <div className="logo flex  items-center space-x-4 ">
                    
                    <div className="logoImg">
                        <a href="/"><img className='h-20 w-16' src="./src/assets/logo01.png" alt="" /></a>
                    </div>
                    <div className="logoText">
                        <a href="/"><h1>VALID<span className="text-lred">8</span></h1></a>
                    </div>
                
                
                </div>
               
               
                <ul className='flex items-center space-x-5'>
                    
                    {/*<li>
                        <NavLink to="/Dashboard">
                            Dashboard
                        </NavLink>
                    </li>*/}
                    <li>
                        <NavLink to="/" onClick={() => scrollTosection("hero")}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => scrollTosection("features")}>
                            Features
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>   
                        <div className="userSection ">
                            <div className="userDP w-[4rem] h-[4rem]  relative">
                                <button onClick={() => setIsOpen(!isOpen)}>
                                <img src="./src/assets/userlogo.png" alt="" />
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg text-black px-4">
                                        <div className="userimg">
                                        <img src="./src/assets/userlogo.png" alt="" />
                                        </div>
                                        <div className="greetUser"><h2>Hi, user</h2></div>
                                        <div className='flex w-[2rem] p-1'>
                                            <img src="./src/assets/resume.png" alt="" />
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
                        </div>
                    </li>
                  
                   
                </ul>
            </div>
        </main>    
    </>
  );
};

export default NavbarUser
