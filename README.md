# 🚨 RockShield AI

**AI-Based Rockfall Prediction & Alert System for Open-Pit Mines**

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contribution](#contribution)
- [License](#license)
- [Team & Contributors](#team--contributors)
- [FAQ](#faq)

---

## Overview

RockShield AI is an **end-to-end rockfall prediction and real-time alert system** designed for **open-pit mines**. It combines **AI, IoT sensors, drone/DEM data, and interactive dashboards** to help mining operations predict rockfall hazards, issue alerts, and maximise worker safety.

> With real-time risk heatmaps, automated SMS/Email alerts, and explainable ML, RockShield delivers a low-cost, scalable, and life-saving solution.

---

## Features

- 📡 **AI-Powered Risk Prediction:** Classifies slope stability and predicts rockfall likelihood via ML models.
- 🌍 **3D Mine Visualisation:** DEM-based mine models with interactive heatmaps for risk zones.
- 📊 **Real-Time Monitoring:** Ingests live or simulated IoT sensor and weather data.
- 🔔 **Automated Alerts:** Sends SMS/Email notifications via Twilio/SendGrid if risk exceeds safe thresholds.
- 📈 **Explainable AI:** SHAP and LIME integration to reveal why zones are flagged at risk.
- 🖥 **Modern Dashboard:** Intuitive, hackathon-ready dashboard (Streamlit, Dash, React+Mapbox).
- 💡 **IoT-Friendly:** Easily integrates with Arduino/Raspberry Pi mock sensors.

---

## Architecture

### **1. Data Sources**
- IoT Sensors: Displacement, strain, weather.
- Drone / DEM data for 3D mine landscapes.
- Synthetic rockfall event logs (for simulation/testing).

### **2. Data Pipeline**
- Ingests sensor, DEM, and synthetic data.
- Feature engineering: displacement, strain, rainfall, temperature, slope geometry.
- Feeds data to the ML inference layer.

### **3. ML Inference & Explainability**
- Models: XGBoost, Random Forest.
- SHAP & LIME for model interpretability and transparency.
- Generates risk metrics for slope stability.

### **4. Outputs**
- Real-time risk dashboards (React + Mapbox).
- Automated SMS/Email alerts (Twilio, SendGrid).

---

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS, Mapbox GL
- **Backend/ML Service:** Python (Flask, scikit-learn, pandas, numpy, joblib)
- **Dashboard:** Streamlit/Dash (optional for advanced analytics)
- **IoT:** Arduino/Raspberry Pi (mock sensors, easily extendable)
- **DevOps:** Vite, ESlint, PostCSS
- **Integrations:** SHAP, LIME, Twilio, SendGrid

---

## Screenshots

![RockShield AI Screenshot](https://github.com/Adesh2204/RockShield-AI/blob/7f6a9c0f006e2a9d265936c4ab768a0be13d98cb/RockShield-AI.png) 

*Example: DEM-based mine map with AI-driven risk heatmap and real-time risk notification.*

---

## 🚀 Quick Start

1. **Clone the Repository**
    ```
    git clone https://github.com/Adesh2204/RockShield-AI.git
    cd RockShield-AI
    ```

2. **Start the ML Service (Python, in `ml-service/`)**
    ```
    cd ml-service
    pip install -r requirements.txt
    python app.py
    ```

3. **Start the Frontend (React, in main directory)**
    ```
    cd ..
    npm install
    npm run dev
    ```

4. **Access Your App**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - ML Service: [http://localhost:5001](http://localhost:5001)

5. **(Optional) Connect IoT Sensors**
    - Mock or real-time sensor streams (contact team for protocols/examples).

---

## Usage

- **Navigate to the dashboard:** Visualise risk zones in real time.
- **Try the prediction page:** Simulate new rockfall scenarios and see AI-powered hazard scores/alerts.
- **Connect your own DEM or IoT streams:** Integrate custom sensor feeds via API.
- **Receive real-time SMS/email alerts** when high-risk thresholds are crossed.

---

## Project Structure

```
RockShield-AI/
│
├─ ml-service/         # Python backend for ML models and REST API
│   ├─ app.py
│   ├─ requirements.txt
│   └─ models/, templates/
├─ src/                # React frontend source
│   ├─ Components/
│   ├─ Types/
│   ├─ data/
│   └─ App.tsx, main.tsx, etc.
├─ dist/               # Production build outputs
├─ README.md
├─ package.json
├─ RockShield-AI.png   # Demo screenshot
└─ ...[config files]...
```

---

## Contribution

Contributions are welcome! To get started:

1. Fork this repo and clone your fork.
2. Create a new feature branch:
    ```
    git checkout -b feature/my-new-feature
    ```
3. Commit and push your changes.
4. Open a pull request describing your addition.

*See [CONTRIBUTING.md](CONTRIBUTING.md) if available for detailed guidelines.*

---

## License

This project is licensed under the MIT License.  
See `LICENSE` for more details.

---

## Team & Contributors

- **Adesh2204** (Adesh)
- **DakshUppadhaya** (Daksh)
- **AnirudhSaini** (Anirudh)

Special thanks to all contributors and supporters!

---

## FAQ

**Q:** What sensors work with RockShield-AI?  
**A:** Any device capable of sending data in basic JSON (mock scripts for Arduino/RPi provided).

**Q:** How do I deploy in production?  
**A:** Use `npm run build` for frontend, set up backend (Flask) with Gunicorn/WSGI, secure APIs, and direct sensor streams to the backend server.

**Q:** Can I customise the ML models?  
**A:** Yes! Swap, retrain, or replace the models in `ml-service/models/` as needed.

---



