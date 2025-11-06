"""
Terranox-AI Model Integration Module

Models and code adapted from Terranox-AI (MIT license) — https://github.com/Aniketkoppaka/Terranox-AI

This module provides a self-contained interface to load and use ML models from Terranox-AI
for rockfall risk prediction and slope stability analysis. It is designed to be integrated
into the host project without modifying existing routes, UI, or environment.

Author: Integration module for RockShield-AI
License: MIT (adapted from Terranox-AI)
"""

import os
import logging
import joblib
import pandas as pd
import numpy as np
from datetime import datetime
from typing import Dict, Optional, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Feature names as defined in Terranox-AI
RISK_MODEL_FEATURES = [
    'latitude', 'longitude', 'landslide_trigger_encoded',
    'landslide_size_encoded', 'division_encoded', 'annual_rainfall_mm',
    'year', 'month', 'day', 'dayofweek'
]

RISK_FEATURE_NAMES_ORIGINAL = [
    'Latitude', 'Longitude', 'Trigger', 'Size', 'Location', 'Rainfall',
    'Year', 'Month', 'Day', 'Day of Week'
]

STABILITY_MODEL_FEATURES = [
    'Unit Weight (kN/m³)', 'Cohesion (kPa)', 'Internal Friction Angle (°)',
    'Slope Angle (°)', 'Slope Height (m)', 'Pore Water Pressure Ratio',
    'Reinforcement Type Encoded'
]

STABILITY_FEATURE_NAMES_ORIGINAL = [
    'Unit Weight', 'Cohesion', 'Friction Angle', 'Slope Angle',
    'Slope Height', 'Pore Pressure', 'Reinforcement'
]

# Feature mapping for compatibility (if host app uses different names)
FEATURE_MAP = {
    # Risk model mappings
    'admin_division_name': 'admin_division_name',
    'landslide_trigger': 'landslide_trigger',
    'landslide_size': 'landslide_size',
    'latitude': 'latitude',
    'longitude': 'longitude',
    'annual_rainfall_mm': 'annual_rainfall_mm',
    # Stability model mappings
    'Unit Weight (kN/m³)': 'Unit Weight (kN/m³)',
    'Cohesion (kPa)': 'Cohesion (kPa)',
    'Internal Friction Angle (°)': 'Internal Friction Angle (°)',
    'Slope Angle (°)': 'Slope Angle (°)',
    'Slope Height (m)': 'Slope Height (m)',
    'Pore Water Pressure Ratio': 'Pore Water Pressure Ratio',
    'Reinforcement Type': 'Reinforcement Type'
}


def load_models(models_dir: str) -> Dict[str, Any]:
    """
    Loads all Terranox-AI models and encoders from the specified directory.
    
    Args:
        models_dir: Path to the directory containing model files
        
    Returns:
        Dictionary containing loaded models and encoders:
        {
            'risk_model': model object or None,
            'slope_model': model object or None,
            'le_division': LabelEncoder or None,
            'le_trigger': LabelEncoder or None,
            'le_size': LabelEncoder or None,
            'le_reinforcement': LabelEncoder or None,
            'errors': list of error messages
        }
    """
    result = {
        'risk_model': None,
        'slope_model': None,
        'le_division': None,
        'le_trigger': None,
        'le_size': None,
        'le_reinforcement': None,
        'errors': []
    }
    
    if not os.path.exists(models_dir):
        error_msg = f"Models directory does not exist: {models_dir}"
        logger.error(error_msg)
        result['errors'].append(error_msg)
        return result
    
    # Try Terranox-AI naming convention first
    model_files = {
        'risk_model': [
            'rockfall_risk_model_india_tuned.joblib',
            'rockfall_risk_model.joblib'
        ],
        'slope_model': [
            'slope_stability_model_tuned.joblib',
            'slope_stability_model.joblib'
        ],
        'le_division': [
            'le_division_india.joblib',
            'risk_division_encoder.joblib'
        ],
        'le_trigger': [
            'le_trigger_india.joblib',
            'risk_trigger_encoder.joblib'
        ],
        'le_size': [
            'le_size_india.joblib',
            'risk_size_encoder.joblib'
        ],
        'le_reinforcement': [
            'le_reinforcement.joblib',
            'slope_reinforcement_encoder.joblib'
        ]
    }
    
    for key, filenames in model_files.items():
        loaded = False
        for filename in filenames:
            filepath = os.path.join(models_dir, filename)
            if os.path.exists(filepath):
                try:
                    result[key] = joblib.load(filepath)
                    logger.info(f"Successfully loaded {key} from {filename}")
                    loaded = True
                    break
                except Exception as e:
                    error_msg = f"Failed to load {filename}: {str(e)}"
                    logger.error(error_msg)
                    result['errors'].append(error_msg)
        
        if not loaded:
            error_msg = f"Could not find or load {key} (tried: {', '.join(filenames)})"
            logger.warning(error_msg)
            result['errors'].append(error_msg)
    
    if result['errors']:
        logger.warning(f"Some models/encoders failed to load. Errors: {result['errors']}")
    else:
        logger.info("All models and encoders loaded successfully")
    
    return result


def get_feature_importance(model, feature_names: list) -> Dict[str, float]:
    """
    Extracts feature importance from a model.
    
    Args:
        model: Trained model with feature_importances_ attribute
        feature_names: List of feature names corresponding to importances
        
    Returns:
        Dictionary mapping feature names to importance values
    """
    try:
        if hasattr(model, 'feature_importances_'):
            importances = model.feature_importances_
            if len(importances) == len(feature_names):
                return {name: float(imp) for name, imp in zip(feature_names, importances)}
            else:
                logger.warning(f"Feature importance length ({len(importances)}) doesn't match feature names ({len(feature_names)})")
                return {}
        else:
            logger.warning("Model does not have feature_importances_ attribute")
            return {}
    except Exception as e:
        logger.error(f"Error extracting feature importance: {str(e)}")
        return {}


def predict_rockfall(model_dict: Dict[str, Any], input_dict: Dict[str, Any]) -> Dict[str, Any]:
    """
    Predicts rockfall risk probability using the Terranox-AI model.
    
    Args:
        model_dict: Dictionary returned by load_models()
        input_dict: Input features dictionary with keys:
            - latitude: float
            - longitude: float
            - admin_division_name: str
            - landslide_trigger: str
            - landslide_size: str
            - annual_rainfall_mm: float
            
    Returns:
        Dictionary with keys:
            - probability: float (high risk probability)
            - feature_importance: dict
            - error: str (if error occurred)
    """
    try:
        # Check if models are loaded
        if model_dict.get('risk_model') is None:
            return {
                'probability': None,
                'feature_importance': {},
                'error': 'Risk model is not loaded. Please check model files.'
            }
        
        if any(model_dict.get(enc) is None for enc in ['le_division', 'le_trigger', 'le_size']):
            return {
                'probability': None,
                'feature_importance': {},
                'error': 'One or more encoders are not loaded. Please check encoder files.'
            }
        
        # Map input features
        input_df = pd.DataFrame([input_dict])
        
        # Encode categorical features
        try:
            input_df['division_encoded'] = model_dict['le_division'].transform(
                input_df['admin_division_name']
            )
            input_df['landslide_trigger_encoded'] = model_dict['le_trigger'].transform(
                input_df['landslide_trigger']
            )
            input_df['landslide_size_encoded'] = model_dict['le_size'].transform(
                input_df['landslide_size']
            )
        except ValueError as e:
            return {
                'probability': None,
                'feature_importance': {},
                'error': f'Invalid categorical value: {str(e)}. Please check input values match encoder classes.'
            }
        
        # Feature engineering - add temporal features (for Terranox-AI models)
        # Check if model expects temporal features by trying to determine expected feature count
        risk_model = model_dict['risk_model']
        try:
            # Try to get expected number of features from the model
            if hasattr(risk_model, 'n_features_in_'):
                expected_features = risk_model.n_features_in_
            elif hasattr(risk_model, 'feature_importances_'):
                expected_features = len(risk_model.feature_importances_)
            else:
                # Default to Terranox-AI format (10 features)
                expected_features = 10
        except:
            expected_features = 10
        
        # Add temporal features if model expects them (10 features = Terranox-AI format)
        if expected_features >= 10:
            now = datetime.now()
            input_df['year'] = now.year
            input_df['month'] = now.month
            input_df['day'] = now.day
            input_df['dayofweek'] = now.weekday()
            model_features = RISK_MODEL_FEATURES
        else:
            # Use simplified feature set (6 features = existing model format)
            model_features = [
                'latitude', 'longitude', 'landslide_trigger_encoded',
                'landslide_size_encoded', 'division_encoded', 'annual_rainfall_mm'
            ]
        
        # Prepare model input
        for col in model_features:
            if col not in input_df.columns:
                return {
                    'probability': None,
                    'feature_importance': {},
                    'error': f'Missing required feature: {col}'
                }
        
        model_input = input_df[model_features]
        
        # Make prediction
        risk_model = model_dict['risk_model']
        if hasattr(risk_model, 'predict_proba'):
            prediction_proba = risk_model.predict_proba(model_input)[0]
            # Handle binary classification (class 1 is high risk)
            if len(prediction_proba) > 1:
                probability = float(prediction_proba[1])
            else:
                probability = float(prediction_proba[0])
        else:
            # Fallback for regression models
            prediction = risk_model.predict(model_input)[0]
            probability = float(prediction)
            # Normalize to 0-1 range if needed
            if probability > 1.0:
                probability = min(1.0, probability / 100.0)
            elif probability < 0.0:
                probability = max(0.0, probability)
        
        # Get feature importance - use appropriate feature names based on model
        if expected_features >= 10:
            feature_names = RISK_FEATURE_NAMES_ORIGINAL
        else:
            feature_names = ['Latitude', 'Longitude', 'Trigger', 'Size', 'Location', 'Rainfall']
        feature_importance = get_feature_importance(risk_model, feature_names)
        
        return {
            'probability': round(probability, 4),
            'feature_importance': feature_importance,
            'error': None
        }
        
    except Exception as e:
        error_msg = f"Error during rockfall prediction: {str(e)}"
        logger.error(error_msg)
        return {
            'probability': None,
            'feature_importance': {},
            'error': error_msg
        }


def predict_slope_stability(model_dict: Dict[str, Any], input_dict: Dict[str, Any]) -> Dict[str, Any]:
    """
    Predicts slope stability (Factor of Safety) using the Terranox-AI model.
    
    Args:
        model_dict: Dictionary returned by load_models()
        input_dict: Input features dictionary with keys:
            - Unit Weight (kN/m³): float
            - Cohesion (kPa): float
            - Internal Friction Angle (°): float
            - Slope Angle (°): float
            - Slope Height (m): float
            - Pore Water Pressure Ratio: float
            - Reinforcement Type: str
            
    Returns:
        Dictionary with keys:
            - factor_of_safety: float
            - feature_importance: dict
            - error: str (if error occurred)
    """
    try:
        # Check if models are loaded
        if model_dict.get('slope_model') is None:
            return {
                'factor_of_safety': None,
                'feature_importance': {},
                'error': 'Slope stability model is not loaded. Please check model files.'
            }
        
        if model_dict.get('le_reinforcement') is None:
            return {
                'factor_of_safety': None,
                'feature_importance': {},
                'error': 'Reinforcement encoder is not loaded. Please check encoder files.'
            }
        
        # Map input features
        input_df = pd.DataFrame([input_dict])
        
        # Encode reinforcement type
        try:
            input_df['Reinforcement Type Encoded'] = model_dict['le_reinforcement'].transform(
                input_df['Reinforcement Type']
            )
        except ValueError as e:
            return {
                'factor_of_safety': None,
                'feature_importance': {},
                'error': f'Invalid Reinforcement Type: {str(e)}. Please check input value matches encoder classes.'
            }
        
        # Prepare model input
        for col in STABILITY_MODEL_FEATURES:
            if col not in input_df.columns:
                return {
                    'factor_of_safety': None,
                    'feature_importance': {},
                    'error': f'Missing required feature: {col}'
                }
        
        model_input = input_df[STABILITY_MODEL_FEATURES]
        
        # Make prediction
        slope_model = model_dict['slope_model']
        prediction = slope_model.predict(model_input)[0]
        factor_of_safety = float(prediction)
        
        # Get feature importance
        feature_importance = get_feature_importance(slope_model, STABILITY_FEATURE_NAMES_ORIGINAL)
        
        return {
            'factor_of_safety': round(factor_of_safety, 4),
            'feature_importance': feature_importance,
            'error': None
        }
        
    except Exception as e:
        error_msg = f"Error during slope stability prediction: {str(e)}"
        logger.error(error_msg)
        return {
            'factor_of_safety': None,
            'feature_importance': {},
            'error': error_msg
        }

