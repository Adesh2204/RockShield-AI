#!/bin/bash
# RockShield AI ML Service Deployment Script
# Ensures models are ready before starting the service

set -e

echo "🛡️ RockShield AI ML Service Deployment"
echo "======================================="

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "📍 Working directory: $SCRIPT_DIR"

# Create models directory if it doesn't exist
echo "📁 Ensuring models directory exists..."
mkdir -p models

# Use the correct Python interpreter
PYTHON_CMD="python3.11"

# Check if models exist, if not, generate them
if [ ! -f "models/rockfall_risk_model.joblib" ]; then
    echo "🔧 Models not found, generating them..."
    $PYTHON_CMD -c "
import os
import sys
sys.path.append('.')
from deployment_app import DeploymentReadyMLService

# Initialize service to trigger model creation
print('Creating embedded models for deployment...')
service = DeploymentReadyMLService()
print('✅ Models ready for deployment')
"
else
    echo "✅ Models already exist"
fi

# Test the service
echo "🧪 Testing ML service..."
$PYTHON_CMD -c "
from deployment_app import ml_service
import json

# Test risk prediction
test_data = {
    'latitude': 23.5,
    'longitude': 85.5,
    'landslide_trigger': 'Earthquake',
    'landslide_size': 'Large',
    'admin_division_name': 'Jharkhand',
    'annual_rainfall_mm': 1500
}

result = ml_service.predict_risk(test_data)
print('📊 Test prediction result:', json.dumps(result, indent=2))

# Test health check
health = ml_service.get_health_status()
print('💚 Health status:', json.dumps(health, indent=2))
"

echo ""
echo "🚀 Deployment ready! Service can be started with:"
echo "   Development:  $PYTHON_CMD deployment_app.py"
echo "   Production:   $PYTHON_CMD deployment_app.py production"
echo "   With Gunicorn: gunicorn -w 4 -b 0.0.0.0:5001 deployment_app:app"
echo ""
echo "📡 API Endpoints:"
echo "   Health:    GET  http://localhost:5001/health"
echo "   Predict:   POST http://localhost:5001/predict_risk"
echo ""
