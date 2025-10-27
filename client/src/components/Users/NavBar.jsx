import React, { useState } from "react";
import { FiHeart, FiMenu, FiX } from "react-icons/fi";
import { BsBasket } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../App.css";
import photo from "../../assets/cat.png";

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

  const linkStyle =
    "text-amber-50 hover:text-red-600 cursor-pointer text-lg transition-all ease-in-out list-none";

  return (
    <nav className="bg-amber-950 bg-opacity-95 px-4 py-3 shadow-lg w-full sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="text-white text-xl sm:text-2xl">🛍️</div>
          <span className="text-lg sm:text-xl font-semibold text-amber-500 whitespace-nowrap">
            AnythingNepal
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li className={linkStyle} onClick={() => navigate(Shop1)}>
            {Shop}
          </li>
          <li className={linkStyle} onClick={() => navigate(Products1)}>
            {Products}
          </li>
          <li className={linkStyle} onClick={() => navigate(Signup1)}>
            {Signup}
          </li>
          <li
            className={linkStyle}
            onClick={() => {
              if (Contact1 === "#footer") {
                document
                  .getElementById("footer")
                  ?.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate(Contact1);
              }
            }}
          >
            {Contact}
          </li>
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-5 text-lg text-amber-50">
          {Shop !== "ManageShop" ? (
            <>
              <div className="relative cursor-pointer hover:text-red-600">
                <FiHeart />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="relative cursor-pointer hover:text-red-600">
                <BsBasket />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </div>
            </>
          ) : null}
          <div
            className="text-amber-100 cursor-pointer"
            onClick={() => navigate(`/pages/sellers/manageProfile/${Id}`)}
          >
            {Name}
          </div>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden mt-4 flex flex-col text-center space-y-4 bg-amber-900 bg-opacity-95 p-4 rounded-lg overflow-hidden"
          >
            <li className={linkStyle} onClick={() => navigate(Shop1)}>
              {Shop}
            </li>
            <li className={linkStyle} onClick={() => navigate(Products1)}>
              {Products}
            </li>
            <li className={linkStyle} onClick={() => navigate(Signup1)}>
              {Signup}
            </li>
            <li
              className={linkStyle}
              onClick={() => {
                if (Contact1 === "#footer") {
                  document
                    .getElementById("footer")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate(Contact1);
                }
              }}
            >
              {Contact}
            </li>

            {/* Icons inside mobile menu */}
            <div className="flex justify-center items-center space-x-6 mt-4 text-white text-lg">
              {Shop !== "ManageShop" ? (
                <>
                  <div className="relative cursor-pointer hover:text-red-600">
                    <FiHeart />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <div className="relative cursor-pointer hover:text-red-600">
                    <BsBasket />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      1
                    </span>
                  </div>
                </>
              ) : null}
              <div
                className="text-amber-100 cursor-pointer"
                onClick={() => navigate(`/pages/sellers/manageProfile/${Id}`)}
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
