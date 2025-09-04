import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Monitor, Users, BarChart3, Map, Bell } from 'lucide-react';

const Demo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const demoFeatures = [
    {
      id: 'dashboard',
      icon: Monitor,
      title: 'Live Dashboard',
      description: 'Real-time mining operations overview',
      color: 'from-blue-500 to-blue-600',
      preview: 'Interactive charts and live data streams'
    },
    {
      id: 'alerts',
      icon: Bell,
      title: 'Alert System',
      description: 'Instant notifications and emergency protocols',
      color: 'from-red-500 to-red-600',
      preview: 'Smart notification routing and escalation'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Risk Analytics',
      description: 'Advanced AI-powered risk assessment',
      color: 'from-green-500 to-green-600',
      preview: 'Predictive modeling and trend analysis'
    },
    {
      id: 'mapping',
      icon: Map,
      title: 'Site Mapping',
      description: 'Comprehensive mine site visualization',
      color: 'from-purple-500 to-purple-600',
      preview: '3D terrain modeling and hazard zones'
    }
  ];

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-['Poppins']">
            Experience RockShield AI
          </h2>
          <p className="text-xl text-blue-100 font-['Poppins'] font-light mb-8">
            Try our interactive demo and see the future of mining safety
          </p>

          {/* Main Demo Launch Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 inline-flex items-center gap-4"
          >
            <Play className="w-8 h-8" />
            Launch Full Demo
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Demo Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {demoFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onHoverStart={() => setActiveDemo(feature.id)}
              onHoverEnd={() => setActiveDemo(null)}
              className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl w-fit mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                
                {activeDemo === feature.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-slate-800 rounded-lg p-3 border border-slate-600"
                  >
                    <p className="text-white text-xs">{feature.preview}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="text-4xl mb-3"
            >
              👥
            </motion.div>
            <div className="text-2xl font-bold text-white mb-2">2,500+</div>
            <div className="text-gray-400">Demo Sessions This Month</div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700 text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="text-4xl mb-3"
            >
              ⚡
            </motion.div>
            <div className="text-2xl font-bold text-white mb-2">98.7%</div>
            <div className="text-gray-400">Prediction Accuracy</div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              className="text-4xl mb-3"
            >
              🏆
            </motion.div>
            <div className="text-2xl font-bold text-white mb-2">15</div>
            <div className="text-gray-400">Industry Awards</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl p-8 border border-orange-500/30 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to revolutionize mining safety?
            </h3>
            <p className="text-orange-200 mb-6 max-w-2xl mx-auto">
              Join thousands of mining professionals who trust RockShield AI to protect their teams 
              and optimize operations with cutting-edge artificial intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-3 justify-center"
              >
                <Users className="w-5 h-5" />
                Book a Demo Call
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Download Brochure
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;