import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { incidentTypeData } from '../../data/metrics';
const IncidentTypeChart: React.FC = () => {
  const COLORS = ['#ef4444', '#f97316', '#8b5cf6', '#eab308', '#3b82f6', '#6b7280', '#84cc16'];
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Incidents by Type
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={incidentTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="count" nameKey="type" label={({
            type,
            percent
          }) => `${type}: ${(percent * 100).toFixed(0)}%`}>
              {incidentTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={value => [`${value} incidents`, 'Count']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default IncidentTypeChart;