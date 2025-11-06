# 🎯 Quick Start Guide - Satellite Map Feature

## Where to Find the Satellite Map Button

### On the Homepage (Hero Section):

```
┌─────────────────────────────────────────────────────────────┐
│                    RockShield AI                            │
│         Real-Time Rockfall Risk Detection                   │
│              for Safer Mines                                │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  🎬 Launch Live  │ │ 📊 Risk         │ │ 🛰️ Satellite    │
│      Demo        │ │   Analytics      │ │     Map          │
│   (Orange)       │ │    (Blue)        │ │   (Purple)       │  ← NEW!
└──────────────────┘ └──────────────────┘ └──────────────────┘

              ┌──────────────────┐
              │   Learn More     │
              │    (Outlined)    │
              └──────────────────┘
```

---

## Button Colors & Functions

### 🟠 Launch Live Demo (Orange)
- **Route:** `/predict`
- **Purpose:** Risk prediction tool
- **Color:** Orange gradient

### 🔵 Risk Analytics (Blue)
- **Route:** `/analytics`
- **Purpose:** Charts and statistics
- **Color:** Blue gradient

### 🟣 Satellite Map (Purple) ← **NEW FEATURE**
- **Route:** `/satellite-map`
- **Purpose:** Live satellite monitoring
- **Color:** Purple gradient
- **Icon:** 🛰️

### ⚪ Learn More (Outlined)
- **Action:** Scroll to demo section
- **Color:** Transparent with white border

---

## What You'll See on the Satellite Map Page

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Back to Home          🛰️ RockShield AI                ┃
┃                          Satellite Monitoring System      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

         Live Satellite Map
    Real-time monitoring of coal mine danger zones

┌─────────────────┐  ┌──────────────────────────────┐
│ Satellite View  │  │  🔴 High Risk  🟢 Medium Risk│
│  Terrain View   │  └──────────────────────────────┘
└─────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                        ┃
┃              🗺️  INTERACTIVE MAP OF INDIA            ┃
┃                                                        ┃
┃   🔴 Jharkhand        🟢 Maharashtra                  ┃
┃   🔴 Odisha           🟢 Karnataka                    ┃
┃   🔴 Chhattisgarh     🟢 West Bengal                  ┃
┃   🔴 Madhya Pradesh   🟢 Telangana                    ┃
┃                       🟢 Andhra Pradesh               ┃
┃                                                        ┃
┃   (Click zones/markers for details)                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 🚨 High Risk │  │ 🛡️ Medium   │  │ 📍 Total     │
│   4 Zones    │  │   5 Zones    │  │  9 Regions   │
│  160 Mines   │  │  125 Mines   │  │   Live       │
└──────────────┘  └──────────────┘  └──────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃           ℹ️  Insights to Safety                     ┃
┃                                                        ┃
┃  Our satellite monitoring system provides real-time   ┃
┃  analysis of coal mine risk levels across India...    ┃
┃                                                        ┃
┃  📊 High Risk Indicators    🛡️ Monitoring Features   ┃
┃  • Unstable formations      • 24/7 surveillance       ┃
┃  • High rainfall            • AI detection            ┃
┃  • Steep slopes            • Real-time alerts         ┃
┃                                                        ┃
┃  ┌──────────────────┐  ┌──────────────────┐          ┃
┃  │ View Analytics   │  │ Safety Measures  │          ┃
┃  └──────────────────┘  └──────────────────┘          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Step-by-Step Usage

### Step 1: Access the Feature
```
1. Go to homepage: http://localhost:5175/
2. Scroll to the hero section (top of page)
3. Look for the button row
4. Click "🛰️ Satellite Map" (purple button)
```

### Step 2: Explore the Map
```
1. Map loads showing India
2. Use mouse to pan and zoom
3. Toggle "Satellite View" or "Terrain View"
4. See red (high-risk) and green (medium-risk) zones
```

### Step 3: View Zone Details
```
1. Click on any colored polygon
2. Popup shows:
   - Zone name (e.g., "Jharkhand Coal Belt")
   - Risk level (High/Medium)
   - Active mines (e.g., 45)
   - Risk score (e.g., 85/100)
```

### Step 4: Explore Markers
```
1. Click on circular markers
2. Red circles = high-risk mines
3. Green circles = medium-risk mines
4. Popup shows mine details
```

### Step 5: Take Action
```
1. Scroll down to "Insights to Safety"
2. Read about risk indicators
3. Click "View Analytics" for charts
4. Click "Safety Measures" for predictions
```

---

## Color Legend

| Color | Meaning | Count | Mines |
|-------|---------|-------|-------|
| 🔴 Red | High Risk Zones | 4 | 160 |
| 🟢 Green | Medium Risk Zones | 5 | 125 |
| 🟣 Purple | UI Accent (buttons, borders) | - | - |
| ⚪ White | Text and borders | - | - |

---

## Map Controls

### Zoom:
- **Scroll Wheel:** Zoom in/out
- **+ / - Buttons:** Zoom controls (top-left)
- **Double Click:** Zoom in

### Pan:
- **Click + Drag:** Move map around
- **Arrow Keys:** Navigate (if focused)

### Reset:
- Click on marker or zone
- Use zoom controls to reset view

---

## Interactive Elements

### Polygons (Risk Zones):
```
✅ Clickable
✅ Show popup with details
✅ Hover effect
✅ Semi-transparent overlay
✅ Color-coded by risk
```

### Markers (Mine Locations):
```
✅ Clickable
✅ Show popup with info
✅ Custom colored icons
✅ Different sizes by risk
✅ Drop shadow for depth
```

### View Toggle:
```
✅ Satellite View (high-res imagery)
✅ Terrain View (topographic map)
✅ Instant switching
✅ No page reload
```

---

## Navigation Flow

```
Homepage (/)
    │
    ├── Click "Launch Live Demo" → Prediction Page (/predict)
    │
    ├── Click "Risk Analytics" → Analytics Dashboard (/analytics)
    │
    ├── Click "Satellite Map" → Satellite Map (/satellite-map) ← YOU ARE HERE
    │                               │
    │                               ├── Click "View Analytics" → /analytics
    │                               │
    │                               ├── Click "Safety Measures" → /predict
    │                               │
    │                               └── Click "Back to Dashboard" → /
    │
    └── Click "Learn More" → Scroll to demo section
```

---

## Keyboard Shortcuts (When Map is Focused)

| Key | Action |
|-----|--------|
| `+` | Zoom in |
| `-` | Zoom out |
| `Arrow Keys` | Pan map |
| `Esc` | Close popup |
| `Home` | Reset to India view |

---

## Troubleshooting

### Map not loading?
```
✓ Check internet connection (tiles load from ESRI)
✓ Clear browser cache (Cmd+Shift+R on Mac)
✓ Try different browser
```

### Zones not visible?
```
✓ Zoom in closer (level 6-10)
✓ Check if satellite view is selected
✓ Refresh the page
```

### Button not appearing?
```
✓ Scroll to top of homepage
✓ Clear cache and reload
✓ Check browser console for errors
```

---

## Mobile Instructions

### On Mobile Devices:

1. **Access:**
   - Tap homepage
   - Scroll to hero section
   - Tap "🛰️ Satellite Map" button

2. **Navigate:**
   - Pinch to zoom
   - Swipe to pan
   - Tap zones/markers for info

3. **Toggle View:**
   - Tap "Satellite View" or "Terrain View"
   - Works on all mobile browsers

---

## Performance Tips

### For Best Experience:

1. **Good Internet:** Satellite tiles are 2-5 MB
2. **Modern Browser:** Chrome, Firefox, Safari, Edge
3. **Zoom Level:** Stay between 5-12 for best detail
4. **Clear Cache:** If tiles don't load properly

---

## Data Interpretation

### Risk Zones Explained:

**🔴 High Risk (Red):**
- Risk Score: 80-100
- Steep slopes (>45°)
- High rainfall areas
- Seismic activity zones
- Recent landslide history

**🟢 Medium Risk (Green):**
- Risk Score: 50-79
- Moderate slopes (30-45°)
- Normal rainfall
- Lower seismic activity
- Stable geological formations

---

## Quick Tips

💡 **Click zones, not just markers**, for region-wide data  
💡 **Toggle between views** to compare satellite vs terrain  
💡 **Hover over zones** to see region names  
💡 **Use statistics cards** for quick overview  
💡 **Read Insights panel** for safety education  

---

## Support

### Need Help?
- 📖 Read: `SATELLITE_MAP_FEATURE.md`
- 📝 Check: `IMPLEMENTATION_SUMMARY.md`
- 🐛 Issues: Check browser console (F12)

### Want More Features?
- Future enhancements planned
- Real-time data integration ready
- ISRO Bhuvan API support prepared

---

**🎉 Enjoy exploring India's coal mine risk zones!**

**Updated:** November 6, 2025  
**Version:** 1.0.0
