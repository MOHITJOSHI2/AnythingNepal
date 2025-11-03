import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import cat from "../../assets/cat.png";
import potter from "../../assets/potter.jpg";
import item from "../../assets/items.jpg";

const Carousal = () => {
  const images = [cat, item, potter];

  return (
    <div className="w-full flex justify-center mt-10">
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
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousal;
