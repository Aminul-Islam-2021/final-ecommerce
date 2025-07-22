import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";

const ProductCard = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (addToCart) {
      addToCart(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col h-full bg-white rounded-lg shadow-md "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block flex-grow">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-white aspect-[2/2]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 md:group-hover:blur-sm"
          />

          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} - alternate view`}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Product badges */}
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
              New
            </div>
          )}

          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
              {product.discount}% OFF
            </div>
          )}

          {/* Desktop Action Buttons */}
          <div
            className={`hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 flex-col space-y-2 transition-all duration-300 ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="p-3 bg-white text-gray-700 rounded-full hover:bg-teal-400 hover:text-white transition-colors shadow-lg backdrop-blur-sm"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="w-5 h-5" />
            </button>

            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition-colors shadow-lg backdrop-blur-md ${
                isFavorite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
              }`}
              aria-label="Add to wishlist"
            >
              <FiHeart className="w-5 h-5" />
            </button>

            <Link
              to={`/product/:id`}
              className="p-3 bg-white text-gray-700 rounded-full hover:bg-gray-800 hover:text-white transition-colors shadow-lg backdrop-blur-sm"
              aria-label="Preview product"
            >
              <FiEye className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Product info - Flex-grow to push buttons to bottom */}
        <div className="flex-grow p-3">
          {product.brand && (
            <h4 className="text-xs text-gray-500">{product.brand}</h4>
          )}

          <h3 className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center">
            {product.originalPrice && product.originalPrice > product.price ? (
              <>
                <span className="text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-xs text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="mt-1 flex items-center">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Mobile Action Buttons - Fixed to bottom */}
      <div className="md:hidden p-3 pt-0 mt-auto">
        <div className="flex justify-between space-x-2  pt-1">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center p-2 bg-teal-500 text-white rounded hover:bg-teal-500 transition-colors shadow"
          >
            <FiShoppingCart className="w-4 h-4 mr-1 " />
          </button>

          <button
            onClick={toggleFavorite}
            className={`p-2 rounded transition-colors shadow ${
              isFavorite
                ? "bg-red-700 text-white"
                : "bg-red-500 text-white hover:bg-green-500"
            }`}
          >
            <FiHeart className="w-4 h-4" />
          </button>

          <Link
            to={`/product/:id`}
            className="p-2 bg-blue-500 text-white rounded hover:bg-cyan-500 transition-colors shadow"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
