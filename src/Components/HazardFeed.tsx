import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, Wrench, Cloud } from 'lucide-react';
import { Alert } from '../types';
import { alertsData } from '../data/mockData';

const HazardFeed: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(alertsData);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new alerts
      if (Math.random() > 0.7) {
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: ['rockfall', 'equipment', 'weather', 'seismic'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          mine: 'Demo Mine ' + (Math.floor(Math.random() * 5) + 1),
          message: 'Simulated alert for demonstration purposes',
          resolved: Math.random() > 0.5
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'rockfall': return <AlertTriangle className="w-5 h-5" />;
      case 'equipment': return <Wrench className="w-5 h-5" />;
      case 'weather': return <Cloud className="w-5 h-5" />;
      case 'seismic': return <Shield className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'from-red-500 to-red-600 text-red-100';
      case 'medium': return 'from-orange-500 to-orange-600 text-orange-100';
      case 'low': return 'from-blue-500 to-blue-600 text-blue-100';
      default: return 'from-gray-500 to-gray-600 text-gray-100';
    }
  };

  return (
    <section className="py-16 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-['Poppins']">
            Live Hazard Alert Feed
          </h2>
          <p className="text-xl text-blue-100 font-['Poppins'] font-light">
            Real-time safety monitoring and incident response
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Recent Alerts</h3>
                <button
                  onClick={() => setIsAutoScroll(!isAutoScroll)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isAutoScroll 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-slate-700 text-gray-400 border border-slate-600'
                  }`}
                >
                  {isAutoScroll ? '🔄 Auto' : '⏸️ Paused'}
                </button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`bg-gradient-to-r ${getSeverityColor(alert.severity)} rounded-xl p-4 shadow-lg border border-white/10`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-sm">{alert.mine}</span>
                            <span className="text-xs opacity-75">
                              {new Date(alert.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm opacity-90">{alert.message}</p>
                          {alert.resolved && (
                            <span className="inline-block mt-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                              ✅ Resolved
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Alert Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Critical</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="h-full bg-red-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-red-400 font-bold">3</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Caution</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="h-full bg-orange-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '40%' }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                    <span className="text-orange-400 font-bold">5</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Safe</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '90%' }}
                        transition={{ duration: 1, delay: 0.9 }}
                      />
                    </div>
                    <span className="text-green-400 font-bold">12</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl p-6 border border-orange-500/30">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-4xl mb-2"
                >
                  🚨
                </motion.div>
                <h4 className="text-orange-400 font-bold mb-2">Emergency Protocol</h4>
                <p className="text-orange-200 text-sm">
                  All critical alerts trigger immediate evacuation procedures
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </section>
  );
};

export default HazardFeed;