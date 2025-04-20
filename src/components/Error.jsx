import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function NotFoundPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const peopleVariants = {
    hidden: { scale: 0 },
    visible: i => ({
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    })
  };

  // Generate people dots
  const People = () => {
    const people = Array.from({ length: 40 }, (_, i) => i);
    
    return (
      <div className="relative h-64 w-64 mx-auto">
        {people.map((i) => {
          // Create random positions for people dots
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const size = Math.max(8, Math.random() * 12);
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-80"
              style={{ 
                width: `${size}px`, 
                height: `${size}px`,
                left: `${randomX}%`, 
                top: `${randomY}%` 
              }}
              custom={i}
              variants={peopleVariants}
              initial="hidden"
              animate="visible"
            />
          );
        })}
        <motion.div 
          className="absolute rounded-full bg-red-500 w-16 h-16 top-1/2 left-1/2 -ml-8 -mt-8 flex items-center justify-center text-white font-bold"
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: ["0px 0px 0px rgba(239, 68, 68, 0.2)", "0px 0px 20px rgba(239, 68, 68, 0.6)", "0px 0px 0px rgba(239, 68, 68, 0.2)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main content with flex-grow to push footer to bottom */}
      <div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
        <motion.div 
          className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-6xl font-bold text-red-500 mb-2">404</motion.div>
          <motion.div variants={itemVariants} className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</motion.div>
          
          <motion.div variants={itemVariants} className="mb-8">
            <People />
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-gray-600 mb-6">
            Sorry, the crowd management data you're looking for seems to have wandered off. We can't locate this page in our system.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Link to="/">
              <motion.button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return to Dashboard
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}