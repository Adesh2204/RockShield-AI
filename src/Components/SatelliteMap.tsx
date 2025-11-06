import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Shield, ArrowLeft, Satellite, AlertTriangle, 
  Info, MapPin, Activity, CheckCircle, Navigation
} from 'lucide-react';
import { highRiskZones, mediumRiskZones, coalMineMarkers } from '../data/coalRiskZones';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const highRiskIcon = createCustomIcon('#ef4444');
const mediumRiskIcon = createCustomIcon('#10b981');

// Map controls component
const MapControls: React.FC<{ setMapType: (type: string) => void; mapType: string }> = ({ setMapType, mapType }) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setMapType('satellite')}
        className={`px-4 py-2 rounded-lg font-semibold text-sm backdrop-blur-md shadow-lg transition-all ${
          mapType === 'satellite' 
            ? 'bg-orange-500 text-white' 
            : 'bg-white/90 text-slate-800 hover:bg-orange-100'
        }`}
      >
        🛰️ Satellite
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setMapType('street')}
        className={`px-4 py-2 rounded-lg font-semibold text-sm backdrop-blur-md shadow-lg transition-all ${
          mapType === 'street' 
            ? 'bg-orange-500 text-white' 
            : 'bg-white/90 text-slate-800 hover:bg-orange-100'
        }`}
      >
        🗺️ Street
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setMapType('terrain')}
        className={`px-4 py-2 rounded-lg font-semibold text-sm backdrop-blur-md shadow-lg transition-all ${
          mapType === 'terrain' 
            ? 'bg-orange-500 text-white' 
            : 'bg-white/90 text-slate-800 hover:bg-orange-100'
        }`}
      >
        ⛰️ Terrain
      </motion.button>
    </div>
  );
};

const SatelliteMap: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mapType, setMapType] = useState('satellite');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    // Simulate map loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Get tile layer URL based on map type
  const getTileLayerUrl = () => {
    switch (mapType) {
      case 'satellite':
        // Using ESRI World Imagery (free satellite imagery)
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'street':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      default:
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
  };

  const getTileLayerAttribution = () => {
    switch (mapType) {
      case 'satellite':
        return 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
      case 'street':
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      case 'terrain':
        return 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
      default:
        return '';
    }
  };

  // Styles for GeoJSON layers
  const highRiskStyle = {
    fillColor: '#ef4444',
    color: '#dc2626',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.4
  };

  const mediumRiskStyle = {
    fillColor: '#10b981',
    color: '#059669',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.3
  };

  const onEachHighRiskFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const { name, mines, riskScore } = feature.properties;
      layer.bindPopup(`
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-red-600 mb-2 text-lg">${name}</h3>
          <p class="text-sm"><strong>Risk Level:</strong> <span class="text-red-600">High</span></p>
          <p class="text-sm"><strong>Active Mines:</strong> ${mines}</p>
          <p class="text-sm"><strong>Risk Score:</strong> ${riskScore}/100</p>
        </div>
      `);
      
      layer.on({
        mouseover: (e: any) => {
          e.target.setStyle({ fillOpacity: 0.7 });
          setSelectedRegion(name);
        },
        mouseout: (e: any) => {
          e.target.setStyle({ fillOpacity: 0.4 });
          setSelectedRegion(null);
        }
      });
    }
  };

  const onEachMediumRiskFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const { name, mines, riskScore } = feature.properties;
      layer.bindPopup(`
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-green-600 mb-2 text-lg">${name}</h3>
          <p class="text-sm"><strong>Risk Level:</strong> <span class="text-green-600">Medium</span></p>
          <p class="text-sm"><strong>Active Mines:</strong> ${mines}</p>
          <p class="text-sm"><strong>Risk Score:</strong> ${riskScore}/100</p>
        </div>
      `);
      
      layer.on({
        mouseover: (e: any) => {
          e.target.setStyle({ fillOpacity: 0.6 });
          setSelectedRegion(name);
        },
        mouseout: (e: any) => {
          e.target.setStyle({ fillOpacity: 0.3 });
          setSelectedRegion(null);
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 rounded-full"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-4xl"
          >
            🛰️
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 font-['Poppins']">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-2 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">RockShield AI</h1>
                <p className="text-xs text-blue-200">Satellite Risk Map</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Satellite className="w-10 h-10 text-orange-400" />
            Live Satellite Risk Map
          </h2>
          <p className="text-xl text-blue-200">
            Real-time monitoring of coal mine danger zones across India
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-wrap gap-4 justify-center"
        >
          <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-red-400/30">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-white font-medium">High Risk Zones</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-green-400/30">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-white font-medium">Medium Risk Zones</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-400/30">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-white font-medium">Active Mines</span>
          </div>
        </motion.div>

        {/* Selected Region Info */}
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 text-center"
          >
            <div className="inline-block bg-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-orange-400/50">
              <p className="text-orange-200 font-semibold">
                Hovering: <span className="text-white">{selectedRegion}</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-orange-400/30 shadow-2xl overflow-hidden mb-8"
          style={{ height: '70vh' }}
        >
          <MapContainer
            center={[22.5, 82.5]}
            zoom={5}
            style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
            className="z-10"
          >
            <TileLayer
              url={getTileLayerUrl()}
              attribution={getTileLayerAttribution()}
            />
            
            {/* High Risk Zones */}
            <GeoJSON
              data={highRiskZones as any}
              style={highRiskStyle}
              onEachFeature={onEachHighRiskFeature}
            />
            
            {/* Medium Risk Zones */}
            <GeoJSON
              data={mediumRiskZones as any}
              style={mediumRiskStyle}
              onEachFeature={onEachMediumRiskFeature}
            />

            {/* Mine Markers */}
            {coalMineMarkers.map((mine, index) => (
              <Marker
                key={index}
                position={[mine.lat, mine.lng]}
                icon={mine.risk === 'High' ? highRiskIcon : mediumRiskIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className={`font-bold mb-2 ${mine.risk === 'High' ? 'text-red-600' : 'text-green-600'}`}>
                      {mine.name}
                    </h3>
                    <p className="text-sm"><strong>Risk Level:</strong> {mine.risk}</p>
                    <p className="text-sm"><strong>Active Mines:</strong> {mine.active}</p>
                    <p className="text-sm"><strong>Coordinates:</strong> {mine.lat.toFixed(2)}°N, {mine.lng.toFixed(2)}°E</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Controls */}
          <MapControls setMapType={setMapType} mapType={mapType} />
        </motion.div>

        {/* Insights to Safety Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-orange-400/30 shadow-xl mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-3 rounded-xl">
              <Info className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">Insights to Safety</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-400/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <h4 className="text-xl font-bold text-white">High Risk Zones</h4>
              </div>
              <p className="text-red-100 mb-4">
                These regions show elevated rockfall probability due to geological instability, 
                heavy rainfall patterns, and intensive mining activities. Immediate safety protocols required.
              </p>
              <ul className="space-y-2 text-red-200 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Deploy AI-powered monitoring systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Implement 24/7 drone surveillance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Regular structural integrity assessments</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-400/30">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-8 h-8 text-green-400" />
                <h4 className="text-xl font-bold text-white">Medium Risk Zones</h4>
              </div>
              <p className="text-green-100 mb-4">
                Moderate risk areas requiring continuous monitoring and preventive measures. 
                Proactive safety protocols help maintain stability and worker protection.
              </p>
              <ul className="space-y-2 text-green-200 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Regular safety audits and inspections</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Predictive analytics for risk forecasting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Worker training and emergency drills</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-400/30 mb-6">
            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Navigation className="w-6 h-6 text-blue-400" />
              Region-wise Analysis
            </h4>
            <p className="text-blue-100 mb-4">
              Analyze region-wise coal mine risk levels and learn about proactive safety measures 
              to minimize hazards. Our AI-powered system provides real-time alerts and actionable insights 
              to protect mining operations and personnel.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-orange-400">285</p>
                <p className="text-sm text-blue-200">Total Mines</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-400">160</p>
                <p className="text-sm text-blue-200">High Risk</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">125</p>
                <p className="text-sm text-blue-200">Medium Risk</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">9</p>
                <p className="text-sm text-blue-200">Regions</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/predict')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-3 justify-center"
            >
              <Shield className="w-5 h-5" />
              Safety Measures & Risk Prediction
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/analytics')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 justify-center"
            >
              📊
              View Risk Analytics
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SatelliteMap;
