import React from "react";
import {
  FiTrendingUp,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

const StausCard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12%",
      icon: <FiDollarSign className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8%",
      icon: <FiShoppingBag className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Customers",
      value: "892",
      change: "+5%",
      icon: <FiUsers className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+1.2%",
      icon: <FiTrendingUp className="h-6 w-6" />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-3 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                {stat.title}
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1 truncate">
                {stat.value}
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center truncate">
                <span>{stat.change}</span>
                <span className="ml-1 hidden sm:inline">from last month</span>
              </p>
            </div>
            <div className={`rounded-full p-2 ${stat.color} flex-shrink-0`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StausCard;
