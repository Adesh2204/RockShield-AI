#!/usr/bin/env python3
"""
Test script to verify the updated ML model is working with proper color coding
"""

import requests
import json

API_BASE = "http://localhost:5001"

def test_risk_prediction():
    print("🧪 Testing Updated ML Risk Prediction Model")
    print("=" * 60)
    
    # Test cases designed to trigger different risk levels
    test_cases = [
        {
            "name": "High Risk Scenario (should be > 70% = RED)",
            "data": {
                "latitude": 23.5,
                "longitude": 85.3,
                "landslide_trigger": "Earthquake",
                "landslide_size": "Very Large", 
                "admin_division_name": "Jharkhand",
                "annual_rainfall_mm": 2500  # Very high rainfall
            },
            "expected_color": "RED"
        },
        {
            "name": "Medium Risk Scenario (should be 30-70% = YELLOW)",
            "data": {
                "latitude": 25.0,
                "longitude": 80.0,
                "landslide_trigger": "Human Activity",
                "landslide_size": "Medium",
                "admin_division_name": "Maharashtra", 
                "annual_rainfall_mm": 1200  # Moderate rainfall
            },
            "expected_color": "YELLOW"
        },
        {
            "name": "Low Risk Scenario (should be < 30% = GREEN)",
            "data": {
                "latitude": 27.0,
                "longitude": 75.0,
                "landslide_trigger": "Construction",
                "landslide_size": "Small",
                "admin_division_name": "West Bengal",
                "annual_rainfall_mm": 500   # Low rainfall
            },
            "expected_color": "GREEN"
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n{i}. {test_case['name']}")
        print("-" * 50)
        
        try:
            response = requests.post(
                f"{API_BASE}/predict_risk",
                json=test_case["data"],
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                probability = result.get("high_risk_probability", 0)
                percentage = round(probability * 100, 2)
                
                # Determine color based on your new thresholds
                if probability > 0.7:
                    color = "🔴 RED (HIGH RISK)"
                    correct = test_case["expected_color"] == "RED"
                elif probability > 0.3:
                    color = "🟡 YELLOW (MEDIUM RISK)"
                    correct = test_case["expected_color"] == "YELLOW"
                else:
                    color = "🟢 GREEN (LOW RISK)"
                    correct = test_case["expected_color"] == "GREEN"
                
                print(f"✅ Risk Probability: {percentage}%")
                print(f"🎨 Color Coding: {color}")
                print(f"📊 Expected: {test_case['expected_color']}")
                print(f"✅ Model Working: {'✓ YES' if correct else '✗ NEEDS ADJUSTMENT'}")
                
                # Additional info from response
                if 'risk_level' in result:
                    print(f"📋 Risk Level: {result['risk_level']}")
                    
            else:
                print(f"❌ Error: HTTP {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error message: {error_data.get('error', 'Unknown error')}")
                except:
                    print(f"Response text: {response.text}")
                    
        except requests.exceptions.RequestException as e:
            print(f"❌ Connection Error: {e}")
        except Exception as e:
            print(f"❌ Unexpected Error: {e}")

def test_health():
    print("\n🏥 Testing ML Service Health")
    print("=" * 30)
    
    try:
        response = requests.get(f"{API_BASE}/health", timeout=5)
        if response.status_code == 200:
            health_data = response.json()
            print("✅ ML Service is healthy!")
            print(f"📈 Risk model loaded: {health_data.get('risk_model_loaded', False)}")
            print(f"⚖️ Slope model loaded: {health_data.get('slope_model_loaded', False)}")
            print(f"🔤 Encoders loaded: {health_data.get('encoders_loaded', False)}")
        else:
            print(f"❌ Health check failed: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {e}")

if __name__ == "__main__":
    test_health()
    test_risk_prediction()
    
    print("\n" + "=" * 60)
    print("🎯 Summary:")
    print("- The model should now give DIFFERENT results for different inputs")
    print("- Risk > 70% should show RED highlighting")
    print("- Risk 30-70% should show YELLOW highlighting") 
    print("- Risk < 30% should show GREEN highlighting")
    print("- Test by opening http://localhost:5173/predict and entering different values")
    print("=" * 60)
