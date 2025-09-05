import joblib
import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

model_risk = None
model_slope = None
le_trigger = None
le_size = None
le_division = None
le_reinforcement = None

try:
    model_risk = joblib.load('models/rockfall_risk_model.joblib')
    le_trigger = joblib.load('models/risk_trigger_encoder.joblib')
    le_size = joblib.load('models/risk_size_encoder.joblib')
    le_division = joblib.load('models/risk_division_encoder.joblib')
    model_slope = joblib.load('models/slope_stability_model.joblib')
    le_reinforcement = joblib.load('models/slope_reinforcement_encoder.joblib')
    print("Models and encoders loaded successfully.")
except Exception as e:
    # Keep running with graceful fallbacks
    print(f"Warning: Failed to load one or more model files: {e}")
    print("Fallback heuristics will be used. To enable real predictions, fix model files and restart.")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'risk_model_loaded': model_risk is not None,
        'slope_model_loaded': model_slope is not None,
        'encoders_loaded': all(x is not None for x in [le_trigger, le_size, le_division, le_reinforcement])
    })

@app.route('/options', methods=['GET'])
def get_options():
    try:
        if all(x is not None for x in [le_trigger, le_size, le_division, le_reinforcement]):
            options = {
                'triggers': sorted(list(le_trigger.classes_)),
                'sizes': sorted(list(le_size.classes_)),
                'divisions': sorted(list(le_division.classes_)),
                'reinforcements': sorted(list(le_reinforcement.classes_))
            }
        else:
            # Fallback defaults if encoders are not available
            options = {
                'triggers': ['Rainfall', 'Earthquake', 'Human Activity'],
                'sizes': ['Small', 'Medium', 'Large'],
                'divisions': ['Jharkhand', 'Odisha', 'Chhattisgarh'],
                'reinforcements': ['None', 'Rock Bolts', 'Shotcrete']
            }
        return jsonify(options)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/predict_risk', methods=['POST'])
def predict_risk():
    try:
        data = request.get_json(force=True)
        # Validate minimal required keys
        required = ['latitude', 'longitude', 'landslide_trigger', 'landslide_size', 'admin_division_name', 'annual_rainfall_mm']
        missing = [k for k in required if k not in data]
        if missing:
            return jsonify({'error': f"Missing fields: {', '.join(missing)}"}), 400

        if model_risk is None or le_trigger is None or le_size is None or le_division is None:
            # Heuristic fallback if real model/encoders are unavailable
            lat = float(data['latitude'])
            lon = float(data['longitude'])
            rain = float(data['annual_rainfall_mm'])
            trigger_score = 0.6 if str(data['landslide_trigger']).lower() == 'rainfall' else 0.4
            size_score = 0.7 if str(data['landslide_size']).lower() == 'large' else (0.5 if str(data['landslide_size']).lower() == 'medium' else 0.3)
            geo_score = (abs(lat) + abs(lon)) % 1 * 0.2
            score = min(0.99, max(0.01, 0.3 * trigger_score + 0.3 * size_score + 0.4 * (rain / 2000.0) + geo_score))
            return jsonify({'high_risk_probability': round(score, 4), 'fallback': True}), 200

        # Real model path
        if data['admin_division_name'] not in le_division.classes_:
            return jsonify({'error': f"Unknown location: '{data['admin_division_name']}'. Please select a valid location from the list."}), 400
        if data['landslide_trigger'] not in le_trigger.classes_:
            return jsonify({'error': f"Unknown trigger: '{data['landslide_trigger']}'."}), 400
        if data['landslide_size'] not in le_size.classes_:
            return jsonify({'error': f"Unknown size: '{data['landslide_size']}'."}), 400

        input_df = pd.DataFrame([data])
        input_df['landslide_trigger_encoded'] = le_trigger.transform(input_df['landslide_trigger'])
        input_df['landslide_size_encoded'] = le_size.transform(input_df['landslide_size'])
        input_df['division_encoded'] = le_division.transform(input_df['admin_division_name'])

        features_risk = ['latitude', 'longitude', 'landslide_trigger_encoded', 'landslide_size_encoded',
                         'division_encoded', 'annual_rainfall_mm']

        prediction_proba = model_risk.predict_proba(input_df[features_risk])
        high_risk_probability = prediction_proba[0][1]

        return jsonify({'high_risk_probability': round(high_risk_probability, 4)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/predict_stability', methods=['POST'])
def predict_stability():
    try:
        data = request.get_json(force=True)
        required = [
            'Unit Weight (kN/m³)', 'Cohesion (kPa)', 'Internal Friction Angle (°)',
            'Slope Angle (°)', 'Slope Height (m)', 'Pore Water Pressure Ratio',
            'Reinforcement Type'
        ]
        missing = [k for k in required if k not in data]
        if missing:
            return jsonify({'error': f"Missing fields: {', '.join(missing)}"}), 400

        if model_slope is None or le_reinforcement is None:
            # Simple Mohr-Coulomb style heuristic fallback for Factor of Safety
            gamma = float(data['Unit Weight (kN/m³)'])
            c = float(data['Cohesion (kPa)'])
            phi = float(data['Internal Friction Angle (°)'])
            beta = float(data['Slope Angle (°)'])
            h = float(data['Slope Height (m)'])
            ru = float(data['Pore Water Pressure Ratio'])
            reinforcement_bonus = 0.2 if str(data['Reinforcement Type']).lower() != 'none' else 0.0
            # This is NOT a real geotechnical calculation; just a placeholder to keep UX working
            base = 1.0 + (c/100.0) + (phi/180.0) - (beta/180.0) - (ru*0.5) + reinforcement_bonus - (gamma/300.0) + (1.0/(1.0 + h/50.0))
            fos = max(0.3, min(2.5, base))
            return jsonify({'factor_of_safety': round(fos, 3), 'fallback': True}), 200

        if data['Reinforcement Type'] not in le_reinforcement.classes_:
            return jsonify({'error': f"Unknown Reinforcement Type: '{data['Reinforcement Type']}'."}), 400

        input_df = pd.DataFrame([data])
        input_df['Reinforcement Type Encoded'] = le_reinforcement.transform(input_df['Reinforcement Type'])

        features_slope = [
            'Unit Weight (kN/m³)', 'Cohesion (kPa)', 'Internal Friction Angle (°)',
            'Slope Angle (°)', 'Slope Height (m)', 'Pore Water Pressure Ratio',
            'Reinforcement Type Encoded'
        ]

        prediction = model_slope.predict(input_df[features_slope])
        factor_of_safety = prediction[0]

        return jsonify({'factor_of_safety': round(factor_of_safety, 4)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    # Bind to all interfaces and disable the reloader to avoid intermittent restarts during requests
    app.run(host='0.0.0.0', port=5001, debug=False, use_reloader=False, threaded=True)
