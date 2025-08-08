import React from "react";

const SalesOverview = () => {
  return (
    <div className="bg-white rounded-lg shadow p-3 overflow-hidden">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
        Sales Overview
      </h2>
      <div className="h-40 sm:h-48 bg-gray-50 rounded flex items-center justify-center">
        <p className="text-xs sm:text-sm text-gray-500">
          Sales chart will be displayed here
        </p>
      </div>
    </div>
  );
};

export default SalesOverview;
