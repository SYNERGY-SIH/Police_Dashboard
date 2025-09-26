import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, AlertTriangleIcon, BarChartIcon, MapIcon } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({
  isOpen
}) => {
  const location = useLocation();
  const links = [{
    to: '/dashboard',
    icon: <HomeIcon size={20} />,
    text: 'Dashboard'
  }, {
    to: '/tourist-records',
    icon: <UsersIcon size={20} />,
    text: 'Tourist Records'
  }, {
    to: '/incidents',
    icon: <AlertTriangleIcon size={20} />,
    text: 'Incidents & Reports'
  }, {
    to: '/analytics',
    icon: <BarChartIcon size={20} />,
    text: 'Analytics'
  }];
  return <div className={`bg-gray-100 text-gray-800 h-full fixed left-0 top-16 transition-all duration-300 z-10 shadow-lg ${isOpen ? 'w-64' : 'w-0 -translate-x-full md:translate-x-0 md:w-16'}`}>
      <div className="flex flex-col h-full py-4">
        {links.map(link => <Link key={link.to} to={link.to} className={`flex items-center px-4 py-3 ${location.pathname === link.to ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'hover:bg-gray-200'} ${!isOpen && 'justify-center'}`}>
            <span className="mr-3">{link.icon}</span>
            {isOpen && <span>{link.text}</span>}
          </Link>)}
      </div>
    </div>;
};
export default Sidebar;