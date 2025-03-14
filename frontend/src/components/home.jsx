import { Link } from "react-router-dom"
import { motion } from "framer-motion";

function Home() {
  return (
    <>

      {/*<div className='heroSection w-full h-screen flex  bg-[#07080A]'>
        <div className="grid-bg flex  inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:20px_20px] w-full h-screen  "> 
        <div className="left w-1/2 h-screen">
          <div className="hero-text text-[#E5E5E5] text-[6rem] font-extrabold ml-[2rem] mt-[2rem] leading-none relative top-[10rem]  ">
            <h1>Valid<span className="text-lred">8</span> Smarter, Deploy Faster.</h1>
          </div>
        </div>
        <div className="right w-1/2 h-screen">
          <div className="hero-para text-[#E5E5E5] text-[2rem] mr-[2rem] mt-[2rem] relative top-[10rem]">
            <p>Valid<span className="text-lred">8</span> helps you test and debug APIs effortlessly, ensuring reliability before deployment. Validate endpoints, catch errors early, and ship with confidence</p>
          </div>
        </div>
        </div>

        

      </div>*/}
     {/*#1A1A1A  #07080A*/}
      <div className="heroSection w-full h-screen flex  relative bg-[#080808] pt-[6.9rem]" id="hero">
        <div className="grid-bg bg-[radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:20px_20px] w-full h-screen flex">
          <div className="left w-1/2  justify-center ml-8">
            <motion.h1
              className="text-[#E5E5E5] text-[6rem] font-extrabold leading-none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Valid<span className="text-lred">8</span> Smarter, Deploy Faster.
            </motion.h1>
            <motion.button
              className="mt-6 px-6 py-3 bg-[#F91515] text-white text-lg rounded-3xl hover:bg-[#e8081a]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Get Started
            </motion.button>
          </div>
          <div className="right w-1/2 flex items-center">
            <motion.p
              className="text-[#E5E5E5] text-[2rem]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Valid<span className="text-lred">8</span> helps you test and debug APIs effortlessly, ensuring reliability before deployment. Validate endpoints, catch errors early, and ship with confidence.
            </motion.p>
          </div>

        </div>

      </div>

      {/* Features Section */}
      <section className="bg-black text-white py-20" id="features">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <h3 className="text-2xl font-semibold mb-2">API Validation</h3>
            <p>Ensure your APIs are working correctly before deployment.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <h3 className="text-2xl font-semibold mb-2">Error Detection</h3>
            <p>Identify issues early and debug efficiently.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg text-center">
            <h3 className="text-2xl font-semibold mb-2">Seamless Integration</h3>
            <p>Integrate with your existing workflow effortlessly.</p>
          </div>
        </div>
      </section>
    </>

  )
}

export default Home
