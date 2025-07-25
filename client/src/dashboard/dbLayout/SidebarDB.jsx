import React from 'react'
import { 
  FiHome, 
  FiShoppingCart, 
  FiUsers, 
  FiPackage, 
  FiSettings, 
  FiPieChart,
  FiDollarSign,
  FiTag
} from 'react-icons/fi';
import { MdOutlineInventory } from "react-icons/md";
const SidebarDB = ({ isOpen, isMobile }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome /> },
    { name: 'Products', icon: <FiPackage /> },
    { name: 'Orders', icon: <FiShoppingCart /> },
    { name: 'Customers', icon: <FiUsers /> },
    { name: 'Categories', icon: <FiTag /> },
    { name: 'Sales', icon: <FiDollarSign /> },
    { name: 'Inventory', icon: <MdOutlineInventory /> },
    { name: 'Analytics', icon: <FiPieChart /> },
    { name: 'Settings', icon: <FiSettings /> },
    
  ];
  return (
    <aside 
      className={`bg-white shadow-sm transform top-0 left-0 w-64 fixed h-full overflow-y-auto transition-all duration-300 ease-in-out z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${isMobile ? 'md:translate-x-0' : ''}
      `}
    >
      <div className="p-4 ">
        <h2 className="text-xl font-semibold text-gray-800">E-Commerce</h2>
      </div>
      
      <nav className="mt-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 bg-gray-100">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            <FiUsers className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );

}

export default SidebarDB
