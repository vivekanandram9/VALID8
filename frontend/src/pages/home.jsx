import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Silk from "../components/silkbg.jsx";
import dashboardIMG from "../assets/DashboardSS.png";
import CardSwap, { Card } from "../components/cardSwap.jsx";


function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="heroSection w-full min-h-[100svh] flex flex-col md:flex-row relative overflow-hidden pt-[5.5rem] md:pt-0    text-text-main "
        id="hero"
      >
        {/* Left Side: Silk Background + Text Content */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center px-6 py-8 md:py-16 ">
          <div className="absolute inset-0 -z-10">
            <Silk
              speed={5}
              scale={1}
              color="#7B7481"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>

          <div className="z-10 text-center space-y-6">
            <motion.h1
              className="text-[#E5E5E5] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Valid<span className="text-lred">8</span> Smarter, Deploy Faster.
            </motion.h1>


            <motion.p
              className="text-[#E5E5E5] text-base sm:text-lg lg:text-xl font-medium"
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
                className="bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-3 rounded-xl shadow-glow transition hover:shadow-glow-lg relative top-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Get Started
              </motion.button>
            </Link>


          </div>
        </div>

        {/* Right Side: Dashboard Screenshot */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-black px-6 py-8 md:py-16   h-[61vh] sm:h-[25rem] md:h-auto">
          <img
            src={dashboardIMG}
            alt="Dashboard Screenshot"
            className="w-full max-w-[85%]  shadow-lg"
          />
        </div>
      </div>

      {/* Why Choose Valid8 */}
      <div className=" flex flex-col">
        <div className="text-white p-9 bg-black">
          <h1 className="font-extrabold text-2xl text-center mb-6 ">
            Why Choose Valid8?
          </h1>

          <div className="bg-[rgba(0,150,250,0.1)] backdrop-blur-xl shadow-glass border border-blue-500/20 rounded-xl p-6 max-w-4xl mx-auto">
            <ul className="space-y-3 text-text-secondary text-base md:text-lg">
              <li>✅ No setup required — Start testing instantly in your browser</li>
              <li>✅ Save and analyze test results — Perfect for debugging</li>
              <li>✅ Automated monitoring — Schedule checks with zero configuration</li>
              <li>✅ Free & open-source — Built for the developer community</li>
            </ul>
          </div>
        </div>
        <div className="text-white " style={{ height: '600px', position: 'relative' }}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card>
              <h3>Card 1</h3>
              <p>Your content here</p>
            </Card>
            <Card>
              <h3>Card 2</h3>
              <p>Your content here</p>
            </Card>
            <Card>
              <h3>Card 3</h3>
              <p>Your content here</p>
            </Card>
          </CardSwap>
        </div>
      </div>


      {/* Features Section */}
      <section className="bg-black text-white py-20 px-4" id="features">
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-900 rounded-lg text-center shadow-md">
            <h3 className="text-2xl font-semibold mb-2">API Validation</h3>
            <p className="text-base">Ensure your APIs are working correctly before deployment.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg text-center shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Error Detection</h3>
            <p className="text-base">Identify issues early and debug efficiently.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg text-center shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Seamless Integration</h3>
            <p className="text-base">Integrate with your existing workflow effortlessly.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
