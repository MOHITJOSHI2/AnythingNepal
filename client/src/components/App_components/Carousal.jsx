import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousal = ({ product }) => {
  return (
    <div className="w-full flex justify-center pt-10">
      <div className="w-full max-w-6xl">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] rounded-2xl overflow-hidden"
        >
          {product.map((data, index) => (
            <SwiperSlide key={index} className="relative">
              <img
                src={`${import.meta.env.VITE_localhost}/assets/${
                  data.productImage
                }`}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Centered text with blur background */}
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-md px-6 py-3 rounded-xl shadow-md">
                <span className="text-black font-bold text-3xl sm:text-4xl md:text-5xl lg:text-2xl text-center">
                  {data.productName}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousal;
