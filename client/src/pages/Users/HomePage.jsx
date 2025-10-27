import React from "react";
import NavBar from "../../components/Users/NavBar";
import Box from "../../components/Users/Box";
import BigBox from "../../components/App_components/BigBox";
import Footer from "../../components/Users/Footer";
import img1 from "../../assets/potter.jpg";
import img2 from "../../assets/items.jpg";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-amber-900 via-red-800 to-amber-700 min-h-screen w-full">
      {/* Navbar */}
      <div className="sticky top-0 z-50 shadow-lg bg-opacity-90 bg-amber-950">
        <NavBar
          Contact={"Contact"}
          Products={"Products"}
          Shop={"Shop"}
          Signup={"Signup/login"}
          Home1={"/"}
          Contact1={"/Contact"}
          Products1={"/products"}
          Shop1={"/shop"}
          Signup1={"/signup-login"}
        />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[92vh] px-4 text-center space-y-6 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]">
        <h1 className="text-amber-100 text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Explore Nepali Products
          <br />
          and Traditions
        </h1>

        <p className="text-amber-50 text-base md:text-lg max-w-2xl font-medium leading-relaxed drop-shadow-md">
          Discover authentic Nepali-made products and immerse yourself in a rich
          variety of cultures, crafts, and sculptures from across Nepal.
        </p>

        <button
          type="button"
          className="bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-xl transition-all duration-300"
        >
          Explore Now
        </button>
      </div>

      {/* Product Showcase */}
      <div className="pt-16 px-6 bg-gradient-to-r from-amber-100 to-red-100 text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-10">
          Some of our Products
        </h2>
        <div className="flex flex-wrap justify-center">
          <Box
            name="Tibetian Singing Bowl"
            price={"Rs 2200"}
            src={"bowl.glb"}
          />
          <Box
            name="Traditional Dhaka Topi"
            price={"Rs 1800"}
            src={"kukri.glb"}
          />
          <Box name="Traditional Karwa" price={"Rs 4500"} src={"karwa.glb"} />
          <Box name="Traditional Muda" price={"Rs 3300"} src={"muda.glb"} />
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-amber-100 to-red-100 py-20">
        <BigBox
          img={img2}
          text={"Supports Local Vendors"}
          desc={
            "We aim to help local vendors and crafters by showcasing their creative arts and heritage, ensuring they receive the recognition and value they deserve."
          }
        />
        <div className="flex justify-end mt-16">
          <BigBox
            img={img1}
            section={"right"}
            text={"Authentic Nepali Accessories"}
            desc={
              "We provide a variety of handcrafted items and accessories from across Nepal, bringing you authentic and traditional products that celebrate our rich heritage."
            }
          />
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
