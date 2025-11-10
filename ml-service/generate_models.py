import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

# Realistic data for training with meaningful correlations
np.random.seed(42)

# For risk model - create realistic training data
n_samples = 2000

# Generate realistic features
latitudes = np.random.uniform(20, 30, n_samples)  # India latitude range
longitudes = np.random.uniform(70, 90, n_samples)  # India longitude range
rainfall_mm = np.random.normal(1200, 400, n_samples)  # Rainfall data
rainfall_mm = np.clip(rainfall_mm, 200, 3000)  # Reasonable range

# Trigger types (encoded)
trigger_encoded = np.random.randint(0, 5, n_samples)  # 0-4 for 5 trigger types
size_encoded = np.random.randint(0, 4, n_samples)     # 0-3 for 4 size categories  
division_encoded = np.random.randint(0, 5, n_samples)  # 0-4 for 5 divisions

# Create realistic risk correlation
# High risk factors: high rainfall, certain triggers, large landslides, specific locations
risk_score = (
    (rainfall_mm / 2500.0) * 0.35 +   # Higher rainfall = higher risk
    ((trigger_encoded + 1) / 5.0) * 0.25 +  # Some triggers more dangerous
    ((size_encoded + 1) / 4.0) * 0.25 +     # Larger landslides = higher risk
    ((division_encoded + 1) / 5.0) * 0.10 + # Location factor
    0.05  # Base risk level
)

# Add some noise and geological factors
geological_risk = np.random.normal(0, 0.15, n_samples)  # Increased variability
risk_score += geological_risk

# Ensure we get better distribution across risk levels
risk_score = np.clip(risk_score, 0.05, 0.95)  # Keep in reasonable range

# Convert to binary classification (high/low risk)
# Use dynamic threshold to create meaningful distribution with more medium risk
risk_threshold = np.percentile(risk_score, 50)  # Top 50% are high risk
y_risk = (risk_score > risk_threshold).astype(int)

# Create feature matrix
X_risk = np.column_stack([
    latitudes, longitudes, trigger_encoded, 
    size_encoded, division_encoded, rainfall_mm
])

# Train with more robust model
model_risk = RandomForestClassifier(
    n_estimators=100, 
    max_depth=10, 
    random_state=42,
    class_weight='balanced'
)
model_risk.fit(X_risk, y_risk)

# For slope stability model - create realistic engineering data
unit_weights = np.random.normal(18, 2, n_samples)  # Typical soil unit weight
unit_weights = np.clip(unit_weights, 14, 25)

cohesions = np.random.gamma(2, 15, n_samples)  # Cohesion values
cohesions = np.clip(cohesions, 5, 100)

friction_angles = np.random.normal(30, 8, n_samples)  # Internal friction angle
friction_angles = np.clip(friction_angles, 15, 45)

slope_angles = np.random.normal(35, 10, n_samples)  # Slope angles
slope_angles = np.clip(slope_angles, 10, 60)

slope_heights = np.random.gamma(3, 8, n_samples)  # Slope heights
slope_heights = np.clip(slope_heights, 5, 50)

pore_pressures = np.random.beta(2, 5, n_samples)  # Pore water pressure ratio (0-1)
reinforcement_encoded = np.random.randint(0, 5, n_samples)

# Calculate realistic Factor of Safety using simplified Mohr-Coulomb
# FoS = (cohesion + sigma_normal * tan(phi)) / tau_driving
c_prime = cohesions
phi_rad = np.radians(friction_angles)
beta_rad = np.radians(slope_angles)
gamma = unit_weights
h = slope_heights
ru = pore_pressures

# Simplified slope stability calculation
sigma_normal = gamma * h * np.cos(beta_rad)**2 * (1 - ru)
tau_driving = gamma * h * np.sin(beta_rad) * np.cos(beta_rad)
tau_resisting = c_prime + sigma_normal * np.tan(phi_rad)

# Factor of Safety
factor_of_safety = tau_resisting / (tau_driving + 0.1)  # Add small value to avoid division by zero

# Add reinforcement effect
reinforcement_bonus = reinforcement_encoded * 0.2  # Each reinforcement type adds to FoS
factor_of_safety += reinforcement_bonus

# Clip to reasonable range
y_slope = np.clip(factor_of_safety, 0.3, 4.0)

X_slope = np.column_stack([
    unit_weights, cohesions, friction_angles,
    slope_angles, slope_heights, pore_pressures,
    reinforcement_encoded
])

# Train slope model with better parameters
model_slope = RandomForestRegressor(
    n_estimators=100,
    max_depth=12,
    random_state=42
)
model_slope.fit(X_slope, y_slope)

# Encoders with expanded categories
triggers = ['Rainfall', 'Earthquake', 'Human Activity', 'Construction', 'Mining']
sizes = ['Small', 'Medium', 'Large', 'Very Large']
divisions = ['Jharkhand', 'Odisha', 'Chhattisgarh', 'Maharashtra', 'West Bengal', 'Karnataka']
reinforcements = ['None', 'Rock Bolts', 'Shotcrete', 'Anchors', 'Retaining Wall']

le_trigger = LabelEncoder()
le_trigger.fit(triggers)

le_size = LabelEncoder()
le_size.fit(sizes)

le_division = LabelEncoder()
le_division.fit(divisions)

le_reinforcement = LabelEncoder()
le_reinforcement.fit(reinforcements)

# Save models with improved training
joblib.dump(model_risk, 'models/rockfall_risk_model.joblib')
joblib.dump(le_trigger, 'models/risk_trigger_encoder.joblib')
joblib.dump(le_size, 'models/risk_size_encoder.joblib')
joblib.dump(le_division, 'models/risk_division_encoder.joblib')
joblib.dump(model_slope, 'models/slope_stability_model.joblib')
joblib.dump(le_reinforcement, 'models/slope_reinforcement_encoder.joblib')

print("Realistic ML models generated successfully!")
print(f"Risk model trained with {n_samples} samples")
print(f"Risk distribution: {(y_risk == 1).sum()}/{n_samples} high-risk samples")
print(f"Slope FoS range: {y_slope.min():.2f} - {y_slope.max():.2f}")
print("Models saved to 'models/' directory")

print("Dummy models generated successfully!")