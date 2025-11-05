import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Product = ({ productId, src, name, price }) => {
  const navigate = useNavigate();

  return (
    <div
      className="box-border w-[33vh] bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] border border-[#d4a373] rounded-2xl shadow-[0_10px_25px_rgba(90,62,43,0.2)] p-5 mx-5 my-1 hover:shadow-[0_15px_35px_rgba(90,62,43,0.3)] hover:scale-[1.02] transition-all duration-300"
      onClick={() => navigate(`/viewProduct/${productId}`)}
    >
      <div className="w-full h-[18vh] flex items-center justify-center bg-gradient-to-b from-transparent via-[#f4ede1] to-[#eaddcf] rounded-xl p-2">
        <img
          src={`${import.meta.env.VITE_localhost}/assets/${src}`}
          alt="Nepali traditional model"
          className="w-full h-full drop-shadow-[0_8px_15px_rgba(90,62,43,0.3)]"
        />
      </div>

      {/* Text */}
      <div className="text-left mt-2">
        <p className="text-md font-bold text-[#5a3e2b] tracking-wide">{name}</p>
        <p className="text-sm text-[#8b3e2f]">{price}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-5 space-x-3">
        <button
          type="button"
          className="flex-1 text-white bg-gradient-to-r from-[#d67d3e] via-[#b3541e] to-[#8b3e2f] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-[#d67d3e] font-medium rounded-lg text-[16px] px-4 py-2 transition-all duration-300"
        >
          Add To Cart
        </button>
        <button
          type="button"
          className="flex-1 text-white bg-gradient-to-r from-[#b3541e] via-[#8b3e2f] to-[#5a3e2b] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-[#b3541e] font-medium rounded-lg text-[16px] px-4 py-2 transition-all duration-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Product;
