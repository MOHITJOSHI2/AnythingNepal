import React from "react";

const BigBox = ({ section, img, text, desc }) => {
  // Logic for side-switching
  const isRight = section === "right";

  return (
    <div
      className={`flex flex-col md:flex-row ${
        isRight ? "md:flex-row-reverse" : ""
      } items-center gap-12 mb-20 w-full`}
    >
      {/* IMAGE SIDE */}
      <div className="w-full md:w-1/2 relative group">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[#5A7863]/10 blur-3xl rounded-full transform group-hover:scale-110 transition-transform duration-700"></div>

        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20">
          <img
            src={img}
            alt={text}
            className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Dark Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
        </div>
      </div>

      {/* TEXT SIDE */}
      <div
        className={`w-full md:w-1/2 space-y-6 ${
          isRight ? "text-right flex flex-col items-end" : "text-left"
        }`}
      >
        <div
          className={`w-16 h-1 bg-red-800 mb-2 ${isRight ? "ml-auto" : ""}`}
        ></div>

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
          {text}
        </h2>

        <p className="text-lg text-stone-600 leading-relaxed max-w-md font-medium">
          {desc}
        </p>

        <button className="group relative inline-flex items-center gap-3 py-4 text-stone-900 font-bold uppercase tracking-widest text-xs transition-all hover:text-red-800">
          <span>Explore Heritage</span>
          <div className="w-8 h-[1px] bg-stone-900 group-hover:w-12 group-hover:bg-red-800 transition-all"></div>
        </button>
      </div>
    </div>
  );
};

export default BigBox;
