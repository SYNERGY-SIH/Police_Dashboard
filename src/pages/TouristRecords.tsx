import React, { useState } from 'react';
import SearchBar from '../components/tourists/SearchBar';
import TouristTable from '../components/tourists/TouristTable';
import { tourists } from '../data/tourists';
const TouristRecords: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    nationality: '',
    entryDate: ''
  });
  const filteredTourists = tourists.filter(tourist => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || tourist.name.toLowerCase().includes(searchLower) || tourist.id.toLowerCase().includes(searchLower) || tourist.passportNumber.toLowerCase().includes(searchLower);
    // Status filter
    const matchesStatus = filters.status === 'all' || tourist.status === filters.status;
    // Nationality filter
    const matchesNationality = !filters.nationality || tourist.nationality.toLowerCase().includes(filters.nationality.toLowerCase());
    // Entry date filter
    const matchesEntryDate = !filters.entryDate || new Date(tourist.entryDate) >= new Date(filters.entryDate);
    return matchesSearch && matchesStatus && matchesNationality && matchesEntryDate;
  });
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tourist Records</h1>
      </div>
      <SearchBar onSearch={setSearchQuery} onFilterChange={setFilters} />
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Tourist List ({filteredTourists.length})
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredTourists.length} of {tourists.length} records
          </div>
        </div>
        <TouristTable tourists={filteredTourists} />
      </div>
    </div>;
};
export default TouristRecords;