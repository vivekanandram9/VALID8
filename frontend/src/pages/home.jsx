import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dashboardIMG from "../assets/DashboardSS.png";
import { HoverEffect } from "../components/card-hover.jsx";

import { Spotlight } from "../components/spotlight-bg.jsx";
import logo01 from '../assets/VALID8LOGO.png';
import ShinyText from "../components/shinytext.jsx";
import { BackgroundGradient } from "../components/backgroundgradient.jsx";



const items = [
  {
    title: "Test or Monitor",
    description: "Run quick tests or set up recurring monitors to catch issues proactively.",
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-24"
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>)


  },
  {
    title: "Instant Alerts",
    description: "Get notified the second something breaks.",
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-triangle-alert-icon lucide-triangle-alert size-24"
       
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3 " />
        <path className="text-lred" d="M12 9v4" />
        <path className="text-lred" d="M12 17h.01" /></svg>
    )

  },
  {
    title: "Visual Dashboard",
    description: "Access uptime graphs, response logs, and test history in one place.",
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-24"
        
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="text-lred"
          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"

        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-lyellow"
          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
          
        />
      </svg>


    )

  },
  {
    title: "Quick Setup",
    description: "Paste your API, set a schedule, and you're done under 2 minutes.",
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-clipboard-check-icon lucide-clipboard-check size-24">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path
          d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path
          d="m9 14 2 2 4-4"
          />
      </svg>

    )

  },

];

function Home() {

  return (
    <>
      {/* Hero Section with Screenshot Background */}
      <div
        className="relative w-full h-[100vh] flex items-center justify-center text-center px-6 bg-background text-foreground overflow-hidden "
        id="hero"
      >
        <Spotlight />


        {/* Hero Content */}
        <div className="z-20 space-y-6 max-w-3xl ">
          <span className="inline-flex items-center gap-2 text-xs bg-black text-foreground px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-700"></span>
            </span>
            Instant API Testing
          </span>


          <motion.h1
            className="text-4xl sm:text-7xl lg:whitespace-nowrap lg:right-[4.5rem] font-bold leading-tight relative lg:text-6xl "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Valid<span className="text-lred">8</span>: Test Smarter, Ship Faster.
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg lg:text-xl font-medium text-textSecondary mt-[2rem]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Instantly test, validate, and monitor your APIs without the setup.
            Catch errors before production and ship with confidence.
          </motion.p>

          <Link to="/Signup">
            <motion.button
              className="bg-gradient-to-r from-primary to-primary-hover text-white text-lg font-bold px-6 py-3 rounded-xl shadow-glow transition hover:shadow-glow-lg bg-lred mt-[2rem]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>


      {/* Why Choose Valid8 */}
      <div className=" bg-background text-foreground ">



        <div className="bg-background py-16 px-6 md:px-12 ">
          <div className="mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 xl:text-5xl">
              Why  Choose <span className="text-lred">VALID8</span> ?
            </h2>
            <HoverEffect items={items} />


          </div>
        </div>

      </div>





      {/* Features Section */}
      <section className="bg-background text-foreground py-10 px-4 " id="features">
        <div className="flex justify-center font-bold text-4xl sm:text-3xl lg:mb-12 lg:text-4xl xl:text-5xl ">
          <h1>How to Use</h1>
        </div>

        <div className="flex flex-col lg:flex-row bg-transparent p-2 sm:p-3 lg:p-4 xl:px-12 xl:mt-28">
          <div className="flex flex-col relative lg:top-2 xl:w-[50%]">
            <h1 className="font-medium text-xl mt-5 text-lyellow">Getting Started</h1>
            <h2 className="mt-6 mb-6 font-bold text-4xl lg:text-5xl xl:text-6xl">Login to VALID8</h2>
            <p className="text-xl mb-6 max-w-2xl text-textSecondary xl:text-3xl">Log in or sign up it’s quick and simple. Get access to your dashboard in seconds.</p>
            <Link to="/Signup">
              <motion.button
                className="bg-gradient-to-r from-primary to-primary-hover text-white text-lg font-bold px-6 py-3 rounded-xl shadow-glow transition hover:shadow-glow-lg bg-lred mb-4 sm:mb-7"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Dashboard
              </motion.button>
            </Link>
          </div>
          <div className="flex flex-col bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a]  border-0 rounded-2xl items-center relative left-2  w-[96%]  md:w-[80%] md:left-24 sm:h-[25rem] md:h-[30rem] backdrop-blur-sm gap-4 lg:left-0 xl:w-[50%]">
            <div className="w-32 h-32 sm:mt-8 md:mt-9">
              <img src={logo01} alt="vali8-logo" />
            </div>
            <div className="w-full flex justify-center flex-col items-center text-warp">
              <p className=" text-center sm:text-3xl md:text-3xl font-bold text-wrap max-w-md mt-3 mb-3 text-textSecondary ">
                Fast, reliable API testing no setup required.
              </p>
              <p className="text-textSecondary text-center sm:text-xl md:text-2xl font-semibold text-wrap max-w-md mt-3 mb-3 ">
                Don’t have an account? It takes 10 seconds.
              </p>
              <span className="inline-flex items-center gap-2 text-xs bg-black text-foreground px-3 py-1 rounded-full font-semibold tracking-wider uppercase mb-4 ">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-700"></span>
                </span>
                Login to VALID8
              </span>
            </div>


          </div>

        </div>
        <div className="flex flex-col lg:flex-row mt-6 mb-4 sm:p-3 lg:p-4 xl:px-12 xl:mt-28 ">
          <div className="lg:hidden">
            <h1 className="font-medium text-xl text-purple-400">Dashboard Access</h1>
            <h2 className="mt-6 mb-6 font-bold text-4xl text-wrap lg:text-5xl xl:text-6xl">Test & Monitor APIs</h2>
            <p className="text-xl mb-6 max-w-2xl text-textSecondary">Enter your API, choose a method, and hit Send. Monitor or save with one click.</p>
          </div>
          <div className="scrennshotdiv lg:w-[50%]  mt-8 mb-8 ">
            <BackgroundGradient className="rounded-[20px]  p-3 sm:p-5 lg:p-3  bg-white dark:bg-zinc-900 w-[100%]">
              <img className="border-0 rounded-xl w-[100%] sm:w-[100%]" src={dashboardIMG} alt="" />
            </BackgroundGradient>

          </div>
          <div className="hidden lg:block lg:w-[40%] lg:relative lg:left-9 lg:top-7 xl:left-28 xl:top-20">
            <h1 className="font-medium text-xl text-purple-400">Dashboard Access</h1>
            <h2 className="mt-6 mb-6 font-bold text-4xl text-wrap lg:text-5xl xl:text-6xl">Test & Monitor APIs</h2>
            <p className="text-xl mb-6 max-w-2xl text-textSecondary xl:text-3xl">Enter your API, choose a method, and hit Send. Monitor or save with one click.</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-6 mb-4 sm:p-3 xl:px-12 xl:mt-28 xl:mb-28">
          <div className="xl:w-[50%]">
            <h1 className="font-medium text-xl text-green-400">You're All Set</h1>
            <h2 className="mt-6 mb-6 font-bold text-4xl text-wrap lg:text-5xl xl:text-6xl"> Smooth and Successful</h2>
            <p className="text-xl mb-6 max-w-2xl text-textSecondary xl:text-3xl">Your API's good to go. VALID8 keeps things fast, clean, and efficient.</p>

          </div>
          <div className="bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a] 
 w-full h-48 sm:h-60 flex items-center justify-center mt-4 border-0 rounded-3xl xl:w-[50%]">
            <h1><ShinyText text="200 OK" disabled={false} speed={3} className='text-6xl sm:text-9xl font-extrabold  ' /></h1>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
