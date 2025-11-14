import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousal = ({ product }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,140,0,0.3)] border border-[#ff6a00]/30 bg-transparent">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] rounded-2xl"
        >
          {product.map((data, index) => (
            <SwiperSlide key={index} className="relative group">
              <img
                src={`${import.meta.env.VITE_localhost}/assets/${
                  data.productImage
                }`}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-[12%] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffb347]/40 to-[#ff6a00]/40 backdrop-blur-lg px-8 py-4 rounded-2xl shadow-[0_0_25px_rgba(255,140,0,0.4)]"
              >
                <h3 className="text-white font-bold text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  {data.productName}
                </h3>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousal;
