import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, CreditCard } from "lucide-react";
import Payment from "../../pages/Users/Payment";

const CartProduct = ({
  productId,
  src,
  name,
  price,
  quantity,
  qty,
  shopId,
  userId,
  cartId,
}) => {
  const navigate = useNavigate();
  const handleRemove = async () => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/user/deleteCart?s=${cartId}`
      );
      const res = await req.json();
      if (req.ok) {
        console.log(res.message);
      } else {
        console.log(res.err);
      }
    } catch (error) {
      console.log("error at handleRemove: ", error);
    }
  };

  return (
    <motion.div
      onClick={() => navigate(`/viewProduct/${productId}`)}
      className="group cursor-pointer w-full min-h-[220px] bg-white/60 backdrop-blur-md 
                 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:bg-white 
                 transition-all duration-500 flex flex-col sm:flex-row mt-4 
                 border border-stone-200/50 overflow-hidden"
    >
      {/* Image - Square on mobile, fixed width on desktop */}
      <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden m-0 sm:m-3 rounded-none sm:rounded-[1rem] bg-stone-100">
        <img
          src={`${import.meta.env.VITE_localhost}/assets/${src}`}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-widest text-stone-800 px-2 py-1 rounded-full shadow-sm">
            Stock: {quantity}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 leading-tight font-serif">
              {name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-xl font-black text-red-800">
                Rs. {price.toLocaleString()}
              </p>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Qty: {qty}
              </span>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <p className="text-[10px] uppercase tracking-widest text-stone-400">
              Subtotal
            </p>
            <p className="font-bold text-stone-700">
              Rs. {(price * qty).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            className="flex-1 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wider rounded-xl border border-stone-200 py-3 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all duration-300"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartProduct;
