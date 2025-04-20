import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <motion.header 
        className="pt-20 pb-16 md:pt-24 md:pb-20 px-4 md:px-12 lg:px-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            variants={fadeIn}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-700 px-2"
            variants={fadeIn}
          >
            Have questions about our crowd management solutions? We're here to help.
          </motion.p>
        </motion.div>
      </motion.header>

      {/* Contact Information Section */}
      <motion.section
        className="py-8 md:py-12 px-4 md:px-12 lg:px-24 bg-white"
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
            Our Contact Information
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <motion.div 
              className="bg-blue-50 rounded-lg p-4 md:p-6 shadow-lg flex flex-col items-center"
              variants={fadeIn}
            >
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Phone</h3>
              <p className="text-gray-700 text-center">+91 20 1234 5678</p>
              <p className="text-gray-700 text-center">Mon-Fri, 9:00 AM - 6:00 PM</p>
            </motion.div>
            
            <motion.div 
              className="bg-indigo-50 rounded-lg p-4 md:p-6 shadow-lg flex flex-col items-center"
              variants={fadeIn}
            >
              <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Email</h3>
              <p className="text-gray-700 text-center">info@crowdmanagement.com</p>
              <p className="text-gray-700 text-center">support@crowdmanagement.com</p>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 rounded-lg p-4 md:p-6 shadow-lg flex flex-col items-center"
              variants={fadeIn}
            >
              <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-800">Location</h3>
              <p className="text-gray-700 text-center">MIT Art Design & Technology University</p>
              <p className="text-gray-700 text-center">Pune, Maharashtra, India</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-12 md:py-16 px-4 md:px-12 lg:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 md:p-8">
              <motion.h3 
                className="text-2xl font-bold mb-4"
                variants={fadeIn}
              >
                Send Us a Message
              </motion.h3>
              <motion.p 
                className="mb-6 text-blue-100"
                variants={fadeIn}
              >
                We're eager to hear from you! Fill out the form and our team will get back to you as soon as possible.
              </motion.p>
              <motion.div 
                className="space-y-4 mt-8"
                variants={fadeIn}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Quick response time</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure communications</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Expert technical support</span>
                </div>
              </motion.div>
            </div>
            <div className="md:w-3/5 p-6 md:p-8">
              {formStatus.submitted ? (
                <motion.div 
                  className="h-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-center">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll be in touch shortly.</p>
                    <button 
                      className="mt-6 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                      onClick={() => setFormStatus({ submitted: false, error: false })}
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeIn}>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeIn}>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeIn}>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={fadeIn}>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    ></textarea>
                  </motion.div>
                  
                  <motion.div variants={fadeIn}>
                    <button 
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg"
                    >
                      Send Message
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 text-center text-indigo-700"
            variants={fadeIn}
          >
            Find Us
          </motion.h2>
          
          <motion.div 
            className="h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg"
            variants={fadeIn}
          >
            {/* This is a placeholder for the map. In a real application, you would integrate with Google Maps or another mapping service */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-600 font-medium">Interactive Map Would Be Displayed Here</p>
            </div>
          </motion.div>
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
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-6 md:mb-8 px-2"
            variants={fadeIn}
          >
            Schedule a free demo to see how our crowd management solution can transform your venue or event.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            variants={fadeIn}
          >
            <button className="px-6 md:px-8 py-2 md:py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-sm md:text-base">
              Schedule Demo
            </button>
            <button className="px-6 md:px-8 py-2 md:py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-sm md:text-base mt-3 sm:mt-0">
              View Pricing
            </button>
          </motion.div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default ContactUs;