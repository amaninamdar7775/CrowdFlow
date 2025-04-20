import React from 'react';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.8
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const linkItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      x: 5,
      transition: { type: "spring", stiffness: 300 }
    }
  };
  
  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { 
      scale: 1.1, 
      backgroundColor: "#2563eb",
      color: "#ffffff"
    }
  };
  
  const underlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "50%", 
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3 }
    }
  };
  
  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <motion.h3 
                className="text-2xl font-bold mb-4 text-white relative inline-block"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                CrowdFlow
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
                  variants={underlineVariants}
                ></motion.span>
              </motion.h3>
            </div>
            <motion.p 
              className="mb-6 text-gray-400 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Smart crowd management solutions for transportation hubs and commercial spaces.
              Enhancing safety, efficiency, and visitor experience through real-time monitoring.
            </motion.p>
          </motion .div>

          {/* Solutions */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold mb-6 text-white relative inline-block"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Solutions
              <motion.span 
                className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
                variants={underlineVariants}
              ></motion.span>
            </motion.h3>
            <motion.ul 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { text: "Railway Stations", link: "/stations/railway" },
                { text: "Metro Stations", link: "/stations/metro" },
                { text: "Bus Stations", link: "/stations/bus" },
                { text: "Shopping Malls", link: "/shopping/malls" }
              ].map(({ text, link }, index) => (
                <motion.li 
                  key={index}
                  variants={linkItemVariants}
                  custom={index}
                >
                  <motion.a 
                    link={link} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    whileHover="hover"
                    href={link}
                  >
                    <motion.span 
                      className="bg-gray-800 p-1 rounded mr-3 group-hover:bg-blue-600 transition-colors duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      <ChevronRight size={14} />
                    </motion.span>
                    {text}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold mb-6 text-white relative inline-block"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Quick Links
              <motion.span 
                className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
                variants={underlineVariants}
              ></motion.span>
            </motion.h3>
            <motion.ul 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { text: "About Us", link: "/about-us" },
                { text: "Contact US", link: "/contact-us" },
                { text: "FAQ", link: "/faq" }
              ].map(({ text, link }, index) => (
                <motion.li 
                  key={index}
                  variants={linkItemVariants}
                  custom={index}
                >
                  <motion.a 
                    link={link} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    whileHover="hover"
                    href={link} // You can keep this for actual links
                  >
                    <motion.span 
                      className="bg-gray-800 p-1 rounded mr-3 group-hover:bg-blue-600 transition-colors duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      <ChevronRight size={14} />
                    </motion.span>
                    {text}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold mb-6 text-white relative inline-block"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Contact Us
              <motion.span 
                className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
                variants={underlineVariants}
              ></motion.span>
            </motion.h3>
            <motion.ul 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { Icon: MapPin, text: "MIT Art, Design and Technology University, Loni Kalbhor, Pune", link: "#" },
                { Icon: Phone, text: "+91 77759 09442", link: "#" },
                { Icon: Mail, text: "info@crowdflow.com", link: "#" }
              ].map(({ Icon, text, link }, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={itemVariants}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="bg-gray-800 p-2 rounded-lg mr-3 text-blue-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon size={18} />
                  </motion.div>
                  <motion.a 
                    href={link} 
                    className="text-gray-400"
                  >
                    {text}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Divider */}
      <motion.div 
        className="border-t border-gray-800 mx-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      ></motion.div>
      
      {/* Bottom Bar */}
      <motion.div 
        className="bg-gray-950 py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-500"
          >
            © {currentYear} CrowdFlow. All rights reserved.
          </motion.p>
          <motion.div 
            className="mt-4 md:mt-0 flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="text-gray-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.05, color: "#ffffff" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;