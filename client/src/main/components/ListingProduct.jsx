import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
//import EcommerceFilters from './EcommerceFilters';
import { products } from "../data/mockData1"; // Import your mock products

const ProductListing = () => {
  const filters = useSelector((state) => state.filters);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Apply filters to mock data
    const filtered = products.filter((product) => {
      // Category filter
      if (filters.category && product.category !== filters.category)
        return false;

      // Subcategory filter
      if (filters.subcategory && product.subcategory !== filters.subcategory)
        return false;

      // Price range filter
      if (filters.minPrice && product.price < Number(filters.minPrice))
        return false;
      if (filters.maxPrice && product.price > Number(filters.maxPrice))
        return false;

      // Rating filter
      if (filters.rating) {
        const minRating = Math.min(...filters.rating.split(",").map(Number));
        if (Math.floor(product.rating) < minRating) return false;
      }

      // Color filter
      if (
        filters.color &&
        !filters.color.split(",").some((c) => product.colors?.includes(c))
      ) {
        return false;
      }

      // Size filter
      if (
        filters.size &&
        !filters.size.split(",").some((s) => product.sizes?.includes(s))
      ) {
        return false;
      }

      return true;
    });

    // Simulate API loading delay
    const timer = setTimeout(() => {
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        {/* <div className="w-full md:w-64 flex-shrink-0">
          <EcommerceFilters />
        </div> */}

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div>Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div>No products found matching your filters</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ProductCard component remains the same
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
        </div>
        <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductListing;
