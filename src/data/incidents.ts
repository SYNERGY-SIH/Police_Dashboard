export interface Incident {
  id: string;
  touristId: string;
  touristName: string;
  type: 'theft' | 'harassment' | 'fraud' | 'accident' | 'medical' | 'overstay' | 'other';
  date: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  description: string;
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  assignedTo: string;
  firNumber?: string;
  firContent?: string;
  evidence?: string[];
}
export const incidents: Incident[] = [{
  id: 'I001',
  touristId: 'T002',
  touristName: 'Emma Johnson',
  type: 'theft',
  date: '2023-10-22',
  location: {
    lat: 24.5854,
    lng: 73.7125,
    name: 'City Palace, Udaipur'
  },
  description: 'Tourist reported theft of wallet containing cash and credit cards near the City Palace entrance.',
  status: 'investigating',
  assignedTo: 'Inspector Sharma',
  firNumber: 'FIR/2023/10/245',
  firContent: "On 22nd October 2023, Ms. Emma Johnson (Passport: B98765432) reported theft of personal belongings at City Palace, Udaipur. Items stolen include one brown leather wallet containing approximately ₹5,000 in cash, two credit cards (Visa and Mastercard), and one Australian driver's license. Incident occurred between 15:30-16:00 hours when complainant was taking photographs. No suspects identified yet. CCTV footage being reviewed.",
  evidence: ['https://images.unsplash.com/photo-1599661046289-e31897d36a92', 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b']
}, {
  id: 'I002',
  touristId: 'T004',
  touristName: 'Maria Garcia',
  type: 'overstay',
  date: '2023-10-21',
  location: {
    lat: 28.6139,
    lng: 77.209,
    name: 'New Delhi'
  },
  description: 'Tourist visa expired on 20th October 2023. No exit record found in immigration system.',
  status: 'investigating',
  assignedTo: 'Officer Kumar',
  firNumber: 'FIR/2023/10/243',
  firContent: 'Subject Maria Garcia (Passport: ES123456) has overstayed tourist visa which expired on 20th October 2023. Last known accommodation at The Lodhi, New Delhi. Attempts to contact subject via registered phone number have been unsuccessful. Hotel confirms check-out on 12th October with intended travel to Kerala. Immigration alerts have been placed at all international departure points.'
}, {
  id: 'I003',
  touristId: 'T005',
  touristName: 'David Chen',
  type: 'medical',
  date: '2023-10-22',
  location: {
    lat: 15.4989,
    lng: 73.8278,
    name: 'Cavelossim Beach, Goa'
  },
  description: 'Tourist suffered medical emergency while swimming at Cavelossim Beach. Hospitalized at Apollo Hospital, Goa.',
  status: 'resolved',
  assignedTo: 'Officer Fernandes'
}, {
  id: 'I004',
  touristId: 'T001',
  touristName: 'John Smith',
  type: 'harassment',
  date: '2023-10-21',
  location: {
    lat: 27.1751,
    lng: 78.0421,
    name: 'Taj Mahal, Agra'
  },
  description: 'Tourist reported harassment by unauthorized guides outside Taj Mahal east gate.',
  status: 'closed',
  assignedTo: 'Inspector Verma',
  firNumber: 'FIR/2023/10/240',
  firContent: 'Mr. John Smith (Passport: A12345678) reported harassment by unauthorized guides at Taj Mahal east gate on 21st October 2023 at approximately 10:30 hours. Complainant states that three unidentified men persistently offered guide services and followed him for approximately 200 meters despite repeated refusals. No physical contact or threats were made. Local tourism police have been advised to increase patrols in the area.'
}, {
  id: 'I005',
  touristId: 'T003',
  touristName: 'Hiroshi Tanaka',
  type: 'fraud',
  date: '2023-10-14',
  location: {
    lat: 22.5726,
    lng: 88.3639,
    name: 'New Market, Kolkata'
  },
  description: 'Tourist was charged excessive amount for souvenirs at New Market. Merchant refused to provide receipt.',
  status: 'resolved',
  assignedTo: 'Officer Banerjee',
  firNumber: 'FIR/2023/10/235',
  firContent: 'On 14th October 2023, Mr. Hiroshi Tanaka (Passport: JP7654321) reported being charged ₹15,000 for handicrafts at New Market, Kolkata, which appeared to be significantly above market value. Merchant identified as Rajan Crafts (Shop #143, New Market). Upon investigation, merchant agreed to partial refund of ₹8,000 and provided proper GST invoice. Tourist accepted resolution and withdrew complaint.'
}];