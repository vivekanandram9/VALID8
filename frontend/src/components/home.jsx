import { Link } from "react-router-dom"

function Home() {
  return (
    <>
     
     <div className='heroSection w-full h-max flex'>
        <div className="left w-1/2 h-screen bg-pink-400">
            <div className="herotext text-xl text-white  text-center  pt-28 ">
                <h1 className='text-left pl-5 pr-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam earum sequi</h1>     
            </div>
            <button className='p-2 text-white relative bg-amber-400 ml-5 mt-5 rounded-xl '>
                <Link to="/signup"> 
                Get Started
                </Link>
              </button>     
        </div>
        <div className="right w-1/2 bg-white h-96">
            <div className="heroimage ">
               <img className='h-96 relative left-36' src="./src/assets/api.jpg" alt="" /> 
            </div>       
        </div>
       
     </div>
    </>
   
  )
}

export default Home
