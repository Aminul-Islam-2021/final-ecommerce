import { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiChevronDown,
} from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-gray-50 to-white shadow-lg py-2"
          : "bg-gradient-to-r from-white to-gray-50 py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Row - Logo, Search, Icons */}
        <div className="flex items-center justify-between">
          {/* Left Side - Hamburger Menu */}
          <button
            onClick={toggleSidebar}
            className="text-gray-700 hover:text-primary focus:outline-none lg:hidden transition-transform duration-200 hover:scale-110"
          >
            {isSidebarOpen ? (
              <FiX size={24} className="transition-all duration-200" />
            ) : (
              <HiOutlineMenuAlt2
                size={24}
                className="transition-all duration-200"
              />
            )}
          </button>

          {/* Center - Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold text-primary transition-all duration-300 ${
              isScrolled
                ? "opacity-0 md:opacity-100 scale-90"
                : "opacity-100 scale-100"
            }`}
          >
            ShopEase
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/"
            
              className="hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link to="/products"
            
              className="hover:text-primary transition-colors duration-200"
            >
              Products
            </Link>
            <Link
            
              className="hover:text-primary transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
            
              className="hover:text-primary transition-colors duration-200"
            >
              Deals
            </Link>
          </div>

          {/* Right Side - Icons */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            {/* Search Icon */}
            <button
              onClick={toggleMobileSearch}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <FiSearch size={20} />
            </button>

            {/* Wishlist */}
            <button className="relative text-gray-700 hover:text-primary transition-colors duration-200">
              <FiHeart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Cart */}
            <button className="relative text-gray-700 hover:text-primary transition-colors duration-200">
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                5
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200"
              >
                <CgProfile size={20} />
                <FiChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <Link
                  
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    My Account
                  </Link>
                  <Link
                  
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    Orders
                  </Link>
                  <Link
                  
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    Wishlist
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link
                  
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showMobileSearch ? "max-h-16 mt-3" : "max-h-0"
          }`}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-3 px-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all duration-200"
            />
            <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-primary transition-colors duration-200">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

export default Navbar;
