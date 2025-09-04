import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { MineData } from '../types';
import { minesData } from '../data/mockData';

const InteractiveMap: React.FC = () => {
  const [selectedMine, setSelectedMine] = useState<MineData | null>(null);
  const [hoveredMine, setHoveredMine] = useState<string | null>(null);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-500';
      case 'caution': return 'bg-orange-500';
      case 'safe': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'caution': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'safe': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <MapPin className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <section id="map" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-['Poppins']">
            Live Mining Risk Map
          </h2>
          <p className="text-xl text-blue-100 font-['Poppins'] font-light">
            Real-time monitoring of coal mines across India
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
              <div className="relative h-96 bg-gradient-to-br from-blue-900 via-slate-800 to-green-900 rounded-xl overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-30">
                  <div className="grid grid-cols-8 grid-rows-8 h-full">
                    {[...Array(64)].map((_, i) => (
                      <div
                        key={i}
                        className={`border border-blue-400/20 ${
                          Math.random() > 0.7 ? 'bg-blue-400/10' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Mine Locations */}
                {minesData.map((mine, index) => (
                  <motion.div
                    key={mine.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 12)}%`,
                    }}
                    whileHover={{ scale: 1.2 }}
                    onHoverStart={() => setHoveredMine(mine.id)}
                    onHoverEnd={() => setHoveredMine(null)}
                    onClick={() => setSelectedMine(mine)}
                  >
                    <motion.div
                      className={`w-6 h-6 rounded-full ${getRiskColor(mine.riskLevel)} shadow-lg`}
                      animate={{
                        scale: mine.riskLevel === 'critical' ? [1, 1.3, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: mine.riskLevel === 'critical' ? Infinity : 0,
                      }}
                    />
                    
                    {/* Hover tooltip */}
                    {hoveredMine === mine.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-10"
                      >
                        <div className="text-sm font-semibold">{mine.name}</div>
                        <div className="text-xs text-gray-300">Last: {mine.lastIncident}</div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-slate-800 rotate-45" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-md rounded-lg p-3">
                  <div className="text-white text-sm font-semibold mb-2">Risk Levels</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-xs text-white">Critical</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-xs text-white">Caution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs text-white">Safe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mine Details Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {selectedMine ? (
              <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  {getRiskIcon(selectedMine.riskLevel)}
                  <h3 className="text-xl font-bold text-white">{selectedMine.name}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Risk Level</div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedMine.riskLevel === 'critical' ? 'bg-red-500/20 text-red-400' :
                      selectedMine.riskLevel === 'caution' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {selectedMine.riskLevel.toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-1">Last Incident</div>
                    <div className="text-white">{selectedMine.lastIncident}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">Risk Factors</div>
                    <div className="space-y-2">
                      {Object.entries(selectedMine.factors).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm text-gray-300 capitalize">{key}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-700 rounded-full h-2">
                              <div
                                className={`h-full rounded-full ${
                                  value > 70 ? 'bg-red-500' :
                                  value > 40 ? 'bg-orange-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(value, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm text-white">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Select a Mine</h3>
                  <p className="text-gray-400">Click on any mine marker to view detailed risk analysis</p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              {minesData.map((mine) => (
                <motion.div
                  key={mine.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedMine(mine)}
                  className="bg-slate-900 rounded-xl p-4 cursor-pointer border border-slate-700 hover:border-slate-600 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getRiskIcon(mine.riskLevel)}
                      <div>
                        <div className="text-white text-sm font-semibold">{mine.name}</div>
                        <div className="text-gray-400 text-xs">{mine.lastIncident}</div>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getRiskColor(mine.riskLevel)}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;