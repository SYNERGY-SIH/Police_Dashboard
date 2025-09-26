import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTouristById } from '../data/tourists';
import { ChevronLeftIcon, MapPinIcon, CalendarIcon, UserIcon, PhoneIcon, FileTextIcon, AlertTriangleIcon } from 'lucide-react';
const TouristDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const tourist = getTouristById(id || '');
  if (!tourist) {
    return <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Tourist Not Found</h2>
        <p className="text-gray-600 mb-6">
          The tourist record you are looking for does not exist or has been
          removed.
        </p>
        <Link to="/tourist-records" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Back to Tourist Records
        </Link>
      </div>;
  }
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'departed':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'overstayed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/tourist-records" className="mr-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Tourist Profile</h1>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Export PDF
          </button>
          <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700">
            Update Record
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <img src={tourist.photo} alt={tourist.name} className="h-32 w-32 rounded-full object-cover mb-4" />
                <h2 className="text-xl font-bold text-gray-900">
                  {tourist.name}
                </h2>
                <p className="text-gray-600">{tourist.nationality}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClass(tourist.status)}`}>
                    {tourist.status.charAt(0).toUpperCase() + tourist.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Passport Number
                      </p>
                      <p className="text-sm text-gray-900">
                        {tourist.passportNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Gender / Age
                      </p>
                      <p className="text-sm text-gray-900">
                        {tourist.gender}, {tourist.age} years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Entry Date
                      </p>
                      <p className="text-sm text-gray-900">
                        {tourist.entryDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Exit Date
                      </p>
                      <p className="text-sm text-gray-900">
                        {tourist.exitDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Visa Type
                      </p>
                      <p className="text-sm text-gray-900">
                        {tourist.visaType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Emergency Contacts
                </h3>
                <div className="space-y-4">
                  {tourist.emergencyContacts.map((contact, index) => <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-900">
                        {contact.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {contact.relationship}
                      </p>
                      <div className="flex items-center mt-1">
                        <PhoneIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm text-blue-600">{contact.phone}</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-blue-800 text-white">
              <h3 className="text-lg font-semibold">Accommodation History</h3>
            </div>
            <div className="p-6">
              <div className="relative">
                {tourist.accommodation.map((acc, index) => <div key={index} className="mb-6 relative pl-8">
                    {index < tourist.accommodation.length - 1 && <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-200"></div>}
                    <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-800 flex items-center justify-center">
                      <MapPinIcon className="h-3 w-3 text-blue-800" />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-start">
                        <h4 className="text-md font-semibold text-gray-900">
                          {acc.name}
                        </h4>
                        <div className="text-xs text-gray-500">
                          {acc.checkIn} to {acc.checkOut}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {acc.address}
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-blue-800 text-white">
              <h3 className="text-lg font-semibold">Travel Itinerary</h3>
            </div>
            <div className="p-6">
              <div className="relative">
                {tourist.itinerary.map((item, index) => <div key={index} className="mb-6 relative pl-8">
                    {index < tourist.itinerary.length - 1 && <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-200"></div>}
                    <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-green-100 border-2 border-green-600 flex items-center justify-center">
                      <CalendarIcon className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-start">
                        <h4 className="text-md font-semibold text-gray-900">
                          {item.location}
                        </h4>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.activity}
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-blue-800 text-white">
              <h3 className="text-lg font-semibold">Alerts & Incidents</h3>
            </div>
            <div className="p-6">
              {tourist.status === 'overstayed' ? <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <div className="flex items-start">
                    <AlertTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-red-800">
                        Visa Overstay Alert
                      </h4>
                      <p className="text-sm text-red-700 mt-1">
                        Tourist has exceeded their authorized stay period. Exit
                        date was {tourist.exitDate}.
                      </p>
                    </div>
                  </div>
                </div> : <div className="text-center py-8 text-gray-500">
                  <AlertTriangleIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>No alerts or incidents recorded for this tourist.</p>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default TouristDetail;