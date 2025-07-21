import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductSlider = ({ title, products, addToCart }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper) {
      // Update navigation state
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
      
      // Force update navigation
      swiper.navigation.update();
    }
  }, [products, swiper]);

  const handlePrevClick = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handleSlideChange = (swiperInstance) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  return (
    <div className="relative px-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" pl-30 lg:pl-[45%] text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex ">
          <button
            ref={navigationPrevRef}
            onClick={handlePrevClick}
            disabled={isBeginning}
            className={`p-2 rounded-full transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center ${
              isBeginning
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            aria-label="Previous"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            ref={navigationNextRef}
            onClick={handleNextClick}
            disabled={isEnd}
            className={`p-2 rounded-full transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center ${
              isEnd
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            aria-label="Next"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        onFromEdge={() => {
          setIsBeginning(false);
          setIsEnd(false);
        }}
        breakpoints={{
          320: {
            slidesPerView:2.5,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 2.5,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
        className="!pb-2"
        touchRatio={1}
        touchAngle={45}
        grabCursor={true}
        watchSlidesProgress={true}
        watchOverflow={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto mb-10">
            <ProductCard product={product} addToCart={addToCart} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;