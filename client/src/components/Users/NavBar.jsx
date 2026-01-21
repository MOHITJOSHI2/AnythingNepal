import React, { useEffect, useState } from "react";
import { FiHeart, FiMenu, FiX } from "react-icons/fi";
import { BsBasket } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = ({ Messages, Products, Signup, Contact }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [productsName, setProductsName] = useState([]);
  const [cart, setCart] = useState(1);
  const navigate = useNavigate();
  const Id = localStorage.getItem("user");
  const name = localStorage.getItem("name");

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const Nav =
    "sticky mt-3 mx-3 rounded-3xl py-1 top-0 z-50 bg-[#90AB8B] backdrop-blur-lg shadow-lg text-lg";

  const linkStyle =
    "relative text-white/80 hover:text-white cursor-pointer text-lg transition-colors duration-200 after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-white after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-full";

  useEffect(() => {
    async function getSearchData() {
      if (!search) {
        setProductsName([]);
        return;
      }
      try {
        const req = await fetch(
          `${
            import.meta.env.VITE_localhost
          }/user/getProductSearch?query=${search}`
        );
        const res = await req.json();
        if (req.ok) setProductsName(res.data);
      } catch (err) {
        console.error("Search fetch error:", err);
      }
    }
    getSearchData();
  }, [search]);

  useEffect(() => {
    if (!Id) {
      navigate("/");
    } else {
      async function getCart() {
        try {
          const req = await fetch(
            `${import.meta.env.VITE_localhost}/user/viewCart?userId=${Id}`,
            {
              method: "GET",
            }
          );

          const res = await req.json();
          if (req.ok) {
            setCart(res.items.length);
          } else {
            console.log("error");
          }
        } catch (err) {
          console.log(err);
        }
      }
      getCart();
    }
  }, []);

  return (
    <nav className={Nav}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between ">
        {/* LOGO */}
        <div
          className="cursor-pointer select-none text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent max-sm:hidden mr-10"
          onClick={() => navigate("/")}
        >
          AnythingNepal
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden min-[1485px]:flex items-center space-x-10 font-medium">
          <li className={linkStyle} onClick={() => navigate("/messages")}>
            {Messages}
          </li>
          <li className={linkStyle} onClick={() => navigate("/showProducts")}>
            {Products}
          </li>
          <li
            className={linkStyle}
            onClick={() => navigate("/productCategories")}
          >
            {Signup}
          </li>
          <li className={linkStyle} onClick={() => navigate("/contact")}>
            {Contact}
          </li>
        </ul>

        {/* SEARCH BAR */}
        <div className="flex-1 flex justify-center px-4 max-sm:px-1">
          <div className="relative w-full max-w-[380px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="rounded-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 px-4 py-2 pr-10 transition-all duration-200 w-full"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              onClick={() =>
                search && navigate(`/showProducts?query=${search}`)
              }
            >
              🔍
            </button>

            {/* FIX 2: Added 'scrollbar-hide' and ensured no horizontal overflow */}
            {search && productsName.length > 0 && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto border border-gray-200">
                {productsName.map((elem) => (
                  <p
                    key={elem.item._id}
                    className="px-4 py-3 text-gray-800 font-semibold hover:bg-amber-50 cursor-pointer transition-colors duration-200 truncate"
                    onClick={() => {
                      setSearch(elem.item.productName);
                      navigate(`/viewProduct/${elem.item._id}`);
                    }}
                  >
                    {elem.item.productName}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP ICONS */}
        <div className="hidden min-[1146px]:flex items-center gap-6 text-white/90">
          <div
            className="relative hover:text-amber-400 cursor-pointer transition"
            onClick={() => navigate("/cart")}
            title="Cart"
          >
            <BsBasket size={22} />
            {cart ? (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart}
              </span>
            ) : (
              ""
            )}
          </div>
          <div
            title="Profile"
            className="font-semibold min-w-[50px] text-center p-1 border border-[#EBF4DD] rounded-full cursor-pointer hover:bg-[#EBF4DD] text-gray-800/80 transition whitespace-nowrap"
            onClick={() => navigate(`/userProfile/${Id}`)}
          >
            {name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>

        {/* HAMBURGER */}
        <button
          className="min-[1146px]:hidden flex text-3xl text-white ml-3"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU - FIX 3: Optimized height and overflow */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="min-[1146px]:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
          >
            <ul className="flex flex-col items-center space-y-6 py-8 max-h-[80vh] overflow-y-auto">
              {[
                { text: Messages, to: "/messages" },
                { text: Products, to: "/showProducts" },
                { text: Signup, to: "/productCategories" },
                { text: Contact, to: "/contact" },
              ].map((link, idx) => (
                <li
                  key={idx}
                  className={linkStyle}
                  onClick={() => {
                    navigate(link.to);
                    setMenuOpen(false);
                  }}
                >
                  {link.text}
                </li>
              ))}

              <div
                className="relative hover:text-amber-400 cursor-pointer transition pt-4"
                onClick={() => {
                  navigate("/cart");
                  setMenuOpen(false);
                }}
              >
                <BsBasket size={30} className="text-white" />
                {cart ? (
                  <span className="absolute top-2 -right-3 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div
                className="font-semibold text-amber-300 hover:text-amber-400 text-lg pb-4"
                onClick={() => {
                  navigate(`/userProfile`);
                  setMenuOpen(false);
                }}
              >
                {name}
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
