import { Link } from "react-router-dom";

const PromotionBanner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 mb-10">
      <PromotionCard
        image="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
        title="Women's Collection"
        subtitle="Spring/Summer 2025"
        buttonText="Shop Now"
        buttonLink="/products?category=women"
      />
      <PromotionCard
        image="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600"
        title="Men's Collection"
        subtitle="Spring/Summer 2025"
        buttonText="Shop Now"
        buttonLink="/products?category=men"
      />
    </div>
  );
};

const PromotionCard = ({ image, title, subtitle, buttonText, buttonLink }) => {
  return (
    <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white pl-96 text-center px-6 py-8">
          <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm md:text-base mb-4">{subtitle}</p>
          <Link
            to={buttonLink}
            className="inline-block bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
