import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell, Area, AreaChart 
} from 'recharts';
import { 
  Shield, ArrowLeft, TrendingUp, AlertTriangle, 
  MapPin, Activity, Calendar, ChevronDown 
} from 'lucide-react';

// Sample risk data for different locations in India
const riskDataByLocation = [
  { location: 'Jharkhand', highRisk: 45, mediumRisk: 30, lowRisk: 25, total: 100 },
  { location: 'Odisha', highRisk: 38, mediumRisk: 35, lowRisk: 27, total: 100 },
  { location: 'Chhattisgarh', highRisk: 42, mediumRisk: 28, lowRisk: 30, total: 100 },
  { location: 'Maharashtra', highRisk: 35, mediumRisk: 40, lowRisk: 25, total: 100 },
  { location: 'Karnataka', highRisk: 30, mediumRisk: 38, lowRisk: 32, total: 100 },
  { location: 'Madhya Pradesh', highRisk: 40, mediumRisk: 32, lowRisk: 28, total: 100 },
];

// Monthly trend data
const monthlyTrendData = [
  { month: 'Jan', incidents: 12, riskScore: 65 },
  { month: 'Feb', incidents: 15, riskScore: 70 },
  { month: 'Mar', incidents: 18, riskScore: 75 },
  { month: 'Apr', incidents: 22, riskScore: 80 },
  { month: 'May', incidents: 28, riskScore: 85 },
  { month: 'Jun', incidents: 35, riskScore: 90 },
  { month: 'Jul', incidents: 42, riskScore: 88 },
  { month: 'Aug', incidents: 38, riskScore: 82 },
  { month: 'Sep', incidents: 30, riskScore: 75 },
  { month: 'Oct', incidents: 25, riskScore: 70 },
  { month: 'Nov', incidents: 20, riskScore: 68 },
  { month: 'Dec', incidents: 16, riskScore: 65 },
];

// Risk distribution pie chart data
const riskDistribution = [
  { name: 'High Risk', value: 38, color: '#ef4444' },
  { name: 'Medium Risk', value: 34, color: '#f59e0b' },
  { name: 'Low Risk', value: 28, color: '#10b981' },
];

// Trigger types data
const triggerData = [
  { trigger: 'Rainfall', count: 45, percentage: 42 },
  { trigger: 'Earthquake', count: 30, percentage: 28 },
  { trigger: 'Human Activity', count: 25, percentage: 23 },
  { trigger: 'Natural Erosion', count: 8, percentage: 7 },
];

const RiskAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [isLoading, setIsLoading] = useState(true);
  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setAnimateCharts(true), 300);
    }, 1000);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm p-4 rounded-lg border border-orange-400/30 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-4xl"
          >
            📊
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
                <p className="text-xs text-blue-200">Risk Analytics Dashboard</p>
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
          className="mb-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Risk Analytics Dashboard
          </h2>
          <p className="text-xl text-blue-200">
            Comprehensive risk analysis across mining locations in India
          </p>
        </motion.div>

        {/* Location Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="appearance-none bg-slate-800/50 backdrop-blur-sm text-white px-6 py-3 pr-12 rounded-xl border border-orange-400/30 focus:outline-none focus:border-orange-400 transition-all cursor-pointer"
            >
              <option value="All Locations">All Locations</option>
              {riskDataByLocation.map((loc) => (
                <option key={loc.location} value={loc.location}>
                  {loc.location}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 pointer-events-none" />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm p-6 rounded-2xl border border-red-400/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <TrendingUp className="w-6 h-6 text-red-300" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">38%</h3>
            <p className="text-red-200">High Risk Areas</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-orange-400" />
              <TrendingUp className="w-6 h-6 text-orange-300" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">34%</h3>
            <p className="text-orange-200">Medium Risk Areas</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-6 rounded-2xl border border-green-400/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-green-400" />
              <TrendingUp className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">28%</h3>
            <p className="text-green-200">Low Risk Areas</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-6 rounded-2xl border border-blue-400/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-8 h-8 text-blue-400" />
              <Calendar className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">6</h3>
            <p className="text-blue-200">Regions Monitored</p>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Distribution by Location - Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart className="w-6 h-6 text-orange-400" />
              Risk Distribution by Location
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskDataByLocation}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="location" stroke="#9ca3af" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="highRisk" name="High Risk" fill="#ef4444" radius={[8, 8, 0, 0]} />
                <Bar dataKey="mediumRisk" name="Medium Risk" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="lowRisk" name="Low Risk" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Overall Risk Distribution - Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-orange-400" />
              Overall Risk Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={animateCharts ? 0 : 1000}
                  animationDuration={800}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Incident Trend - Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              Monthly Incident Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="incidents" 
                  name="Incidents" 
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="riskScore" 
                  name="Risk Score" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Trigger Types - Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              Risk Triggers Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={triggerData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="trigger" type="category" stroke="#9ca3af" width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Incidents" fill="#f59e0b" radius={[0, 8, 8, 0]}>
                  {triggerData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#ef4444', '#f59e0b', '#eab308', '#10b981'][index % 4]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Risk Score Trend Line */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-orange-400/30 shadow-xl mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-orange-400" />
            Risk Score Progression (2024)
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                name="Average Risk Score" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/predict')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-3 justify-center hover:scale-105"
          >
            <Shield className="w-5 h-5" />
            Run Risk Prediction
          </button>

          <button
            onClick={() => navigate('/emergency-alert')}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 flex items-center gap-3 justify-center hover:scale-105"
          >
            🚨 Alert Higher Authorities
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 justify-center hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default RiskAnalytics;
