import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Product = ({ productId, src, name, price }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      onClick={() => navigate(`/viewProduct/${productId}`)}
      className="cursor-pointer relative overflow-hidden w-[34vh] bg-gradient-to-br from-[#fff8f0] to-[#f5ede3] border border-[#d4a373]/70 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] p-5 mx-5 my-3 hover:shadow-[0_15px_35px_rgba(212,163,115,0.35)] transition-all duration-500"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />

      {/* Image section */}
      <div className="w-full h-[20vh] flex items-center justify-center bg-gradient-to-b from-[#f5e6ca] via-[#f8f1e4] to-[#eaddcf] rounded-xl overflow-hidden shadow-inner">
        <img
          src={`${import.meta.env.VITE_localhost}/assets/${src}`}
          alt={name}
          className="w-full h-full object-cover rounded-lg hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Text */}
      <div className="text-left mt-4">
        <p className="text-lg font-semibold text-[#4a3426] tracking-wide line-clamp-1">
          {name}
        </p>
        <p className="text-sm text-[#8b3e2f] font-medium mt-1">Rs. {price}</p>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fff3e0]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default Product;
