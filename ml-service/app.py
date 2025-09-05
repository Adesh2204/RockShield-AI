import joblib
import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

try:
    model_risk = joblib.load('models/rockfall_risk_model.joblib')
    le_trigger = joblib.load('models/risk_trigger_encoder.joblib')
    le_size = joblib.load('models/risk_size_encoder.joblib')
    le_division = joblib.load('models/risk_division_encoder.joblib')
    model_slope = joblib.load('models/slope_stability_model.joblib')
    le_reinforcement = joblib.load('models/slope_reinforcement_encoder.joblib')
    print("Models and encoders loaded successfully.")
except FileNotFoundError as e:
    print(f"Error loading model files: {e}")
    print("Please ensure all .joblib files are inside the 'models' folder.")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/options', methods=['GET'])
def get_options():
    try:
        options = {
            'triggers': sorted(list(le_trigger.classes_)),
            'sizes': sorted(list(le_size.classes_)),
            'divisions': sorted(list(le_division.classes_)),
            'reinforcements': sorted(list(le_reinforcement.classes_))
        }
        return jsonify(options)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/predict_risk', methods=['POST'])
def predict_risk():
    try:
        data = request.get_json(force=True)

        if data['admin_division_name'] not in le_division.classes_:
            return jsonify({
                               'error': f"Unknown location: '{data['admin_division_name']}'. Please select a valid location from the list."}), 400
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
    app.run(port=5000, debug=True)
