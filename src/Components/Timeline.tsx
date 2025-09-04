import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, Shield, Search } from 'lucide-react';
import { timelineData } from '../data/mockData';

const Timeline: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 border-red-400';
      case 'caution': return 'bg-orange-500 border-orange-400';
      case 'safe': return 'bg-green-500 border-green-400';
      default: return 'bg-blue-500 border-blue-400';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'incident': return <AlertTriangle className="w-4 h-4" />;
      case 'prevention': return <Shield className="w-4 h-4" />;
      case 'inspection': return <Search className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
            24-Hour Alert Timeline
          </h2>
          <p className="text-xl text-blue-100 font-['Poppins'] font-light">
            Track safety events and responses throughout the day
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Recent Events</h3>
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live Updates
            </div>
          </div>

          {/* Timeline Container */}
          <div 
            ref={scrollRef}
            className="overflow-x-auto pb-4"
          >
            <div className="flex gap-6 min-w-max">
              {timelineData.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative flex flex-col items-center min-w-48"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`w-12 h-12 rounded-full ${getSeverityColor(event.severity)} border-4 flex items-center justify-center shadow-lg z-10 relative`}
                    animate={{
                      boxShadow: event.severity === 'critical' 
                        ? ['0 0 20px rgba(239, 68, 68, 0.5)', '0 0 40px rgba(239, 68, 68, 0.8)', '0 0 20px rgba(239, 68, 68, 0.5)']
                        : '0 0 20px rgba(0, 0, 0, 0.3)'
                    }}
                    transition={{ duration: 2, repeat: event.severity === 'critical' ? Infinity : 0 }}
                  >
                    {getEventIcon(event.type)}
                  </motion.div>

                  {/* Time label */}
                  <div className="mt-4 bg-slate-800 rounded-lg px-3 py-2 shadow-lg">
                    <span className="text-white font-semibold text-sm">{event.time}</span>
                  </div>

                  {/* Event card */}
                  <motion.div
                    className="mt-4 bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-600 max-w-48"
                    whileHover={{ backgroundColor: '#334155' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                      event.severity === 'critical' ? 'text-red-400' :
                      event.severity === 'caution' ? 'text-orange-400' : 'text-green-400'
                    }`}>
                      {event.type}
                    </div>
                    <p className="text-white text-sm leading-relaxed">{event.description}</p>
                    
                    {/* Type badge */}
                    <div className="mt-3 flex justify-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.type === 'incident' ? 'bg-red-500/20 text-red-400' :
                        event.type === 'prevention' ? 'bg-green-500/20 text-green-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {event.type === 'incident' && '🚨 Incident'}
                        {event.type === 'prevention' && '🛡️ Prevention'}
                        {event.type === 'inspection' && '🔍 Inspection'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Connect line to next event */}
                  {index < timelineData.length - 1 && (
                    <div className="absolute top-6 left-12 w-32 h-0.5 bg-gradient-to-r from-slate-600 to-slate-500" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Note: Navigation controls removed due to being out of scope for timeline */}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;