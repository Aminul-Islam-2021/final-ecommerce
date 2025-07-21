import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroBanner = () => {
  const banners = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      buttonText: "Shop Now",
      image:
        "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh Styles Added",
      buttonText: "Explore",
      image:
        "https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      title: "Limited Edition",
      subtitle: "Exclusive Items",
      buttonText: "View Collection",
      image:
        "https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <div className="px-2 mx-auto mb-8">
      <div className="relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
            renderBullet: (index, className) => {
              return `<span class="${className}" aria-label="Slide ${index + 1}"></span>`;
            },
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-[250px] lg:h-[450px] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                  <p className="text-lg md:text-xl mb-6">{banner.subtitle}</p>
                  <button className="bg-white text-gray-800 px-6 py-2 rounded-md shadow hover:bg-gray-200 transition font-medium">
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation */}
          <button
            className="custom-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition hidden md:flex items-center justify-center w-10 h-10"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="custom-next absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition hidden md:flex items-center justify-center w-10 h-10"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Swiper>

        {/* Custom Pagination - positioned outside below the image */}
        <div className="custom-pagination mt-4 flex justify-center gap-2" />
      </div>

      {/* Custom styles for pagination bullets */}
      <style jsx>{`
        .custom-bullet {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #9CA3AF;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          background-color: #1F2937;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;