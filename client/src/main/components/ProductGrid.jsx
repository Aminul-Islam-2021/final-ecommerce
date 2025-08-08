import React from "react";
//import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
          {product.rating && (
            <div className="mt-2 flex items-center">
              <span className="text-yellow-500">
                {"★".repeat(Math.floor(product.rating))}
              </span>
              <span className="text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
