#!/bin/bash

# RockShield AI - Robust Website Launcher
# This script provides error handling and crash prevention

set -e  # Exit on any error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Starting RockShield AI - Robust Launch"
echo "========================================="

# Function to cleanup on exit
cleanup() {
    echo "🛑 Cleaning up..."
    pkill -f "vite" 2>/dev/null || true
    pkill -f "python.*app.py" 2>/dev/null || true
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Check dependencies
echo "🔍 Checking dependencies..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm."
    exit 1
fi

if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python not found. Please install Python."
    exit 1
fi

echo "✅ Dependencies check passed"

# Install npm dependencies if needed
echo "📦 Installing npm dependencies..."
npm install --silent 2>/dev/null || {
    echo "⚠️  Warning: Some npm dependencies may be missing, trying to continue..."
}

# Check if ML service is running, if not start it
echo "🧠 Checking ML service..."
if ! curl -s http://localhost:5001/health &> /dev/null; then
    echo "🚀 Starting ML service..."
    cd ml-service
    
    # Try different Python commands
    PYTHON_CMD=""
    if command -v python3 &> /dev/null; then
        PYTHON_CMD="python3"
    elif command -v python &> /dev/null; then
        PYTHON_CMD="python"
    else
        echo "❌ No Python command found"
        exit 1
    fi
    
    # Check if required Python packages are installed
    echo "🔍 Checking Python packages..."
    $PYTHON_CMD -c "import flask, flask_cors, numpy" 2>/dev/null || {
        echo "📦 Installing Python packages..."
        $PYTHON_CMD -m pip install flask flask-cors numpy requests joblib scikit-learn --quiet
    }
    
    # Start ML service in background
    echo "🔄 Launching ML service on port 5001..."
    nohup $PYTHON_CMD main.py > ../ml_service.log 2>&1 &
    ML_PID=$!
    
    # Wait for ML service to start
    echo "⏳ Waiting for ML service to be ready..."
    for i in {1..30}; do
        if curl -s http://localhost:5001/health &> /dev/null; then
            echo "✅ ML service is ready!"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "❌ ML service failed to start within 30 seconds"
            cat ../ml_service.log
            exit 1
        fi
        sleep 1
    done
    
    cd ..
else
    echo "✅ ML service is already running"
fi

# Test ML service
echo "🧪 Testing ML service..."
RESPONSE=$(curl -s -X POST http://localhost:5001/predict_risk \
    -H "Content-Type: application/json" \
    -d '{"latitude":23.5,"longitude":85.5,"landslide_trigger":"Earthquake","landslide_size":"Large","admin_division_name":"Jharkhand","annual_rainfall_mm":1500}' 2>/dev/null)

if echo "$RESPONSE" | grep -q "high_risk_probability"; then
    RISK=$(echo "$RESPONSE" | grep -o '"high_risk_probability":[0-9.]*' | cut -d':' -f2)
    echo "✅ ML service test successful - Risk: ${RISK}"
else
    echo "❌ ML service test failed"
    echo "Response: $RESPONSE"
    exit 1
fi

# Start the frontend
echo "🌐 Starting React frontend..."
echo "Frontend will be available at: http://localhost:5173"
echo "Press Ctrl+C to stop both services"
echo ""

# Start Vite dev server with error handling
npm run dev 2>&1 | while IFS= read -r line; do
    echo "$(date '+%H:%M:%S') [Frontend] $line"
    
    # Check for common errors and provide solutions
    if echo "$line" | grep -q "EADDRINUSE"; then
        echo "❌ Port 5173 is already in use. Trying to kill existing process..."
        pkill -f "vite" 2>/dev/null || true
        sleep 2
    fi
    
    if echo "$line" | grep -q "Local:.*http://"; then
        echo ""
        echo "🎉 RockShield AI is now running!"
        echo "✅ Frontend: http://localhost:5173"
        echo "✅ ML API: http://localhost:5001"
        echo "✅ Health Check: http://localhost:5001/health"
        echo ""
    fi
done
