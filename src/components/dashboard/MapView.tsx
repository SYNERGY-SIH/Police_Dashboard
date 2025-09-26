import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mock socket for demonstration
const socket = {
  on: (event: string, callback: Function) => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        callback({
          id: `RT${Date.now()}`,
          name: getRandomName(),
          touristId: generateTouristId(),
          lat: BBOX.minLat + Math.random() * (BBOX.maxLat - BBOX.minLat),
          lng: BBOX.minLng + Math.random() * (BBOX.maxLng - BBOX.minLng),
          time: new Date().toISOString(),
          phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          nationality: ["Indian", "American", "British", "Japanese", "German"][Math.floor(Math.random() * 5)],
          purpose: ["Tourism", "Business", "Transit", "Official"][Math.floor(Math.random() * 4)],
          hotel: `Hotel ${Math.floor(Math.random() * 20) + 1}`,
          emergencyContact: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  },
  off: () => {}
};

const MISSING_HOURS = 6;

// Seven Sisters bounding box
const BBOX = { minLat: 22.0, maxLat: 29.5, minLng: 89.0, maxLng: 97.5 };

type Tourist = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  time: string;
  touristId?: string;
  phone?: string;
  nationality?: string;
  purpose?: string;
  hotel?: string;
  emergencyContact?: string;
};

function inBBox(lat: number, lng: number) {
  return lat >= BBOX.minLat && lat <= BBOX.maxLat && lng >= BBOX.minLng && lng <= BBOX.maxLng;
}

const generateTouristId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const numbers = Math.floor(Math.random() * 90000000) + 10000000; // 8 digits
  return `${letter}${numbers}`;
};

const getRandomName = () => {
  const firstNames = [
    "Raj", "Priya", "Amit", "Sunita", "Ravi", "Meera", "Vikram", "Anita", "Suresh", "Kavita",
    "John", "Sarah", "Michael", "Emma", "David", "Lisa", "Robert", "Jennifer", "William", "Ashley",
    "Hiroshi", "Yuki", "Kenji", "Akiko", "Takeshi", "Sakura", "Klaus", "Greta", "Hans", "Ingrid",
    "Pierre", "Marie", "Antoine", "Camille", "Jean", "Sophie", "James", "Emily", "Thomas", "Grace"
  ];
  const lastNames = [
    "Sharma", "Patel", "Kumar", "Singh", "Gupta", "Verma", "Yadav", "Joshi", "Shah", "Agarwal",
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Tanaka", "Sato", "Suzuki", "Takahashi", "Watanabe", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Saito",
    "Mueller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann",
    "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Petit", "Durand", "Leroy", "Moreau", "Simon"
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
};

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const markersRef = useRef<L.Layer[]>([]);

  const classify = (t: Tourist) => {
    const hrs = (Date.now() - new Date(t.time).getTime()) / (1000 * 60 * 60);
    if (hrs <= 4) return { status: "safe", color: "#22c55e", intensity: 0.3 };
    if (hrs <= 6) return { status: "warning", color: "#f59e0b", intensity: 0.5 };
    return { status: "missing", color: "#ef4444", intensity: 0.8 };
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      if (mapRef.current) {
        mapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = [];
  };

  const createPulsingMarker = (lat: number, lng: number, color: string) => {
    const pulseIcon = L.divIcon({
      className: 'pulse-marker',
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 20px ${color}70;
          animation: pulse 2s infinite;
        "></div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 ${color}70; }
            50% { transform: scale(1.1); box-shadow: 0 0 0 10px ${color}20; }
            100% { transform: scale(1); box-shadow: 0 0 0 20px transparent; }
          }
        </style>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    return L.marker([lat, lng], { icon: pulseIcon });
  };

  const renderTourists = (list: Tourist[]) => {
    clearMarkers();

    list.forEach((t) => {
      if (!inBBox(t.lat, t.lng)) return;
      const { status, color, intensity } = classify(t);

      // Create pulsing marker
      const marker = createPulsingMarker(t.lat, t.lng, color);
      
      // Heat circle with gradient effect
      const heatRadius = status === "safe" ? 8000 : status === "warning" ? 12000 : 18000;
      const heatCircle = L.circle([t.lat, t.lng], {
        radius: heatRadius,
        fillColor: color,
        fillOpacity: intensity * 0.3,
        color: color,
        weight: 2,
        opacity: intensity * 0.6,
      });

      // Inner intense circle
      const innerCircle = L.circle([t.lat, t.lng], {
        radius: heatRadius * 0.3,
        fillColor: color,
        fillOpacity: intensity * 0.6,
        stroke: false,
      });

      // Click handler for detailed info
      const showTouristInfo = () => {
        setSelectedTourist(t);
      };

      marker.on('click', showTouristInfo);
      heatCircle.on('click', showTouristInfo);
      innerCircle.on('click', showTouristInfo);

      // Hover effects
      marker.on('mouseover', () => {
        marker.bindTooltip(`
          <div style="font-size: 12px;">
            <strong>${t.name}</strong><br/>
            Status: <span style="color:${color}">${status.toUpperCase()}</span><br/>
            Last seen: ${new Date(t.time).toLocaleTimeString()}
          </div>
        `, { permanent: false, direction: 'top' }).openTooltip();
      });

      if (mapRef.current) {
        heatCircle.addTo(mapRef.current);
        innerCircle.addTo(mapRef.current);
        marker.addTo(mapRef.current);
        
        markersRef.current.push(heatCircle, innerCircle, marker);
      }
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    fixLeafletIcon();

    const map = L.map(containerRef.current).setView([26.2, 92.9], 6);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    // Generate dummy tourists with more detailed info
    const dummy: Tourist[] = Array.from({ length: 25 }).map((_, i) => ({
      id: `D${i}`,
      name: getRandomName(),
      touristId: generateTouristId(),
      lat: BBOX.minLat + Math.random() * (BBOX.maxLat - BBOX.minLat),
      lng: BBOX.minLng + Math.random() * (BBOX.maxLng - BBOX.minLng),
      time: new Date(Date.now() - Math.random() * 8 * 3600 * 1000).toISOString(),
      phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      nationality: ["Indian", "American", "British", "Japanese", "German", "French", "Australian"][Math.floor(Math.random() * 7)],
      purpose: ["Tourism", "Business", "Transit", "Official", "Medical"][Math.floor(Math.random() * 5)],
      hotel: `Hotel ${Math.floor(Math.random() * 20) + 1}`,
      emergencyContact: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`
    }));
    
    setTourists(dummy);
    renderTourists(dummy);

    // Real-time updates
    const cleanup = socket.on("tourist-login", (rec: Tourist) => {
      if (!inBBox(rec.lat, rec.lng)) return;
      setTourists((prev) => {
        const updated = [rec, ...prev.filter((p) => p.id !== rec.id)];
        setTimeout(() => renderTourists(updated), 0);
        return updated;
      });
    });

    return () => {
      socket.off("tourist-login");
      if (cleanup) cleanup();
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (tourists.length > 0) {
      renderTourists(tourists);
    }
  }, [tourists]);

  const getStatusStats = () => {
    const stats = { safe: 0, warning: 0, missing: 0 };
    tourists.forEach(t => {
      const { status } = classify(t);
      stats[status as keyof typeof stats]++;
    });
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <h3 className="text-lg font-semibold mb-2">Seven Sisters Tourist Heatmap</h3>
        <div className="flex gap-6 text-sm">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            Safe: {stats.safe}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            Warning: {stats.warning}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            Missing: {stats.missing}
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div ref={containerRef} className="h-[700px] w-full" />
        
        {selectedTourist && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm z-[1000] border">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-semibold text-gray-800">Tourist Details</h4>
              <button 
                onClick={() => setSelectedTourist(null)}
                className="text-gray-500 hover:text-gray-700 text-xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-800">{selectedTourist.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Tourist ID:</span>
                <span className="text-gray-800">{selectedTourist.touristId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="text-gray-800">{selectedTourist.phone}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Nationality:</span>
                <span className="text-gray-800">{selectedTourist.nationality}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Purpose:</span>
                <span className="text-gray-800">{selectedTourist.purpose}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Hotel:</span>
                <span className="text-gray-800">{selectedTourist.hotel}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Emergency:</span>
                <span className="text-gray-800">{selectedTourist.emergencyContact}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Last Login:</span>
                <span className="text-gray-800">{new Date(selectedTourist.time).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  classify(selectedTourist).status === 'safe' ? 'bg-green-100 text-green-800' :
                  classify(selectedTourist).status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {classify(selectedTourist).status.toUpperCase()}
                </span>
              </div>
              
              <div className="pt-2">
                <span className="font-medium text-gray-600">Location:</span>
                <div className="text-gray-800 text-xs mt-1">
                  Lat: {selectedTourist.lat.toFixed(4)}, Lng: {selectedTourist.lng.toFixed(4)}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                Track
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-6 py-3 bg-gray-50 text-xs text-gray-600">
        Click on any marker or heat zone to view detailed tourist information • Real-time updates every 5 seconds
      </div>
    </div>
  );
}