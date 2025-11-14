import React, { useState } from "react";
import { FiHeart, FiMenu, FiX } from "react-icons/fi";
import { BsBasket } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = ({
  Shop,
  Products,
  Signup,
  Contact,
  Name,
  Id,
  Shop1,
  Products1,
  Signup1,
  Contact1,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const homeNav =
    "sticky top-0 z-50 bg-gradient-to-b from-[#0d0d0d]/70 via-[#1a0e0e]/60 to-[#260505]/70 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-[#ffb347]/0";
  const otherNav =
    "sticky top-0 z-50 bg-gray-900 backdrop-blur-lg shadow-[0_4px_25px_rgba(0,0,0,0.35)] border-b border-[#333]/40";
  const location = window.location.href;
  let navCss = location.includes("/adminHomePage") ? homeNav : otherNav;

  const linkStyle =
    "text-white/90 hover:text-amber-400 cursor-pointer text-lg transition-all duration-200 ease-in-out";

  return (
    <nav className={navCss}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl">🕉️</span>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-300 to-red-400 bg-clip-text text-transparent">
            AnythingNepal
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-10 font-medium">
          <li className={linkStyle} onClick={() => navigate(Shop1)}>
            {Shop}
          </li>
          <li className={linkStyle} onClick={() => navigate(Products1)}>
            {Products}
          </li>
          <li className={linkStyle} onClick={() => navigate(Signup1)}>
            {Signup}
          </li>
          <li className={linkStyle} onClick={() => navigate("/contact")}>
            {Contact}
          </li>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 text-white/90">
          {Shop !== "ManageShop" && (
            <>
              <div className="relative hover:text-amber-400 cursor-pointer transition">
                <FiHeart size={22} />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="relative hover:text-amber-400 cursor-pointer transition">
                <BsBasket size={22} />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </div>
            </>
          )}
          <div
            className="ml-4 font-semibold cursor-pointer text-amber-300 hover:text-amber-400 transition"
            onClick={() => navigate(`/pages/sellers/manageProfile/${Id}`)}
          >
            {Name}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden origin-top bg-black/60 backdrop-blur-xl flex flex-col items-center space-y-5 py-6 border-t border-white/10"
          >
            {/* Links */}
            {[
              { text: Shop, to: Shop1 },
              { text: Products, to: Products1 },
              { text: Signup, to: Signup1 },
              { text: Contact, to: Contact1 },
            ].map((link, i) => (
              <li
                key={i}
                className={linkStyle}
                onClick={() => {
                  navigate(link.to);

                  setMenuOpen(false);
                }}
              >
                {link.text}
              </li>
            ))}

            {/* Icons + Profile Name */}
            <div className="flex flex-col items-center space-y-4 mt-4 text-white text-lg">
              <div className="flex gap-6">
                {Shop !== "ManageShop" && (
                  <>
                    <div className="relative hover:text-amber-400 cursor-pointer transition">
                      <FiHeart size={22} />
                      <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        3
                      </span>
                    </div>
                    <div className="relative hover:text-amber-400 cursor-pointer transition">
                      <BsBasket size={22} />
                      <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        1
                      </span>
                    </div>
                  </>
                )}
              </div>
              {/* Profile Name */}
              <div
                className="font-semibold text-amber-300 hover:text-amber-400 cursor-pointer transition"
                onClick={() => {
                  navigate(`/pages/sellers/manageProfile/${Id}`);
                  setMenuOpen(false);
                }}
              >
                {Name}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
