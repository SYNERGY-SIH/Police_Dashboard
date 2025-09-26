import React from 'react';
import MapView from '../components/dashboard/MapView';
import AlertFeed from '../components/dashboard/AlertFeed';
import MetricsDashboard from '../components/dashboard/MetricsDashboard';
const Dashboard: React.FC = () => {
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      <MetricsDashboard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapView />
        </div>
        <div>
          <AlertFeed />
        </div>
      </div>
    </div>;
};
export default Dashboard;