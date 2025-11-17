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
import "../../All.css";
import bg from "../../assets/bg.png";

const AdminHomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !localStorage.getItem("seller")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getProduct/${id}`
        );
        const res = await req.json();

        if (req.ok) setProduct(res.message);
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
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-200 bg-gradient-to-br from-[#1a0000] via-[#3b0a0a] to-[#5e1e00]">
        Loading page details...
      </div>
    );
  }

  return (
    <div
      className="text-gray-100 min-h-screen bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
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

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[100vh] px-6 text-center bg-cover bg-center bg-no-repeat shadow-[0_40px_60px_-30px_rgba(75, 20, 10, 1)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/50 via-[#1a0e0e]/40 to-[#260505]/0"></div>

        <motion.h1
          className="relative z-10 text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#ffb347] via-[#ff6a00] to-[#ff914d] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,138,76,0.4)]"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          Discover Nepali Heritage
        </motion.h1>

        <motion.p
          className="relative z-10 max-w-3xl text-[#ffddb3]/90 mt-6 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          Explore authentic Nepali-made products, crafts, and traditions. Every
          purchase supports artisans and keeps our culture alive.
        </motion.p>

        <motion.button
          onClick={() => navigate("/categories")}
          className="relative z-10 mt-8 px-10 py-4 bg-gradient-to-r from-[#ff6a00] to-[#ffb347] rounded-full text-black font-semibold shadow-[0_0_25px_rgba(255,140,0,0.5)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,180,50,0.8)] transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          Explore Categories
        </motion.button>
      </section>

      <section className="relative flex flex-col md:flex-row items-center justify-center w-full px-6 py-20 text-center bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/0 via-[#1a0e0e]/40 to-[#260505]/50"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#260505]"></div>

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center md:items-start md:text-left text-center w-full md:w-[40%] mb-10 md:mb-0"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#ffb347] mb-6 drop-shadow-[0_0_25px_rgba(255,140,0,0.4)]">
            Some of Our Products
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md">
            Explore unique handcrafted products made in Nepal — where tradition
            meets creativity.
          </p>
        </motion.div>

        <div className="relative z-10 w-full md:w-[60%] flex justify-center">
          <Carousal product={product} />
        </div>
      </section>

      {/* Featured Products Section */}
      {/* <section className="py-24 bg-gradient-to-b from-[#260505] via-[#3b0a0a] to-[#1a0000] ">
        <div className="text-center px-6">
          <motion.h2
            className="text-5xl font-extrabold text-[#ffb347] mb-12 drop-shadow-[0_0_25px_rgba(255,140,0,0.4)]"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>

          <div className="flex flex-wrap justify-center ">
            {["bowl.glb", "kukri.glb", "karwa.glb", "muda.glb"].map(
              (src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  viewport={{ once: true }}
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

          <div className="mt-20 mx-auto w-48 h-1 bg-gradient-to-r from-[#ff6a00] via-[#ffb347] to-[#ff6a00] rounded-full shadow-[0_0_20px_rgba(255,140,0,0.6)]"></div>
        </div>
      </section> */}

      {/* BigBox Sections */}
      <section className="bg-gradient-to-r from-[#3b0a0a] via-[#5e1e00] to-[#7a2b0a] pt-24 pb-16 space-y-24 relative overflow-hidden shadow-[0_0_20px_rgba(255,140,0,0.6)]">
        {/* Decorative gradient overlay for depth */}

        {/* Heading */}
        <div className="relative text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-[#ffb347] via-[#ff6a00] to-[#ff914d] bg-clip-text drop-shadow-[0_0_25px_rgba(255,160,60,0.4)]"
          >
            What We Do
          </motion.h2>

          <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-[#ff6a00] via-[#ffb347] to-[#ff6a00] rounded-full shadow-[0_0_20px_rgba(255,180,80,0.6)]"></div>
        </div>

        {/* Content Boxes */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
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
      <div
        id="footer"
        className="bg-gradient-to-b from-[#1a0000] via-[#260505] to-[#0d0d0d] border-t border-[#ff6a00]/30"
      >
        <Footer />
      </div>
    </div>
  );
};

export default AdminHomePage;
