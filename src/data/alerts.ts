export interface Alert {
  id: string;
  touristId: string;
  touristName: string;
  type: 'location' | 'overstay' | 'distress' | 'medical' | 'crime';
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  description: string;
  status: 'active' | 'resolved' | 'investigating';
}
export const alerts: Alert[] = [{
  id: 'A001',
  touristId: 'T004',
  touristName: 'Maria Garcia',
  type: 'overstay',
  severity: 'medium',
  timestamp: '2023-10-21T09:15:00Z',
  location: {
    lat: 28.6139,
    lng: 77.209,
    name: 'New Delhi'
  },
  description: 'Tourist visa expired yesterday. No exit record found.',
  status: 'active'
}, {
  id: 'A002',
  touristId: 'T001',
  touristName: 'John Smith',
  type: 'location',
  severity: 'low',
  timestamp: '2023-10-22T14:30:00Z',
  location: {
    lat: 27.1751,
    lng: 78.0421,
    name: 'Agra'
  },
  description: 'Tourist entered restricted area near Taj Mahal.',
  status: 'resolved'
}, {
  id: 'A003',
  touristId: 'T002',
  touristName: 'Emma Johnson',
  type: 'distress',
  severity: 'high',
  timestamp: '2023-10-22T18:45:00Z',
  location: {
    lat: 26.9124,
    lng: 75.7873,
    name: 'Jaipur'
  },
  description: 'SOS signal activated from tourist mobile app.',
  status: 'investigating'
}, {
  id: 'A004',
  touristId: 'T005',
  touristName: 'David Chen',
  type: 'medical',
  severity: 'high',
  timestamp: '2023-10-22T20:10:00Z',
  location: {
    lat: 15.4989,
    lng: 73.8278,
    name: 'Goa'
  },
  description: 'Medical emergency reported at Cavelossim Beach.',
  status: 'active'
}, {
  id: 'A005',
  touristId: 'T002',
  touristName: 'Emma Johnson',
  type: 'crime',
  severity: 'medium',
  timestamp: '2023-10-22T16:20:00Z',
  location: {
    lat: 24.5854,
    lng: 73.7125,
    name: 'Udaipur'
  },
  description: 'Tourist reported theft of personal belongings near City Palace.',
  status: 'investigating'
}];