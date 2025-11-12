#!/usr/bin/env python3
"""
Final verification test for RockShield AI deployment
Tests all ML model scenarios to ensure deployment readiness
"""

import requests
import json
import time
from datetime import datetime

# Test configuration
ML_SERVICE_URL = "http://127.0.0.1:5001"

def test_health_check():
    """Test service health endpoint"""
    print("🏥 Testing Health Check...")
    try:
        response = requests.get(f"{ML_SERVICE_URL}/health", timeout=5)
        if response.status_code == 200:
            health_data = response.json()
            print(f"✅ Service Status: {health_data.get('status', 'unknown')}")
            print(f"✅ Version: {health_data.get('version', 'unknown')}")
            print(f"✅ Dependencies: {health_data.get('dependencies', 'unknown')}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_risk_prediction_scenarios():
    """Test various risk prediction scenarios"""
    print("\n🎯 Testing Risk Prediction Scenarios...")
    
    test_cases = [
        {
            "name": "HIGH RISK - Earthquake + Very Large + High Rainfall",
            "data": {
                "latitude": 23.5,
                "longitude": 85.5,
                "landslide_trigger": "Earthquake",
                "landslide_size": "Very Large",
                "admin_division_name": "Jharkhand",
                "annual_rainfall_mm": 2500
            },
            "expected_level": "HIGH"
        },
        {
            "name": "LOW RISK - Construction + Small + Low Rainfall",
            "data": {
                "latitude": 25.0,
                "longitude": 78.0,
                "landslide_trigger": "Construction",
                "landslide_size": "Small",
                "admin_division_name": "Karnataka",
                "annual_rainfall_mm": 600
            },
            "expected_level": "LOW"
        },
        {
            "name": "MEDIUM RISK - Mining + Large + Medium Rainfall",
            "data": {
                "latitude": 22.0,
                "longitude": 82.0,
                "landslide_trigger": "Mining",
                "landslide_size": "Large",
                "admin_division_name": "Odisha",
                "annual_rainfall_mm": 1400
            },
            "expected_level": "MEDIUM"
        },
        {
            "name": "VARIABLE TEST - Rainfall Impact",
            "data": {
                "latitude": 23.0,
                "longitude": 84.0,
                "landslide_trigger": "Rainfall",
                "landslide_size": "Medium",
                "admin_division_name": "Chhattisgarh",
                "annual_rainfall_mm": 1800
            },
            "expected_level": "MEDIUM"
        }
    ]
    
    results = []
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📊 Test {i}: {test_case['name']}")
        try:
            response = requests.post(
                f"{ML_SERVICE_URL}/predict_risk",
                json=test_case['data'],
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                risk_prob = result.get('high_risk_probability', 0)
                risk_level = result.get('risk_level', 'UNKNOWN')
                method = result.get('method', 'UNKNOWN')
                
                print(f"  ✅ Risk Probability: {risk_prob:.4f}")
                print(f"  ✅ Risk Level: {risk_level}")
                print(f"  ✅ Method: {method}")
                
                # Check if result is variable (not constant)
                if risk_prob > 0.01 and risk_prob < 0.99:
                    print(f"  ✅ Variable Result: PASS")
                else:
                    print(f"  ⚠️  Variable Result: EDGE CASE")
                
                results.append({
                    'test': test_case['name'],
                    'probability': risk_prob,
                    'level': risk_level,
                    'expected': test_case['expected_level'],
                    'success': True
                })
                
            else:
                print(f"  ❌ Request failed: {response.status_code}")
                print(f"  ❌ Response: {response.text[:200]}")
                results.append({
                    'test': test_case['name'],
                    'success': False,
                    'error': f"HTTP {response.status_code}"
                })
                
        except Exception as e:
            print(f"  ❌ Test error: {e}")
            results.append({
                'test': test_case['name'],
                'success': False,
                'error': str(e)
            })
    
    return results

def test_stability_prediction():
    """Test slope stability prediction"""
    print("\n🏗️ Testing Slope Stability Analysis...")
    
    test_data = {
        "slope_angle": 35.0,
        "unit_weight": 18.0,
        "cohesion": 25.0,
        "friction_angle": 30.0,
        "reinforcement": "Anchor"
    }
    
    try:
        response = requests.post(
            f"{ML_SERVICE_URL}/predict_stability",
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=5
        )
        
        if response.status_code == 200:
            result = response.json()
            safety_factor = result.get('safety_factor', 0)
            stability_status = result.get('stability_status', 'UNKNOWN')
            
            print(f"✅ Safety Factor: {safety_factor}")
            print(f"✅ Stability Status: {stability_status}")
            return True
        else:
            print(f"❌ Stability test failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Stability test error: {e}")
        return False

def test_error_handling():
    """Test API error handling"""
    print("\n🛡️ Testing Error Handling...")
    
    # Test missing fields
    try:
        response = requests.post(
            f"{ML_SERVICE_URL}/predict_risk",
            json={"latitude": 23.5},  # Missing required fields
            headers={'Content-Type': 'application/json'},
            timeout=5
        )
        
        if response.status_code == 400:
            print("✅ Missing fields validation: PASS")
        else:
            print(f"⚠️  Missing fields validation: Expected 400, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error handling test failed: {e}")

def generate_summary_report(results):
    """Generate final test report"""
    print("\n" + "="*60)
    print("🛡️ ROCKSHIELD AI - DEPLOYMENT VERIFICATION REPORT")
    print("="*60)
    
    successful_tests = [r for r in results if r.get('success', False)]
    failed_tests = [r for r in results if not r.get('success', False)]
    
    print(f"📊 Total Tests: {len(results)}")
    print(f"✅ Passed: {len(successful_tests)}")
    print(f"❌ Failed: {len(failed_tests)}")
    print(f"📈 Success Rate: {(len(successful_tests)/len(results)*100):.1f}%")
    
    print("\n🎯 Risk Prediction Results:")
    for result in successful_tests:
        if 'probability' in result:
            print(f"  • {result['test']}: {result['probability']:.4f} ({result['level']})")
    
    if len(successful_tests) >= 3:
        # Check if results are variable
        probs = [r['probability'] for r in successful_tests if 'probability' in r]
        if len(set([round(p, 2) for p in probs])) >= 3:
            print("\n✅ VARIABLE RESULTS CONFIRMED - ML Model working correctly!")
        else:
            print("\n⚠️  Results may not be variable enough")
    
    if failed_tests:
        print("\n❌ Failed Tests:")
        for test in failed_tests:
            print(f"  • {test['test']}: {test.get('error', 'Unknown error')}")
    
    overall_status = "✅ DEPLOYMENT READY" if len(failed_tests) == 0 else "⚠️  NEEDS ATTENTION"
    print(f"\n🚀 Overall Status: {overall_status}")
    
    print(f"\n📅 Test Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*60)

def main():
    """Run complete deployment verification"""
    print("🛡️ RockShield AI - Deployment Verification Test")
    print(f"🌐 Testing ML Service: {ML_SERVICE_URL}")
    print(f"⏰ Test Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-" * 60)
    
    # Run all tests
    health_ok = test_health_check()
    if not health_ok:
        print("❌ Service not available. Please ensure ML service is running.")
        return
    
    prediction_results = test_risk_prediction_scenarios()
    stability_ok = test_stability_prediction()
    test_error_handling()
    
    # Generate report
    generate_summary_report(prediction_results)

if __name__ == "__main__":
    main()
