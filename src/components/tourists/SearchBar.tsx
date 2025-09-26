import React, { useState } from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: any) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterChange
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    nationality: '',
    entryDate: ''
  });
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value
    };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };
  return <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search by name, passport number, or ID..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Search
            </button>
            <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setShowFilters(!showFilters)}>
              <FilterIcon className="h-5 w-5 mr-1" />
              Filters
            </button>
          </div>
        </div>
        {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select id="status" name="status" value={filters.status} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="departed">Departed</option>
                <option value="overstayed">Overstayed</option>
              </select>
            </div>
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                Nationality
              </label>
              <input type="text" id="nationality" name="nationality" value={filters.nationality} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter nationality..." />
            </div>
            <div>
              <label htmlFor="entryDate" className="block text-sm font-medium text-gray-700">
                Entry Date (After)
              </label>
              <input type="date" id="entryDate" name="entryDate" value={filters.entryDate} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>}
      </form>
    </div>;
};
export default SearchBar;