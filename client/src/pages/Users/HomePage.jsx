import React, { useState, useEffect } from "react";
import NavBar from "../../components/Users/NavBar";
import ComponentBox from "../../components/Users/ComponentBox";
import pottery from "../../assets/pottery.png";
import clothes from "../../assets/clothes.png";
import handicraft from "../../assets/handicraft.png";
import art from "../../assets/art.png";
import BigBox from "../../components/App_components/BigBox";
import Footer from "../../components/Users/Footer";
import bg from "../../assets/bg.png";
import { motion } from "motion/react";
import img1 from "../../assets/potter.jpg";
import img2 from "../../assets/items.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/Users/Product";

const HomePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setloading] = useState(true);
  const [product, setProduct] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  useEffect(() => {
    if (!localStorage.getItem("user") && id) {
      navigate("/pages/users/userLogin");
    }
  }, []);

  useEffect(() => {
    async function fetchdata() {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/user/getFilteredProducts`,
        {
          method: "GET",
        }
      );
      const res = await req.json();
      if (req.ok) {
        console.log(res.products);
        setloading(false);
        setProduct(res.products);
      } else {
        console.log(res.err);
        setloading(false);
      }
    }
    fetchdata();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-amber-200 text-2xl font-bold text-center">
        Loading....
      </div>
    );
  }

  const categories = [
    "Art and Artitecture",
    "Pottery",
    "Handicraft",
    "Clothes",
  ];

  const pic = [art, pottery, handicraft, clothes];

  return (
    <div className="min-h-screen bg-[#EBF4DD] text-stone-800 font-sans overflow-x-hidden">
      <NavBar
        Contact={"Contact"}
        Products={"Products"}
        Messages={"Messages"}
        Signup={"Categories"}
        Id={id}
        Shop1={"/shop"}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 mt-[10%] md:mt-[6%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Text Content: Order priority 2 on mobile, 1 on desktop */}
          <section className="order-1 lg:col-span-5 px-2 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6 md:space-y-10"
            >
              {/* Headline & Subtext */}
              <div>
                <motion.h2
                  variants={fadeInUp}
                  className="text-5xl md:text-6xl font-black text-stone-900 leading-none tracking-tighter"
                >
                  NEPAL <br />
                  <span className="text-red-700">CURATED.</span>
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="mt-4 text-lg md:text-xl text-stone-600 font-medium"
                >
                  Handpicked. Authentic. Direct from the source.
                </motion.p>
              </div>

              {/* Feature List with Border Animation */}
              <motion.div
                variants={fadeInUp}
                className="relative grid grid-cols-1 gap-4 md:gap-6 pl-6"
              >
                {/* Animated Border Line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-300 origin-top"
                />

                <motion.div variants={slideInRight}>
                  <h4 className="font-bold text-stone-900 text-base">
                    100% Original
                  </h4>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">
                    Verified Artisan Work
                  </p>
                </motion.div>

                <motion.div variants={slideInRight}>
                  <h4 className="font-bold text-stone-900 text-base">
                    Eco-Conscious
                  </h4>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">
                    Sustainable Packaging
                  </p>
                </motion.div>
              </motion.div>

              <motion.button
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 text-lg font-bold group hover:text-red-700 transition-colors"
                onClick={() => navigate("/showProducts")}
              >
                <span>Start Exploring</span>
              </motion.button>
            </motion.div>
          </section>

          <section className="order-2 lg:col-span-7 relative h-[400px] md:h-[550px] flex items-center justify-center perspective-1000">
            {product.map((item, index) => {
              const isActive = index === activeIndex;
              const isPrev =
                index === (activeIndex - 1 + product.length) % product.length;
              const isNext = index === (activeIndex + 1) % product.length;

              let transformStyle = "scale-0 opacity-0";

              // Mobile specific transforms (hidden/tucked) vs Desktop
              if (isActive) {
                transformStyle =
                  "translate-z-0 scale-110 md:scale-125 opacity-100 z-30 shadow-2xl";
              } else if (isPrev) {
                // On mobile, we move them less (-translate-x-20) to stay on screen
                transformStyle =
                  "-translate-x-20 md:-translate-x-44 -rotate-y-15 scale-90 md:scale-100 opacity-40 md:opacity-50 z-10 shadow-lg";
              } else if (isNext) {
                transformStyle =
                  "translate-x-20 md:translate-x-44 rotate-y-15 scale-90 md:scale-100 opacity-400 md:opacity-50 z-10 shadow-lg";
              }

              return (
                <div
                  key={item._id}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-56 h-80 md:w-72 md:h-96 transition-all duration-700 ease-in-out cursor-pointer overflow-hidden rounded-3xl bg-white border border-stone-200 ${transformStyle}`}
                >
                  <img
                    src={`${import.meta.env.VITE_localhost}/assets/${
                      item.productImage
                    }`}
                    alt={item.productName}
                    className="h-2/3 w-full object-cover"
                    onClick={() => navigate(`/viewProduct/${item._id}`)}
                  />
                  <div className="p-4 md:p-6">
                    <h3 className="font-bold text-sm md:text-lg truncate">
                      {item.productName}
                    </h3>
                    <p className="text-red-800 font-semibold text-xs md:text-base">
                      Rs: {item.productPrice}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Controls - Positioned Relative to the Section height */}
            <div className="absolute -bottom-20 md:-bottom-20 flex gap-6">
              <button
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + product.length) % product.length
                  )
                }
                className="p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-stone-900 hover:text-white transition-all active:scale-90"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % product.length)
                }
                className="p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-stone-900 hover:text-white transition-all active:scale-90"
              >
                →
              </button>
            </div>
          </section>
        </div>
      </main>
      <section className="mt-[13%] flex flex-col">
        <div className="text-center">
          <p className="text-xl font-semibold text-black/80">
            Explore Categories
          </p>
        </div>
        <div className="flex flex-row justify-center flex-wrap gap-10 mt-5 mb-5 w-full">
          {categories.map((elem, index) => (
            <ComponentBox key={index} name={elem} src={pic[index]} />
          ))}
        </div>
      </section>
      <section className="w-full bg-[#5A7863]/95 backdrop-blur-md p-6 md:p-16 mt-[10%] shadow-[0_-15px_30px_-10px_rgba(90,120,99,0.4)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative flex flex-col lg:flex-row items-center gap-16 p-8 md:p-12 mb-12">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-[4rem] -z-10 border border-white/10 shadow-inner"></div>

            <div className="w-full lg:w-[45%] group perspective-1000">
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-90 group-hover:scale-110 transition-all duration-1000"></div>
                <img
                  src={`${import.meta.env.VITE_localhost}/assets/${
                    product[0].productImage
                  }`}
                  alt="Featured Collection"
                  className="relative z-10 w-full h-[55vh] object-cover rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform transition-all duration-700 group-hover:rotate-y-6 group-hover:-translate-y-4"
                />
              </div>
            </div>

            <div className="flex-1 text-white space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-[1px] w-12 bg-red-500"></span>
                  <span className="text-red-400 uppercase tracking-[0.4em] text-[10px] font-black">
                    Featured Masterpiece
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-bold leading-none tracking-tight">
                  {product[0].productName}
                </h2>
                <p className="mt-6 text-white/60 text-lg max-w-lg font-light leading-relaxed">
                  A testament to Nepali heritage, crafted with soul and
                  centuries-old tradition.
                </p>
              </div>

              <div className="flex flex-wrap gap-12 items-end">
                <div className="space-y-1">
                  <p className="text-white/40 uppercase tracking-widest text-xs">
                    Availability
                  </p>
                  <p className="text-4xl font-light italic">
                    {product[0].productQuantity}{" "}
                    <span className="text-sm not-italic opacity-50">Units</span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase tracking-widest text-xs">
                    Investment
                  </p>
                  <p className="text-6xl font-black tracking-tighter text-white">
                    <span className="text-2xl font-normal opacity-50 mr-2">
                      Rs.
                    </span>
                    {product[0].productPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-8 flex">
                <button
                  onClick={() => navigate(`/viewProduct/${product[0]._id}`)}
                  className="px-12 py-5 bg-white text-stone-900 font-bold rounded-2xl hover:bg-red-800 hover:text-white transition-all shadow-xl active:scale-95 uppercase text-xs tracking-widest"
                >
                  Acquire Now
                </button>
              </div>
            </div>
          </div>

          {/* SUB-PRODUCT GRID: "The Glass Tray" */}
          <div className="relative mt-20 ">
            <div className="flex items-center justify-between mb-10 px-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                More from this collection
              </h3>
              <div className="h-[1px] flex-1 mx-8 bg-white/10"></div>
              <button className="text-white/50 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">
                Browse All →
              </button>
            </div>

            {/* Grid container with subtle scrolling behavior on mobile */}
            <div className="w-max grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 md:p-8 bg-black/10 rounded-[3rem] border border-white/5 backdrop-blur-sm shadow-inner">
              {product.slice(1).map((elem, index) => (
                <div
                  key={index}
                  className="transform hover:scale-[1.02] transition-transform duration-300"
                >
                  <Product
                    name={elem.productName}
                    price={elem.productPrice}
                    productId={elem._id}
                    quantity={elem.productQuantity}
                    key={elem._id}
                    src={elem.productImage}
                    shop={elem.shop}
                    id={id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-[15%] max-w-7xl mx-auto px-6 pb-20">
          <div className="relative text-center mb-24">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-red-800 font-black tracking-[0.5em] uppercase text-xs block mb-4"
            >
              Our Mission
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-serif font-bold text-stone-900"
            >
              Crafting the Future
            </motion.h2>
          </div>

          <div className="space-y-32">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <BigBox
                img={img2}
                text="Empowering Local Vendors"
                desc="We showcase creative arts and crafts made by local vendors, ensuring fair value and recognition for their incredible skills."
              />
            </motion.div>

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <BigBox
                img={img1}
                section="right"
                text="Authentic Accessories"
                desc="Bringing you genuine, handcrafted items from across Nepal that celebrate our heritage and centuries-old artisanship."
              />
            </motion.div>
          </div>
        </section>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default HomePage;
