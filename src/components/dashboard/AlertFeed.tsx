import React, { useEffect, useState } from "react";
import { AlertTriangleIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { io } from "socket.io-client";
import { EFIRModal } from "./EFIRModal"; // Import the new modal component

const socket = io("http://localhost:4000");

// --- UPDATE 1: Define a more complete Alert type ---
// This type will hold ALL the data we get from the socket
export interface Alert {
  id: string;
  message: string;
  lat: number;
  lng: number;
  time: string;
  touristName: string;
  // Nest the full incident and tourist objects
  incident: any; 
  tourist: any;
}

const AlertFeed: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // --- UPDATE 2: Add state for the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  useEffect(() => {
    socket.on("new-alert", (data) => {
      // Create a complete alert object holding all nested data
      const newAlert: Alert = {
        ...data.alert,
        touristName: data.tourist.name,
        incident: data.incident, // Store the full incident object
        tourist: data.tourist,   // Store the full tourist object
      };
      setAlerts((prev) => [newAlert, ...prev]);
    });

    return () => {
      socket.off("new-alert");
    };
  }, []);

  // --- UPDATE 3: Create functions to handle the modal ---
  const handleOpenModal = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };

  // Helper functions (getAlertTypeIcon, formatDate) remain the same...
  // Helper functions to format data for display
  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "location":
        return <MapPinIcon size={16} className="text-yellow-500" />;
      case "overstay":
        return <ClockIcon size={16} className="text-orange-500" />;
      case "distress":
      case "theft": // Handles the type from your data
        return <AlertTriangleIcon size={16} className="text-red-600" />;
      default:
        return <AlertTriangleIcon size={16} className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  return (
    // Add a relative positioning class to the container if needed for the modal
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="px-6 py-4 bg-blue-800 text-white flex justify-between items-center">
        <h3 className="text-lg font-semibold">Live Alert Feed</h3>
        {/* ... */}
      </div>

      <div className="divide-y divide-gray-200">
        {/* ... */}
        {alerts.map((alert) => (
          // --- UPDATE 4: Make the alert item clickable ---
          <div
            key={alert.id}
            onClick={() => handleOpenModal(alert)} // Add onClick handler
            className="p-4 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-start">
              <div className="mr-4">{getAlertTypeIcon("distress")}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-gray-900">
                    {alert.touristName}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatDate(alert.time)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                <div className="mt-2 flex items-center">
                  <MapPinIcon size={14} className="text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">
                    Lat: {alert.lat}, Lng: {alert.lng}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 bg-gray-50 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Alerts
        </button>
      </div>
    {/* --- UPDATE 5: Conditionally render the modal --- */}
      {isModalOpen && selectedAlert && (
        <EFIRModal alert={selectedAlert} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AlertFeed;