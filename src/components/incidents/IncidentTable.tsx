import React, { useEffect, useState } from 'react';
import { Incident } from '../../data/incidents';
import { ChevronDownIcon, ChevronUpIcon, FileTextIcon } from 'lucide-react';
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

interface IncidentTableProps {
  incidents: Incident[]; // initial incidents
  onViewFIR: (incident: Incident) => void;
}

const IncidentTable: React.FC<IncidentTableProps> = ({ incidents, onViewFIR }) => {
  const [incidentList, setIncidentList] = useState<Incident[]>(incidents);
  const [sortField, setSortField] = useState<keyof Incident>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Listen for new alerts → add new incident
useEffect(() => {
  socket.on("new-alert", (data) => {
    if (data.incident) {
      const newIncident: Incident = {
        id: data.incident.id.toString(),
        touristId: data.tourist?.id?.toString() || "N/A",
        touristName: data.tourist?.name || "Unknown Tourist",
        type: (data.incident.type?.toLowerCase() as Incident["type"]) || "other",
        date: new Date(data.incident.time).toLocaleString(),
        location: {
          lat: data.incident.location.lat || 0,
          lng: data.incident.location.lng || 0,
          name: `Lat: ${data.incident.location.lat}, Lng: ${data.incident.location.lng}`
        },
        description: data.alert?.message || "No description provided",
        status: "reported",
        assignedTo: "Unassigned",
        firNumber: undefined,
        firContent: undefined,
        evidence: []
      };

      setIncidentList((prev) => [newIncident, ...prev]);
    }
  });

  return () => {
    socket.off("new-alert");
  };
}, []);


  const handleSort = (field: keyof Incident) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedIncidents = [...incidentList].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === 'type' || sortField === 'touristName' || sortField === 'status') {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'reported':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getIncidentTypeClass = (type: string) => {
    switch (type) {
      case 'theft':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'harassment':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'fraud':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'accident':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'medical':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'overstay':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th onClick={() => handleSort('touristName')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center">
                  Tourist
                  {sortField === 'touristName' &&
                    <span className="ml-1">{sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('type')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center">
                  Type
                  {sortField === 'type' &&
                    <span className="ml-1">{sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('date')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center">
                  Date
                  {sortField === 'date' &&
                    <span className="ml-1">{sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}</span>}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th onClick={() => handleSort('status')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center">
                  Status
                  {sortField === 'status' &&
                    <span className="ml-1">{sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}</span>}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FIR</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedIncidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{incident.touristName}</div>
                  <div className="text-sm text-gray-500">{incident.touristId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getIncidentTypeClass(incident.type)}`}>
                    {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.location.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClass(incident.status)}`}>
                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {incident.firNumber ? (
                    <button onClick={() => onViewFIR(incident)} className="text-blue-600 hover:text-blue-900 flex items-center">
                      <FileTextIcon className="mr-1 h-4 w-4" />
                      {incident.firNumber}
                    </button>
                  ) : (
                    <span className="text-gray-400">No FIR</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentTable;
