import React from "react";
import "../../App.css";

const Box = ({ src, name, price }) => {
  return (
    <div
      className="cursor-pointer relative overflow-hidden w-[41vh] bg-white 
                 border border-gray-300 rounded-2xl shadow-md p-4 mx-4 my-3 
                 hover:shadow-xl transition-transform duration-300 ease-out"
    >
      <div className="w-full h-[30vh] flex items-center justify-center bg-gray-100 border-1 shadow-inner rounded-xl p-4">
        <model-viewer
          src={`/${src}`}
          alt="Nepali traditional model"
          auto-rotate
          camera-controls
          camera-orbit="0deg 75deg 2.5m"
          interaction-prompt="none"
          disable-pan
          disable-tap
          disable-zoom
          className="w-[100%] h-full drop-shadow-[0_8px_15px_rgba(90,62,43,0.3)]"
        ></model-viewer>
      </div>

      {/* Text */}
      <div className="text-center mt-4 space-y-1">
        <p className="text-xl font-semibold text-[#5a3e2b] tracking-wide">
          {name}
        </p>
        <p className="text-lg font-bold text-[#8b3e2f]">{price}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-5 space-x-3">
        <button
          type="button"
          className=" flex-1 py-2 px-4 rounded-lg text-white text-sm font-medium 
                     bg-gradient-to-r from-cyan-400 to-blue-500 
                     shadow-md hover:shadow-lg 
                     hover:from-cyan-500 hover:to-blue-600 
                     transition-all duration-300 ease-out active:scale-95"
        >
          Add To Cart
        </button>
        <button
          type="button"
          className=" flex-1 py-2 px-4 rounded-lg text-white text-sm font-medium 
          bg-gradient-to-r from-red-400 to-rose-500 
          shadow-md hover:shadow-lg 
          hover:from-red-500 hover:to-rose-600 
          transition-all duration-300 ease-out active:scale-95"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Box;
