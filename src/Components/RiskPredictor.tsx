import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Brain, TrendingUp } from 'lucide-react';
import './RiskPredictor.css';

const RiskPredictor: React.FC = () => {
  const [inputs, setInputs] = useState({
    slope: 30,
    rainfall: 45,
    vibration: 3.5,
    displacement: 5
  });

  const [prediction, setPrediction] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    // Simulate AI prediction calculation
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const riskScore = (
        (inputs.slope * 0.3) +
        (inputs.rainfall * 0.25) +
        (inputs.vibration * 0.25) +
        (inputs.displacement * 0.2)
      );
      setPrediction(Math.min(Math.max(riskScore, 0), 100));
      setIsCalculating(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputs]);

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'Critical', color: 'text-red-400', emoji: '🚨' };
    if (score >= 40) return { level: 'Caution', color: 'text-orange-400', emoji: '⚠️' };
    return { level: 'Safe', color: 'text-green-400', emoji: '✅' };
  };

  const riskInfo = getRiskLevel(prediction);

  const handleInputChange = (key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section id="predictor" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-['Poppins']">
            AI Risk Predictor
          </h2>
          <p className="text-xl text-blue-100 font-['Poppins'] font-light">
            Instant rockfall risk assessment powered by machine learning
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-orange-400" />
              <h3 className="text-2xl font-bold text-white">Input Parameters</h3>
            </div>

            <div className="space-y-6">
              {Object.entries(inputs).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300 capitalize">
                      {key === 'slope' && 'Slope Angle (°)'}
                      {key === 'rainfall' && 'Rainfall (mm/h)'}
                      {key === 'vibration' && 'Vibration (m/s²)'}
                      {key === 'displacement' && 'Displacement (mm)'}
                    </label>
                    <span className="text-white font-bold">{value}</span>
                  </div>
                  
                  <motion.input
                    type="range"
                    min={key === 'vibration' ? 0 : 0}
                    max={key === 'slope' ? 90 : key === 'vibration' ? 10 : 100}
                    step={key === 'vibration' ? 0.1 : 1}
                    value={value}
                    onChange={(e) => handleInputChange(key, parseFloat(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    whileTap={{ scale: 0.98 }}
                  />
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Min</span>
                    <span>Max</span>
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Brain className="w-5 h-5" />
              Recalculate Risk
            </motion.button>
          </motion.div>

          {/* Prediction Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Risk Assessment</h3>
                <div className="flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400">AI Powered Analysis</span>
                </div>
              </div>

              {/* Risk Gauge */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#374151"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  
                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={prediction >= 70 ? '#ef4444' : prediction >= 40 ? '#f97316' : '#22c55e'}
                    strokeWidth="6"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ 
                      strokeDashoffset: 2 * Math.PI * 45 * (1 - prediction / 100)
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="drop-shadow-lg"
                  />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    key={prediction}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl mb-2"
                  >
                    {riskInfo.emoji}
                  </motion.div>
                  <motion.span
                    key={prediction}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-bold text-white"
                  >
                    {isCalculating ? '...' : Math.round(prediction)}%
                  </motion.span>
                  <span className={`text-sm font-semibold ${riskInfo.color}`}>
                    {riskInfo.level}
                  </span>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-600">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-white">AI Recommendation</span>
                </div>
                
                <p className="text-sm text-gray-300">
                  {prediction >= 70 && "Immediate evacuation recommended. Deploy emergency response team."}
                  {prediction >= 40 && prediction < 70 && "Increase monitoring frequency. Prepare safety protocols."}
                  {prediction < 40 && "Continue normal operations. Maintain standard monitoring."}
                </p>
              </div>
            </div>

            {/* Floating calculation indicator */}
            {isCalculating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">Calculating...</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default RiskPredictor;