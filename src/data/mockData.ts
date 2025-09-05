import { MineData, Alert, TimelineEvent, LeaderboardData, Story } from '../Types';

export const minesData: MineData[] = [
  {
    id: 'mine-1',
    name: 'Jharia Coal Mine',
    location: [23.7957, 86.4304],
    riskLevel: 'critical',
    lastIncident: '2 hours ago',
    factors: { slope: 45, rainfall: 85, vibration: 7.2, displacement: 12 }
  },
  {
    id: 'mine-2',
    name: 'Singareni Coal Mine',
    location: [18.1124, 79.0193],
    riskLevel: 'caution',
    lastIncident: '1 day ago',
    factors: { slope: 32, rainfall: 45, vibration: 4.1, displacement: 6 }
  },
  {
    id: 'mine-3',
    name: 'Korba Coal Fields',
    location: [22.3595, 82.6503],
    riskLevel: 'safe',
    lastIncident: '5 days ago',
    factors: { slope: 28, rainfall: 20, vibration: 2.8, displacement: 3 }
  },
  {
    id: 'mine-4',
    name: 'Talcher Coal Mine',
    location: [20.9517, 85.2264],
    riskLevel: 'caution',
    lastIncident: '8 hours ago',
    factors: { slope: 38, rainfall: 65, vibration: 5.5, displacement: 8 }
  },
  {
    id: 'mine-5',
    name: 'Raniganj Coal Fields',
    location: [23.6290, 87.1440],
    riskLevel: 'safe',
    lastIncident: '3 days ago',
    factors: { slope: 25, rainfall: 30, vibration: 3.2, displacement: 4 }
  }
];

export const alertsData: Alert[] = [
  {
    id: 'alert-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: 'rockfall',
    severity: 'high',
    mine: 'Jharia Coal Mine',
    message: 'High vibration detected - immediate evacuation recommended',
    resolved: false
  },
  {
    id: 'alert-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    type: 'weather',
    severity: 'medium',
    mine: 'Talcher Coal Mine',
    message: 'Heavy rainfall warning - slope stability monitoring active',
    resolved: true
  },
  {
    id: 'alert-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    type: 'equipment',
    severity: 'low',
    mine: 'Singareni Coal Mine',
    message: 'Sensor calibration complete - all systems operational',
    resolved: true
  }
];

export const timelineData: TimelineEvent[] = [
  {
    id: 'event-1',
    time: '14:30',
    type: 'incident',
    severity: 'critical',
    description: 'Rockfall warning issued'
  },
  {
    id: 'event-2',
    time: '13:15',
    type: 'prevention',
    severity: 'caution',
    description: 'Preventive evacuation completed'
  },
  {
    id: 'event-3',
    time: '12:00',
    type: 'inspection',
    severity: 'safe',
    description: 'Routine safety inspection passed'
  },
  {
    id: 'event-4',
    time: '10:45',
    type: 'prevention',
    severity: 'safe',
    description: 'AI prediction prevented potential incident'
  }
];

export const leaderboardData: LeaderboardData = {
  minesProtected: 247,
  incidentsRevented: 89,
  safetyChampion: 'Jharia Operations Team'
};

export const storiesData: Story[] = [
  {
    id: 'story-1',
    title: 'The Great Jharia Rescue',
    description: 'RockyBot detected unstable rock formations 2 hours before a potential collapse.',
    image: 'https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg',
    outcome: '45 workers safely evacuated, zero injuries'
  },
  {
    id: 'story-2',
    title: 'Weather Alert Success',
    description: 'AI predicted dangerous conditions during monsoon season at Talcher mine.',
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    outcome: 'Operations halted, preventing weather-related accidents'
  },
  {
    id: 'story-3',
    title: 'Equipment Malfunction Prevention',
    description: 'Smart sensors detected equipment anomalies before catastrophic failure.',
    image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
    outcome: 'Maintenance scheduled, production continued safely'
  }
];