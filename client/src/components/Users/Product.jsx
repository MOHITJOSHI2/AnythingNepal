import React, { useState } from "react"; // Added useState
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react"; // Optional: Using icons for better UI
import EsewaPayment from "./EsewaPayment";

const Product = ({ productId, src, name, price, quantity, shop, id }) => {
  const navigate = useNavigate();

  // 1. Local state for the selected quantity
  const [selectedQty, setSelectedQty] = useState(1);

  // 2. Functions to handle increment/decrement
  const increment = (e) => {
    e.stopPropagation();
    if (selectedQty < quantity) {
      setSelectedQty((prev) => prev + 1);
    }
  };

  const decrement = (e) => {
    e.stopPropagation();
    if (selectedQty > 1) {
      setSelectedQty((prev) => prev - 1);
    }
  };

  const handleCart = async (productId, shopId, userId) => {
    const data = {
      productId: productId,
      shopId: shopId,
      userId: userId,
      quantity: selectedQty,
    };
    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/user/addToCart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const res = await req.json();
      if (req.ok) {
        console.log(`Added ${selectedQty} items to cart`);
      } else {
        console.log(res.err);
      }
    } catch (error) {
      console.log("Error at addToCartFront: ", error);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => navigate(`/viewProduct/${productId}`)}
      className="group cursor-pointer w-full max-w-[370px] h-[520px] 
             bg-white/60 backdrop-blur-md rounded-[2rem] shadow-sm 
             hover:shadow-2xl hover:bg-white transition-all duration-500
             flex flex-col border border-stone-200/50 relative overflow-hidden mx-auto"
    >
      <div className="relative flex-[1.8] overflow-hidden m-3 rounded-[1.5rem] bg-stone-100">
        <img
          src={`${import.meta.env.VITE_localhost}/assets/${src}`}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-stone-800 px-3 py-1.5 rounded-full shadow-sm">
            Stock: {quantity}
          </span>
        </div>
      </div>

      <div className="flex-[1.5] p-5 pt-2 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-stone-900 leading-tight line-clamp-2 font-serif">
            {name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <p className="text-xl font-black text-red-800">
                Rs. {price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200">
              <button
                onClick={decrement}
                className="p-1 hover:bg-white rounded-md transition-colors disabled:opacity-30"
                disabled={selectedQty <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="px-3 text-sm font-bold text-stone-800 min-w-[30px] text-center">
                {selectedQty}
              </span>
              <button
                onClick={increment}
                className="p-1 hover:bg-white rounded-md transition-colors disabled:opacity-30"
                disabled={selectedQty >= quantity}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex-1 text-[11px] font-bold uppercase tracking-wider rounded-xl border border-stone-300 py-4 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 active:scale-95"
          >
            Add {selectedQty > 1 ? `(${selectedQty})` : ""} to Cart
          </button>

          <button
            onClick={async (e) => {
              e.stopPropagation();
              await handleCart(productId, shop, id);
              navigate("/cart");
            }}
            className="flex-1 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-stone-900 text-white py-4 hover:bg-red-800 transition-all duration-300 active:scale-95 shadow-lg shadow-stone-200"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
