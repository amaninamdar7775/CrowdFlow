import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('railway');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 'railway', label: 'Railway Stations', icon: '🚆', to: '/stations/railway' },
    { id: 'metro', label: 'Metro Stations', icon: '🚇', to: '/stations/metro' },
    { id: 'bus', label: 'Bus Stations', icon: '🚌', to: '/stations/bus' },
    { id: 'mall', label: 'Shopping Malls', icon: '🏬', to: '/malls' },
  ];

  useEffect(() => {
    const handleLocationChange = () => {
      const currentPath = location.pathname;
      const activeItem = navItems.find(item => currentPath.includes(item.to));
      if (activeItem) {
        setActiveTab(activeItem.id);
      }
    };

    handleLocationChange();
  }, [location, navItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-purple-900 to-indigo-800 shadow-xl backdrop-blur-sm bg-opacity-90' 
          : 'bg-gradient-to-r from-purple-800 to-indigo-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-bold text-xl flex items-center"
              >
                <Link to="/" className="flex items-center">
                  <span className="text-3xl mr-3 bg-white bg-opacity-20 p-2 rounded-full">👥</span>
                  <div className="flex flex-col">
                    <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-purple-200">CrowdFlow</span>
                    <span className="text-xs text-indigo-200 font-light">Real-time Crowd Management</span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    onClick={() => handleNavigation(item)}
                  >
                    <motion.div
                      whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      whileTap={{ y: 0 }}
                      className={`relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                        activeTab === item.id
                          ? 'text-white bg-white bg-opacity-10'
                          : 'text-indigo-100 hover:text-white'
                      }`}
                      aria-current={activeTab === item.id ? 'page' : undefined}
                    >
                      <span className="text-xl mr-2">{item.icon}</span>
                      <span>{item.label}</span>
                      {activeTab === item.id && (
                        <motion.div
                          className="absolute -bottom-1 left-3 right-3 h-1 bg-gradient-to-r from-teal-300 to-purple-400 rounded-md"
                          layoutId="navunderline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
                <hr />
                <Link to="/live-status">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`ml-6 px-4 py-2 bg-gradient-to-r from-teal-400 to-indigo-400 text-white rounded-lg font-medium text-sm shadow-lg ${
                      location.pathname === '/live-status' ? 'ring-2 ring-white ring-opacity-50' : ''
                    }`}
                    onClick={() => setActiveTab('')}
                  >
                    Live Status
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 bg-indigo-700 bg-opacity-30 hover:bg-indigo-600 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-2 pt-2 pb-4 space-y-2 bg-gradient-to-b from-indigo-800 to-purple-900 backdrop-blur-sm">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                onClick={() => handleNavigation(item)}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${
                    activeTab === item.id 
                      ? 'bg-white bg-opacity-10 border-l-4 border-teal-300' 
                      : 'text-indigo-100 border-l-4 border-transparent'
                  } block px-4 py-3 rounded-r-lg text-base font-medium flex items-center`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  {item.label}
                </motion.div>
              </Link>
            ))}
            <Link to="/live-status">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`w-full mt-3 px-4 py-3 bg-gradient-to-r from-teal-400 to-indigo-400 text-white rounded-lg font-medium text-base shadow-md flex justify-center ${
                  location.pathname === '/live-status' ? 'ring-2 ring-white ring-opacity-50' : ''
                }`}
                onClick={() => {
                  setActiveTab('');
                  setIsOpen(false);
                }}
              >
                Live Status
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </nav>
      
      {/* Transparent spacer that matches navbar height */}
      <div className="h-20"></div>
    </>
  );
}