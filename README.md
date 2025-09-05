# RockShield AI

## 🚨 AI-Based Rockfall Prediction & Alert System for Open-Pit Mines

RockShield AI is an **end-to-end rockfall prediction and real-time alert system** designed for **open-pit mines**.  
It combines **AI, IoT sensors, drone/DEM data, and real-time dashboards** to help mining operations **predict rockfall hazards, issue alerts, and ensure worker safety**.

---

📸 Screenshots
![image alt](https://github.com/Adesh2204/RockShield-AI/blob/7f6a9c0f006e2a9d265936c4ab768a0be13d98cb/RockShield-AI.png)

---

🧠 Machine Learning Pipeline
	•	Data Sources: DEMs, geotechnical IoT sensors, weather logs, and synthetic rockfall events.
	•	Feature Engineering: Displacement, strain, rainfall, temperature, slope geometry.
	•	Explainability: SHAP for feature importance, LIME for event-based explainability.

## ✨ Features

- 📡 **AI-Powered Risk Prediction** – Uses machine learning to classify slope stability and predict rockfall likelihood.
- 🌍 **3D Mine Visualization** – Displays DEM-based mine models with **heatmaps** for risk zones.
- 📊 **Real-Time Monitoring** – Ingests live or simulated **sensor & weather data**.
- 🔔 **Automated Alerts** – SMS/Email alerts via Twilio/SendGrid when risk thresholds are crossed.
- 📈 **Explainable AI** – SHAP/LIME integration to show **why a zone is marked at risk**.
- 🖥 **Hackathon-Ready Dashboard** – Built using Streamlit/Dash/React+Mapbox for intuitive visualization.
- 💡 **Low-Cost, Open-Source Integration** – Compatible with Arduino/Raspberry Pi mock IoT sensors.

---

## 🏗️ System Architecture
IoT Sensors / Drone Data / DEM
│
▼
Data Pipeline (Kafka / MQTT)
│
▼
ML Inference API (XGBoost, RF, DL models)
│
▼
Risk Scores & Alerts ───────► Dashboard (Streamlit / React+Mapbox)
│
└──────────► SMS / Email Notifications (Twilio, SendGrid)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository
```bash
https://github.com/Adesh2204/RockShield-AI
