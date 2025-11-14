import React, { useEffect, useState } from "react";

const UpdateShop = ({ id, onCancel, onUpdated }) => {
  const [img, setImg] = useState(null);
  const [shopData, setShopData] = useState({
    shopImage: "",
    shopName: "",
    shopDescription: "",
  });
  const shopId = localStorage.getItem("shop");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setShopData((prev) => ({
        ...prev,
        shopImage: e.target.files[0].name,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function getShopData() {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getSingleShop/${shopId}`
        );
        const res = await req.json();

        if (req.ok) {
          console.log(res.message.shopImage);
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

  async function updateData() {
    const formData = new FormData();
    formData.append("shopImage", document.getElementById("shopImage").files[0]);
    formData.append("shopName", shopData.shopName);
    formData.append("shopDescription", shopData.shopDescription);

    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/seller/updateShop/${shopId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const res = await req.json();
      if (req.ok) {
        console.log(res.message);
        onUpdated();
      } else {
        console.log(res.err);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }

  return (
    <div className="flex justify-center py-10 px-4">
      <form
        method="POST"
        id="form"
        encType="multipart/form-data"
        className="w-full max-w-lg bg-white/90 backdrop-blur-md border border-amber-200 rounded-3xl shadow-lg p-10 space-y-6"
      >
        {/* Shop Image */}
        <div
          onClick={() => document.getElementById("shopImage").click()}
          className="w-full h-48 border-2 border-dashed border-black rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden relative hover:scale-105 transition-transform duration-300"
        >
          {img || shopData.shopImage ? (
            <img
              src={
                img
                  ? img
                  : `${import.meta.env.VITE_localhost}/assets/${
                      shopData.shopImage
                    }` // fetched image
              }
              alt="Preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <span className="text-gray-400 text-lg font-medium">
              Click to choose Shop Image
            </span>
          )}
        </div>
        <input
          type="file"
          name="shopImage"
          id="shopImage"
          hidden
          required
          onChange={handleFileChange}
        />

        {/* Shop Name */}
        <div className="flex flex-col">
          <label className="text-amber-700 font-semibold mb-1">Shop Name</label>
          <input
            type="text"
            name="shopName"
            placeholder="Enter shop name"
            maxLength={100}
            value={shopData.shopName}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b-[2px] outline-0"
            required
          />
        </div>

        {/* Shop Description */}
        <div className="flex flex-col">
          <label className="text-amber-700 font-semibold mb-1">
            Shop Description
          </label>
          <textarea
            name="shopDescription"
            rows="4"
            placeholder="Describe your shop"
            maxLength={300}
            value={shopData.shopDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b-[2px] outline-0 resize-none"
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-2xl shadow-sm transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateData}
            className="w-1/2 py-3 bg-gradient-to-r from-amber-500 to-rose-400 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Update Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateShop;
