import {
  FiX,
  FiUser,
  FiHome,
  FiShoppingBag,
  FiTag,
  FiStar,
  FiTruck,
  FiInfo,
  FiPhone,
} from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { TbBrandProducthunt } from "react-icons/tb";
import { LuContactRound } from "react-icons/lu";
import { RiBloggerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeTab, setActiveTab] = useState("menu"); // State to track active tab
  const categories = [
    { name: "Electronics", icon: <FiShoppingBag /> },
    { name: "Fashion", icon: <FiTag /> },
    { name: "Home & Kitchen", icon: <FiHome /> },
    { name: "Beauty", icon: <FiStar /> },
    { name: "Sports", icon: <FiTruck /> },
    { name: "Toys", icon: <FiInfo /> },
    { name: "Grocery", icon: <FiPhone /> },
  ];
  // Function to handle link/button clicks
  const handleLinkClick = () => {
    toggleSidebar(); // Close the sidebar
  };
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-70 bg-white z-50 shadow-xl transition-transform duration-400 ease-in-out lg:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <FiUser size={20} />
            </div>
            <div>
              <p className="font-medium">Hello, User</p>
              <button className="text-sm text-primary">Sign In</button>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-primary p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex justify-around mt-6 mx-4 gap-2">
          {/* Menu and Categories buttons */}
          <button
            onClick={() => setActiveTab("menu")}
            className={`${
              activeTab === "menu" ? "bg-green-700" : "bg-green-500"
            } p-2 w-full text-white`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab("filters")}
            className={`${
              activeTab === "filters" ? "bg-blue-700" : "bg-blue-500"
            } p-2 w-full text-white`}
          >
            Filters
          </button>
        </div>

        {/* Conditional rendering based on activeTab */}
        <div className="mt-10">
          {activeTab === "menu" && (
            <ul className="flex flex-col items-start gap-1">
              <Link
                to={"/"}
                onClick={handleLinkClick}
                className="flex items-center pl-10 hover:bg-gray-200 p-2 w-full"
              >
                <span className="pr-4">
                  <IoHomeOutline size={20} />
                </span>
                Home Filter
              </Link>
              <Link
                to={"/products"}
                onClick={handleLinkClick}
                className="flex items-center pl-10 hover:bg-gray-200 p-2 w-full"
              >
                <span className="pr-4">
                  <TbBrandProducthunt size={20} />
                </span>
                Products
              </Link>
              <Link
                to={"/"}
                onClick={handleLinkClick}
                className="flex items-center pl-10 hover:bg-gray-200 p-2 w-full"
              >
                <span className="pr-4">
                  <RiBloggerLine size={20} />
                </span>
                Blogs
              </Link>
              <Link
                to={"/"}
                onClick={handleLinkClick}
                className="flex items-center pl-10 hover:bg-gray-200 p-2 w-full"
              >
                <span className="pr-4">
                  <LuContactRound size={20} />
                </span>
                Contact
              </Link>
            </ul>
          )}
          {activeTab === "filters" && (
            <ul className="flex flex-col items-start gap-1">
              <li className="pl-10 hover:bg-gray-200 p-2 w-full">
                Electronics
              </li>
              <li className="pl-10 hover:bg-gray-200 p-2 w-full">Fashion</li>
              <li className="pl-10 hover:bg-gray-200 p-2 w-full">
                Home Appliances
              </li>
              <li className="pl-10 hover:bg-gray-200 p-2 w-full">Books</li>
              <li className="pl-10 hover:bg-gray-200 p-2 w-full">Sports</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// {/* Categories */}
//     <div className="p-4">
//       <h3 className="text-lg font-semibold text-gray-800 mb-3 px-2">Categories</h3>
//       <div className="flex space-x-3 overflow-x-auto pb-3 scrollbar-hide">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-24 h-24 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center p-2 border border-gray-100 hover:border-primary transition-colors duration-200"
//           >
//             <span className="text-primary text-xl mb-2">{category.icon}</span>
//             <span className="text-xs text-center font-medium text-gray-700">{category.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Navigation */}
//     <nav className="p-4">
//       <ul className="space-y-1">
//         <li>
//           <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors duration-200">
//             <FiHome className="text-gray-500" />
//             <span>Home</span>
//           </a>
//         </li>
//         {/* Add more menu items here */}
//       </ul>
//     </nav>
