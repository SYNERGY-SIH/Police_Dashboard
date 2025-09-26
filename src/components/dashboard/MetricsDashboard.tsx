import React from 'react';
import MetricsCard from './MetricsCard';
import { dashboardMetrics } from '../../data/metrics';
import { UsersIcon, AlertTriangleIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
const MetricsDashboard: React.FC = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricsCard title="Total Tourists" value={dashboardMetrics.totalTourists} icon={<UsersIcon size={24} className="text-blue-800" />} trend={{
      value: 12,
      isPositive: true
    }} />
      <MetricsCard title="Active Tourists" value={dashboardMetrics.activeTourists} icon={<UsersIcon size={24} className="text-green-600" />} trend={{
      value: 8,
      isPositive: true
    }} />
      <MetricsCard title="Active Alerts" value={dashboardMetrics.activeAlerts} icon={<AlertTriangleIcon size={24} className="text-red-600" />} trend={{
      value: 3,
      isPositive: false
    }} />
      <MetricsCard title="Resolved Alerts" value={dashboardMetrics.resolvedAlerts} icon={<CheckCircleIcon size={24} className="text-green-600" />} trend={{
      value: 15,
      isPositive: true
    }} />
      <MetricsCard title="Incidents This Month" value={dashboardMetrics.incidentsThisMonth} icon={<AlertTriangleIcon size={24} className="text-orange-500" />} trend={{
      value: 5,
      isPositive: false
    }} />
      <MetricsCard title="Average Response Time" value={dashboardMetrics.averageResponseTime} icon={<ClockIcon size={24} className="text-blue-600" />} trend={{
      value: 12,
      isPositive: true
    }} />
    </div>;
};
export default MetricsDashboard;