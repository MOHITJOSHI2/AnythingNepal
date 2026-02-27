import React from "react";
import { FaBoxOpen, FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderMessage = ({ productData }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-8 flex flex-col gap-3">
      {productData.map((elem) => (
        <div
          key={elem._id}
          className="group relative bg-white border border-orange-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 overflow-hidden"
        >
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
                  {elem.products.map((elem) => elem)}
                </span>
              </h3>

              <p className="text-slate-500 font-medium mt-1">
                Time of Order{" "}
                <span className="text-slate-900 font-bold">
                  {elem.paymentTime.split(",")[0]}
                </span>
                <br />
                Delivery must be within 3 days
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderMessage;
