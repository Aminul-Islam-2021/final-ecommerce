import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiUsers,
  FiPackage,
  FiSettings,
  FiPieChart,
  FiDollarSign,
  FiTag,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import CreateProductModal from "../dbComponents/CreateProductModal";
import CategoryModal from "../dbComponents/CategoryModal";

const SidebarDB = ({ isOpen, isMobile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (name) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Example click handler functions
  const handleCreateProduct = () => {
    setIsModalOpen(true);
    // Add your logic here
  };

  const handleCategory = () => {
    setIsCategoryModalOpen(true);
    // Add your logic here
  };

  const handleNewOrder = () => {
    alert("New Order clicked");
    // Add your logic here
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      link: "/dashboard",
    },
    {
      name: "Products",
      icon: <FiPackage />,
      subItems: [
        { name: "All Products", link: "all-products" },
        // {
        //   name: 'Create Product',
        //   action: handleCreateProduct,
        //   isButton: true
        // },
        {
          name: "Create Product",
          link: "create-product",
        },
        // {
        //   name: 'Product Categories',
        //   action: handleCategory,
        //   isButton: true
        // }
        {
          name: "Product Categories",
          link: "category",
        },
      ],
    },
    {
      name: "Orders",
      icon: <FiShoppingCart />,
      subItems: [
        { name: "All Orders", link: "#" },
        {
          name: "New Order",
          action: handleNewOrder, // Button with onClick
          isButton: true,
        },
        { name: "Pending Orders", link: "#" },
        { name: "Completed Orders", link: "#" },
      ],
    },
    {
      name: "Customers",
      icon: <FiUsers />,
      subItems: [
        { name: "Customer List", link: "#" },
        { name: "Customer Groups", link: "#" },
      ],
    },
    {
      name: "Categories",
      icon: <FiTag />,
      link: "#",
    },
    {
      name: "Sales",
      icon: <FiDollarSign />,
      subItems: [
        { name: "Sales Report", link: "#" },
        { name: "Transactions", link: "#" },
      ],
    },
    {
      name: "Inventory",
      icon: <MdOutlineInventory />,
      subItems: [
        { name: "Stock Levels", link: "#" },
        { name: "Inventory Alerts", link: "#" },
      ],
    },
    {
      name: "Analytics",
      icon: <FiPieChart />,
      link: "#",
    },
    {
      name: "Settings",
      icon: <FiSettings />,
      subItems: [
        { name: "General Settings", link: "#" },
        { name: "Payment Methods", link: "#" },
        { name: "Shipping Options", link: "#" },
      ],
    },
  ];

  return (
    <>
      <aside
        className={`bg-white shadow-sm transform top-0 left-0 w-64 fixed h-full overflow-hidden transition-all duration-300 ease-in-out z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        ${isMobile ? "md:translate-x-0" : ""}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-800">E-Commerce</h2>
          </div>

          {/* Scrollable Menu */}
          <nav className="flex-1 overflow-y-auto">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleItem(item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        {expandedItems[item.name] ? (
                          <FiChevronDown className="h-4 w-4" />
                        ) : (
                          <FiChevronRight className="h-4 w-4" />
                        )}
                      </button>

                      {expandedItems[item.name] && (
                        <ul className="pl-4 bg-gray-50">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              {subItem.isButton ? (
                                <button
                                  onClick={subItem.action}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-cyan-500 hover:text-white transition-colors duration-200 pl-12"
                                >
                                  {subItem.name}
                                </button>
                              ) : (
                                <Link
                                  to={subItem.link}
                                  className="block w-full px-4 py-2 text-sm text-gray-600 hover:bg-cyan-500 hover:text-white transition-colors duration-200 pl-12"
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.link}
                      className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Fixed Admin Section at Bottom */}
          <div className="p-2 bg-gray-100 border-t border-gray-200 flex-shrink-0">
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
        </div>
      </aside>

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </>
  );
};

export default SidebarDB;
