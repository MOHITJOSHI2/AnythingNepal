import React, { useEffect, useState } from "react";
import NavBar from "../../components/Users/NavBar";
import Box from "../../components/Users/Box";
import BigBox from "../../components/App_components/BigBox";
import Footer from "../../components/Users/Footer";
import img1 from "../../assets/potter.jpg";
import img2 from "../../assets/items.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Carousal from "../../components/App_components/Carousal";
import { motion } from "motion/react";

const AdminHomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id && !localStorage.getItem("seller")) {
      navigate("/");
    }
  }, []);

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getProduct/${id}`
        );
        const res = await req.json();

        if (req.ok) {
          setProduct(res.message);
        } else {
          console.error(res.error || "Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-black via-[#1a0f0b] to-[#2a1208] min-h-screen text-white">
      {/* Navbar */}
      <NavBar
        Contact={"Contact"}
        Products={"Products"}
        Shop={"ManageShop"}
        Signup={id ? "Categories" : "Signup/login"}
        Name={"Mohit Joshi"}
        Id={id}
        Contact1={"#footer"}
        Products1={`/products/${id}`}
        Shop1={"/shop"}
        Signup1={id ? "/categories" : "/signup-login"}
      />

      {/* Hero Carousel */}
      <div className="relative bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] bg-opacity-20">
        <Carousal product={product} />
        <div className="absolute inset-0 bg-gradient-to-b"></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] bg-opacity-10">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          Discover Nepali Heritage
        </motion.h1>

        <motion.p
          className="max-w-3xl text-amber-100/90 mt-6 text-lg md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          Explore authentic Nepali-made products, crafts, and traditions. Every
          purchase supports our artisans and keeps cultural art alive.
        </motion.p>

        <motion.button
          onClick={() => navigate("/categories")}
          className="mt-8 px-10 py-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-full text-white font-semibold shadow-2xl hover:scale-105 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Explore Categories
        </motion.button>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* Smooth gradient blend (top & bottom) */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#1a0f0b] to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#fff7e6] to-transparent pointer-events-none"></div>

        {/* Background gradient with subtle texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4a2412] via-[#8b4513] to-[#3b1a0a] opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>

        <div className="relative z-10 text-center px-6">
          <motion.h2
            className="text-5xl font-extrabold text-amber-300 mb-12 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            Featured Products
          </motion.h2>

          <div className="flex flex-wrap justify-center">
            {["bowl.glb", "kukri.glb", "karwa.glb", "muda.glb"].map(
              (src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 250, damping: 12 }}
                  className="transform-gpu"
                >
                  <Box
                    name={
                      [
                        "Tibetan Singing Bowl",
                        "Traditional Dhaka Topi",
                        "Traditional Karwa",
                        "Traditional Muda",
                      ][i]
                    }
                    price={["Rs 2200", "Rs 1800", "Rs 4500", "Rs 3300"][i]}
                    src={src}
                  />
                </motion.div>
              )
            )}
          </div>

          {/* Decorative bottom divider */}
          <div className="mt-20 mx-auto w-48 h-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 rounded-full shadow-amber-500/30 shadow-lg"></div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#fff7e6] via-[#ffe2b3] to-[#fff7e6] pt-10 space-y-20">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2 }}
        >
          <BigBox
            img={img2}
            text="Supports Local Vendors"
            desc="We showcase creative arts and crafts made by local vendors, ensuring fair value and recognition for their incredible skills."
          />
        </motion.div>

        <motion.div
          className="flex justify-end"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2 }}
        >
          <BigBox
            img={img1}
            section="right"
            text="Authentic Nepali Accessories"
            desc="Bringing you genuine, handcrafted items from across Nepal that celebrate our heritage and artisanship."
          />
        </motion.div>
      </section>

      {/* Footer */}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default AdminHomePage;
