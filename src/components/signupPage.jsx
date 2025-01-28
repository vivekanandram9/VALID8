import React from 'react'
//import logo from './src/assets/logo01.png';

function Signup() {
  return (
    <>
    
     <div  className="mainContainer w-screen h-screen bg-black flex  justify-center overflow-hidden">
        <div className="signup-container  bg-black w-[30rem] h-[35rem] border-solid border border-lred rounded-2xl border-[4px] relative mt-20">
          <div className="logo mb-4 w-24 h-24 flex justify-center items-center relative left-[11.5rem] top-[2rem]">
            <img className='w-full h-ful object-contain' src="./src/assets/logo01.png" alt="" />
          </div>
          <form className=' relative top-[5rem]' action="submit  ">
            <div className="inputContainer flex flex-col">
              <input className='m-4 p-2 border border-lred bg-black text-lred rounded-xl' type="text" placeholder='Enter your Email ID'/>
              <input className='m-4 p-2 border border-lred bg-black text-lred rounded-xl' type="text" placeholder='Password'/>

            </div>
            <div className="submitButton relative left-[12rem] top-[3rem] ">
              <button className='border-solid  border w-[6rem] h-[2.5rem] rounded-xl border-lred text-white border-2  '>Signup</button>
            </div>
            
          </form>
        </div>
     </div>    
    </>
  )
}

export default Signup
