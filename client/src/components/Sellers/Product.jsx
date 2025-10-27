import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Product = ({ productId, src, name, price }) => {
  const navigate = useNavigate();

  return (
    <div
      className="box-border w-[33vh] bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] border border-[#d4a373] rounded-2xl shadow-[0_10px_25px_rgba(90,62,43,0.2)] p-5 mx-5 my-1 hover:shadow-[0_15px_35px_rgba(90,62,43,0.3)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/viewProduct/${productId}`)}
    >
      <div className="w-full h-[16vh] flex items-center justify-center bg-gradient-to-b from-transparent via-[#f4ede1] to-[#eaddcf] rounded-xl p-2">
        <img
          src={`http://192.168.1.72:8000/assets/${src}`}
          alt="Nepali traditional model"
          className="w-full h-full object-contain drop-shadow-[0_8px_15px_rgba(90,62,43,0.3)]"
        />
      </div>
      <div className="text-left mt-2">
        <p className="text-md font-semibold text-[#5a3e2b] tracking-wide">
          {name}
        </p>
        <p className="text-sm text-[#8b3e2f]">{price}</p>
      </div>
    </div>
  );
};

export default Product;
