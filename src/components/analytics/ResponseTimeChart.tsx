import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { responseTimeData } from '../../data/metrics';
const ResponseTimeChart: React.FC = () => {
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Average Response Time (minutes)
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={responseTimeData} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="time" stroke="#10b981" activeDot={{
            r: 8
          }} name="Minutes" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default ResponseTimeChart;