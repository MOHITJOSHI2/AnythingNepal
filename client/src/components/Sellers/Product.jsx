import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Product = ({ productId, src, name, price, quantity }) => {
  const navigate = useNavigate();

  const handelDelete = async (id) => {
    const req = await fetch(
      `${import.meta.env.VITE_localhost}/seller/deleteProduct/${id}`,
      {
        method: "DELETE",
      }
    );
    const res = await req.json();
    if (req.ok) {
      console.log(res.message);
      window.location.reload();
    } else {
      console.log(res.err);
    }
  };

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
        className="w-full h-[22vh] flex items-center justify-center bg-gradient-to-b 
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
        <div className="flex flex-row justify-between">
          <p className="text-sm text-[#8b3e2f] font-medium mt-2 bg-[#fff6ee] w-fit px-3 py-1 rounded-lg">
            Rs. {price}
          </p>
          <p className="text-sm text-[#8b3e2f] font-medium mt-2 bg-[#fff6ee] w-fit px-3 py-1 rounded-lg">
            Qty: {quantity}
          </p>
        </div>
      </div>

      {/* Subtle overlay glow */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br 
                      from-[#fff3e0]/20 to-transparent opacity-0 
                      hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Action Buttons */}
      {window.location.pathname == "/categories" ? (
        ""
      ) : (
        <div className="flex justify-between items-center mt-5 px-1">
          <button
            type="button"
            className="py-1.5 px-4 rounded-lg text-white text-sm font-medium 
                     bg-gradient-to-r from-cyan-400 to-blue-500 
                     shadow-md hover:shadow-lg 
                     hover:from-cyan-500 hover:to-blue-600 
                     transition-all duration-300 ease-out active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/updateProduct/${productId}`);
            }}
          >
            Update
          </button>
          <button
            type="button"
            className="py-1.5 px-4 rounded-lg text-white text-sm font-medium 
                     bg-gradient-to-r from-red-400 to-rose-500 
                     shadow-md hover:shadow-lg 
                     hover:from-red-500 hover:to-rose-600 
                     transition-all duration-300 ease-out active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              handelDelete(productId);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Product;
