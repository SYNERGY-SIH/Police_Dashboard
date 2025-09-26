export interface Tourist {
  id: string;
  name: string;
  passportNumber: string;
  nationality: string;
  gender: string;
  age: number;
  photo: string;
  entryDate: string;
  exitDate: string;
  visaType: string;
  accommodation: {
    name: string;
    address: string;
    checkIn: string;
    checkOut: string;
  }[];
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
  itinerary: {
    date: string;
    location: string;
    activity: string;
  }[];
  status: 'active' | 'departed' | 'overstayed';
}
export const tourists: Tourist[] = [{
  id: 'T001',
  name: 'John Smith',
  passportNumber: 'A12345678',
  nationality: 'United Kingdom',
  gender: 'Male',
  age: 34,
  photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  entryDate: '2023-10-15',
  exitDate: '2023-10-30',
  visaType: 'Tourist',
  accommodation: [{
    name: 'Taj Palace Hotel',
    address: '2 Sardar Patel Marg, Diplomatic Enclave, New Delhi',
    checkIn: '2023-10-15',
    checkOut: '2023-10-20'
  }, {
    name: 'Oberoi Amarvilas',
    address: 'Taj East Gate Road, Agra',
    checkIn: '2023-10-20',
    checkOut: '2023-10-25'
  }, {
    name: 'Rambagh Palace',
    address: 'Bhawani Singh Road, Jaipur',
    checkIn: '2023-10-25',
    checkOut: '2023-10-30'
  }],
  emergencyContacts: [{
    name: 'Mary Smith',
    relationship: 'Wife',
    phone: '+44-7700-900123'
  }, {
    name: 'UK Embassy',
    relationship: 'Embassy',
    phone: '+91-11-2419-2100'
  }],
  itinerary: [{
    date: '2023-10-16',
    location: 'Delhi',
    activity: 'Red Fort, Qutub Minar'
  }, {
    date: '2023-10-21',
    location: 'Agra',
    activity: 'Taj Mahal, Agra Fort'
  }, {
    date: '2023-10-26',
    location: 'Jaipur',
    activity: 'Amber Fort, City Palace'
  }],
  status: 'active'
}, {
  id: 'T002',
  name: 'Emma Johnson',
  passportNumber: 'B98765432',
  nationality: 'Australia',
  gender: 'Female',
  age: 28,
  photo: 'https',
  entryDate: '2023-10-10',
  exitDate: '2023-11-05',
  visaType: 'Tourist',
  accommodation: [{
    name: 'The Leela Palace',
    address: 'Diplomatic Enclave, Chanakyapuri, New Delhi',
    checkIn: '2023-10-10',
    checkOut: '2023-10-15'
  }, {
    name: 'Taj Lake Palace',
    address: 'Pichola Lake, Udaipur',
    checkIn: '2023-10-15',
    checkOut: '2023-10-25'
  }, {
    name: 'Wildflower Hall',
    address: 'Chharabra, Shimla',
    checkIn: '2023-10-25',
    checkOut: '2023-11-05'
  }],
  emergencyContacts: [{
    name: 'Robert Johnson',
    relationship: 'Father',
    phone: '+61-4-1234-5678'
  }, {
    name: 'Australian High Commission',
    relationship: 'Embassy',
    phone: '+91-11-4139-9900'
  }],
  itinerary: [{
    date: '2023-10-12',
    location: 'Delhi',
    activity: 'India Gate, Humayun\'s Tomb'
  }, {
    date: '2023-10-18',
    location: 'Udaipur',
    activity: 'City Palace, Boat Ride'
  }, {
    date: '2023-10-28',
    location: 'Shimla',
    activity: 'Mall Road, Jakhu Temple'
  }],
  status: 'active'
}, {
  id: 'T003',
  name: 'Hiroshi Tanaka',
  passportNumber: 'JP7654321',
  nationality: 'Japan',
  gender: 'Male',
  age: 42,
  photo: 'https://randomuser.me/api/portraits/men/75.jpg',
  entryDate: '2023-09-25',
  exitDate: '2023-10-15',
  visaType: 'Tourist',
  accommodation: [{
    name: 'The Imperial',
    address: 'Janpath, New Delhi',
    checkIn: '2023-09-25',
    checkOut: '2023-10-01'
  }, {
    name: 'Taj Mahal Palace',
    address: 'Apollo Bunder, Mumbai',
    checkIn: '2023-10-01',
    checkOut: '2023-10-08'
  }, {
    name: 'Taj Bengal',
    address: '34B Belvedere Road, Kolkata',
    checkIn: '2023-10-08',
    checkOut: '2023-10-15'
  }],
  emergencyContacts: [{
    name: 'Yuki Tanaka',
    relationship: 'Spouse',
    phone: '+81-90-1234-5678'
  }, {
    name: 'Embassy of Japan',
    relationship: 'Embassy',
    phone: '+91-11-2687-6564'
  }],
  itinerary: [{
    date: '2023-09-27',
    location: 'Delhi',
    activity: 'Lotus Temple, Akshardham'
  }, {
    date: '2023-10-03',
    location: 'Mumbai',
    activity: 'Gateway of India, Elephanta Caves'
  }, {
    date: '2023-10-10',
    location: 'Kolkata',
    activity: 'Victoria Memorial, Howrah Bridge'
  }],
  status: 'departed'
}, {
  id: 'T004',
  name: 'Maria Garcia',
  passportNumber: 'ES123456',
  nationality: 'Spain',
  gender: 'Female',
  age: 31,
  photo: 'https://randomuser.me/api/portraits/women/63.jpg',
  entryDate: '2023-10-05',
  exitDate: '2023-10-20',
  visaType: 'Tourist',
  accommodation: [{
    name: 'The Lodhi',
    address: 'Lodhi Road, New Delhi',
    checkIn: '2023-10-05',
    checkOut: '2023-10-12'
  }, {
    name: 'Kumarakom Lake Resort',
    address: 'Kumarakom, Kerala',
    checkIn: '2023-10-12',
    checkOut: '2023-10-20'
  }],
  emergencyContacts: [{
    name: 'Carlos Garcia',
    relationship: 'Brother',
    phone: '+34-612-345-678'
  }, {
    name: 'Embassy of Spain',
    relationship: 'Embassy',
    phone: '+91-11-4129-3000'
  }],
  itinerary: [{
    date: '2023-10-07',
    location: 'Delhi',
    activity: 'Chandni Chowk, Jama Masjid'
  }, {
    date: '2023-10-14',
    location: 'Kerala',
    activity: 'Backwaters Cruise, Ayurveda Spa'
  }],
  status: 'overstayed'
}, {
  id: 'T005',
  name: 'David Chen',
  passportNumber: 'CN9876543',
  nationality: 'Canada',
  gender: 'Male',
  age: 38,
  photo: 'https://randomuser.me/api/portraits/men/91.jpg',
  entryDate: '2023-10-12',
  exitDate: '2023-11-02',
  visaType: 'Tourist',
  accommodation: [{
    name: 'ITC Maurya',
    address: 'Diplomatic Enclave, Sardar Patel Marg, New Delhi',
    checkIn: '2023-10-12',
    checkOut: '2023-10-18'
  }, {
    name: 'Taj Falaknuma Palace',
    address: 'Engine Bowli, Hyderabad',
    checkIn: '2023-10-18',
    checkOut: '2023-10-25'
  }, {
    name: 'Radisson Blu Resort',
    address: 'Cavelossim Beach, Goa',
    checkIn: '2023-10-25',
    checkOut: '2023-11-02'
  }],
  emergencyContacts: [{
    name: 'Linda Chen',
    relationship: 'Wife',
    phone: '+1-416-555-7890'
  }, {
    name: 'Canadian High Commission',
    relationship: 'Embassy',
    phone: '+91-11-4178-2000'
  }],
  itinerary: [{
    date: '2023-10-14',
    location: 'Delhi',
    activity: 'Lodhi Gardens, National Museum'
  }, {
    date: '2023-10-20',
    location: 'Hyderabad',
    activity: 'Charminar, Golconda Fort'
  }, {
    date: '2023-10-27',
    location: 'Goa',
    activity: 'Beach, Water Sports'
  }],
  status: 'active'
}];
export const getTouristById = (id: string): Tourist | undefined => {
  return tourists.find(tourist => tourist.id === id);
};