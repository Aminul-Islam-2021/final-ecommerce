import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  resetFilters,
} from "../../store/features/products/filterSlice";
import { categories, products, getFilterOptions } from "../data/mockData1";

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Memoize filter options to prevent unnecessary recalculations
  const filterOptions = useMemo(() => {
    return filters.subcategory
      ? getFilterOptions(products, filters.subcategory)
      : {};
  }, [filters.subcategory]);

  // Initialize price range when subcategory changes
  useEffect(() => {
    if (filters.subcategory && filterOptions.minPrice !== undefined) {
      setPriceRange([filterOptions.minPrice, filterOptions.maxPrice]);
    }
  }, [filters.subcategory, filterOptions.minPrice, filterOptions.maxPrice]);

  // Reset dependent filters when subcategory changes
  useEffect(() => {
    if (filters.subcategory) {
      setSelectedRatings([]);
      setSelectedColors([]);
      setSelectedSizes([]);
    }
  }, [filters.subcategory]);

  const handleCategoryChange = useCallback(
    (category) => {
      dispatch(
        setFilters({
          category,
          subcategory: "",
          color: "",
          size: "",
          minPrice: "",
          maxPrice: "",
        })
      );
    },
    [dispatch]
  );

  const handleSubcategoryChange = useCallback(
    (subcategory) => {
      dispatch(setFilters({ subcategory }));
    },
    [dispatch]
  );

  const handlePriceChange = useCallback(
    (min, max) => {
      dispatch(setFilters({ minPrice: min, maxPrice: max }));
    },
    [dispatch]
  );

  const handleRatingToggle = useCallback(
    (rating) => {
      setSelectedRatings((prev) => {
        const newRatings = prev.includes(rating)
          ? prev.filter((r) => r !== rating)
          : [...prev, rating];

        dispatch(setFilters({ rating: newRatings.join(",") }));
        return newRatings;
      });
    },
    [dispatch]
  );

  // ✅ Fixed color toggle handler
  const handleColorToggle = useCallback(
    (color) => {
      // First update local state
      setSelectedColors((prev) => {
        const newColors = prev.includes(color)
          ? prev.filter((c) => c !== color)
          : [...prev, color];
        return newColors;
      });

      // Then update Redux state in a separate step
      dispatch(
        setFilters({
          color: selectedColors.includes(color)
            ? selectedColors.filter((c) => c !== color).join(",")
            : [...selectedColors, color].join(","),
        })
      );
    },
    [dispatch, selectedColors]
  ); // Add selectedColors to dependencies

  const handleSizeToggle = useCallback(
    (size) => {
      setSelectedSizes((prev) => {
        const newSizes = prev.includes(size)
          ? prev.filter((s) => s !== size)
          : [...prev, size];

        dispatch(setFilters({ size: newSizes.join(",") }));
        return newSizes;
      });
    },
    [dispatch]
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
    setPriceRange([0, 100]);
    setSelectedRatings([]);
    setSelectedColors([]);
    setSelectedSizes([]);
  }, [dispatch]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  filters.category === category.id
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>

              {filters.category === category.id && (
                <div className="ml-4 mt-2 space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryChange(sub.id)}
                      className={`block w-full text-left px-3 py-1 rounded-md text-sm ${
                        filters.subcategory === sub.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic filters based on selected subcategory */}
      {filters.subcategory && (
        <>
          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
            <div className="px-2">
              <input
                type="range"
                min={filterOptions.minPrice || 0}
                max={filterOptions.maxPrice || 100}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value), priceRange[1]])
                }
                onMouseUp={() =>
                  handlePriceChange(priceRange[0], priceRange[1])
                }
                className="w-full mb-2"
              />
              <input
                type="range"
                min={filterOptions.minPrice || 0}
                max={filterOptions.maxPrice || 100}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                onMouseUp={() =>
                  handlePriceChange(priceRange[0], priceRange[1])
                }
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          {filterOptions.ratingCounts &&
            filterOptions.ratingCounts.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count =
                      filterOptions.ratingCounts.find(
                        (r) => r.rating === rating
                      )?.count || 0;
                    if (count === 0) return null;

                    return (
                      <button
                        key={rating}
                        onClick={() => handleRatingToggle(rating)}
                        className={`flex items-center w-full text-left px-3 py-1 rounded-md ${
                          selectedRatings.includes(rating)
                            ? "bg-blue-50 text-blue-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex mr-2">
                          {[...Array(rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Color Filter */}
          {filterOptions.colors && filterOptions.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorToggle(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColors.includes(color)
                        ? "border-blue-500"
                        : "border-gray-200"
                    } ${getColorClass(color)}`}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size/Storage Filter */}
          {filterOptions.sizes && filterOptions.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">
                {filters.category === "electronics" ? "Storage" : "Size"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-1 rounded-md text-sm border ${
                      selectedSizes.includes(size)
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Helper function for color display
const getColorClass = (color) => {
  const colorMap = {
    white: "bg-white",
    black: "bg-black",
    blue: "bg-blue-600",
    red: "bg-red-600",
    yellow: "bg-yellow-400",
    pink: "bg-pink-400",
    silver: "bg-gray-300",
    gold: "bg-yellow-300",
    // Add more colors as needed
  };
  return colorMap[color.toLowerCase()] || "bg-gray-200";
};

export default Filter;
