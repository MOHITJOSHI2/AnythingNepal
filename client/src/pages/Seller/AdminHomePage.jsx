import React, { useEffect, useState } from "react";
import NavBar from "../../components/Sellers/NavBar";
import Footer from "../../components/Users/Footer";
import Carousal from "../../components/App_components/Carousal";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiPackage,
  FiActivity,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";
import bg from "../../assets/bg.png";

const AdminHomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrders] = useState(0);
  const shopId = localStorage.getItem("shop");
  const name = localStorage.getItem("name");

  useEffect(() => {
    if (!id || !localStorage.getItem("seller")) {
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Shop ID if missing
        if (!shopId) {
          const req = await fetch(
            `${import.meta.env.VITE_localhost}/seller/getShopBySellerId/${id}`
          );
          const res = await req.json();
          if (req.ok) localStorage.setItem("shop", res.encryptedShopId);
        }
        // Fetch Products
        if (shopId) {
          const prodReq = await fetch(
            `${import.meta.env.VITE_localhost}/seller/getProduct/${shopId}`
          );
          const prodRes = await prodReq.json();
          if (prodReq.ok) setProduct(prodRes.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, shopId]);

  useEffect(() => {
    async function fetchOrder() {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/seller/getActiveOrders/${shopId}`
      );

      const res = await req.json();
      setOrders(res.message.length);
    }
    fetchOrder();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0d0d0d]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1A1A1A] font-sans selection:bg-amber-200">
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar
          Shop={"ManageShop"}
          Products={"Products"}
          Signup={"Categories"}
          Contact={"Contacts"}
          Id={id}
          Products1={`/products/${id}`}
          Signup1={"/categories"}
        />

        <main className="flex-grow max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          {/* Header Section */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs mb-2"
              >
                Seller Center
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
              >
                Namaste, <span className="text-amber-600">{name}</span>
              </motion.h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#d97706" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/products/${id}`)}
              className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200"
            >
              <FiPlus strokeWidth={3} />
              List New Product
            </motion.button>
          </header>

          {/* Mid section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatCard
              icon={<FiPackage />}
              label="Total Inventory"
              value={product.length}
              bgColor="bg-blue-50"
              iconColor="text-blue-600"
            />
            <StatCard
              icon={<FiShoppingBag />}
              label="Shop Status"
              value={shopId ? "Active" : "Deactive"}
              bgColor="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <StatCard
              icon={<FiActivity />}
              label="Active Orders"
              value={order}
              bgColor="bg-amber-50"
              iconColor="text-amber-600"
            />
          </div>

          {/* Product Carousel */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extrabold text-slate-800">
                Your Showroom
              </h2>
              <div className="h-[2px] flex-grow bg-slate-200 rounded-full" />
            </div>

            <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-10 shadow-sm overflow-hidden">
              <Carousal shopId={shopId} product={product} />
            </div>
          </section>

          {/* Action Grid */}
          <section className="grid md:grid-cols-2 gap-8 mb-20">
            <ActionTile
              title="Inventory Management"
              desc="View, edit, and organize your handcrafted products. Update stock counts and pricing details instantly."
              btnText="View Inventory"
              onClick={() => navigate(`/products/${id}`)}
            />
            <ActionTile
              title="Organize Categories"
              desc="Group your items by craft type. Make it easier for buyers to find your unique Nepali treasures."
              btnText="Manage Categories"
              onClick={() => navigate("/categories")}
            />
          </section>
        </main>

        <footer className="relative z-20 mt-auto bg-slate-900 text-white">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, bgColor, iconColor }) => (
  <motion.div
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="bg-white border border-slate-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm shadow-slate-200/50"
  >
    <div
      className={`w-14 h-14 ${bgColor} ${iconColor} rounded-2xl flex items-center justify-center text-2xl`}
    >
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">
        {label}
      </p>
      <p className="text-3xl font-black text-slate-800 leading-tight">
        {value}
      </p>
    </div>
  </motion.div>
);

const ActionTile = ({ title, desc, btnText, onClick }) => (
  <motion.div className="group bg-white border border-slate-200 p-10 rounded-[2.5rem] hover:border-amber-400 transition-all duration-300 shadow-sm">
    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 mb-8 leading-relaxed">{desc}</p>
    <button
      onClick={onClick}
      className="flex items-center gap-2 font-bold text-amber-600 group-hover:gap-4 transition-all"
    >
      {btnText} <FiArrowRight strokeWidth={3} />
    </button>
  </motion.div>
);

export default AdminHomePage;
