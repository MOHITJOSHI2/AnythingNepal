import React from "react";
import "../../App.css";

const BigBox = ({ section, img, text, desc }) => {
  const flexDirectionClass =
    section === "right"
      ? "md:flex-row-reverse mr-[50px]"
      : "md:flex-row ml-[50px]";

  return (
    <div
      className={`w-[75%] m-4 p-8 flex flex-col ${flexDirectionClass} items-center justify-between bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] border border-[#d4a373] rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500`}
    >
      {/* Text Section */}
      <div className="md:w-1/2 space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-bl2pxack drop-shadow-md">
          {text}
        </h2>
        <p className="text-lg text-black leading-relaxed">{desc}</p>
        <button className="mt-3 px-6 py-3 bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff5a5f] text-white font-semibold rounded-lg shadow-[0_5px_15px_rgba(255,92,124,0.5)] hover:scale-105 transition-all duration-300">
          Explore More
        </button>
      </div>
      {/* Image section */}
      <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={img}
          alt="Nepali accessory"
          className="w-full max-w-[450px] rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
};

export default BigBox;
