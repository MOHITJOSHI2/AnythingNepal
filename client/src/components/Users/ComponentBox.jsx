import { motion, scale } from "motion/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ComponentBox = ({ name, src }) => {
  const navigate = useNavigate();
  if (name.includes("Art")) name = "Art and Architecture";

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{
        ease: "easeInOut",
      }}
      className="w-[400px]"
    >
      <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/40 shadow-xl">
        <div>
          <img className="object-contain rounded-2xl" src={src} alt="" />
        </div>
        <div>
          <p className="text-center text-md font-semibold text-gray-800/70 my-2 uppercase tracking-widest">
            {name}
          </p>
        </div>
        <button
          onClick={() => navigate(`/getSingleCategory/${name}`)}
          className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-red-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg "
        >
          Explore Category
        </button>
      </div>
    </motion.div>
  );
};

export default ComponentBox;
