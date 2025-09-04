import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Shield, TrendingUp, Award, Users, Calendar } from 'lucide-react';
import { LeaderboardData } from '../Types';
import { leaderboardData } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const [stats, setStats] = useState(leaderboardData);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const shouldUpdate = Math.random() > 0.6;
        if (shouldUpdate) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
          
          return {
            ...prev,
            minesProtected: prev.minesProtected + (Math.random() > 0.5 ? 1 : 0),
            incidentsRevented: prev.incidentsRevented + (Math.random() > 0.7 ? 1 : 0),
          };
        }
        return prev;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, gradient, delay = 0 }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle: string;
    gradient: string;
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-2xl border border-white/10 relative overflow-hidden`}
    >
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}

      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-white" />
        <motion.div
          animate={{ rotate: showConfetti ? [0, 360] : 0 }}
          transition={{ duration: 1 }}
          className="text-2xl"
        >
          {title === 'Safety Champion' ? '👑' : '🎯'}
        </motion.div>
      </div>

      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-3xl font-bold text-white mb-2"
      >
        {value}
      </motion.div>

      <div className="text-white/90 font-medium mb-1">{title}</div>
      <div className="text-white/70 text-sm">{subtitle}</div>
    </motion.div>
  );

  return (
    <section id="leaderboard" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-['Poppins']">
            Safety Leaderboard
          </h2>
          <p className="text-xl text-blue-100 font-['Poppins'] font-light">
            Real-time impact metrics and safety achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StatCard
            icon={Shield}
            title="Mines Protected"
            value={stats.minesProtected}
            subtitle="Active monitoring sites"
            gradient="from-blue-500 to-blue-600"
            delay={0.2}
          />

          <StatCard
            icon={TrendingUp}
            title="Incidents Prevented"
            value={stats.incidentsRevented}
            subtitle="This month"
            gradient="from-green-500 to-green-600"
            delay={0.4}
          />

          <StatCard
            icon={Trophy}
            title="Safety Champion"
            value={stats.safetyChampion}
            subtitle="Monthly winner"
            gradient="from-orange-500 to-orange-600"
            delay={0.6}
          />
        </div>

        {/* Achievement Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Award className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Recent Achievements</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-4xl mb-3"
              >
                🏆
              </motion.div>
              <h4 className="text-yellow-400 font-bold mb-2">Zero Incidents</h4>
              <p className="text-yellow-200 text-sm">30 consecutive days without major incidents</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30 text-center"
            >
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-green-400 font-bold mb-2">Perfect Score</h4>
              <p className="text-green-200 text-sm">100% alert accuracy this week</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30 text-center"
            >
              <div className="text-4xl mb-3">🌟</div>
              <h4 className="text-purple-400 font-bold mb-2">Innovation Award</h4>
              <p className="text-purple-200 text-sm">Best AI safety implementation 2024</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Live Counter Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-slate-900 rounded-full px-8 py-4 shadow-xl border border-slate-700">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">
              <motion.span
                key={stats.minesProtected + stats.incidentsRevented}
                initial={{ scale: 1.3, color: '#f97316' }}
                animate={{ scale: 1, color: '#ffffff' }}
                transition={{ duration: 0.5 }}
              >
                {(stats.minesProtected * 25 + stats.incidentsRevented * 50).toLocaleString()}
              </motion.span>
              {' '}workers protected today
            </span>
            <Calendar className="w-5 h-5 text-green-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Leaderboard;