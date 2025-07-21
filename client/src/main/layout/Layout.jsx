import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className=" bg-gray-100 min-h-screen pt-16 lg:pt-20 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
