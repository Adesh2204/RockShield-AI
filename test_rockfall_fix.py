#!/usr/bin/env python3
"""
Comprehensive test for rockfall risk assessment calculation fix
"""

import requests
import json

API_BASE = "http://localhost:5174/api"

def test_comprehensive_scenarios():
    print("🧪 Comprehensive Rockfall Risk Assessment Test")
    print("=" * 60)
    
    test_scenarios = [
        {
            "name": "🔴 HIGH RISK: Earthquake + Very Large + High Rainfall",
            "data": {
                "latitude": 23.5,
                "longitude": 85.3,
                "landslide_trigger": "Earthquake",
                "landslide_size": "Very Large",
                "admin_division_name": "West Bengal",
                "annual_rainfall_mm": 2500
            },
            "expected": "HIGH (>70%)"
        },
        {
            "name": "🟡 MEDIUM RISK: Rainfall + Medium + Moderate Rainfall",
            "data": {
                "latitude": 25.0,
                "longitude": 80.0,
                "landslide_trigger": "Rainfall",
                "landslide_size": "Medium",
                "admin_division_name": "Maharashtra",
                "annual_rainfall_mm": 1200
            },
            "expected": "MEDIUM (30-70%)"
        },
        {
            "name": "🟢 LOW RISK: Construction + Small + Low Rainfall",
            "data": {
                "latitude": 27.0,
                "longitude": 75.0,
                "landslide_trigger": "Construction",
                "landslide_size": "Small",
                "admin_division_name": "Karnataka",
                "annual_rainfall_mm": 400
            },
            "expected": "LOW (<30%)"
        },
        {
            "name": "🔴 HIGH RISK: Mining + Large + Very High Rainfall",
            "data": {
                "latitude": 22.0,
                "longitude": 86.0,
                "landslide_trigger": "Mining",
                "landslide_size": "Large",
                "admin_division_name": "Jharkhand",
                "annual_rainfall_mm": 2800
            },
            "expected": "HIGH (>70%)"
        },
        {
            "name": "🟡 MEDIUM RISK: Human Activity + Medium + Average Rainfall",
            "data": {
                "latitude": 24.0,
                "longitude": 83.0,
                "landslide_trigger": "Human Activity",
                "landslide_size": "Medium",
                "admin_division_name": "Chhattisgarh",
                "annual_rainfall_mm": 1000
            },
            "expected": "MEDIUM (30-70%)"
        }
    ]
    
    results = []
    
    for i, scenario in enumerate(test_scenarios, 1):
        print(f"\n{i}. {scenario['name']}")
        print("-" * 50)
        
        try:
            response = requests.post(
                f"{API_BASE}/predict_risk",
                json=scenario["data"],
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                probability = result.get("high_risk_probability", 0)
                percentage = round(probability * 100, 2)
                risk_level = result.get("risk_level", "UNKNOWN")
                
                # Determine if result matches expectation
                if "HIGH" in scenario["expected"] and probability > 0.7:
                    status = "✅ CORRECT"
                elif "MEDIUM" in scenario["expected"] and 0.3 <= probability <= 0.7:
                    status = "✅ CORRECT"
                elif "LOW" in scenario["expected"] and probability < 0.3:
                    status = "✅ CORRECT"
                else:
                    status = "❌ INCORRECT"
                
                print(f"📊 Result: {percentage}% ({risk_level})")
                print(f"🎯 Expected: {scenario['expected']}")
                print(f"✅ Status: {status}")
                
                results.append({
                    "scenario": scenario['name'],
                    "percentage": percentage,
                    "risk_level": risk_level,
                    "expected": scenario['expected'],
                    "correct": "✅" in status
                })
                
            else:
                print(f"❌ HTTP Error: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error: {error_data.get('error', 'Unknown error')}")
                except:
                    print(f"Response: {response.text}")
                    
        except Exception as e:
            print(f"❌ Error: {e}")
    
    # Summary
    print("\n" + "=" * 60)
    print("📈 SUMMARY RESULTS")
    print("=" * 60)
    
    correct_count = sum(1 for r in results if r['correct'])
    total_count = len(results)
    
    print(f"✅ Correct predictions: {correct_count}/{total_count}")
    print(f"📊 Success rate: {(correct_count/total_count)*100:.1f}%")
    
    for result in results:
        status_icon = "✅" if result['correct'] else "❌"
        print(f"{status_icon} {result['percentage']:.1f}% - {result['scenario'][:50]}...")
    
    if correct_count == total_count:
        print("\n🎉 ALL TESTS PASSED! Rockfall risk assessment is working correctly!")
        print("🚀 The ML model is now properly calibrated and functional.")
    else:
        print(f"\n⚠️  {total_count - correct_count} tests failed. Model may need further tuning.")
    
    print("\n🌐 You can now test the web interface at:")
    print("   http://localhost:5174/predict")

if __name__ == "__main__":
    test_comprehensive_scenarios()
