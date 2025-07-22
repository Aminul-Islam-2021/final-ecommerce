import React from "react";
import HeaderDB from "./HeaderDB";
import { Outlet } from "react-router-dom";

const LayoutDB = () => {
  return (
    <div>
      <HeaderDB />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutDB;
