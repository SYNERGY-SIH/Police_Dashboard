import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}
const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isSidebarOpen
}) => {
  const location = useLocation();
  const isAuthenticated = location.pathname !== '/' && location.pathname !== '/login';
  return <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {isAuthenticated && <button onClick={toggleSidebar} className="mr-2 p-1 rounded-md text-white focus:outline-none">
                {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>}
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto mr-2" src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Government of India" />
              <span className="font-bold text-lg">Tourist Safety Monitor</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!isAuthenticated ? <>
                  <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Home
                  </Link>
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Login
                  </Link>
                </> : <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Logout
                </Link>}
            </div>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;