import React from 'react'
import { FiMenu, FiBell, FiUser, FiSearch } from 'react-icons/fi';

const HeaderDB = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <h1 className="ml-2 text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
            <FiBell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              <FiUser className="h-5 w-5" />
            </div>
            <span className="ml-2 text-gray-700 hidden md:inline">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );

}

export default HeaderDB
