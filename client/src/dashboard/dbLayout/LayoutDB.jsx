import React, { useEffect, useState } from "react";
import HeaderDB from "./HeaderDB";
import { Outlet } from "react-router-dom";
import SidebarDB from "./SidebarDB";

const LayoutDB = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-50">
        <HeaderDB toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Backdrop - only visible on mobile when sidebar is open */}
          {isMobile && sidebarOpen && (
            <div
              className="fixed inset-0  bg-opacity-10 backdrop-filter backdrop-blur-xs z-20"
              onClick={toggleSidebar}
            />
          )}
          <SidebarDB isOpen={sidebarOpen} isMobile={isMobile} />
          <main className="flex-1 h-full overflow-y-auto pt-2 px-2 sm:px-4 pb-4 md:ml-64">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutDB;
