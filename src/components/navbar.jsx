
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <main>
            <div className="navContainer flex  justify-between bg-black p-4 text-xl text-white ">
                
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
                        <NavLink to="/Signup">
                         Get Started
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Login">
                           <button className='p-1 w-[4rem]  border rounded-xl text-sm bg-white  text-lred hover:p-2' type='button'>Login</button>
                        </NavLink>
                        
                    </li>
                </ul>
            </div>
        </main>    
    </>
  )
}

export default Navbar
