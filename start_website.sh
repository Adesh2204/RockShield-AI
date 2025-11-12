#!/bin/bash

# RockShield AI - Complete Website Launcher
# This script starts both the React frontend and Python ML backend

echo "🚀 Starting RockShield AI - Complete Website"
echo "==========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

echo "✅ Dependencies check passed"

# Start the Python ML backend in background
echo "🧠 Starting Python ML Service (Backend)..."
cd ml-service
python main.py > ../ml_service.log 2>&1 &
ML_PID=$!
cd ..

echo "✅ ML Service started (PID: $ML_PID)"
echo "📍 ML Service will be available at: http://localhost:5001"

# Wait a moment for ML service to start
sleep 3

# Check if ML service is running
if ! curl -s http://localhost:5001/health > /dev/null; then
    echo "❌ ML Service failed to start. Check ml_service.log for details."
    kill $ML_PID 2>/dev/null
    exit 1
fi

echo "✅ ML Service health check passed"

# Start the React frontend
echo "🌐 Starting React Frontend (Website)..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
npm run dev &
FRONTEND_PID=$!

echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo "🌍 Website will be available at: http://localhost:5173"

# Save PIDs for cleanup
echo $ML_PID > .ml_service.pid
echo $FRONTEND_PID > .frontend.pid

echo ""
echo "🎉 SUCCESS! Your RockShield AI website is now running!"
echo "====================================================="
echo "🌐 Frontend (Website): http://localhost:5173"
echo "🧠 Backend (ML Service): http://localhost:5001"
echo "🏥 Health Check: http://localhost:5001/health"
echo ""
echo "📋 API Endpoints:"
echo "   POST /predict_risk - Rockfall risk prediction"
echo "   POST /predict_stability - Slope stability analysis"
echo "   GET /health - Service health status"
echo ""
echo "⚠️  To stop the website:"
echo "   ./stop_website.sh"
echo ""

# Wait for user to stop
echo "Press Ctrl+C to stop all services..."
trap 'echo ""; echo "🛑 Stopping website..."; kill $ML_PID $FRONTEND_PID 2>/dev/null; rm -f .ml_service.pid .frontend.pid; echo "✅ Website stopped"; exit 0' INT

# Keep script running
while true; do
    sleep 1
done