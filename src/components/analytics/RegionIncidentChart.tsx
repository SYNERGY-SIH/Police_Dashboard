import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { incidentsByRegionData } from '../../data/metrics';
const RegionIncidentChart: React.FC = () => {
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Incidents by Region
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={incidentsByRegionData} layout="vertical" margin={{
          top: 5,
          right: 30,
          left: 60,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="region" />
            <Tooltip />
            <Bar dataKey="count" fill="#8b5cf6" name="Incident Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default RegionIncidentChart;