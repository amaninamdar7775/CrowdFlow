import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const FAQ = () => {
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

  // FAQ items
  const faqItems = [
    {
      question: "How does your crowd management system work?",
      answer: "Our system uses advanced AI and computer vision technology to analyze video feeds in real-time. We detect crowd density, movement patterns, and potential bottlenecks without storing personally identifiable information. The platform then provides actionable insights and alerts to help venue managers make informed decisions."
    },
    {
      question: "Is my venue suitable for your technology?",
      answer: "Our solution is highly adaptable and can be implemented in various settings including stadiums, concert venues, festivals, transportation hubs, shopping malls, and corporate campuses. We can customize our approach based on your specific needs and infrastructure."
    },
    {
      question: "How accurate is your crowd density detection?",
      answer: "Our algorithm maintains a 95%+ accuracy rate across diverse environments and lighting conditions. The system is continuously learning and improving through our proprietary machine learning models that have been trained on extensive datasets."
    },
    {
      question: "Do you store video or personal data?",
      answer: "No. We prioritize privacy in our design. Our system processes video feeds in real-time without storing video footage. All analytics are anonymous and focused on crowd behavior rather than individual identification."
    },
    {
      question: "How long does implementation take?",
      answer: "Most implementations can be completed within 2-4 weeks, depending on the complexity and size of your venue. Our team handles the entire process from initial assessment to system configuration and staff training."
    },
    {
      question: "Can this integrate with our existing security systems?",
      answer: "Yes. We've designed our platform with open APIs that allow seamless integration with most existing security and management systems. Our team will work with you to ensure smooth implementation with your current infrastructure."
    }
  ];

  // State to track which FAQ is open
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <motion.header 
        className="pt-20 pb-12 md:pt-24 md:pb-16 px-4 md:px-12 lg:px-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            variants={fadeIn}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-700 px-2"
            variants={fadeIn}
          >
            Everything you need to know about our crowd management solution
          </motion.p>
        </motion.div>
      </motion.header>

      {/* FAQ Section */}
      <motion.section
        className="py-12 md:py-16 px-4 md:px-12 lg:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="mb-4 md:mb-6"
              variants={fadeIn}
            >
              <div 
                className={`bg-white rounded-lg shadow-md overflow-hidden ${activeIndex === index ? 'border-l-4 border-indigo-600' : ''}`}
              >
                <button
                  className="w-full px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-lg md:text-xl text-gray-800">{item.question}</span>
                  <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </button>
                
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 md:pb-5"
                  >
                    <p className="text-gray-700">{item.answer}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
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
            Still Have Questions?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-6 md:mb-8 px-2"
            variants={fadeIn}
          >
            Our team is ready to help you implement the perfect crowd management solution for your venue.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            variants={fadeIn}
          >
            <Link to="/contact-us">
            <button className="px-6 md:px-8 py-2 md:py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-sm md:text-base">
              Contact Support
            </button>
            </Link>
            <button className="px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-sm md:text-base mt-3 sm:mt-0">
              Schedule a Call
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default FAQ;