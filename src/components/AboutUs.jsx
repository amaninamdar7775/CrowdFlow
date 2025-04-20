import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Male from '../assets/male.jpg';
import Female from '../assets/female.png';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const teamMembers = [
    {
      name: "Prof. Sushant Shirbhate",
      role: "Project Guide",
      bio: "Department of Computer Science Engineering",
      image: Male
    },
    {
      name: "Aman Inamdar",
      role: "ADT23SOCB0112",
      bio: "Student at MIT Art Design & Technology University",
      image: Male
    },
    {
      name: "Saniya Tamboli",
      role: "ADT23SOCB0975",
      bio: "Student at MIT Art Design & Technology University",
      image: Female
    },
    {
      name: "Shweta Kalbhor",
      role: "ADT23SOCB1114",
      bio: "Student at MIT Art Design & Technology University",
      image: Female
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <Navbar />
      {/* Hero Section */}
      <motion.header 
        className="pt-20 pb-20 md:pt-24 md:pb-32 px-4 md:px-12 lg:px-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            variants={fadeIn}
          >
            Redefining Crowd Management
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-700 px-2"
            variants={fadeIn}
          >
            Empowering venues and events with real-time analytics for safer, smarter crowd flow.
          </motion.p>
        </motion.div>
      </motion.header>

      {/* Mission Section */}
      <motion.section
        className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-indigo-700"
            variants={fadeIn}
          >
            Our Mission
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <motion.div 
              className="bg-blue-50 rounded-lg p-4 md:p-6 shadow-lg"
              variants={fadeIn}
            >
              <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-600 rounded-full flex items-center justify-center mb-3 md:mb-4 text-white font-bold text-lg md:text-xl">1</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-blue-800">Safety First</h3>
              <p className="text-gray-700 text-sm md:text-base">Our technology prevents dangerous crowding situations before they occur, with predictive alerts and real-time monitoring.</p>
            </motion.div>
            
            <motion.div 
              className="bg-indigo-50 rounded-lg p-4 md:p-6 shadow-lg"
              variants={fadeIn}
            >
              <div className="h-10 w-10 md:h-12 md:w-12 bg-indigo-600 rounded-full flex items-center justify-center mb-3 md:mb-4 text-white font-bold text-lg md:text-xl">2</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-indigo-800">Data-Driven Decisions</h3>
              <p className="text-gray-700 text-sm md:text-base">Transform complex crowd behaviors into actionable insights that improve event management and venue design.</p>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 rounded-lg p-4 md:p-6 shadow-lg sm:col-span-2 md:col-span-1"
              variants={fadeIn}
            >
              <div className="h-10 w-10 md:h-12 md:w-12 bg-purple-600 rounded-full flex items-center justify-center mb-3 md:mb-4 text-white font-bold text-lg md:text-xl">3</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-purple-800">Enhanced Experiences</h3>
              <p className="text-gray-700 text-sm md:text-base">By optimizing flows and reducing bottlenecks, we help create more enjoyable experiences for attendees.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Technology Section */}
      <motion.section
        className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-gradient-to-r from-indigo-900 to-blue-900 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center"
            variants={fadeIn}
          >
            Our Technology
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            <motion.div 
              className="w-full md:w-1/2"
              variants={fadeIn}
            >
              <div className="bg-indigo-800 p-4 md:p-6 rounded-xl shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-300">Advanced AI & Computer Vision</h3>
                <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-300">✓</span>
                    <span>Accurate crowd density mapping across diverse environments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-300">✓</span>
                    <span>Real-time movement pattern analysis and prediction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-300">✓</span>
                    <span>Privacy-first approach with anonymous data processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-300">✓</span>
                    <span>Robust API integration with existing security systems</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-indigo-700"
            variants={fadeIn}
          >
            Our Team
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg"
                variants={fadeIn}
              >
                <div className="p-4 md:p-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-center">{member.name}</h3>
                  <p className="text-blue-600 mb-2 md:mb-4 text-center text-sm md:text-base">{member.role}</p>
                  <p className="text-gray-700 text-center text-sm md:text-base">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4 md:mb-6"
            variants={fadeIn}
          >
            Ready to Transform Your Crowd Management?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-6 md:mb-8 px-2"
            variants={fadeIn}
          >
            Join leading venues and event organizers who are already using our platform to create safer, more efficient spaces.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            variants={fadeIn}
          >
            <button className="px-6 md:px-8 py-2 md:py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-sm md:text-base">
              Request Demo
            </button>
            <Link to="/contact-us">
            <button className="px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-sm md:text-base mt-3 sm:mt-0">
              Contact Sales
            </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default AboutUs;