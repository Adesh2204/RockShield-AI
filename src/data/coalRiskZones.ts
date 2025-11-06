// Coal Mine Risk Zones Data for India
// Red zones = High Risk, Green zones = Medium Risk

export const highRiskZones = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Jharkhand Coal Belt",
        "risk": "High",
        "mines": 45,
        "riskScore": 85
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [85.0, 23.0],
          [86.5, 23.0],
          [86.5, 24.5],
          [85.0, 24.5],
          [85.0, 23.0]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Odisha Mining Region",
        "risk": "High",
        "mines": 38,
        "riskScore": 82
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [84.5, 20.5],
          [86.0, 20.5],
          [86.0, 22.0],
          [84.5, 22.0],
          [84.5, 20.5]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Chhattisgarh Coal Fields",
        "risk": "High",
        "mines": 42,
        "riskScore": 88
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [81.0, 21.0],
          [83.0, 21.0],
          [83.0, 22.5],
          [81.0, 22.5],
          [81.0, 21.0]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Madhya Pradesh Coal Belt",
        "risk": "High",
        "mines": 35,
        "riskScore": 80
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [78.0, 22.5],
          [79.5, 22.5],
          [79.5, 23.5],
          [78.0, 23.5],
          [78.0, 22.5]
        ]]
      }
    }
  ]
};

export const mediumRiskZones = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Maharashtra Mining Area",
        "risk": "Medium",
        "mines": 28,
        "riskScore": 65
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [75.0, 19.0],
          [77.0, 19.0],
          [77.0, 20.5],
          [75.0, 20.5],
          [75.0, 19.0]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Karnataka Coal Region",
        "risk": "Medium",
        "mines": 22,
        "riskScore": 60
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [75.0, 14.5],
          [76.5, 14.5],
          [76.5, 16.0],
          [75.0, 16.0],
          [75.0, 14.5]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "West Bengal Mining Belt",
        "risk": "Medium",
        "mines": 30,
        "riskScore": 68
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [86.5, 23.0],
          [88.0, 23.0],
          [88.0, 24.0],
          [86.5, 24.0],
          [86.5, 23.0]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Telangana Coal Fields",
        "risk": "Medium",
        "mines": 25,
        "riskScore": 62
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [78.5, 17.5],
          [80.0, 17.5],
          [80.0, 18.5],
          [78.5, 18.5],
          [78.5, 17.5]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Andhra Pradesh Mining Zone",
        "risk": "Medium",
        "mines": 20,
        "riskScore": 58
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [79.0, 15.5],
          [80.5, 15.5],
          [80.5, 17.0],
          [79.0, 17.0],
          [79.0, 15.5]
        ]]
      }
    }
  ]
};

export const coalMineMarkers = [
  { lat: 23.3441, lng: 85.3096, name: "Jharkhand Coal Hub", risk: "High", active: 45 },
  { lat: 20.9517, lng: 85.0985, name: "Odisha Mining Complex", risk: "High", active: 38 },
  { lat: 21.2787, lng: 81.8661, name: "Chhattisgarh Coal Fields", risk: "High", active: 42 },
  { lat: 22.9734, lng: 78.6569, name: "Madhya Pradesh Belt", risk: "High", active: 35 },
  { lat: 19.7515, lng: 75.7139, name: "Maharashtra Mining", risk: "Medium", active: 28 },
  { lat: 15.3173, lng: 75.7139, name: "Karnataka Coal Region", risk: "Medium", active: 22 },
  { lat: 23.5204, lng: 87.3119, name: "West Bengal Belt", risk: "Medium", active: 30 },
  { lat: 18.1124, lng: 79.0193, name: "Telangana Fields", risk: "Medium", active: 25 },
  { lat: 16.5062, lng: 80.6480, name: "Andhra Pradesh Zone", risk: "Medium", active: 20 }
];
