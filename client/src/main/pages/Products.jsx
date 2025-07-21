import React from "react";
import Filter from "../components/Filter";
import ProductListing from "../components/ListingProduct";

const Products = () => {
  return (
    <div className=" flex gap-2 px-2">
      <div className="hidden lg:block bg-white rounded-md h-screen w-[20%]">
        <Filter />
      </div>
      <div className=" bg-white rounded-md h-screen w-full lg:w-[80%]">
        <ProductListing />
      </div>
    </div>
  );
};

export default Products;
