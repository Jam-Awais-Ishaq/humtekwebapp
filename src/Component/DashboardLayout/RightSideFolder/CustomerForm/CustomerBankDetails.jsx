import React from "react";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";

const CustomerBankDetails = ({ data, colorIndex }) => {
  if (!data) return null;

  const colorSchemes = [
    { bg: "bg-gradient-to-br from-blue-50 to-blue-100", text: "text-blue-800", border: "border-blue-200" },
    { bg: "bg-gradient-to-br from-green-50 to-green-100", text: "text-green-800", border: "border-green-200" },
    { bg: "bg-gradient-to-br from-purple-50 to-purple-100", text: "text-purple-800", border: "border-purple-200" },
    { bg: "bg-gradient-to-br from-amber-50 to-amber-100", text: "text-amber-800", border: "border-amber-200" },
    { bg: "bg-gradient-to-br from-pink-50 to-pink-100", text: "text-pink-800", border: "border-pink-200" },
  ];

  const colorScheme = colorSchemes[colorIndex % colorSchemes.length];

  return (
    <div className={`${colorScheme.bg} ${colorScheme.border} cursor-pointer border-2 rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm`}>
      
      {/* Bank Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl bg-white ${colorScheme.text}`}>
            <MdOutlineAccountBalance className="text-2xl" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${colorScheme.text}`}>
              {data.bankName}
            </h3>
            <div className="flex items-center mt-1 space-x-1">
              <FiMapPin className={`text-sm ${colorScheme.text}`} />
              <span className="text-sm text-gray-600">{data.headOffice}</span>
            </div>
          </div>
        </div>
        
        {/* Years Badge */}
        <div className={`bg-white ${colorScheme.text} md:w-20 w-auto text-center rounded-xl shadow-sm`}>
          <span className="text-sm font-bold">{data.totalYears}</span>
        </div>
      </div>

      {/* Contract Dates */}
      <div className="space-y-4">
        {/* Start Date */}
        <div className="flex items-center justify-between bg-white/70 p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCalendar className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">START DATE</p>
              <p className="font-bold text-gray-800">{data.contractStart}</p>
            </div>
          </div>
          <FiClock className="text-green-400" />
        </div>

        {/* End Date */}
        <div className="flex items-center justify-between bg-white/70 p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiCalendar className="text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">END DATE</p>
              <p className="font-bold text-gray-800">{data.contractEnd}</p>
            </div>
          </div>
          <FiClock className="text-red-400" />
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Contract Status</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            new Date(data.contractEnd) > new Date() 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {new Date(data.contractEnd) > new Date() ? 'ACTIVE' : 'EXPIRED'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerBankDetails;