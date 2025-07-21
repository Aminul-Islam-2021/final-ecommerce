// mockData.js
export const categories = [
  {
    id: 'clothing',
    name: 'Clothing',
    subcategories: [
      { id: 'mens-shirts', name: "Men's Shirts" },
      { id: 'womens-dresses', name: "Women's Dresses" },
      { id: 'kids-wear', name: "Kids Wear" },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones' },
      { id: 'laptops', name: 'Laptops' },
      { id: 'headphones', name: 'Headphones' },
    ],
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    subcategories: [
      { id: 'furniture', name: 'Furniture' },
      { id: 'kitchen-appliances', name: 'Kitchen Appliances' },
    ],
  },
];

export const products = [
  // Clothing - Men's Shirts
  {
    id: '1',
    name: 'Classic White Shirt',
    category: 'clothing',
    subcategory: 'mens-shirts',
    price: 29.99,
    rating: 4.5,
    colors: ['white', 'blue', 'black'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/shirt-white.jpg',
  },
  {
    id: '2',
    name: 'Denim Shirt',
    category: 'clothing',
    subcategory: 'mens-shirts',
    price: 39.99,
    rating: 4.2,
    colors: ['blue', 'black'],
    sizes: ['M', 'L', 'XXL'],
    image: '/shirt-denim.jpg',
  },
  // Clothing - Women's Dresses
  {
    id: '3',
    name: 'Summer Floral Dress',
    category: 'clothing',
    subcategory: 'womens-dresses',
    price: 49.99,
    rating: 4.7,
    colors: ['red', 'yellow', 'pink'],
    sizes: ['XS', 'S', 'M'],
    image: '/dress-floral.jpg',
  },
  // Electronics - Smartphones
  {
    id: '4',
    name: 'Premium Smartphone X',
    category: 'electronics',
    subcategory: 'smartphones',
    price: 799.99,
    rating: 4.8,
    colors: ['black', 'silver', 'gold'],
    storage: ['64GB', '128GB', '256GB'],
    image: '/phone-x.jpg',
  },
  // Add more products as needed...
];

// Helper function to get filter options based on subcategory
export const getFilterOptions = (products, subcategory) => {
  const filteredProducts = products.filter(p => p.subcategory === subcategory);
  
  if (filteredProducts.length === 0) return {};
  
  // Get all unique colors
  const colors = [...new Set(filteredProducts.flatMap(p => p.colors || []))];
  
  // Get all unique sizes (or storage for electronics)
  const sizes = [...new Set(filteredProducts.flatMap(p => p.sizes || p.storage || []))];
  
  // Calculate min and max price
  const prices = filteredProducts.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  // Get rating options (1-5)
  const ratingCounts = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: filteredProducts.filter(p => Math.floor(p.rating) === rating).length,
  }));
  
  return {
    colors,
    sizes,
    minPrice,
    maxPrice,
    ratingCounts,
  };
};