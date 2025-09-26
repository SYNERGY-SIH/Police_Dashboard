import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { touristVolumeData } from '../../data/metrics';
const TouristVolumeChart: React.FC = () => {
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tourist Volume by Month
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={touristVolumeData} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tourists" fill="#3b82f6" name="Tourist Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default TouristVolumeChart;