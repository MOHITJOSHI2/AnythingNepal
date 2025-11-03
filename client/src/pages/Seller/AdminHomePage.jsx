import React, { useEffect } from "react";
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
        <Carousal />
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

      <section className="py-20 bg-gradient-to-br from-[#3c1f0d] via-[#7a3c1f] to-[#3c1f0d] text-center">
        <motion.h2
          className="text-4xl font-bold text-amber-300 mb-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          Featured Products
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-0">
          {["bowl.glb", "kukri.glb", "karwa.glb", "muda.glb"].map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 300 }}
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
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#fff7e6] via-[#ffe2b3] to-[#fff7e6] py-20 space-y-20">
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
