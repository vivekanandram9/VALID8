import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dashboardIMG from "../assets/DashboardSS.png";
import CardSwap, { Card } from "../components/cardSwap.jsx";
import SpotlightCard from "../components/spotlightCard.jsx";

function Home() {
  return (
    <>
      {/* Hero Section with Screenshot Background */}
      <div
        className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center text-center px-6 bg-background text-foreground overflow-hidden"
        id="hero"
      >
        {/* Background Image */}
        <img
          src={dashboardIMG}
          alt="Dashboard Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        />

        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm z-10" />

        {/* Optional: Add a grain texture on top */}
        {/* You can create a subtle grain PNG or use a CSS grain pattern */}

        {/* Hero Content */}
        <div className="z-20 space-y-6 max-w-3xl">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Valid<span className="text-lred">8</span> Smarter, Deploy Faster.
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg lg:text-xl font-medium text-textSecondary"
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
              className="bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-3 rounded-xl shadow-glow transition hover:shadow-glow-lg bg-lred"
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
      <div className="flex flex-col lg:flex-row bg-background text-foreground">
        <div className="p-9 w-full">
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
        </div>

        <div className="text-white w-full lg:w-[50%] p-8 relative h-[600px]">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={true}
          >
            <Card>
              <h2>Instant Alerts</h2>
              <h3>Catch failures before your users do.</h3>
              <p>VALID8 watches your APIs 24/7. If something breaks, you're the first to know.</p>
            </Card>
            <Card>
              <h2>Zero Config Monitoring</h2>
              <h3>Set it once. We'll test it forever.</h3>
              <p>Paste your API, choose a frequency, and VALID8 handles the rest — even while you sleep.</p>
            </Card>
            <Card>
              <h2>API Health Insights</h2>
              <h3>No more blind spots.</h3>
              <p>Track uptime, failure rates, and performance trends — all in one place.</p>
            </Card>
          </CardSwap>
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
