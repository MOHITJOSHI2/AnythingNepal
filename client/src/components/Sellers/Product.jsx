import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Product = ({ productId, src, name, price }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      onClick={() => navigate(`/viewProduct/${productId}`)}
      className="cursor-pointer relative overflow-hidden w-[36vh] bg-white 
                 border border-gray-300 rounded-2xl shadow-md 
                 p-5 mx-5 my-3 
                 hover:shadow-xl 
                 transition-transform duration-300 ease-out"
    >
      {/* Decorative subtle texture */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />

      {/* Image section */}
      <div
        className="w-full h-[24vh] flex items-center justify-center bg-gradient-to-b 
                      from-[#f5e6ca] via-[#f8f1e4] to-[#eaddcf] 
                      rounded-xl overflow-hidden shadow-inner"
      >
        <img
          src={`${import.meta.env.VITE_localhost}/assets/${src}`}
          alt={name}
          className="w-full h-full object-cover rounded-lg 
                     transform transition-transform duration-500 ease-out 
                     hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="text-left mt-4">
        <p className="text-lg font-semibold text-[#3e2b1a] tracking-wide line-clamp-1">
          {name}
        </p>
        <p className="text-sm text-[#8b3e2f] font-medium mt-2 bg-[#fff6ee] w-fit px-3 py-1 rounded-lg">
          Rs. {price}
        </p>
      </div>

      {/* Subtle overlay glow */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br 
                      from-[#fff3e0]/20 to-transparent opacity-0 
                      hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  );
};

export default Product;
