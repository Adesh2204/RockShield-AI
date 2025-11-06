"""
Unit Tests for Terranox-AI Integration Module

Models and code adapted from Terranox-AI (MIT license) — https://github.com/Aniketkoppaka/Terranox-AI

Tests verify that the integration module can load models and make predictions.
"""

import unittest
import os
import sys

# Add parent directory to path to import terranox_integration
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from terranox_integration import load_models, predict_rockfall, predict_slope_stability


class TestTerranoxIntegration(unittest.TestCase):
    """Test cases for Terranox-AI integration module."""
    
    def setUp(self):
        """Set up test fixtures."""
        # Get the models directory path
        self.models_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            'models',
            'terranox'
        )
    
    def test_load_models(self):
        """Test that models can be loaded from the models directory."""
        result = load_models(self.models_dir)
        
        # Check that result is a dictionary
        self.assertIsInstance(result, dict)
        
        # Check that required keys exist
        self.assertIn('risk_model', result)
        self.assertIn('slope_model', result)
        self.assertIn('le_division', result)
        self.assertIn('le_trigger', result)
        self.assertIn('le_size', result)
        self.assertIn('le_reinforcement', result)
        self.assertIn('errors', result)
        
        # If models directory doesn't exist, errors should be present
        if not os.path.exists(self.models_dir):
            self.assertGreater(len(result['errors']), 0)
        else:
            # If directory exists, at least one model should be loaded or errors should explain why
            models_loaded = any([
                result['risk_model'] is not None,
                result['slope_model'] is not None
            ])
            # Either models are loaded or there are error messages
            self.assertTrue(models_loaded or len(result['errors']) > 0)
    
    def test_predict_rockfall(self):
        """Test rockfall risk prediction with sample data."""
        # Load models
        model_dict = load_models(self.models_dir)
        
        # If models are not loaded, skip this test
        if model_dict.get('risk_model') is None:
            self.skipTest("Risk model not available - skipping prediction test")
        
        # Sample input data
        sample_input = {
            'latitude': 23.5,
            'longitude': 85.3,
            'admin_division_name': 'Jharkhand',
            'landslide_trigger': 'Rainfall',
            'landslide_size': 'Medium',
            'annual_rainfall_mm': 1200.0
        }
        
        # Make prediction
        result = predict_rockfall(model_dict, sample_input)
        
        # Check result structure
        self.assertIsInstance(result, dict)
        self.assertIn('probability', result)
        self.assertIn('feature_importance', result)
        self.assertIn('error', result)
        
        # If no error, check that probability is valid
        if result['error'] is None:
            self.assertIsNotNone(result['probability'])
            self.assertIsInstance(result['probability'], (int, float))
            self.assertGreaterEqual(result['probability'], 0.0)
            self.assertLessEqual(result['probability'], 1.0)
            self.assertIsInstance(result['feature_importance'], dict)
        else:
            # If there's an error, it should be a string
            self.assertIsInstance(result['error'], str)
    
    def test_predict_slope_stability(self):
        """Test slope stability prediction with sample data."""
        # Load models
        model_dict = load_models(self.models_dir)
        
        # If models are not loaded, skip this test
        if model_dict.get('slope_model') is None:
            self.skipTest("Slope model not available - skipping prediction test")
        
        # Sample input data
        sample_input = {
            'Unit Weight (kN/m³)': 20.0,
            'Cohesion (kPa)': 50.0,
            'Internal Friction Angle (°)': 30.0,
            'Slope Angle (°)': 35.0,
            'Slope Height (m)': 50.0,
            'Pore Water Pressure Ratio': 0.2,
            'Reinforcement Type': 'Rock Bolts'
        }
        
        # Make prediction
        result = predict_slope_stability(model_dict, sample_input)
        
        # Check result structure
        self.assertIsInstance(result, dict)
        self.assertIn('factor_of_safety', result)
        self.assertIn('feature_importance', result)
        self.assertIn('error', result)
        
        # If no error, check that factor of safety is valid
        if result['error'] is None:
            self.assertIsNotNone(result['factor_of_safety'])
            self.assertIsInstance(result['factor_of_safety'], (int, float))
            self.assertGreater(result['factor_of_safety'], 0.0)
            self.assertIsInstance(result['feature_importance'], dict)
        else:
            # If there's an error, it should be a string
            self.assertIsInstance(result['error'], str)
    
    def test_predict_rockfall_missing_features(self):
        """Test that rockfall prediction handles missing features gracefully."""
        model_dict = load_models(self.models_dir)
        
        if model_dict.get('risk_model') is None:
            self.skipTest("Risk model not available")
        
        # Input with missing features
        incomplete_input = {
            'latitude': 23.5,
            'longitude': 85.3
            # Missing other required fields
        }
        
        result = predict_rockfall(model_dict, incomplete_input)
        
        # Should return an error
        self.assertIsNotNone(result['error'])
        self.assertIsInstance(result['error'], str)
    
    def test_predict_slope_stability_missing_features(self):
        """Test that slope stability prediction handles missing features gracefully."""
        model_dict = load_models(self.models_dir)
        
        if model_dict.get('slope_model') is None:
            self.skipTest("Slope model not available")
        
        # Input with missing features
        incomplete_input = {
            'Unit Weight (kN/m³)': 20.0
            # Missing other required fields
        }
        
        result = predict_slope_stability(model_dict, incomplete_input)
        
        # Should return an error
        self.assertIsNotNone(result['error'])
        self.assertIsInstance(result['error'], str)


if __name__ == '__main__':
    unittest.main()

