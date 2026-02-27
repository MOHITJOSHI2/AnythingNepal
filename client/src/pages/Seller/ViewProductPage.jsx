import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaBolt,
  FaBoxOpen,
  FaTag,
} from "react-icons/fa";

const ViewProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("user");

  const [product, setProduct] = useState({
    pId: "",
    name: "",
    src: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    shopId: "",
  });
  const [loading, setLoading] = useState(true);

  const isSeller = localStorage.getItem("seller");
  const isUser = localStorage.getItem("user");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getSingleProduct/${id}`
        );
        const res = await req.json();
        if (req.ok) {
          const p = res.message[0];
          setProduct({
            pId: p._id,
            name: p.productName,
            src: p.productImage,
            price: p.productPrice,
            quantity: p.productQuantity,
            category: p.productCategory,
            description: p.productDescription,
            shopId: p.shop,
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  //User cart
  const handleCart = async (productId, shopId, userId) => {
    const data = {
      productId: productId,
      shopId: shopId,
      userId: userId,
      quantity: 1,
    };
    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/user/addToCart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const res = await req.json();
      if (req.ok) {
        console.log(`Added ${1} items to cart`);
      } else {
        console.log(res.err);
      }
    } catch (error) {
      console.log("Error at addToCartFront: ", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Refining product details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-12">
      {/* Top Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Store
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-slate-100 rounded-3xl blur opacity-25"></div>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200">
              <img
                src={`${import.meta.env.VITE_localhost}/assets/${product.src}`}
                alt={product.name}
                className="w-full h-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="flex flex-col pt-4">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                <FaTag className="text-[10px]" /> {product.category}
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1 ${
                  product.quantity > 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                <FaBoxOpen className="text-[10px]" />{" "}
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-3xl font-bold text-slate-900">
                Rs. {Number(product.price).toLocaleString()}
              </span>
              <span className="text-slate-400 text-sm font-medium line-through">
                Rs. {(Number(product.price) * 1.2).toFixed(0)}
              </span>
            </div>

            <div className="space-y-6 mb-10">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Description
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg italic">
                "{product.description}"
              </p>
            </div>

            {/* Inventory Detail */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-10">
              <p className="text-slate-500 text-sm">
                Only{" "}
                <span className="text-indigo-600 font-bold">
                  {product.quantity} units
                </span>{" "}
                left in the inventory.
              </p>
            </div>

            {/* USER ACTIONS */}
            {isUser && !isSeller && (
              <div
                className="flex flex-col sm:flex-row gap-4 mt-auto"
                onClick={async (e) => {
                  e.stopPropagation();
                  await handleCart(product.pId, product.shopId, userId);
                  navigate("/cart");
                }}
              >
                <button className="flex-1 px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl shadow-sm hover:bg-slate-900 hover:text-white transition-all duration-300 font-bold flex items-center justify-center gap-2 group">
                  <FaShoppingCart className="group-hover:rotate-12 transition-transform" />
                  Add to Cart
                </button>

                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleCart(product.pId, product.shopId, userId);
                    navigate("/cart");
                  }}
                  className="flex-1 px-8 py-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all duration-300 font-bold flex items-center justify-center gap-2"
                >
                  <FaBolt />
                  Buy It Now
                </button>
              </div>
            )}

            {isSeller && (
              <div className="mt-8 p-4 border border-amber-100 bg-amber-50/50 rounded-xl text-amber-700 text-sm">
                Viewing as seller. To purchase this item, please log in with a
                customer account.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewProductPage;
