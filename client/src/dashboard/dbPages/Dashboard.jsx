import React from "react";
import SalesOverview from "../dbComponents/SalesOverview";
import StausCard from "../dbComponents/StausCard";
import OrderTable from "../dbComponents/tables/OrderTable";
import TopProducts from "../dbComponents/TopProducts";

const Dashboard = () => {


  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Cards - Responsive Grid */}
      <StausCard />

      {/* Recent Orders Table */}
      <OrderTable />

      {/* Bottom Section - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

        <TopProducts />
        <SalesOverview />

      </div>
    </div>
  );
};

export default Dashboard;
