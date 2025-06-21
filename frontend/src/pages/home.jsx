import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dashboardIMG from "../assets/DashboardSS.png";
import { HoverEffect } from "../components/card-hover.jsx";
import SpotlightCard from "../components/spotlightCard.jsx";
import { Spotlight } from "../components/spotlight-bg.jsx";

const items = [
  {
    title: "Test or Monitor",
    description: "Run quick tests or set up recurring monitors to catch issues proactively.",
    image: (
    <motion.svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    className="size-24"
    animate={{ 
      rotate:90,
      scale: [1,1.4,1],
      roate:91

      }}
  transition={{ duration: 2, repeat: Infinity }}>
    <motion.path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </motion.svg>)


  },
  {
    title: "Instant Alerts",
    description: "Get notified the second something breaks.",
    image: (
      <motion.svg 
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
      animate={{ 
      skewXx:2,
      scale: [1,1.4,1],

      }}
  transition={{ duration: 2, repeat: Infinity }}
      >
      <motion.path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3 " />
      <motion.path d="M12 9v4" />
      <motion.path d="M12 17h.01" /></motion.svg>
    )

  },
  {
    title: "Visual Dashboard",
    description: "Access uptime graphs, response logs, and test history in one place.",
    image: (
      <motion.svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="size-24"
  initial="rest"
  whileHover="hover"
  
  animate="rest"
>
  <motion.path
    strokeLinecap="round"
    strokeLinejoin="round"
    stroke="text-lred"
    d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    
  />
  <motion.path
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-lyellow"
    d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
     animate={{ 
      skewXx:2,
      scale: [1,1.4,1],

      }}
  transition={{ duration: 2, repeat: Infinity }}
    
  />
</motion.svg>


    )

  },
  {
    title: "Quick Setup",
    description: "Paste your API, set a schedule, and you're done under 2 minutes.",
    image: (
      <motion.svg 
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
      <motion.path 
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <motion.path 
      d="m9 14 2 2 4-4"
      animate={{
        rotate:20,
      }}
      transition={{
        duaration:2,
        repeat:Infinity,
        ease: "easeInOut"
      }}/>
      </motion.svg>

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
        {/* Background Image */}
        {/* <img
          src={dashboardIMG}
          alt="Dashboard Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        />*/}

        {/* Dark gradient overlay for readability */}
        {/*<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm z-10" />*/}

        {/* Optional: Add a grain texture on top */}
        {/* You can create a subtle grain PNG or use a CSS grain pattern */}

        {/* Hero Content */}
        <div className="z-20 space-y-6 max-w-3xl ">
          <motion.h1
            className="text-4xl sm:text-7xl lg:whitespace-nowrap lg:right-[7rem] font-bold leading-tight relative "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Valid<span className="text-lred">8</span> Smarter, Deploy Faster.
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg lg:text-xl font-medium text-textSecondary mt-[2rem]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Valid<span className="text-lred">8</span> helps you test and debug APIs
            effortlessly. Validate endpoints, catch errors early, and ship with
            confidence.
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


        {/*<div className="p-9 w-full">
          <h1 className="font-extrabold text-2xl text-center mb-6">
            Why Choose Valid8?
          </h1>

          <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-glow max-w-4xl mx-auto">
            <ul className="space-y-3 text-text-secondary text-base md:text-lg">
              <li>✅ No setup required — Start testing instantly in your browser</li>
              <li>✅ Save and analyze test results — Perfect for debugging</li>
              <li>✅ Automated monitoring — Schedule checks with zero configuration</li>
              <li>✅ Free & open-source — Built for the developer community</li>
            </ul>
          </div>
        </div>*/}
        <div className="bg-background py-16 px-6 md:px-12 ">
          <div className="mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Why Developers Choose <span className="text-lred">VALID8</span>
            </h2>
            <HoverEffect items={items} />


          </div>
        </div>

      </div>





      {/* Features Section */}
      <section className="bg-background text-white py-20 px-4" id="features">
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {Array.from({ length: 9 }).map((_, i) => (
            <SpotlightCard
              key={i}
              className="custom-spotlight-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
