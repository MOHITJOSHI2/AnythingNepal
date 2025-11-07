import React, { useEffect, useState } from "react";

const CreateShop = ({ id }) => {
  const [img, setImg] = useState(null);
  const [shopData, setShopData] = useState({
    shopImage: "",
    shopName: "",
    shopDescription: "",
  });

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
    if (!id) console.log("Error occurred: missing id");
  }, [id]);

  async function sendData() {
    const formData = new FormData();
    formData.append("shopImage", document.getElementById("shopImage").files[0]);
    formData.append("shopName", shopData.shopName);
    formData.append("shopDescription", shopData.shopDescription);

    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/seller/addShop/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const res = await req.json();
      if (req.ok) {
        console.log(res.message);
        document.getElementById("form").reset();
        setImg(null);
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
          {img ? (
            <img
              src={img}
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
            onChange={handleChange}
            className="w-full px-4 py-2 border-b-[2px] outline-0"
          />
        </div>

        {/* Shop Description */}
        <div className="flex flex-col">
          <label className="text-amber-700 font-semibold mb-1">
            Shop Description
          </label>
          <textarea
            name="shopDescription"
            rows="5"
            placeholder="Describe your shop"
            maxLength={300}
            onChange={handleChange}
            className="w-full px-4 py-2 border-b-[2px] outline-0 resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={sendData}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-400 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Create Shop
        </button>
      </form>
    </div>
  );
};

export default CreateShop;
