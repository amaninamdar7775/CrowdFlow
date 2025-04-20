import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Train, 
  AlertTriangle, 
  ChevronDown,
  Layers,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Ticket 
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const stationAreaData = [
  { id: 1, name: 'Main Concourse', count: 312, capacity: 400, status: 'normal' },
  { id: 2, name: 'Platform 1', count: 178, capacity: 200, status: 'warning' },
  { id: 3, name: 'Platform 2', count: 105, capacity: 150, status: 'normal' },
  { id: 4, name: 'Ticket Hall', count: 245, capacity: 250, status: 'danger' },
  { id: 5, name: 'North Exit', count: 82, capacity: 120, status: 'normal' },
];

const alertsData = [
  { id: 1, area: 'Ticket Hall', type: 'Overcrowding', time: '3 mins ago', severity: 'high' },
  { id: 2, area: 'Platform 1', type: 'Approaching Capacity', time: '7 mins ago', severity: 'medium' },
  { id: 3, area: 'Main Concourse', type: 'Sudden Influx', time: '15 mins ago', severity: 'medium' },
  { id: 4, area: 'South Entrance', type: 'Flow Rate Increase', time: '22 mins ago', severity: 'low' },
];

const passengerFlowData = [
  { time: '6:00', count: 180 },
  { time: '7:00', count: 460 },
  { time: '8:00', count: 580 },
  { time: '9:00', count: 420 },
  { time: '10:00', count: 310 },
  { time: '11:00', count: 270 },
];

const incomingTrains = [
  { id: 1, line: 'Blue Line', destination: 'District Court', arrival: '2 min', crowdLevel: 'high' },
  { id: 2, line: 'Red Line', destination: 'Kalyani Nagar', arrival: '5 min', crowdLevel: 'medium' },
  { id: 3, line: 'Green Line', destination: 'Vanaz', arrival: '9 min', crowdLevel: 'low' },
];

export default function Metro() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [totalPassengers, setTotalPassengers] = useState(922);
  const [passengerTrend, setPassengerTrend] = useState('increasing');
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleBookTickets = () => {
    window.location.href = "https://punemetrorail.org/";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalPassengers(prev => {
        const change = Math.floor(Math.random() * 15) - 5; 
        const newValue = Math.max(700, prev + change);
        setPassengerTrend(change >= 0 ? 'increasing' : 'decreasing');
        return newValue;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  const totalCapacity = stationAreaData.reduce((sum, area) => sum + area.capacity, 0);
  const currentOccupancy = stationAreaData.reduce((sum, area) => sum + area.count, 0);
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
            className="flex items-center px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold text-lg shadow-lg"
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
                  <p className="text-sm text-gray-500 font-medium">Current Passengers</p>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users size={18} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{totalPassengers.toLocaleString()}</h3>
                  <p className={`text-sm flex items-center mt-1 ${passengerTrend === 'increasing' ? 'text-green-500' : 'text-red-500'}`}>
                    {passengerTrend === 'increasing' ? (
                      <><ArrowUpRight size={14} className="mr-1" /> Increasing</>
                    ) : (
                      <><ArrowDownRight size={14} className="mr-1" /> Decreasing</>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Station Capacity</p>
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
                  <p className="text-sm text-gray-500 font-medium">Safety Alerts</p>
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
                  <p className="text-sm text-gray-500 font-medium">Rush Hour</p>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Clock size={18} className="text-purple-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">8:00 AM</h3>
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <ArrowUpRight size={14} className="mr-1" />
                    580 passengers
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Station Areas and Trains */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6"
            >
              {/* Station areas list */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-2">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MapPin size={18} className="mr-2 text-gray-500" /> 
                    Station Areas
                  </h2>
                  <div className="flex items-center text-sm">
                    <span className="mr-2 text-gray-500 hidden sm:inline">Sort by:</span>
                    <button className="flex items-center font-medium bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      Occupancy <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  {stationAreaData.map((area, index) => {
                    const occupancyPercent = Math.round((area.count / area.capacity) * 100);
                    return (
                      <motion.div 
                        key={area.id}
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0"
                      >
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-medium text-gray-800 flex items-center">
                            {area.name}
                            {area.status === 'danger' && (
                              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Crowded</span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500">{area.count} / {area.capacity} people</p>
                        </div>
                        
                        <div className="w-full sm:w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">{occupancyPercent}%</span>
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
                              animate={{ width: `${occupancyPercent}%` }}
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
            
            {/* Incoming Trains Section */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Train size={18} className="mr-2 text-gray-500" />
                  Incoming Trains
                </h2>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Full Schedule
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Line
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Arrival
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crowd Level
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {incomingTrains.map((train) => (
                      <motion.tr 
                        key={train.id}
                        variants={itemVariants}
                        whileHover={{ backgroundColor: '#f9fafb', transition: { duration: 0.2 } }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {train.line}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {train.destination}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {train.arrival}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            train.crowdLevel === 'high' ? 'bg-red-100 text-red-800' : 
                            train.crowdLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {train.crowdLevel.charAt(0).toUpperCase() + train.crowdLevel.slice(1)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
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