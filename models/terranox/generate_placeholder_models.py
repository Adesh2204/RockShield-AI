"""
Placeholder Model Generator for Terranox-AI Integration

Models and code adapted from Terranox-AI (MIT license) — https://github.com/Aniketkoppaka/Terranox-AI

This script generates placeholder models if the actual trained models are not available.
These are minimal models trained on synthetic data and should be replaced with real
trained models for production use.

WARNING: These are placeholder models for testing purposes only.
"""

import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import os

# Set random seed for reproducibility
np.random.seed(42)

# Create models directory if it doesn't exist
os.makedirs(os.path.dirname(__file__), exist_ok=True)

print("Generating placeholder models for Terranox-AI integration...")

# ===== Risk Model =====
n_samples = 1000
# Features: latitude, longitude, landslide_trigger_encoded, landslide_size_encoded, 
#           division_encoded, annual_rainfall_mm, year, month, day, dayofweek
X_risk = np.random.rand(n_samples, 10)
# Add some structure to make it more realistic
X_risk[:, 0] = X_risk[:, 0] * 40 - 20  # latitude range
X_risk[:, 1] = X_risk[:, 1] * 100 - 50  # longitude range
X_risk[:, 5] = X_risk[:, 5] * 3000  # annual_rainfall_mm
X_risk[:, 6] = np.random.randint(2020, 2025, n_samples)  # year
X_risk[:, 7] = np.random.randint(1, 13, n_samples)  # month
X_risk[:, 8] = np.random.randint(1, 29, n_samples)  # day
X_risk[:, 9] = np.random.randint(0, 7, n_samples)  # dayofweek

y_risk = np.random.randint(0, 2, n_samples)

model_risk = RandomForestClassifier(n_estimators=50, random_state=42, max_depth=10)
model_risk.fit(X_risk, y_risk)

# ===== Slope Stability Model =====
# Features: Unit Weight, Cohesion, Friction Angle, Slope Angle, Slope Height, 
#           Pore Water Pressure Ratio, Reinforcement Type Encoded
X_slope = np.random.rand(n_samples, 7)
X_slope[:, 0] = X_slope[:, 0] * 20 + 15  # Unit Weight (kN/m³): 15-35
X_slope[:, 1] = X_slope[:, 1] * 100  # Cohesion (kPa): 0-100
X_slope[:, 2] = X_slope[:, 2] * 40 + 20  # Internal Friction Angle (°): 20-60
X_slope[:, 3] = X_slope[:, 3] * 60 + 10  # Slope Angle (°): 10-70
X_slope[:, 4] = X_slope[:, 4] * 100 + 10  # Slope Height (m): 10-110
X_slope[:, 5] = X_slope[:, 5] * 0.5  # Pore Water Pressure Ratio: 0-0.5
X_slope[:, 6] = np.random.randint(0, 5, n_samples)  # Reinforcement Type Encoded

# Factor of Safety: 0.5 to 2.5
y_slope = np.random.rand(n_samples) * 2 + 0.5

model_slope = RandomForestRegressor(n_estimators=50, random_state=42, max_depth=10)
model_slope.fit(X_slope, y_slope)

# ===== Label Encoders =====
triggers = ['Rainfall', 'Earthquake', 'Human Activity', 'Construction', 'Mining']
sizes = ['Small', 'Medium', 'Large', 'Very Large']
divisions = ['Jharkhand', 'Odisha', 'Chhattisgarh', 'Maharashtra', 'West Bengal', 
             'Karnataka', 'Tamil Nadu', 'Andhra Pradesh']
reinforcements = ['None', 'Rock Bolts', 'Shotcrete', 'Anchors', 'Retaining Wall']

le_trigger = LabelEncoder()
le_trigger.fit(triggers)

le_size = LabelEncoder()
le_size.fit(sizes)

le_division = LabelEncoder()
le_division.fit(divisions)

le_reinforcement = LabelEncoder()
le_reinforcement.fit(reinforcements)

# ===== Save Models =====
base_dir = os.path.dirname(__file__)

# Save with Terranox-AI naming convention
joblib.dump(model_risk, os.path.join(base_dir, 'rockfall_risk_model_india_tuned.joblib'))
joblib.dump(model_slope, os.path.join(base_dir, 'slope_stability_model_tuned.joblib'))
joblib.dump(le_division, os.path.join(base_dir, 'le_division_india.joblib'))
joblib.dump(le_trigger, os.path.join(base_dir, 'le_trigger_india.joblib'))
joblib.dump(le_size, os.path.join(base_dir, 'le_size_india.joblib'))
joblib.dump(le_reinforcement, os.path.join(base_dir, 'le_reinforcement.joblib'))

# Also save with alternative naming convention
joblib.dump(model_risk, os.path.join(base_dir, 'rockfall_risk_model.joblib'))
joblib.dump(model_slope, os.path.join(base_dir, 'slope_stability_model.joblib'))
joblib.dump(le_division, os.path.join(base_dir, 'risk_division_encoder.joblib'))
joblib.dump(le_trigger, os.path.join(base_dir, 'risk_trigger_encoder.joblib'))
joblib.dump(le_size, os.path.join(base_dir, 'risk_size_encoder.joblib'))
joblib.dump(le_reinforcement, os.path.join(base_dir, 'slope_reinforcement_encoder.joblib'))

print("✓ Placeholder models generated successfully!")
print("  WARNING: These are placeholder models for testing. Replace with real trained models for production.")

