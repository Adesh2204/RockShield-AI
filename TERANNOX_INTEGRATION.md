# Terranox-AI Model Integration

Models and code adapted from Terranox-AI (MIT license) — https://github.com/Aniketkoppaka/Terranox-AI

This document describes how to use the Terranox-AI model integration module in the RockShield-AI project.

## Overview

The Terranox-AI integration provides machine learning models for:
- **Rockfall Risk Prediction**: Predicts the probability of rockfall events based on geographic, temporal, and event-specific data
- **Slope Stability Analysis**: Calculates Factor of Safety for natural or man-made slopes using geotechnical parameters

## Installation

### 1. Model Files

Place model files in the `models/terranox/` directory. The integration module supports both naming conventions:

**Terranox-AI naming convention:**
- `rockfall_risk_model_india_tuned.joblib`
- `slope_stability_model_tuned.joblib`
- `le_division_india.joblib`
- `le_trigger_india.joblib`
- `le_size_india.joblib`
- `le_reinforcement.joblib`

**Alternative naming convention:**
- `rockfall_risk_model.joblib`
- `slope_stability_model.joblib`
- `risk_division_encoder.joblib`
- `risk_trigger_encoder.joblib`
- `risk_size_encoder.joblib`
- `slope_reinforcement_encoder.joblib`

### 2. Generate Placeholder Models (if needed)

If model files are not available, you can generate placeholder models for testing:

```bash
cd models/terranox
python generate_placeholder_models.py
```

**Warning**: Placeholder models are for testing only. Replace with real trained models for production use.

### 3. Environment Variables

The integration module may require the following environment variable (if using weather data features):

```bash
OPENWEATHERMAP_API_KEY=your_api_key_here
```

**Note**: Do not modify or remove existing host environment variables. Only append new ones if needed.

## Usage

### Basic Usage

```python
from terranox_integration import load_models, predict_rockfall, predict_slope_stability
import os

# Load models
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models', 'terranox')
models = load_models(MODEL_DIR)

# Check for errors
if models['errors']:
    print("Warning: Some models failed to load:", models['errors'])

# Rockfall Risk Prediction
rockfall_input = {
    'latitude': 23.5,
    'longitude': 85.3,
    'admin_division_name': 'Jharkhand',
    'landslide_trigger': 'Rainfall',
    'landslide_size': 'Medium',
    'annual_rainfall_mm': 1200.0
}

result = predict_rockfall(models, rockfall_input)
if result['error']:
    print("Error:", result['error'])
else:
    print(f"High Risk Probability: {result['probability']}")
    print(f"Feature Importance: {result['feature_importance']}")

# Slope Stability Prediction
stability_input = {
    'Unit Weight (kN/m³)': 20.0,
    'Cohesion (kPa)': 50.0,
    'Internal Friction Angle (°)': 30.0,
    'Slope Angle (°)': 35.0,
    'Slope Height (m)': 50.0,
    'Pore Water Pressure Ratio': 0.2,
    'Reinforcement Type': 'Rock Bolts'
}

result = predict_slope_stability(models, stability_input)
if result['error']:
    print("Error:", result['error'])
else:
    print(f"Factor of Safety: {result['factor_of_safety']}")
    print(f"Feature Importance: {result['feature_importance']}")
```

### Integration with Flask (Example)

The following is an example of how to integrate the module into existing Flask routes **without modifying existing route names**:

```python
# Example (do NOT install into routes automatically — just paste into your handler)
from terranox_integration import load_models, predict_rockfall
import os

# Load models once at application startup (e.g., in app factory)
MODEL_DIR = os.path.join(app.root_path, 'models', 'terranox')
models = load_models(MODEL_DIR)

# In your route handler (example)
@app.route('/your_existing_route', methods=['POST'])
def your_existing_handler():
    # Get input from request
    input_data = request.form.to_dict()  # or request.get_json()
    
    # Make prediction
    result = predict_rockfall(models, input_data)
    
    # Format result for existing UI
    # result is a dict with 'probability' and 'feature_importance'
    if result['error']:
        return jsonify({'error': result['error']}), 400
    
    return jsonify({
        'probability': result['probability'],
        'feature_importance': result['feature_importance']
    })
```

## API Reference

### `load_models(models_dir: str) -> dict`

Loads all models and encoders from the specified directory.

**Parameters:**
- `models_dir`: Path to the directory containing model files

**Returns:**
Dictionary with keys:
- `risk_model`: Loaded risk prediction model or None
- `slope_model`: Loaded slope stability model or None
- `le_division`: Division label encoder or None
- `le_trigger`: Trigger label encoder or None
- `le_size`: Size label encoder or None
- `le_reinforcement`: Reinforcement label encoder or None
- `errors`: List of error messages (empty if all models loaded successfully)

### `predict_rockfall(model_dict: dict, input_dict: dict) -> dict`

Predicts rockfall risk probability.

**Parameters:**
- `model_dict`: Dictionary returned by `load_models()`
- `input_dict`: Input features dictionary with keys:
  - `latitude`: float
  - `longitude`: float
  - `admin_division_name`: str
  - `landslide_trigger`: str
  - `landslide_size`: str
  - `annual_rainfall_mm`: float

**Returns:**
Dictionary with keys:
- `probability`: float (high risk probability, 0.0-1.0)
- `feature_importance`: dict (feature names to importance values)
- `error`: str or None (error message if prediction failed)

### `predict_slope_stability(model_dict: dict, input_dict: dict) -> dict`

Predicts slope stability (Factor of Safety).

**Parameters:**
- `model_dict`: Dictionary returned by `load_models()`
- `input_dict`: Input features dictionary with keys:
  - `Unit Weight (kN/m³)`: float
  - `Cohesion (kPa)`: float
  - `Internal Friction Angle (°)`: float
  - `Slope Angle (°)`: float
  - `Slope Height (m)`: float
  - `Pore Water Pressure Ratio`: float
  - `Reinforcement Type`: str

**Returns:**
Dictionary with keys:
- `factor_of_safety`: float (Factor of Safety value)
- `feature_importance`: dict (feature names to importance values)
- `error`: str or None (error message if prediction failed)

## Feature Mapping

If your host application uses different feature names, you can modify the `FEATURE_MAP` dictionary in `terranox_integration.py` to map your feature names to the expected names.

**Do NOT modify the host UI or forms automatically.** Only update the feature mapping in the integration module.

## Testing

Run the unit tests to verify the integration:

```bash
python -m pytest tests/test_terranox_integration.py
```

Or using unittest:

```bash
python -m unittest tests.test_terranox_integration
```

## Troubleshooting

### Models Not Loading

1. Check that model files exist in `models/terranox/` directory
2. Verify file permissions
3. Check the `errors` list in the `load_models()` return value
4. Generate placeholder models if needed: `python models/terranox/generate_placeholder_models.py`

### Invalid Categorical Values

If you get errors about invalid categorical values:
1. Check the encoder classes using: `encoder.classes_`
2. Ensure input values match exactly (case-sensitive)
3. Use the `/options` endpoint (if available) to get valid values

### Missing Features

If prediction fails due to missing features:
1. Verify all required features are present in the input dictionary
2. Check feature names match exactly (including spaces and special characters)
3. Review the feature mapping if using custom feature names

## License

This integration module is adapted from Terranox-AI, which is licensed under the MIT License. See the original repository for details: https://github.com/Aniketkoppaka/Terranox-AI

## Attribution

Models and code adapted from Terranox-AI (MIT license) — https://github.com/Aniketkoppaka/Terranox-AI

