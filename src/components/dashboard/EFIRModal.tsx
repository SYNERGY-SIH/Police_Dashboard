import React from "react";
import ReactDOM from "react-dom";
import { XIcon } from "lucide-react";
import { Alert } from "./AlertFeed";

interface EFIRModalProps {
  alert: Alert;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root");

export const EFIRModal: React.FC<EFIRModalProps> = ({ alert, onClose }) => {
  const { incident, tourist } = alert;

  if (!incident || !tourist || !modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    // Increased z-index to 9999 to ensure it's above map elements
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 9999 }} // Use inline style for maximum specificity
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Electronic First Information Report (EFIR)
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <XIcon size={24} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Incident Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Incident Details
            </h3>
            <div className="space-y-2">
              <p><strong>Type:</strong> {incident.type}</p>
              <p><strong>Description:</strong> {incident.description}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                  incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {incident.status}
                </span>
              </p>
              <p><strong>Assigned To:</strong> {incident.assignedTo}</p>
              <p><strong>Location:</strong> {incident.location.name}</p>
              <p><strong>Date:</strong> {new Date(incident.date).toLocaleString()}</p>
            </div>
          </div>

          {/* Tourist Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Tourist Information
            </h3>
            <div className="flex items-center mb-4">
              <img 
                src={tourist.photo} 
                alt={tourist.name} 
                className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-gray-200" 
              />
              <div>
                <p><strong>Name:</strong> {tourist.name}</p>
                <p><strong>Passport:</strong> {tourist.passportNumber}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p><strong>Nationality:</strong> {tourist.nationality}</p>
              <p><strong>Gender:</strong> {tourist.gender}</p>
              <p><strong>Age:</strong> {tourist.age}</p>
              <p><strong>Visa Type:</strong> {tourist.visaType}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 text-right border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};