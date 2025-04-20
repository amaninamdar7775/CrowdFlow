import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  AlertTriangle, 
  Users,
  ChevronDown,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LiveStatus() {
  const [station, setStation] = useState('Pune Railway Station');
  const [crowdDensity, setCrowdDensity] = useState('-');
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);
  const stationCoordinates = {
    'Pune Railway Station': { lat: 18.5288, lng: 73.8741 },
    'District Court Metro Station': { lat: 18.5192, lng: 73.8544 },
    'Shivajinagar Bus Stop': { lat: 18.5314, lng: 73.8446 },
    'Phoenix Mall': { lat: 18.5599, lng: 73.9147 }
  };
  
  const locationData = [
    { id: 1, name: 'Pune Railway Station', count: 245, capacity: 300, status: 'normal' },
    { id: 2, name: 'District Court Metro Station', count: 187, capacity: 200, status: 'warning' },
    { id: 3, name: 'Shivajinagar Bus Stop', count: 86, capacity: 150, status: 'normal' },
    { id: 4, name: 'Phoenix Mall', count: 412, capacity: 400, status: 'danger' },
  ];

  const alertsData = [
    { id: 1, area: 'Phoenix Mall', type: 'Overcrowding', time: '2 mins ago', severity: 'high' },
    { id: 2, area: 'District Court Metro Station', type: 'Approaching Capacity', time: '5 mins ago', severity: 'medium' },
    { id: 3, area: 'Pune Railway Station', type: 'Flow Rate Increase', time: '12 mins ago', severity: 'low' },
  ];
  
  const fetchCrowdData = () => {
    const densities = ['Low', 'Medium', 'High', 'Very High'];
    const randomDensity = densities[Math.floor(Math.random() * densities.length)];
    setCrowdDensity(randomDensity);
    setLastUpdated('Just now');

    updateMapLocation(station);
  };

  useEffect(() => {

    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAz23mXJ-kjIhW3X7OQwqiL8uUDc0tzaYM&callback=initMap`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;

    window.initMap = () => {
      const pune = { lat: 18.5204, lng: 73.8567 }; 
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: pune,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        ]
      });
      
      setMap(mapInstance);

      const markerInstance = new window.google.maps.Marker({
        position: stationCoordinates[station],
        map: mapInstance,
        title: station
      });
      
      setMarker(markerInstance);
    };
    
    document.head.appendChild(googleMapsScript);
    
    return () => {

      document.head.removeChild(googleMapsScript);
      window.initMap = null;
    };
  }, []);

  const updateMapLocation = (stationName) => {
    if (map && marker) {
      const position = stationCoordinates[stationName];
      marker.setPosition(position);
      map.panTo(position);
      map.setZoom(15);
    }
  };

  const handleStationChange = (e) => {
    const newStation = e.target.value;
    setStation(newStation);
    if (map && marker) {
      updateMapLocation(newStation);
    }
  };

  const currentLocation = locationData.find(loc => loc.name === station) || locationData[0];
  const occupancyPercent = Math.round((currentLocation.count / currentLocation.capacity) * 100);

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
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-4 md:p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Location Selector */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin size={18} className="mr-2 text-gray-500" /> 
                  Location Selection
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-grow">
                    <select 
                      id="station" 
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={station}
                      onChange={handleStationChange}
                    >
                      <option value="Pune Railway Station">Pune Railway Station</option>
                      <option value="District Court Metro Station">District Court Metro Station</option>
                      <option value="Shivajinagar Bus Stop">Shivajinagar Bus Stop</option>
                      <option value="Phoenix Mall">Phoenix Mall</option>
                    </select>
                  </div>
                  <motion.button 
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    onClick={fetchCrowdData}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Check Crowd Density
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Stats Overview */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Current Density</p>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users size={18} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{crowdDensity}</h3>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    Updated {lastUpdated}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Current Occupancy</p>
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Users size={18} className="text-indigo-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{occupancyPercent}%</h3>
                  <div className="mt-2 bg-gray-100 rounded-full h-2.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${occupancyPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-2.5 rounded-full ${
                        occupancyPercent > 90 ? 'bg-red-500' : 
                        occupancyPercent > 75 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    ></motion.div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Current Count</p>
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <Users size={18} className="text-amber-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{currentLocation.count}</h3>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <ArrowUpRight size={14} className="mr-1" />
                    of {currentLocation.capacity} capacity
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">Active Alerts</p>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <AlertTriangle size={18} className="text-purple-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-bold">{alertsData.length}</h3>
                  <div className="flex items-center mt-2 flex-wrap">
                    <div className="flex items-center mr-3 mb-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                      <span className="text-xs">High: {alertsData.filter(a => a.severity === 'high').length}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                      <span className="text-xs">Medium: {alertsData.filter(a => a.severity === 'medium').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Map and Alerts */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6"
            >
              {/* Map */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-2">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MapPin size={18} className="mr-2 text-gray-500" /> 
                    Location Map
                  </h2>
                  <div className="flex items-center text-sm">
                    <button className="flex items-center font-medium bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      Satellite View <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div 
                    ref={mapRef} 
                    className="w-full h-64 md:h-80 rounded-lg bg-gray-50"
                  ></div>
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
            
            {/* Location Stats */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MapPin size={18} className="mr-2 text-gray-500" /> 
                  All Locations Status
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
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
}