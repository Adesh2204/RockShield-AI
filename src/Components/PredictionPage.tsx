import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Shield, AlertTriangle, TrendingUp, 
  MapPin, Activity, Layers, Mountain, Target, Gauge 
} from 'lucide-react';

const API_BASE = '/api';

const PredictionPage: React.FC = () => {
  const navigate = useNavigate();
  const [formRisk, setFormRisk] = useState({
    latitude: 23.5,
    longitude: 85.3,
    landslide_trigger: 'Rainfall',
    landslide_size: 'Medium',
    admin_division_name: 'Jharkhand',
    annual_rainfall_mm: 1200
  });
  const [formSlope, setFormSlope] = useState({
    'Unit Weight (kN/m³)': 18,
    'Cohesion (kPa)': 25,
    'Internal Friction Angle (°)': 30,
    'Slope Angle (°)': 35,
    'Slope Height (m)': 20,
    'Pore Water Pressure Ratio': 0.2,
    'Reinforcement Type': 'None'
  });
  const [options, setOptions] = useState<null | {
    triggers: string[];
    sizes: string[];
    divisions: string[];
    reinforcements: string[];
  }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultRisk, setResultRisk] = useState<null | { high_risk_probability: number }>(null);
  const [resultSlope, setResultSlope] = useState<null | { factor_of_safety: number }>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await fetch(`${API_BASE}/options`);
        if (res.ok) {
          const data = await res.json();
          setOptions({
            triggers: data.triggers || [],
            sizes: data.sizes || [],
            divisions: data.divisions || [],
            reinforcements: data.reinforcements || []
          });
        }
      } catch (_) {
        // Silently ignore; form will still work with free-text inputs
      }
    };
    loadOptions();
  }, []);

  const handleRiskChange = (key: string, value: string | number) => {
    setFormRisk(prev => ({ ...prev, [key]: value }));
  };
  const handleSlopeChange = (key: keyof typeof formSlope, value: string | number) => {
    setFormSlope(prev => ({ ...prev, [key]: value as any }));
  };

  const handleSubmitRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultRisk(null);
    try {
      const res = await fetch(`${API_BASE}/predict_risk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formRisk)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setResultRisk({ high_risk_probability: data.high_risk_probability });
    } catch (err: any) {
      setError(err?.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSlope = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultSlope(null);
    try {
      const res = await fetch(`${API_BASE}/predict_stability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formSlope)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setResultSlope({ factor_of_safety: data.factor_of_safety });
    } catch (err: any) {
      setError(err?.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 font-['Poppins']">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-2 rounded-xl shadow-lg">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">RockShield AI</h1>
                <p className="text-xs text-blue-200">Risk Prediction System</p>
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
          <motion.div
            className="mb-6 inline-block"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-4xl">⛰️</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Rockfall Risk Prediction
          </h2>
          <p className="text-xl text-blue-200">
            Advanced AI-powered analysis for mining safety
          </p>
        </motion.div>

        {/* Rockfall Risk Assessment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-400" />
            <h3 className="text-3xl font-bold text-white">Rockfall Risk Assessment</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Risk Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-orange-400/30 shadow-xl p-6"
            >
              <form onSubmit={handleSubmitRisk} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      Latitude
                    </label>
                    <input 
                      type="number" 
                      step="0.0001" 
                      value={formRisk.latitude} 
                      onChange={(e) => handleRiskChange('latitude', parseFloat(e.target.value))} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      Longitude
                    </label>
                    <input 
                      type="number" 
                      step="0.0001" 
                      value={formRisk.longitude} 
                      onChange={(e) => handleRiskChange('longitude', parseFloat(e.target.value))} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                    <Activity className="w-4 h-4 text-orange-400" />
                    Annual Rainfall (mm)
                  </label>
                  <input 
                    type="number" 
                    value={formRisk.annual_rainfall_mm} 
                    onChange={(e) => handleRiskChange('annual_rainfall_mm', parseInt(e.target.value))} 
                    className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <Target className="w-4 h-4 text-orange-400" />
                      Trigger Type
                    </label>
                    {options?.triggers?.length ? (
                      <select 
                        value={formRisk.landslide_trigger} 
                        onChange={(e) => handleRiskChange('landslide_trigger', e.target.value)} 
                        className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                      >
                        {options.triggers.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        value={formRisk.landslide_trigger} 
                        onChange={(e) => handleRiskChange('landslide_trigger', e.target.value)} 
                        className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                      />
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <Layers className="w-4 h-4 text-orange-400" />
                      Landslide Size
                    </label>
                    {options?.sizes?.length ? (
                      <select 
                        value={formRisk.landslide_size} 
                        onChange={(e) => handleRiskChange('landslide_size', e.target.value)} 
                        className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                      >
                        {options.sizes.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        value={formRisk.landslide_size} 
                        onChange={(e) => handleRiskChange('landslide_size', e.target.value)} 
                        className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    Administrative Division
                  </label>
                  {options?.divisions?.length ? (
                    <select 
                      value={formRisk.admin_division_name} 
                      onChange={(e) => handleRiskChange('admin_division_name', e.target.value)} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                    >
                      {options.divisions.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      value={formRisk.admin_division_name} 
                      onChange={(e) => handleRiskChange('admin_division_name', e.target.value)} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-orange-400 focus:outline-none transition-colors"
                    />
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-3 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5" />
                      Predict Risk Level
                    </>
                  )}
                </motion.button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 text-red-200 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Risk Result */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-orange-400/30 shadow-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-orange-400" />
                <h4 className="text-2xl font-bold text-white">Risk Assessment Result</h4>
              </div>

              {!resultRisk && !error && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-12 h-12 text-orange-400" />
                  </div>
                  <p className="text-blue-200 text-lg mb-2">Ready for Analysis</p>
                  <p className="text-slate-400 text-sm">Fill out the form and click "Predict Risk Level" to get your assessment</p>
                </div>
              )}

              {resultRisk && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <div className={`relative w-40 h-40 rounded-full flex items-center justify-center ${
                        resultRisk.high_risk_probability > 0.7 
                          ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-4 border-red-500/50'
                          : resultRisk.high_risk_probability > 0.4
                          ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-4 border-orange-500/50'
                          : 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-4 border-green-500/50'
                      }`}>
                        <div className="text-center">
                          <div className={`text-5xl font-bold ${
                            resultRisk.high_risk_probability > 0.7 
                              ? 'text-red-400'
                              : resultRisk.high_risk_probability > 0.4
                              ? 'text-orange-400'
                              : 'text-green-400'
                          }`}>
                            {Math.round(resultRisk.high_risk_probability * 100)}%
                          </div>
                          <div className="text-white text-xs mt-1">Risk Level</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className={`p-4 rounded-xl ${
                      resultRisk.high_risk_probability > 0.7 
                        ? 'bg-red-500/20 border border-red-400/30'
                        : resultRisk.high_risk_probability > 0.4
                        ? 'bg-orange-500/20 border border-orange-400/30'
                        : 'bg-green-500/20 border border-green-400/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">Risk Classification:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          resultRisk.high_risk_probability > 0.7 
                            ? 'bg-red-500 text-white'
                            : resultRisk.high_risk_probability > 0.4
                            ? 'bg-orange-500 text-white'
                            : 'bg-green-500 text-white'
                        }`}>
                          {resultRisk.high_risk_probability > 0.7 ? 'HIGH RISK' : resultRisk.high_risk_probability > 0.4 ? 'MEDIUM RISK' : 'LOW RISK'}
                        </span>
                      </div>
                      <p className="text-blue-100 text-sm">
                        {resultRisk.high_risk_probability > 0.7 
                          ? 'Immediate safety measures required. High probability of rockfall incident.'
                          : resultRisk.high_risk_probability > 0.4
                          ? 'Moderate risk detected. Regular monitoring and preventive measures recommended.'
                          : 'Low risk level. Continue standard safety protocols.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <div className="text-slate-400 text-xs mb-1">Probability</div>
                        <div className="text-white font-bold">{(resultRisk.high_risk_probability * 100).toFixed(2)}%</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <div className="text-slate-400 text-xs mb-1">Confidence</div>
                        <div className="text-white font-bold">
                          {resultRisk.high_risk_probability > 0.7 || resultRisk.high_risk_probability < 0.3 ? 'High' : 'Moderate'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Slope Stability Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Gauge className="w-8 h-8 text-blue-400" />
            <h3 className="text-3xl font-bold text-white">Slope Stability Analysis</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Slope Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-400/30 shadow-xl p-6"
            >
              <form onSubmit={handleSubmitSlope} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <Layers className="w-4 h-4 text-blue-400" />
                      Unit Weight (kN/m³)
                    </label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={formSlope['Unit Weight (kN/m³)']} 
                      onChange={(e) => handleSlopeChange('Unit Weight (kN/m³)', parseFloat(e.target.value))} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      Cohesion (kPa)
                    </label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={formSlope['Cohesion (kPa)']} 
                      onChange={(e) => handleSlopeChange('Cohesion (kPa)', parseFloat(e.target.value))} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      Friction Angle (°)
                    </label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={formSlope['Internal Friction Angle (°)']} 
                      onChange={(e) => handleSlopeChange('Internal Friction Angle (°)', parseFloat(e.target.value))} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <Mountain className="w-4 h-4 text-blue-400" />
                      Slope Angle (°)
                    </label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={formSlope['Slope Angle (°)']} 
                      onChange={(e) => handleSlopeChange('Slope Angle (°)', parseFloat(e.target.value))} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      Slope Height (m)
                    </label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={formSlope['Slope Height (m)']} 
                      onChange={(e) => handleSlopeChange('Slope Height (m)', parseFloat(e.target.value))} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                      <Activity className="w-4 h-4 text-blue-400" />
                      Water Pressure Ratio
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={formSlope['Pore Water Pressure Ratio']} 
                      onChange={(e) => handleSlopeChange('Pore Water Pressure Ratio', parseFloat(e.target.value))} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    Reinforcement Type
                  </label>
                  {options?.reinforcements?.length ? (
                    <select 
                      value={formSlope['Reinforcement Type']} 
                      onChange={(e) => handleSlopeChange('Reinforcement Type', e.target.value)} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-blue-400 focus:outline-none transition-colors"
                    >
                      {options.reinforcements.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      value={formSlope['Reinforcement Type']} 
                      onChange={(e) => handleSlopeChange('Reinforcement Type', e.target.value)} 
                      className="w-full bg-slate-900/50 text-white rounded-xl px-4 py-3 border border-slate-700 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Gauge className="w-5 h-5" />
                      Calculate Factor of Safety
                    </>
                  )}
                </motion.button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 text-red-200 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Slope Result */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-400/30 shadow-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-400" />
                <h4 className="text-2xl font-bold text-white">Stability Analysis Result</h4>
              </div>

              {!resultSlope && !error && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                    <Gauge className="w-12 h-12 text-blue-400" />
                  </div>
                  <p className="text-blue-200 text-lg mb-2">Ready for Calculation</p>
                  <p className="text-slate-400 text-sm">Enter slope parameters and click "Calculate Factor of Safety"</p>
                </div>
              )}

              {resultSlope && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <div className={`relative w-40 h-40 rounded-full flex items-center justify-center ${
                        resultSlope.factor_of_safety < 1.0 
                          ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-4 border-red-500/50'
                          : resultSlope.factor_of_safety < 1.5
                          ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-4 border-orange-500/50'
                          : 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-4 border-green-500/50'
                      }`}>
                        <div className="text-center">
                          <div className={`text-5xl font-bold ${
                            resultSlope.factor_of_safety < 1.0 
                              ? 'text-red-400'
                              : resultSlope.factor_of_safety < 1.5
                              ? 'text-orange-400'
                              : 'text-green-400'
                          }`}>
                            {resultSlope.factor_of_safety.toFixed(2)}
                          </div>
                          <div className="text-white text-xs mt-1">FoS Value</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className={`p-4 rounded-xl ${
                      resultSlope.factor_of_safety < 1.0 
                        ? 'bg-red-500/20 border border-red-400/30'
                        : resultSlope.factor_of_safety < 1.5
                        ? 'bg-orange-500/20 border border-orange-400/30'
                        : 'bg-green-500/20 border border-green-400/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">Stability Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          resultSlope.factor_of_safety < 1.0 
                            ? 'bg-red-500 text-white'
                            : resultSlope.factor_of_safety < 1.5
                            ? 'bg-orange-500 text-white'
                            : 'bg-green-500 text-white'
                        }`}>
                          {resultSlope.factor_of_safety < 1.0 ? 'UNSTABLE' : resultSlope.factor_of_safety < 1.5 ? 'MARGINAL' : 'STABLE'}
                        </span>
                      </div>
                      <p className="text-blue-100 text-sm">
                        {resultSlope.factor_of_safety < 1.0 
                          ? 'Critical! Slope is unstable. Immediate reinforcement required.'
                          : resultSlope.factor_of_safety < 1.5
                          ? 'Marginal stability. Additional support measures recommended.'
                          : 'Slope is stable under current conditions. Maintain monitoring protocols.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <div className="text-slate-400 text-xs mb-1">Factor of Safety</div>
                        <div className="text-white font-bold">{resultSlope.factor_of_safety.toFixed(3)}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <div className="text-slate-400 text-xs mb-1">Safety Margin</div>
                        <div className="text-white font-bold">
                          {resultSlope.factor_of_safety >= 1.5 ? 'Adequate' : resultSlope.factor_of_safety >= 1.0 ? 'Minimal' : 'Critical'}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-slate-400 text-xs mb-2">Interpretation Guide</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-blue-100">FoS ≥ 1.5: Safe & Stable</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span className="text-blue-100">FoS 1.0-1.5: Needs Monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-blue-100">FoS &lt; 1.0: Critical Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/analytics')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3 justify-center hover:scale-105"
          >
            📊 View Risk Analytics
          </button>

          <button
            onClick={() => navigate('/satellite-map')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 flex items-center gap-3 justify-center hover:scale-105"
          >
            🛰️ Satellite Map
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

export default PredictionPage;


