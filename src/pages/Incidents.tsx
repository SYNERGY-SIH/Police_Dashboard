import React, { useState } from 'react';
import { incidents } from '../data/incidents';
import IncidentTable from '../components/incidents/IncidentTable';
import FIRCard from '../components/incidents/FIRCard';
import { FilterIcon } from 'lucide-react';
const Incidents: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all'
  });
  const handleViewFIR = (incident: any) => {
    setSelectedIncident(incident);
  };
  const handleCloseFIR = () => {
    setSelectedIncident(null);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  const filteredIncidents = incidents.filter(incident => {
    const matchesType = filters.type === 'all' || incident.type === filters.type;
    const matchesStatus = filters.status === 'all' || incident.status === filters.status;
    let matchesDate = true;
    const incidentDate = new Date(incident.date);
    const today = new Date();
    if (filters.dateRange === 'today') {
      matchesDate = incidentDate.toDateString() === today.toDateString();
    } else if (filters.dateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      matchesDate = incidentDate >= weekAgo;
    } else if (filters.dateRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      matchesDate = incidentDate >= monthAgo;
    }
    return matchesType && matchesStatus && matchesDate;
  });
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Incidents & Reports
        </h1>
        <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <FilterIcon className="h-5 w-5 mr-1" />
          Filters
        </button>
      </div>
      {showFilters && <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Incident Type
              </label>
              <select id="type" name="type" value={filters.type} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Types</option>
                <option value="theft">Theft</option>
                <option value="harassment">Harassment</option>
                <option value="fraud">Fraud</option>
                <option value="accident">Accident</option>
                <option value="medical">Medical</option>
                <option value="overstay">Overstay</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select id="status" name="status" value={filters.status} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Statuses</option>
                <option value="reported">Reported</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <select id="dateRange" name="dateRange" value={filters.dateRange} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-800 text-white flex justify-between items-center">
          <h3 className="text-lg font-semibold">Incident Records</h3>
          <span className="text-sm bg-white text-blue-800 px-2 py-1 rounded-full">
            {filteredIncidents.length} Records
          </span>
        </div>
        <IncidentTable incidents={filteredIncidents} onViewFIR={handleViewFIR} />
      </div>
      {selectedIncident && <FIRCard incident={selectedIncident} onClose={handleCloseFIR} />}
    </div>;
};
export default Incidents;