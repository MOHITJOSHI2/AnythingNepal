import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const productCategory = ["Clothes", "Art and Architecture", "Pottery"];
  const [img, setImg] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    photo: "",
    productName: "",
    productPrice: 0,
    productQuantity: "1",
    productCategory: "",
    productDescription: "",
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setProductData((prev) => ({
        ...prev,
        photo: e.target.files[0].name,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!id && !localStorage.getItem("seller")) {
      console.log("Error occurred");
      navigate("/");
    }
  }, [id]);

  useEffect(() => {
    console.log(id);
    const fetchProduct = async () => {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getSingleProduct/${id}`
        );
        const res = await req.json();

        if (req.ok) {
          setProductData({
            productName: res.message[0].productName,
            photo: res.message[0].productImage,
            productPrice: res.message[0].productPrice,
            productQuantity: res.message[0].productQuantity,
            productCategory: res.message[0].productCategory,
            productDescription: res.message[0].productDescription,
          });
        } else {
          console.error(res.error || "Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  async function sendData() {
    const formData = new FormData();
    formData.append(
      "productImage",
      document.getElementById("productImage").files[0]
    );
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productQuantity", productData.productQuantity);
    formData.append("productCategory", productData.productCategory);
    formData.append("productDescription", productData.productDescription);

    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/seller/updateProduct/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const res = await req.json();
      if (req.ok) {
        console.log(res.message);
        document.getElementById("form").reset();
        navigate(-1);
      } else {
        console.log(res.err);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center py-3">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden border border-[#d4a373]/40 transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-[#f8ead8] to-[#f4e3c1] p-5">
          <h2 className="text-2xl font-bold text-center text-[#5a3e2b]">
            Update Product
          </h2>
          <p className="text-center text-sm text-gray-600 mt-1">
            Fill the details below to Update your product
          </p>
        </div>

        <form
          method="POST"
          action="/"
          id="form"
          encType="multipart/form-data"
          className="p-5"
        >
          {/* Image Upload */}
          <div
            onClick={() => document.getElementById("productImage").click()}
            className="relative border-2 border-dashed border-black rounded-lg w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:border-[#b07b4d] hover:bg-[#fff8f1] transition-all ease-in-out mb-4 overflow-hidden"
          >
            {img || productData.photo ? (
              <img
                src={
                  img
                    ? img
                    : `${import.meta.env.VITE_localhost}/assets/${
                        productData.photo
                      }` // fetched image
                }
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-500 font-medium">
                <p>Click to upload image</p>
                <p className="text-xs text-gray-400 mt-1">
                  Supported: jpg, png, jpeg
                </p>
              </div>
            )}
          </div>

          <input
            hidden
            type="file"
            name="productImage"
            id="productImage"
            required
            onChange={handleFileChange}
            accept="image/jpeg, image/png, .jpg, .jpeg, .png"
          />

          {/* Product Name */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-sm font-semibold mb-1">
              Product Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="e.g., Handmade Clay Pot"
              name="productName"
              maxLength={100}
              value={productData.productName}
              className="w-full px-4 py-2 border-b-[2px] border-solid border-black bg-white outline-0"
            />
          </div>

          {/* Product Price */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-sm font-semibold mb-1">
              Product Price (Rs)
            </label>
            <input
              type="number"
              maxLength={6}
              name="productPrice"
              onChange={handleChange}
              value={productData.productPrice}
              placeholder="e.g., 1500"
              className="w-full px-4 py-2 border-b-[2px] border-solid border-black bg-white outline-0"
            />
          </div>

          {/* Quantity */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-sm font-semibold mb-1">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              onChange={handleChange}
              placeholder="e.g., 10"
              value={productData.productQuantity}
              name="productQuantity"
              className="w-full px-4 py-2 border-b-[2px] border-solid border-black bg-white outline-0"
            />
          </div>

          {/* Category */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-sm font-semibold mb-1">
              Category
            </label>
            <select
              name="productCategory"
              value={productData.productCategory}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b-[2px] border-solid border-black bg-white outline-0"
            >
              <option value="">-- Select Category --</option>
              {productCategory.map((elem, index) => (
                <option key={index} value={elem}>
                  {elem}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="productDescription"
              maxLength={300}
              onChange={handleChange}
              value={productData.productDescription}
              placeholder="Describe your product in a few sentences..."
              className="w-full px-4 py-2 border-b-[2px] border-solid border-black bg-white outline-0"
              rows="4"
            ></textarea>
          </div>

          {/* Button */}
          <div className="mt-5">
            <button
              className="w-full py-2.5 bg-[#5a3e2b] hover:bg-[#7c583b] text-white font-semibold rounded-lg shadow-md transition-all duration-300"
              type="button"
              onClick={sendData}
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
