import React from "react";
import { FaBoxOpen, FaCircle } from "react-icons/fa";

const OrderMessage = () => {
  // Mock data - you can later pass these as props
  const productId = "#fb3889765";
  const quantity = 3;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="group relative bg-white border border-orange-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 overflow-hidden">
        {/* Subtle Decorative Background Element */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {/* Icon Section */}
          <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200">
            <FaBoxOpen size={28} />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider rounded-full border border-green-100">
                <FaCircle className="animate-pulse" size={6} /> Active Order
              </span>
            </div>

            <h3 className="text-slate-800 text-lg font-bold leading-tight">
              New shipment request for product{" "}
              <span className="font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                {productId}
              </span>
            </h3>

            <p className="text-slate-500 font-medium mt-1">
              Customer has requested{" "}
              <span className="text-slate-900 font-bold">{quantity} pcs</span>{" "}
              to be prepared for delivery.
            </p>
          </div>

          {/* Action Button (Optional but adds to the look) */}
          <button className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-colors active:scale-95">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderMessage;
