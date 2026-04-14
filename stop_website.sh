#!/bin/bash

# RockShield AI - Stop Website
# This script stops both the React frontend and Python ML backend

echo "🛑 Stopping RockShield AI Website..."
echo "==================================="

# Stop ML service
if [ -f ".ml_service.pid" ]; then
    ML_PID=$(cat .ml_service.pid)
    if kill -0 $ML_PID 2>/dev/null; then
        echo "🧠 Stopping ML Service (PID: $ML_PID)..."
        kill $ML_PID
        echo "✅ ML Service stopped"
    else
        echo "ℹ️  ML Service was not running"
    fi
    rm -f .ml_service.pid
fi

# Stop ML service started by start_backend.sh
if [ -f ".runtime/ml_service.pid" ]; then
    ML_PID=$(cat .runtime/ml_service.pid)
    if kill -0 $ML_PID 2>/dev/null; then
        echo "🧠 Stopping ML Service (PID: $ML_PID)..."
        kill $ML_PID
        echo "✅ ML Service stopped"
    else
        echo "ℹ️  ML Service was not running"
    fi
    rm -f .runtime/ml_service.pid
fi

# Stop frontend
if [ -f ".frontend.pid" ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "🌐 Stopping Frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        echo "✅ Frontend stopped"
    else
        echo "ℹ️  Frontend was not running"
    fi
    rm -f .frontend.pid
fi

# Kill any remaining processes
echo "🔍 Cleaning up any remaining processes..."
pkill -f "python ml-service/main.py" 2>/dev/null
pkill -f "python3 ml-service/main.py" 2>/dev/null
kill $(lsof -ti tcp:5001 2>/dev/null) 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null
pkill -f "vite" 2>/dev/null

echo "✅ All services stopped successfully"
echo "💡 To restart: ./start_website.sh"