#!/bin/bash

# RockShield AI - ML backend bootstrapper
# Ensures backend is running on :5001 before frontend starts

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ML_DIR="$ROOT_DIR/ml-service"
RUNTIME_DIR="$ROOT_DIR/.runtime"
PID_FILE="$RUNTIME_DIR/ml_service.pid"
LOG_FILE="$RUNTIME_DIR/ml_service_stdout.log"
HEALTH_URL="http://127.0.0.1:5001/health"

mkdir -p "$RUNTIME_DIR"

if curl -fsS "$HEALTH_URL" >/dev/null 2>&1; then
    echo "ML backend already running on port 5001"
    exit 0
fi

if [ ! -f "$ML_DIR/main.py" ]; then
    echo "ML service entrypoint not found at $ML_DIR/main.py"
    exit 1
fi

PYTHON_CMD=""
if command -v python3 >/dev/null 2>&1; then
    PYTHON_CMD="python3"
elif command -v python >/dev/null 2>&1; then
    PYTHON_CMD="python"
else
    echo "Python is not installed or not on PATH"
    exit 1
fi

# Install minimal dependencies if missing.
if ! "$PYTHON_CMD" -c "import flask, flask_cors, numpy, joblib" >/dev/null 2>&1; then
    echo "Installing missing Python dependencies..."
    if [ -f "$ML_DIR/requirements-minimal.txt" ]; then
        "$PYTHON_CMD" -m pip install -r "$ML_DIR/requirements-minimal.txt" >/dev/null
    elif [ -f "$ML_DIR/requirements.txt" ]; then
        "$PYTHON_CMD" -m pip install -r "$ML_DIR/requirements.txt" >/dev/null
    else
        "$PYTHON_CMD" -m pip install flask flask-cors numpy joblib scikit-learn pandas >/dev/null
    fi
fi

# Remove stale pid file.
if [ -f "$PID_FILE" ]; then
    old_pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [ -n "$old_pid" ] && kill -0 "$old_pid" >/dev/null 2>&1; then
        echo "Stopping stale backend process $old_pid"
        kill "$old_pid" >/dev/null 2>&1 || true
    fi
    rm -f "$PID_FILE"
fi

cd "$ML_DIR"
LOG_TO_FILE=false nohup "$PYTHON_CMD" main.py > "$LOG_FILE" 2>&1 &
new_pid=$!
echo "$new_pid" > "$PID_FILE"

for i in {1..25}; do
    if curl -fsS "$HEALTH_URL" >/dev/null 2>&1; then
        echo "ML backend started successfully (PID: $new_pid)"
        exit 0
    fi

    if ! kill -0 "$new_pid" >/dev/null 2>&1; then
        echo "ML backend exited during startup. Last log lines:"
        tail -n 60 "$LOG_FILE" || true
        exit 1
    fi

    sleep 1
done

echo "ML backend did not become healthy within timeout. Last log lines:"
tail -n 60 "$LOG_FILE" || true
exit 1
