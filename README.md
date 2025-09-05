RockShield AI
Real-Time Rockfall Prediction & Alert System for Open-Pit Mines
RockShield AI is an open-source, machine learning-powered platform designed to predict and prevent dangerous rockfall events in open-pit mining environments. It combines drone imagery, digital elevation models, live geotechnical and environmental sensor data, and state-of-the-art AI to deliver real-time risk mapping, probability-based forecasts, and instant alerts—making modern mine safety accessible, affordable, and scalable.

🚀 Features
	•	Multi-source Data Integration: Processes DEMs, drone-captured images, displacement/strain/pore-pressure sensors, rainfall, temperature, and vibration data.
	•	ML-Based Risk Prediction: Trains robust machine learning models (e.g., SVM, ensemble algorithms) to classify hazardous zones using both real and synthetic data.
	•	Interactive Dashboard: Visualises live risk maps, trendlines, and recent alerts; enables easy zone and incident exploration.
	•	Real-Time Alerting: Automatically dispatches SMS/email notifications to mine operators about emergent threats, including AI-generated suggested action plans.
	•	Open Hardware Integration: Ready for low-cost sensor platforms, supporting scalable safety for mines of every size.
	•	Scalable & Customizable: Modular codebase enabling adaptation for new sites, sensors, and regulatory needs.

📸 Screenshots
https://github.com/Adesh2204/RockShield-AI/blob/ca2edfba314d42c3fccbf20581a4f4aeb912cd87/RockShield-AI.png

📚 Documentation
	•	Setup guide: See `/docs/setup.md` for installation, hardware integration, and data source examples.
	•	ML details: `/docs/modelling.md` describes feature engineering, training procedures, and kernel comparisons.
	•	API reference: `/docs/api.md` for REST endpoints and integration instructions.

🎯 Project Impact
RockShield AI empowers safer, more resilient mining by providing instant situational awareness and actionable, proactive recommendations to planners and field personnel. Its open-source design encourages adaptation for global mining operations—public and private alike.

🛠️ Getting Started
	1.	Clone this repository: 
 git clone https://github.com/YOUR-USERNAME/rockshield-ai.git
cd rockshield-ai
2.	Install dependencies:
	•	Python >= 3.8 (for ML and backend)
	•	Node.js >= 16 (for frontend/dashboard)
	•	See `/backend/requirements.txt` and `/frontend/package.json` for details.
	3.	Run the backend server:
 cd backend
pip install -r requirements.txt
python app.py
	4.	Start the frontend:
 cd frontend
npm install
npm start

⚡ Demo
	•	Live risk map: View real-time, colour-coded risk overlays powered by open-source satellite tech (Mapbox GL/Leaflet).
	•	Interactive widgets: Use the risk simulator to explore how environmental changes affect hazard predictions.
	•	Alert timeline & leaderboard: Scroll recent incidents, and see stats on mines protected and incidents prevented.
