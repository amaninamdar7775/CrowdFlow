import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const tabVariants = {
    inactive: { color: "#9ca3af", fontWeight: "normal" },
    active: { 
      color: "#ffffff", 
      fontWeight: "bold",
      transition: { duration: 0.3 } 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white text-center relative overflow-hidden bg-gradient-to-br from-gray-900 to-black px-4 py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        
        {/* Decorative circles */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 rounded-full bg-purple-600 filter blur-3xl opacity-20"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-48 md:w-96 h-48 md:h-96 rounded-full bg-blue-600 filter blur-3xl opacity-10"
          animate={{ 
            x: [0, -70, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/3 w-36 md:w-72 h-36 md:h-72 rounded-full bg-yellow-600 filter blur-3xl opacity-10"
          animate={{ 
            x: [0, 40, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-30"></div>
      
      {/* Card container */}
      <motion.div 
        className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 w-full max-w-md relative z-10 shadow-2xl border border-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          {activeTab === "login" ? "Welcome Back" : "Join Us"}
        </motion.h2>
        
        {/* Tabs */}
        <motion.div 
          className="flex justify-center mb-6 sm:mb-8 gap-4 sm:gap-8"
          variants={itemVariants}
        >
          <motion.button
            className={`py-2 px-4 sm:px-6 text-base sm:text-lg border-b-2 ${activeTab === "login" ? "border-yellow-500" : "border-transparent"}`}
            variants={tabVariants}
            animate={activeTab === "login" ? "active" : "inactive"}
            onClick={() => setActiveTab("login")}
            whileHover={{ y: -2 }}
          >
            Login
          </motion.button>
          <motion.button
            className={`py-2 px-4 sm:px-6 text-base sm:text-lg border-b-2 ${activeTab === "signup" ? "border-purple-500" : "border-transparent"}`}
            variants={tabVariants}
            animate={activeTab === "signup" ? "active" : "inactive"}
            onClick={() => setActiveTab("signup")}
            whileHover={{ y: -2 }}
          >
            Sign Up
          </motion.button>
        </motion.div>
        
        {/* Login Form */}
        {activeTab === "login" && (
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-left">
                <label htmlFor="email" className="block mb-2 text-gray-300 text-sm">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mb-4 text-left">
                <label htmlFor="password" className="block mb-2 text-gray-300 text-sm">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="w-4 h-4 accent-yellow-600" />
                  <label htmlFor="remember" className="ml-2 text-xs sm:text-sm text-gray-300">Remember me</label>
                </div>
                <a href="#" className="text-xs sm:text-sm text-yellow-500 hover:text-yellow-400">Forgot password?</a>
              </div>
              <motion.button
                type="submit"
                className="w-full py-2 sm:py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.02, brightness: 1.1 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Signup Form */}
        {activeTab === "signup" && (
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-left">
                <label htmlFor="new-name" className="block mb-2 text-gray-300 text-sm">Full Name</label>
                <input
                  type="text"
                  id="new-name"
                  className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4 text-left">
                <label htmlFor="new-email" className="block mb-2 text-gray-300 text-sm">Email Address</label>
                <input
                  type="email"
                  id="new-email"
                  className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mb-4 text-left">
                <label htmlFor="new-password" className="block mb-2 text-gray-300 text-sm">Password</label>
                <input
                  type="password"
                  id="new-password"
                  className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
              <div className="mb-6 text-left flex items-center">
                <input id="terms" type="checkbox" className="w-4 h-4 accent-purple-600" />
                <label htmlFor="terms" className="ml-2 text-xs sm:text-sm text-gray-300">
                  I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
                </label>
              </div>
              <motion.button
                type="submit"
                className="w-full py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.02, brightness: 1.1 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
              </motion.button>
            </form>
          </motion.div>
        )}
        
        {/* Social login options */}
        <motion.div 
          className="mt-6 sm:mt-8 pt-6 border-t border-gray-700"
          variants={itemVariants}
        >
          <p className="text-gray-400 mb-4 text-sm">Or continue with</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <motion.button 
              className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-red-500">G</span>
              <span>Google</span>
            </motion.button>
            <motion.button 
              className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-blue-600">f</span>
              <span>Facebook</span>
            </motion.button>
            <motion.button 
              className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white">#</span>
              <span>GitHub</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}