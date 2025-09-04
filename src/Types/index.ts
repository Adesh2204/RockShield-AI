export interface MineData {
  id: string;
  name: string;
  location: [number, number]; // [lat, lng]
  riskLevel: 'safe' | 'caution' | 'critical';
  lastIncident: string;
  factors: {
    slope: number;
    rainfall: number;
    vibration: number;
    displacement: number;
  };
}

export interface Alert {
  id: string;
  timestamp: string;
  type: 'rockfall' | 'equipment' | 'weather' | 'seismic';
  severity: 'low' | 'medium' | 'high';
  mine: string;
  message: string;
  resolved: boolean;
}

export interface TimelineEvent {
  id: string;
  time: string;
  type: 'incident' | 'prevention' | 'inspection';
  severity: 'safe' | 'caution' | 'critical';
  description: string;
}

export interface LeaderboardData {
  minesProtected: number;
  incidentsRevented: number;
  safetyChampion: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  outcome: string;
}