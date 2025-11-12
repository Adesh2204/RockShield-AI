# 🛡️ RockShield AI - Production Deployment Guide

## 📋 Overview
This guide provides step-by-step instructions for deploying RockShield AI's ML-powered rockfall risk prediction system to production. The system is now bulletproof with multiple fallback layers for maximum reliability.

## 🚀 Quick Start

### 1. Deploy ML Service
```bash
cd ml-service
./deploy.sh
```

### 2. Start ML Backend
```bash
# Development
python3.11 deployment_app.py

# Production with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 deployment_app:app
```

### 3. Start Frontend
```bash
npm install
npm run dev
# or for production: npm run build && npm run preview
```

## 🔧 Deployment Strategies

### Local Development
- **ML Backend**: `python3.11 deployment_app.py` (Port 5001)
- **Frontend**: `npm run dev` (Port 5174)
- **Models**: Auto-loaded from `ml-service/models/`

### Production Deployment

#### Option 1: Standard Server
```bash
# Install dependencies
pip install -r ml-service/requirements-production.txt

# Deploy ML service
cd ml-service && ./deploy.sh

# Start with Gunicorn (production WSGI server)
gunicorn -w 4 -b 0.0.0.0:5001 deployment_app:app --timeout 60

# Build and serve frontend
npm run build
npm run preview
```

#### Option 2: Docker Deployment
```bash
# Build Docker image
docker build -t rockshield-ai .

# Run container
docker run -p 5001:5001 rockshield-ai

# Or with docker-compose
docker-compose up -d
```

#### Option 3: Cloud Deployment (AWS/GCP/Azure)
- Copy `.env.production` to `.env` and configure
- Deploy ML service as containerized microservice
- Use cloud ML services as alternative backend
- Deploy frontend to CDN (Vercel, Netlify, CloudFlare)

## 🧠 ML Model Architecture

### Primary Strategy: Trained Models
- **Models**: RandomForest (Risk + Slope Stability)
- **Location**: `ml-service/models/*.joblib`
- **Features**: Rainfall, Triggers, Size, Geography, Topography
- **Performance**: High accuracy with Indian geological data

### Fallback Strategy: Heuristic Engine
```python
# Automatic fallback if models fail
risk_score = (
    rainfall_risk * 0.35 +
    trigger_risk * 0.30 + 
    size_risk * 0.20 +
    geo_risk * 0.10 +
    topo_risk * 0.05
)
```

### Emergency Strategy: Mathematical Calculation
- Always available, no dependencies
- India-specific risk factors
- Geological variability considerations

## 📊 API Endpoints

### Health Check
```bash
GET /health
Response: {
  "status": "healthy",
  "models_loaded": true,
  "version": "2.0.0-deployment-ready"
}
```

### Risk Prediction
```bash
POST /predict_risk
Body: {
  "latitude": 23.5,
  "longitude": 85.5,
  "landslide_trigger": "Earthquake",
  "landslide_size": "Large",
  "admin_division_name": "Jharkhand", 
  "annual_rainfall_mm": 1500
}
Response: {
  "high_risk_probability": 0.6851,
  "risk_level": "MEDIUM",
  "method": "ML_MODEL",
  "confidence": "HIGH"
}
```

### Slope Stability
```bash
POST /predict_stability
Response: {
  "safety_factor": 2.45,
  "stability_status": "STABLE"
}
```

## 🌍 Production Configuration

### Environment Variables (.env)
```bash
FLASK_ENV=production
ML_SERVICE_PORT=5001
CORS_ORIGINS=https://your-domain.com
SECRET_KEY=your-production-secret
LOG_LEVEL=INFO
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /api/ {
        proxy_pass http://127.0.0.1:5001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔒 Security Features

### API Security
- CORS protection with configurable origins
- Input validation and sanitization
- Rate limiting ready (add nginx limit_req)
- Error handling without information leakage

### Model Security
- Multiple fallback layers prevent total failure
- Graceful degradation on model corruption
- Version compatibility warnings (non-breaking)

## 📈 Monitoring & Health

### Automated Health Checks
```bash
# Service health
curl http://localhost:5001/health

# Prediction test
curl -X POST http://localhost:5001/predict_risk \
  -H "Content-Type: application/json" \
  -d '{"latitude":23.5,"longitude":85.5,"landslide_trigger":"Earthquake","landslide_size":"Large","admin_division_name":"Jharkhand","annual_rainfall_mm":1500}'
```

### Logging
- Structured JSON logging
- Model loading status
- Prediction method tracking (ML_MODEL vs HEURISTIC)
- Performance metrics

## 🚨 Emergency Features

### Alert System
- **Route**: `/emergency-alert`
- **Features**: Real-time chat with Indian authorities
- **Contacts**: CM, Home Minister, Emergency Services
- **Integration**: Direct phone/SMS capabilities

### Risk Thresholds
- **High Risk**: >70% (Red Alert)
- **Medium Risk**: 30-70% (Yellow Warning)
- **Low Risk**: <30% (Green Safe)

## 🧪 Testing & Validation

### Pre-deployment Tests
```bash
# Run deployment validation
cd ml-service && ./deploy.sh

# Test all endpoints
python -m pytest tests/ -v

# Load testing (if available)
ab -n 1000 -c 10 http://localhost:5001/health
```

### Post-deployment Verification
1. ✅ Health endpoint returns 200
2. ✅ Predictions vary with input changes
3. ✅ Emergency alert system accessible
4. ✅ Frontend-backend communication
5. ✅ Error handling graceful

## 📱 Frontend Features

### Core Pages
- **Home**: Dashboard and overview
- **Prediction**: Risk assessment form
- **Analytics**: Comprehensive risk analytics
- **Emergency**: Authority contact system
- **Satellite**: Interactive mapping

### Mobile Responsiveness
- Responsive design for all screen sizes
- Touch-friendly emergency contact
- Offline capability planning

## 🔄 Continuous Deployment

### GitHub Actions (example)
```yaml
name: Deploy RockShield AI
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.11'
      - name: Install ML dependencies
        run: pip install -r ml-service/requirements-production.txt
      - name: Test ML service
        run: cd ml-service && ./deploy.sh
      - name: Build frontend
        run: npm install && npm run build
      - name: Deploy to production
        run: # Your deployment script
```

## 🎯 Performance Optimization

### ML Service
- Model caching in memory
- Async request handling ready
- Database connections pooled (if database added)
- Response compression

### Frontend
- Vite build optimization
- Component lazy loading
- API response caching
- Progressive Web App ready

## 📞 Support & Troubleshooting

### Common Issues

#### "Models not loading"
- **Solution**: Run `./deploy.sh` to regenerate models
- **Fallback**: System automatically uses heuristic calculations

#### "Version warnings"
- **Solution**: Update scikit-learn: `pip install scikit-learn==1.6.1`
- **Impact**: Non-breaking, predictions still work

#### "CORS errors"
- **Solution**: Update CORS_ORIGINS in .env.production
- **Check**: Ensure frontend domain matches CORS config

### Emergency Contacts
- **Technical**: Check logs in `ml-service/logs/`
- **Models**: Re-run `python generate_models.py`
- **Database**: Check connection strings in .env

## 🎉 Deployment Success Checklist

- [ ] ML service starts without errors
- [ ] Health endpoint returns "healthy"
- [ ] Predictions show variable results
- [ ] Frontend loads and connects to API
- [ ] Emergency alert system functional
- [ ] All routes accessible
- [ ] Error handling working
- [ ] Logs show proper information
- [ ] Performance acceptable under load
- [ ] Security headers configured

## 📊 Success Metrics

### Technical KPIs
- **Uptime**: >99.9%
- **Response Time**: <2s for predictions
- **Model Accuracy**: Variable results (not stuck at 40%)
- **Error Rate**: <0.1%

### Business KPIs  
- **Risk Assessment Speed**: <5s end-to-end
- **Emergency Response**: <30s to authority contact
- **User Engagement**: Analytics dashboard usage
- **Mining Safety**: Reduction in incidents

---

**🛡️ RockShield AI is now deployment-ready with bulletproof ML reliability!**
