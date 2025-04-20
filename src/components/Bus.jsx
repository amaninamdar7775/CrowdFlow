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
  Bus,
  Ticket
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const initialStationAreas = [
  { id: 1, name: 'Main Terminal', crowdLevel: 55, capacity: 100, trend: 'increasing', status: 'warning' },
  { id: 2, name: 'Ticket Counter', crowdLevel: 75, capacity: 100, trend: 'stable', status: 'warning' },
  { id: 3, name: 'Bay 1-5', crowdLevel: 40, capacity: 100, trend: 'decreasing', status: 'normal' },
  { id: 4, name: 'Bay 6-10', crowdLevel: 85, capacity: 100, trend: 'increasing', status: 'danger' },
  { id: 5, name: 'Food Court', crowdLevel: 65, capacity: 100, trend: 'stable', status: 'warning' },
  { id: 6, name: 'Waiting Lounge', crowdLevel: 45, capacity: 100, trend: 'stable', status: 'normal' }
];

const historicalData = [
  { time: '6:00', level: 25 },
  { time: '8:00', level: 85 },
  { time: '10:00', level: 55 },
  { time: '12:00', level: 45 },
  { time: '14:00', level: 40 },
  { time: '16:00', level: 60 },
  { time: '18:00', level: 90 },
  { time: '20:00', level: 35 }
];

export default function BusStations() {
  const [stationAreas, setStationAreas] = useState(initialStationAreas);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [alerts, setAlerts] = useState([
    { id: 1, area: 'Bay 6-10', type: 'Overcrowding', time: '3 mins ago', severity: 'high' },
    { id: 2, area: 'Ticket Counter', type: 'Approaching Capacity', time: '7 mins ago', severity: 'medium' },
    { id: 3, area: 'Main Terminal', type: 'Flow Rate Increase', time: '15 mins ago', severity: 'low' },
  ]);
  const [totalVisitors, setTotalVisitors] = useState(986);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [nextDepartures, setNextDepartures] = useState([
    { id: 1, route: '305', destination: 'Swargate', bay: 'Bay 3', time: '5 min', status: 'On Time' },
    { id: 2, route: '875', destination: 'Airport', bay: 'Bay 8', time: '12 min', status: 'Delayed' },
    { id: 3, route: '122', destination: 'University', bay: 'Bay 5', time: '17 min', status: 'On Time' },
  ]);

  const handleBookTickets = () => {
    window.location.href = "https://pmpml.org/";
  };

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
          
          if (newLevel > 80) status = 'danger';
          else if (newLevel > 60) status = 'warning';
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
        const change = Math.floor(Math.random() * 8) - 2; 
        return Math.max(800, prev + change); 
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulate departure time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNextDepartures(prev => {
        return prev.map(departure => {
          // Decrease time by 1 minute
          let timeValue = parseInt(departure.time);
          const unit = departure.time.includes('min') ? 'min' : 'sec';
          
          if (unit === 'min') {
            timeValue = Math.max(1, timeValue - 1);
            if (timeValue <= 1) {
              return {
                ...departure,
                time: '30 sec',
                status: Math.random() > 0.8 ? 'Delayed' : 'On Time'
              };
            }
          } else {
            timeValue = Math.max(0, timeValue - 15);
            if (timeValue <= 0) {
              // Rotate to a new bus
              const newRoutes = ['42', '189', '73X', '501', '22'];
              const newDestinations = ['Mall', 'North Station', 'Beach', 'Suburbs', 'Central Park'];
              const newBays = ['Bay 1', 'Bay 2', 'Bay 4', 'Bay 6', 'Bay 9'];
              return {
                id: Date.now(),
                route: newRoutes[Math.floor(Math.random() * newRoutes.length)],
                destination: newDestinations[Math.floor(Math.random() * newDestinations.length)],
                bay: newBays[Math.floor(Math.random() * newBays.length)],
                time: `${15 + Math.floor(Math.random() * 20)} min`,
                status: Math.random() > 0.8 ? 'Delayed' : 'On Time'
              };
            }
          }
          
          return {
            ...departure,
            time: `${timeValue} ${unit}`
          };
        });
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Generate alerts for high crowd levels
  useEffect(() => {
    const highCrowdAreas = stationAreas.filter(area => area.crowdLevel > 80);
    
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

  // Handle area selection
  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  // Implement crowd management action
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
          type: 'Additional Space Opened',
          message: `Additional waiting area opened at ${selectedArea.name}.`,
          time: 'Just now',
          severity: 'info'
        }, ...prev].slice(0, 5));
        break;
      case 'announcement':
        setAlerts(prev => [{
          id: Date.now(),
          area: selectedArea.name,
          type: 'Announcement Made',
          message: `Public announcement made for ${selectedArea.name}.`,
          time: 'Just now',
          severity: 'info'
        }, ...prev].slice(0, 5));
        break;
      default:
        break;
    }

    setStationAreas(newAreas);
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

  const buttonVariants = {
    idle: { 
      scale: 1,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)"
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 2px 3px rgba(0, 0, 0, 0.15)" 
    }
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      y: [0, -30 * i, -60 * i],
      x: [0, (i - 1.5) * 20, (i - 1.5) * 40],
      transition: {
        repeat: Infinity,
        repeatDelay: 2,
        duration: 1.5 + i * 0.2,
        delay: i * 0.1
      }
    })
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      
      {/* Floating Book Tickets Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          className="relative"
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          animate={isButtonHovered ? "hover" : "idle"}
          onHoverStart={() => setIsButtonHovered(true)}
          onHoverEnd={() => setIsButtonHovered(false)}
        >
          {/* Animated particles */}
          {isButtonHovered && (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={particleVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-yellow-400"
                />
              ))}
            </>
          )}
          
          <motion.button
            variants={buttonVariants}
            onClick={handleBookTickets}
            className="flex items-center px-6 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg shadow-lg"
          >
            <Ticket className="mr-2" size={20} />
            <span>Book Tickets</span>
            <motion.span
              className="ml-2"
              animate={{
                x: [0, 5, 0],
                transition: { repeat: Infinity, duration: 1.5 }
              }}
            >→</motion.span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Main Content */}
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
                  <p className="text-sm text-gray-500 font-medium">Total Passengers</p>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users size={18} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{totalVisitors.toLocaleString()}</h3>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUpRight size={14} className="mr-1" />
                    +2.8% from yesterday
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
                        occupancyPercentage > 80 ? 'bg-red-500' : 
                        occupancyPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
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
                    90% occupancy
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Next Departures */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Bus size={18} className="mr-2 text-gray-500" /> 
                  Next Departures
                </h2>
                <div className="flex items-center text-sm">
                  <button className="flex items-center font-medium bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    View All
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="px-5 py-3 font-medium">Route</th>
                      <th className="px-5 py-3 font-medium">Destination</th>
                      <th className="px-5 py-3 font-medium">Bay</th>
                      <th className="px-5 py-3 font-medium">Departure</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nextDepartures.map((departure) => (
                      <tr key={departure.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4 font-medium text-blue-600">{departure.route}</td>
                        <td className="px-5 py-4">{departure.destination}</td>
                        <td className="px-5 py-4">{departure.bay}</td>
                        <td className="px-5 py-4 font-medium">{departure.time}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            departure.status === 'On Time' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {departure.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    Bus Station Areas Monitoring
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
                        className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 cursor-pointer hover:bg-gray-50 rounded-lg p-2"
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
                        Open Waiting Area
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