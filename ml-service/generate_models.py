import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

# Dummy data for training
np.random.seed(42)

# For risk model
n_samples = 1000
features_risk = ['latitude', 'longitude', 'landslide_trigger_encoded', 'landslide_size_encoded', 'division_encoded', 'annual_rainfall_mm']
X_risk = np.random.rand(n_samples, 6)
y_risk = np.random.randint(0, 2, n_samples)

model_risk = RandomForestClassifier(n_estimators=10, random_state=42)
model_risk.fit(X_risk, y_risk)

# For slope model
features_slope = ['Unit Weight (kN/m³)', 'Cohesion (kPa)', 'Internal Friction Angle (°)', 'Slope Angle (°)', 'Slope Height (m)', 'Pore Water Pressure Ratio', 'Reinforcement Type Encoded']
X_slope = np.random.rand(n_samples, 7)
y_slope = np.random.rand(n_samples) * 2 + 0.5  # Factor of safety between 0.5 and 2.5

model_slope = RandomForestRegressor(n_estimators=10, random_state=42)
model_slope.fit(X_slope, y_slope)

# Encoders
triggers = ['Rainfall', 'Earthquake', 'Human Activity', 'Construction', 'Mining']
sizes = ['Small', 'Medium', 'Large', 'Very Large']
divisions = ['Jharkhand', 'Odisha', 'Chhattisgarh', 'Maharashtra', 'West Bengal']
reinforcements = ['None', 'Rock Bolts', 'Shotcrete', 'Anchors', 'Retaining Wall']

le_trigger = LabelEncoder()
le_trigger.fit(triggers)

le_size = LabelEncoder()
le_size.fit(sizes)

le_division = LabelEncoder()
le_division.fit(divisions)

le_reinforcement = LabelEncoder()
le_reinforcement.fit(reinforcements)

# Save models
joblib.dump(model_risk, 'models/rockfall_risk_model.joblib')
joblib.dump(le_trigger, 'models/risk_trigger_encoder.joblib')
joblib.dump(le_size, 'models/risk_size_encoder.joblib')
joblib.dump(le_division, 'models/risk_division_encoder.joblib')
joblib.dump(model_slope, 'models/slope_stability_model.joblib')
joblib.dump(le_reinforcement, 'models/slope_reinforcement_encoder.joblib')

print("Dummy models generated successfully!")