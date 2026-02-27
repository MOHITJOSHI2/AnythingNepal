import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import Product from "../../components/Users/Product";
import NavBar from "../../components/Users/NavBar";

const IndividualCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { category } = useParams();
  const id = localStorage.getItem("user");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const req = await fetch(
          `${
            import.meta.env.VITE_localhost
          }/user/getSingleCategory?category=${category}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const res = await req.json();
        if (req.ok) {
          setProducts(res.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <NavBar
        Contact={"Contact"}
        Products={"Products"}
        Messages={"Messages"}
        Signup={"Categories"}
        Id={id}
        Shop1={"/shop"}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & Back Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white hover:bg-amber-500 hover:text-white rounded-full shadow-md transition-all duration-300"
              title="Go Back"
            >
              <FiArrowLeft size={24} />
            </button>
            <div>
              <p className="text-amber-600 text-xs font-bold uppercase tracking-widest">
                Collection
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 capitalize">
                {category}{" "}
                <span className="text-slate-400 font-light">
                  ({products.length})
                </span>
              </h1>
            </div>
          </div>

          <div className="h-10 px-4 bg-amber-100 text-amber-700 rounded-full flex items-center gap-2 text-sm font-semibold">
            <FiShoppingBag />
            Authentic Nepali Selection
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-medium">
              Fetching unique items...
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {products.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {products.map((elem) => (
                  <motion.div
                    key={elem._id}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <Product
                      productId={elem._id}
                      src={elem.productImage}
                      name={elem.productName}
                      price={elem.productPrice}
                      quantity={elem.productQuantity}
                      shop={elem.shop}
                      id={id}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200"
              >
                <div className="text-6xl mb-4">🏺</div>
                <h3 className="text-xl font-bold text-slate-800">
                  No products found
                </h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">
                  We couldn't find any products in the{" "}
                  <span className="font-bold text-amber-600">{category}</span>{" "}
                  category right now.
                </p>
                <button
                  onClick={() => navigate("/categories")}
                  className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  Browse Other Categories
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default IndividualCategory;
