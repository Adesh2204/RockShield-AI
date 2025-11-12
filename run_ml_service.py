#!/usr/bin/env python3
"""
RockShield AI - Quick Start Script
Simple launcher for the ML service with environment detection
"""

import os
import sys
import subprocess
import platform
from pathlib import Path

def print_banner():
    """Print startup banner"""
    print("=" * 60)
    print("🛡️  RockShield AI - ML Service Launcher")
    print("=" * 60)
    print(f"Platform: {platform.system()} {platform.release()}")
    print(f"Python: {sys.version.split()[0]}")
    print(f"Working Directory: {Path.cwd()}")
    print("=" * 60)

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import flask
        import pandas
        import numpy
        import sklearn
        import joblib
        print("✓ All required dependencies are installed")
        return True
    except ImportError as e:
        print(f"✗ Missing dependency: {e}")
        print("\nTo install dependencies, run:")
        print("  pip install -r ml-service/requirements.txt")
        return False

def run_service():
    """Run the ML service"""
    ml_service_path = Path(__file__).parent / "ml-service" / "main.py"
    
    if not ml_service_path.exists():
        print(f"✗ ML service not found at: {ml_service_path}")
        return False
    
    # Set environment variables
    port = os.environ.get('PORT', '5001')
    debug = os.environ.get('DEBUG', 'false').lower() == 'true'
    
    print(f"Starting ML service on port {port}")
    print(f"Debug mode: {debug}")
    print(f"Service path: {ml_service_path}")
    print("=" * 60)
    
    # Run the service
    env = os.environ.copy()
    env['PORT'] = port
    if debug:
        env['DEBUG'] = 'true'
    
    try:
        subprocess.run([sys.executable, str(ml_service_path)], env=env, check=True)
    except subprocess.CalledProcessError:
        print("Service failed to start")
        return False
    
    return True

def main():
    """Main launcher function"""
    print_banner()
    
    # Check if we're in the right directory
    if not Path("ml-service/main.py").exists():
        print("✗ Please run this script from the project root directory")
        print("  Current directory:", Path.cwd())
        print("  Expected ml-service/main.py at:", Path.cwd() / "ml-service" / "main.py")
        return
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Run the service
    print("Starting RockShield AI ML Service...")
    run_service()

if __name__ == "__main__":
    main()