import React from 'react';
import { Incident } from '../../data/incidents';
import { FileTextIcon, XIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
interface FIRCardProps {
  incident: Incident;
  onClose: () => void;
}
const FIRCard: React.FC<FIRCardProps> = ({
  incident,
  onClose
}) => {
  if (!incident.firContent) {
    return null;
  }
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <FileTextIcon className="h-6 w-6 text-blue-800 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              E-FIR #{incident.firNumber}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Date:</span> {incident.date}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Location:</span>{' '}
                {incident.location.name}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Assigned To:</span>{' '}
                {incident.assignedTo}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <PrinterIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <DownloadIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Tourist Information
            </h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Name:</span>{' '}
                {incident.touristName}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">ID:</span> {incident.touristId}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Incident Description
            </h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">{incident.description}</p>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              AI-Generated FIR Content
            </h4>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {incident.firContent}
              </p>
            </div>
          </div>
          {incident.evidence && incident.evidence.length > 0 && <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Evidence
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {incident.evidence.map((img, index) => <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                    <img src={img} alt={`Evidence ${index + 1}`} className="w-full h-auto" />
                  </div>)}
              </div>
            </div>}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Close
          </button>
        </div>
      </div>
    </div>;
};
export default FIRCard;