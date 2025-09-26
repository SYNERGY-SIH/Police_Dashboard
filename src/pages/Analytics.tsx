import React from 'react';
import TouristVolumeChart from '../components/analytics/TouristVolumeChart';
import IncidentTypeChart from '../components/analytics/IncidentTypeChart';
import RegionIncidentChart from '../components/analytics/RegionIncidentChart';
import ResponseTimeChart from '../components/analytics/ResponseTimeChart';
import { DownloadIcon } from 'lucide-react';
const Analytics: React.FC = () => {
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics & Reports
        </h1>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <div className="h-4 w-4 mr-1" />
            Refresh
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <DownloadIcon className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select id="reportType" name="reportType" className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" defaultValue="tourist">
              <option value="tourist">Tourist Data</option>
              <option value="incident">Incident Analysis</option>
              <option value="response">Response Metrics</option>
            </select>
          </div>
          <div>
            <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
              Timeframe
            </label>
            <select id="timeframe" name="timeframe" className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" defaultValue="year">
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Year to Date</option>
            </select>
          </div>
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <select id="region" name="region" className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" defaultValue="all">
              <option value="all">All Regions</option>
              <option value="delhi">Delhi</option>
              <option value="agra">Agra</option>
              <option value="jaipur">Jaipur</option>
              <option value="goa">Goa</option>
              <option value="mumbai">Mumbai</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TouristVolumeChart />
        <IncidentTypeChart />
        <RegionIncidentChart />
        <ResponseTimeChart />
      </div>
    </div>;
};
export default Analytics;