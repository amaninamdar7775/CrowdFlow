import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Map, 
  AlertTriangle,
  ChevronDown,
  ArrowUpRight,
  Layers,
  Ticket
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const initialStationAreas = [
  { id: 1, name: 'Main Entrance', crowdLevel: 65, capacity: 100, trend: 'increasing', status: 'warning' },
  { id: 2, name: 'Ticket Counter', crowdLevel: 80, capacity: 100, trend: 'stable', status: 'warning' },
  { id: 3, name: 'Platform 1', crowdLevel: 45, capacity: 100, trend: 'decreasing', status: 'normal' },
  { id: 4, name: 'Platform 2', crowdLevel: 90, capacity: 100, trend: 'increasing', status: 'danger' },
  { id: 5, name: 'Food Court', crowdLevel: 70, capacity: 100, trend: 'stable', status: 'warning' },
  { id: 6, name: 'Waiting Area', crowdLevel: 50, capacity: 100, trend: 'stable', status: 'normal' }
];

const historicalData = [
  { time: '6:00', level: 20 },
  { time: '8:00', level: 75 },
  { time: '10:00', level: 60 },
  { time: '12:00', level: 50 },
  { time: '14:00', level: 45 },
  { time: '16:00', level: 65 },
  { time: '18:00', level: 85 },
  { time: '20:00', level: 40 }
];

export default function Railway() {
  const [stationAreas, setStationAreas] = useState(initialStationAreas);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [alerts, setAlerts] = useState([
    { id: 1, area: 'Platform 2', type: 'Overcrowding', time: '2 mins ago', severity: 'high' },
    { id: 2, area: 'Ticket Counter', type: 'Approaching Capacity', time: '5 mins ago', severity: 'medium' },
    { id: 3, area: 'Main Entrance', type: 'Flow Rate Increase', time: '12 mins ago', severity: 'low' },
  ]);
  const [totalVisitors, setTotalVisitors] = useState(1248);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStationAreas(prevAreas => {
        return prevAreas.map(area => {
          let newLevel = area.crowdLevel + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5);
          
          newLevel = Math.max(10, Math.min(100, newLevel));

          let trend = 'stable';
          let status = 'normal';
          
          if (newLevel > area.crowdLevel + 3) trend = 'increasing';
          if (newLevel < area.crowdLevel - 3) trend = 'decreasing';
          
          if (newLevel > 85) status = 'danger';
          else if (newLevel > 65) status = 'warning';
          else status = 'normal';
          
          return { ...area, crowdLevel: newLevel, trend, status };
        });
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalVisitors(prev => {
        const change = Math.floor(Math.random() * 10) - 3; 
        return Math.max(1000, prev + change); 
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const highCrowdAreas = stationAreas.filter(area => area.crowdLevel > 85);
    
    if (highCrowdAreas.length > 0) {
      const newAlerts = highCrowdAreas.map(area => ({
        id: `${area.id}-${Date.now()}`,
        area: area.name,
        type: 'Overcrowding',
        message: `Crowd level critical at ${area.name}. Consider redirecting passengers.`,
        time: 'Just now',
        severity: 'high'
      }));
      
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 5));
    }
  }, [stationAreas]);

  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  const handleAction = (action) => {
    if (!selectedArea) return;
    
    let newAreas = [...stationAreas];
    const areaIndex = newAreas.findIndex(a => a.id === selectedArea.id);
    
    switch(action) {
      case 'redirect':
        newAreas[areaIndex] = {
          ...newAreas[areaIndex],
          crowdLevel: Math.max(newAreas[areaIndex].crowdLevel - 15, 10),
          trend: 'decreasing',
          status: 'normal'
        };
        setAlerts(prev => [{
          id: Date.now(),
          area: selectedArea.name,
          type: 'Passenger Redirect',
          message: `Redirecting passengers away from ${selectedArea.name}.`,
          time: 'Just now',
          severity: 'info'
        }, ...prev].slice(0, 5));
        break;
      case 'open-gates':
        newAreas[areaIndex] = {
          ...newAreas[areaIndex],
          crowdLevel: Math.max(newAreas[areaIndex].crowdLevel - 25, 10),
          trend: 'decreasing',
          status: 'normal'
        };
        setAlerts(prev => [{
          id: Date.now(),
          area: selectedArea.name,
          type: 'Gates Opened',
          message: `Additional gates opened at ${selectedArea.name}.`,
          time: 'Just now',
          severity: 'info'
        }, ...prev].slice(0, 5));
        break;
      default:
        break;
    }

    setStationAreas(newAreas);
  };

  const toggleTicketModal = () => {
    setShowTicketModal(!showTicketModal);
  };
  
  const totalCapacity = stationAreas.reduce((sum, area) => sum + area.capacity, 0);
  const currentOccupancy = stationAreas.reduce((sum, area) => sum + area.crowdLevel, 0);
  const occupancyPercentage = Math.round((currentOccupancy / totalCapacity) * 100);
  const highAlerts = alerts.filter(alert => alert.severity === 'high').length;
  
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
        
        {/* Book Tickets Button - Fixed position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-30"
        >
          <button 
            onClick={toggleTicketModal}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Ticket size={20} className="mr-2" />
            Book Tickets
          </button>
        </motion.div>
        
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
                  <p className="text-sm text-gray-500 font-medium">Total Passengers</p>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users size={18} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{totalVisitors.toLocaleString()}</h3>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUpRight size={14} className="mr-1" />
                    +3.2% from yesterday
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
                        occupancyPercentage > 85 ? 'bg-red-500' : 
                        occupancyPercentage > 65 ? 'bg-yellow-500' : 'bg-green-500'
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
                  <h3 className="text-2xl md:text-3xl font-bold">{alerts.length}</h3>
                  <div className="flex items-center mt-2 flex-wrap">
                    <div className="flex items-center mr-3 mb-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                      <span className="text-xs">High: {highAlerts}</span>
                    </div>
                    
                    <div className="flex items-center mr-3 mb-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                      <span className="text-xs">Medium: {alerts.filter(a => a.severity === 'medium').length}</span>
                    </div>
                    
                    <div className="flex items-center mb-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                      <span className="text-xs">Low: {alerts.filter(a => a.severity === 'low').length}</span>
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
                  <h3 className="text-2xl md:text-3xl font-bold">18:00</h3>
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <ArrowUpRight size={14} className="mr-1" />
                    85% occupancy
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
                    <Map size={18} className="mr-2 text-gray-500" /> 
                    Station Areas Monitoring
                  </h2>
                  <div className="flex items-center text-sm">
                    <span className="mr-2 text-gray-500 hidden sm:inline">Sort by:</span>
                    <button className="flex items-center font-medium bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      Occupancy <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  {stationAreas.map((area, index) => {
                    return (
                      <motion.div 
                        key={area.id}
                        variants={itemVariants}
                        onClick={() => handleAreaClick(area)}
                        className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                      >
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-medium text-gray-800 flex items-center">
                            {area.name}
                            {area.status === 'danger' && (
                              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Crowded</span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500">{area.crowdLevel}% occupancy</p>
                        </div>
                        
                        <div className="w-full sm:w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">{area.crowdLevel}%</span>
                            <span className={`
                              ${area.status === 'danger' ? 'text-red-600 font-medium' : 
                                area.status === 'warning' ? 'text-yellow-600 font-medium' : 'text-green-600 font-medium'}
                            `}>
                              {area.status === 'danger' ? 'Overcrowded' : 
                              area.status === 'warning' ? 'Warning' : 'Normal'}
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-full h-2.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${area.crowdLevel}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className={`h-2.5 rounded-full ${
                                area.status === 'danger' ? 'bg-red-500' : 
                                area.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                            ></motion.div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Control Panel */}
                {selectedArea && (
                  <motion.div 
                    className="m-4 bg-gray-50 p-4 rounded-lg border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-semibold mb-3">{selectedArea.name} - Control Actions</h3>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        onClick={() => handleAction('redirect')}
                      >
                        Redirect Passengers
                      </button>
                      <button 
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                        onClick={() => handleAction('open-gates')}
                      >
                        Open Additional Gates
                      </button>
                      <button 
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                        onClick={() => handleAction('announcement')}
                      >
                        Make Announcement
                      </button>
                    </div>
                  </motion.div>
                )}
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
                  {alerts.map((alert, index) => (
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
        <Footer />
      </div>
      
      {/* Book Tickets Modal */}
      {showTicketModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center">
                <Ticket size={20} className="mr-2 text-blue-600" />
                Book Railway Tickets
              </h3>
              <button 
                onClick={toggleTicketModal}
                className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select origin station</option>
                  <option>Pune Junction</option>
                  <option>Lonavla</option>
                  <option>Hadapsar Station</option>
                  <option>Loni Station</option>
                  <option>Uruli Station</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select destination station</option>
                  <option>Pune Junction</option>
                  <option>Lonavla</option>
                  <option>Hadapsar Station</option>
                  <option>Loni Station</option>
                  <option>Uruli Station</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3 Passengers</option>
                    <option>4+ Passengers</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2.5 border-2 border-blue-600 rounded-lg text-blue-600 font-medium">
                    Economy
                  </button>
                  <button className="p-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 transition-colors">
                    Business
                  </button>
                  <button className="p-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 transition-colors">
                    First Class
                  </button>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-2 transition-colors">
                Search Trains
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
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