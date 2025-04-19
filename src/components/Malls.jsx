import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  AlertTriangle, 
  ChevronDown,
  Layers,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import Navbar from './Navbar';

// Sample data for the dashboard
const locationData = [
  { id: 1, name: 'Main Entrance', count: 245, capacity: 300, status: 'normal' },
  { id: 2, name: 'Food Court', count: 187, capacity: 200, status: 'warning' },
  { id: 3, name: 'West Wing', count: 86, capacity: 150, status: 'normal' },
  { id: 4, name: 'Exhibition Hall', count: 412, capacity: 400, status: 'danger' },
  { id: 5, name: 'East Wing', count: 56, capacity: 150, status: 'normal' },
];

const alertsData = [
  { id: 1, area: 'Exhibition Hall', type: 'Overcrowding', time: '2 mins ago', severity: 'high' },
  { id: 2, area: 'Food Court', type: 'Approaching Capacity', time: '5 mins ago', severity: 'medium' },
  { id: 3, area: 'Main Entrance', type: 'Flow Rate Increase', time: '12 mins ago', severity: 'low' },
];

const trendsData = [
  { time: '9:00', count: 120 },
  { time: '10:00', count: 220 },
  { time: '11:00', count: 310 },
  { time: '12:00', count: 430 },
  { time: '13:00', count: 380 },
  { time: '14:00', count: 320 },
];

export default function Malls() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [totalVisitors, setTotalVisitors] = useState(986);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalVisitors(prev => {
        const change = Math.floor(Math.random() * 10) - 3; 
        return Math.max(800, prev + change); 
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const totalCapacity = locationData.reduce((sum, location) => sum + location.capacity, 0);
  const currentOccupancy = locationData.reduce((sum, location) => sum + location.count, 0);
  const occupancyPercentage = Math.round((currentOccupancy / totalCapacity) * 100);

  const highAlerts = alertsData.filter(alert => alert.severity === 'high').length;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      
      {/* Main Content - Now positioned below the navbar */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Stats Overview */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Total Visitors</p>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users size={18} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{totalVisitors.toLocaleString()}</h3>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUpRight size={14} className="mr-1" />
                    +2.5% from yesterday
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Current Occupancy</p>
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Layers size={18} className="text-indigo-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{occupancyPercentage}%</h3>
                  <div className="mt-2 bg-gray-100 rounded-full h-2.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${occupancyPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-2.5 rounded-full ${
                        occupancyPercentage > 90 ? 'bg-red-500' : 
                        occupancyPercentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    ></motion.div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Active Alerts</p>
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <AlertTriangle size={18} className="text-amber-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{alertsData.length}</h3>
                  <div className="flex items-center mt-2 flex-wrap">
                    <div className="flex items-center mr-3 mb-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                      <span className="text-xs">High: {highAlerts}</span>
                    </div>
                    
                    <div className="flex items-center mr-3 mb-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                      <span className="text-xs">Medium: {alertsData.filter(a => a.severity === 'medium').length}</span>
                    </div>
                    
                    <div className="flex items-center mb-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                      <span className="text-xs">Low: {alertsData.filter(a => a.severity === 'low').length}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Peak Time</p>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Clock size={18} className="text-purple-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">12:00 PM</h3>
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <ArrowUpRight size={14} className="mr-1" />
                    430 visitors
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Location Monitoring */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6"
            >
              {/* Location list */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-2">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MapPin size={18} className="mr-2 text-gray-500" /> 
                    Location Monitoring
                  </h2>
                  <div className="flex items-center text-sm">
                    <span className="mr-2 text-gray-500 hidden sm:inline">Sort by:</span>
                    <button className="flex items-center font-medium bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      Occupancy <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  {locationData.map((location, index) => {
                    const occupancyPercent = Math.round((location.count / location.capacity) * 100);
                    return (
                      <motion.div 
                        key={location.id}
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0"
                      >
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-medium text-gray-800 flex items-center">
                            {location.name}
                            {location.status === 'danger' && (
                              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Crowded</span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500">{location.count} / {location.capacity} people</p>
                        </div>
                        
                        <div className="w-full sm:w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">{occupancyPercent}%</span>
                            <span className={`
                              ${location.status === 'danger' ? 'text-red-600 font-medium' : 
                                location.status === 'warning' ? 'text-yellow-600 font-medium' : 'text-green-600 font-medium'}
                            `}>
                              {location.status === 'danger' ? 'Overcrowded' : 
                              location.status === 'warning' ? 'Warning' : 'Normal'}
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-full h-2.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${occupancyPercent}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className={`h-2.5 rounded-full ${
                                location.status === 'danger' ? 'bg-red-500' : 
                                location.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                            ></motion.div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Alert panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <AlertTriangle size={18} className="mr-2 text-gray-500" />
                    Active Alerts
                  </h2>
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    View All
                  </button>
                </div>
                
                <div className="p-3">
                  {alertsData.map((alert, index) => (
                    <motion.div 
                      key={alert.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className={`p-3 mb-2 rounded-xl flex items-start cursor-pointer ${
                        alert.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' : 
                        alert.severity === 'medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 
                        'bg-blue-50 border-l-4 border-blue-500'
                      }`}
                    >
                      <div className={`p-2 rounded-full mr-3 ${
                        alert.severity === 'high' ? 'bg-red-100' : 
                        alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <AlertTriangle size={14} className={
                          alert.severity === 'high' ? 'text-red-600' : 
                          alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        } />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{alert.type}</h4>
                        <p className="text-sm text-gray-600">{alert.area}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
      
      {/* Mobile nav overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}