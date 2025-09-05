![RockShield-AI Banner](banner.png)

# RockShield-AI – AI-Powered Rockfall Prediction & Alert System
=============================================================

RockShield-AI is an AI-driven system designed to predict rockfall incidents in open-pit mines. By integrating machine learning, IoT sensor data, and real-time visualizations, it generates risk heatmaps, delivers actionable alerts, and offers explainable insights—making slope stability monitoring more accessible, scalable, and cost-effective.

Key Features:
- 🗺️ Risk Heatmaps: Visualize slope instability probabilities across terrain.
- 📢 Alert Mechanism: Automated notifications (SMS/email) trigger when thresholds are exceeded.
- 🤖 Explainable AI: Understand prediction drivers via interpretable models (e.g., feature importance, SHAP values).
- 🌍 Multi-Source Data: Combines terrain/DEM, simulated or real sensor streams, environmental factors, and optional drone imagery.
- 📊 Web Dashboard: Interactive UI for map-based risk exploration, historic replay, and what-if scenarios.

Technology Stack:
⚙️ Backend: Node.js + TypeScript, powered by Vite build tool.  
🎨 Frontend: Modern web UI (React, TailwindCSS) bundled via Vite.  
📈 Data Models: Machine learning models (e.g., XGBoost, time-series models) integrated into backend analytics.  
✉️ Notifications: SMS/email via services like Twilio (configurable).  
🛰️ GIS: Risk overlay maps using Leaflet or similar libraries.  

Installation, Setup & Running:
1. Clone the repository:
   git clone https://github.com/Adesh2204/RockShield-AI.git
   cd RockShield-AI

2. Install dependencies:
   npm install

3. Configure environment variables:
   Copy .env.example to .env and fill in details such as:
   - 🔑 API keys for SMS/email (e.g., Twilio credentials)
   - 📂 Paths to DEM data or sensor data endpoints
   - 🗺️ Map tiles / geospatial API keys (if applicable)

4. Build and run the application:
   npm run dev       # start in development mode
   npm run build     # build for production
   npm run preview   # preview production build

5. Access the app in your browser at:
   http://localhost:3000   (or the port indicated in console)

Usage:
- 📡 Upload or reference terrain data and/or sensor time-series input (real or simulated).
- 🗺️ View the dashboard to explore current risk zones via heatmaps.
- 🔔 Observe automated alerts when risk crosses predefined thresholds—check explanations and suggestions.
- ⏳ Use the time-slider and what-if scenarios to assess forecasted risk (e.g., rising rainfall, sensor trends).
- 🧪 For hackathon demos, use synthetic datasets with a scripted scenario to showcase alerts.
- 🛠️ For pilots, integrate with real-time sensor streams and drone-derived DEMs for dynamic risk mapping.

License:
This project is open-source and is released under the MIT License. See the LICENSE file for full details.

Contact:
For questions, feedback, or collaboration, reach out via GitHub Issues or pull requests.

-------------------------------------------------------------
✨ RockShield-AI turns raw data into actionable safety insights,
helping mine planners reduce risks and protect lives.
-------------------------------------------------------------
