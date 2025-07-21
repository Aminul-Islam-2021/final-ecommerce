import HeroBanner from "../components/Banner";
import CategoriesGrid from "../components/CategoriesGrid";
import Newsletter from "../components/Newsletter";
import ProductGrid from "../components/ProductGrid";
import ProductSlider from "../components/ProductSlider";
import PromotionBanner from "../components/PromotionBanner";
import { mockProducts } from "../data/mockData";

const Home = () => {
  // Filter products for different sections
  const featuredProducts = mockProducts.filter((product) => product.featured);
  const newArrivals = mockProducts.filter((product) => product.isNew);
  const bestSellers = mockProducts
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);
  return (
    <div>
      <HeroBanner />
      <ProductSlider title="Featured Products" products={featuredProducts} />
      <PromotionBanner />
      <ProductSlider
        title="New Arrivals"
        products={newArrivals} // addToCart={addToCart}
      />
      <CategoriesGrid />
      <ProductSlider
        title="Best Sellers"
        products={bestSellers}
        // addToCart={addToCart}
      />
      <Newsletter/>
    </div>
  );
};

export default Home;
