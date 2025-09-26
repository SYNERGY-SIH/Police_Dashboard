import React, { useEffect, useState } from "react";
import { Tourist } from "../../data/tourists";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

interface TouristTableProps {
  tourists: Tourist[]; // initial data (can be [])
}

const TouristTable: React.FC<TouristTableProps> = ({ tourists }) => {
  const [touristList, setTouristList] = useState<Tourist[]>(tourists);

  // 🔹 Fetch tourists on mount
  useEffect(() => {
    fetch("http://localhost:4000/api/tourists")
      .then((res) => res.json())
      .then((data: Tourist[]) => {
        setTouristList(data);
      })
      .catch((err) => console.error("Failed to fetch tourists:", err));
  }, []);

  // 🔹 Listen for real-time updates
  useEffect(() => {
    socket.on("new-alert", (data) => {
      if (data.tourist) {
        setTouristList((prev) => [data.tourist, ...prev]);
      }
    });

    return () => {
      socket.off("new-alert");
    };
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Photo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Passport
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Nationality
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Entry Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {touristList.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No tourist records
              </td>
            </tr>
          ) : (
            touristList.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {t.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {t.passportNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {t.nationality}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {t.entryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      t.status === "active"
                        ? "bg-green-100 text-green-800"
                        : t.status === "overstayed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TouristTable;
