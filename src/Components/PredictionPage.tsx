import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const API_BASE = '/api';

const PredictionPage: React.FC = () => {
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
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Rockfall Risk Prediction</h1>
          <p className="text-slate-300">Enter parameters to get the high-risk probability.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form: Rockfall Risk */}
          <form onSubmit={handleSubmitRisk} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm">Latitude</label>
                <input type="number" step="0.0001" value={formRisk.latitude} onChange={(e) => handleRiskChange('latitude', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div>
                <label className="text-slate-300 text-sm">Longitude</label>
                <input type="number" step="0.0001" value={formRisk.longitude} onChange={(e) => handleRiskChange('longitude', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div className="col-span-2">
                <label className="text-slate-300 text-sm">Annual Rainfall (mm)</label>
                <input type="number" value={formRisk.annual_rainfall_mm} onChange={(e) => handleRiskChange('annual_rainfall_mm', parseInt(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div>
                <label className="text-slate-300 text-sm">Trigger</label>
                {options?.triggers?.length ? (
                  <select value={formRisk.landslide_trigger} onChange={(e) => handleRiskChange('landslide_trigger', e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700">
                    {options.triggers.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                ) : (
                  <input type="text" value={formRisk.landslide_trigger} onChange={(e) => handleRiskChange('landslide_trigger', e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
                )}
              </div>
              <div>
                <label className="text-slate-300 text-sm">Size</label>
                {options?.sizes?.length ? (
                  <select value={formRisk.landslide_size} onChange={(e) => handleRiskChange('landslide_size', e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700">
                    {options.sizes.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                ) : (
                  <input type="text" value={formRisk.landslide_size} onChange={(e) => handleRiskChange('landslide_size', e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
                )}
              </div>
              <div className="col-span-2">
                <label className="text-slate-300 text-sm">Admin Division</label>
                {options?.divisions?.length ? (
                  <select value={formRisk.admin_division_name} onChange={(e) => handleRiskChange('admin_division_name', e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700">
                    {options.divisions.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                ) : (
                  <input type="text" value={formRisk.admin_division_name} onChange={(e) => handleRiskChange('admin_division_name', e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
                )}
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} type="submit" className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg">
              {loading ? 'Predicting…' : 'Predict Risk'}
            </motion.button>

            {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}
          </form>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Result</h3>
            {!resultRisk && !error && <div className="text-slate-300">Submit the form to see the prediction.</div>}
            {resultRisk && (
              <div className="text-white text-lg">High-risk probability: {Math.round(resultRisk.high_risk_probability * 100)}%</div>
            )}
          </div>
        </div>

        {/* Form: Slope Stability */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <form onSubmit={handleSubmitSlope} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm">Unit Weight (kN/m³)</label>
                <input type="number" step="0.1" value={formSlope['Unit Weight (kN/m³)']} onChange={(e) => handleSlopeChange('Unit Weight (kN/m³)', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div>
                <label className="text-slate-300 text-sm">Cohesion (kPa)</label>
                <input type="number" step="0.1" value={formSlope['Cohesion (kPa)']} onChange={(e) => handleSlopeChange('Cohesion (kPa)', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div>
                <label className="text-slate-300 text-sm">Internal Friction Angle (°)</label>
                <input type="number" step="0.1" value={formSlope['Internal Friction Angle (°)']} onChange={(e) => handleSlopeChange('Internal Friction Angle (°)', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div>
                <label className="text-slate-300 text-sm">Slope Angle (°)</label>
                <input type="number" step="0.1" value={formSlope['Slope Angle (°)']} onChange={(e) => handleSlopeChange('Slope Angle (°)', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div>
                <label className="text-slate-300 text-sm">Slope Height (m)</label>
                <input type="number" step="0.1" value={formSlope['Slope Height (m)']} onChange={(e) => handleSlopeChange('Slope Height (m)', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div>
                <label className="text-slate-300 text-sm">Pore Water Pressure Ratio</label>
                <input type="number" step="0.01" value={formSlope['Pore Water Pressure Ratio']} onChange={(e) => handleSlopeChange('Pore Water Pressure Ratio', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
              </div>
              <div className="col-span-2">
                <label className="text-slate-300 text-sm">Reinforcement Type</label>
                {options?.reinforcements?.length ? (
                  <select value={formSlope['Reinforcement Type']} onChange={(e) => handleSlopeChange('Reinforcement Type', e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700">
                    {options.reinforcements.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                ) : (
                  <input type="text" value={formSlope['Reinforcement Type']} onChange={(e) => handleSlopeChange('Reinforcement Type', e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
                )}
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} type="submit" className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg">
              {loading ? 'Predicting…' : 'Predict Factor of Safety'}
            </motion.button>

            {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}
          </form>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Result</h3>
            {!resultSlope && !error && <div className="text-slate-300">Submit the form to see the prediction.</div>}
            {resultSlope && (
              <div className="text-white text-lg">Factor of Safety: {resultSlope.factor_of_safety}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionPage;


