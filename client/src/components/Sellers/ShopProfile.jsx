import React, { useEffect, useState } from "react";

const ShopProfile = ({ onUpdateClick }) => {
  const [shopData, setShopData] = useState({
    shopImage: "",
    shopName: "",
    shopDescription: "",
  });

  const shopId = localStorage.getItem("shop");

  useEffect(() => {
    if (!shopId) {
      console.log("Cannot find id");
      return;
    }

    async function getShopData() {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getSingleShop/${shopId}`
        );
        const res = await req.json();

        if (req.ok) {
          setShopData({
            shopName: res.message.shopName,
            shopImage: res.message.shopImage,
            shopDescription: res.message.shopDescription,
          });
        } else {
          console.log(res.err);
        }
      } catch (err) {
        console.error("Error fetching shop data:", err);
      }
    }

    getShopData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start bg-white shadow-md rounded-2xl p-6 md:p-10 gap-6 md:gap-10 mx-auto max-w-4xl mt-10 border border-gray-100 relative">
      {/* Image Section */}
      <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
        <img
          src={`${import.meta.env.VITE_localhost}/assets/${shopData.shopImage}`}
          alt={shopData.shopName || "Shop"}
          className="w-full h-full object-cover rounded-full border-4 border-gray-200 shadow-sm"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          {shopData.shopName || "Shop Name"}
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed max-w-md">
          {shopData.shopDescription || "No description available."}
        </p>

        <button
          onClick={onUpdateClick}
          className="mt-5 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-xl shadow-sm transition-all duration-300"
        >
          Update Data
        </button>
      </div>
    </div>
  );
};

export default ShopProfile;
