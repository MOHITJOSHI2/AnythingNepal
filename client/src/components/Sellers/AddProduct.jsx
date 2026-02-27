import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AddProduct = ({ id }) => {
  const productCategory = [
    "Clothes",
    "Art and Architecture",
    "Pottery",
    "HandiCraft",
  ];

  const [img, setImg] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productQuantity: "1",
    productCategory: "",
    productDescription: "",
  });

  const shopId = localStorage.getItem("shop");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setError("");
      setImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!id) return;
    if (!shopId) {
      navigate("/shop/'");
    }
  }, [id, shopId, navigate]);

  const validateForm = () => {
    const fileInput = document.getElementById("productImage");
    if (!fileInput.files[0]) return "Please upload a product image.";
    if (!productData.productName.trim()) return "Product name is required.";
    if (!productData.productPrice || productData.productPrice <= 0)
      return "Please enter a valid price.";
    if (!productData.productQuantity || productData.productQuantity < 1)
      return "Quantity must be at least 1.";
    if (!productData.productCategory) return "Please select a category.";
    if (productData.productDescription.trim().length < 10)
      return "Description must be at least 10 characters.";
    return null;
  };

  async function sendData() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

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
        `${import.meta.env.VITE_localhost}/seller/addProduct/${shopId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const res = await req.json();
      if (req.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setError(res.err || "Something went wrong on the server.");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden border border-[#d4a373]/20"
      >
        <div className="bg-gradient-to-r from-[#5a3e2b] to-[#8c634a] p-6 text-white text-center">
          <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
          <p className="text-white/80 text-sm mt-1">
            List your masterpiece in the Nepal Marketplace
          </p>
        </div>

        <form id="form" className="p-8 space-y-5">
          {/* Error & Success Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm font-medium rounded shadow-sm"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="bg-green-50 border-l-4 border-green-500 p-3 text-green-700 text-sm font-medium rounded shadow-sm"
              >
                Product added successfully! Reloading...
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Upload Area */}
          <div
            onClick={() =>
              !loading && document.getElementById("productImage").click()
            }
            className={`relative group border-2 border-dashed rounded-2xl w-full h-56 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden ${
              error.toLowerCase().includes("image")
                ? "border-red-400 bg-red-50"
                : "border-slate-300 hover:border-amber-500 hover:bg-amber-50"
            }`}
          >
            {img ? (
              <img
                src={img}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl mb-2 text-slate-400">🖼️</div>
                <p className="text-slate-600 font-semibold">
                  Upload Product Image
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            )}
          </div>

          <input
            hidden
            type="file"
            id="productImage"
            onChange={handleFileChange}
            accept="image/*"
          />

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                onChange={handleChange}
                placeholder="Ex: Traditional Singing Bowl"
                className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-amber-500 outline-none transition-all bg-slate-50/50 rounded-t-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Price (Rs)
                </label>
                <input
                  type="number"
                  name="productPrice"
                  onChange={handleChange}
                  placeholder="2500"
                  className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-amber-500 outline-none transition-all bg-slate-50/50 rounded-t-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="productQuantity"
                  defaultValue="1"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-amber-500 outline-none transition-all bg-slate-50/50 rounded-t-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Category
              </label>
              <select
                name="productCategory"
                onChange={handleChange}
                className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-amber-500 outline-none transition-all bg-slate-50/50 rounded-t-lg appearance-none"
              >
                <option value="">Select Category</option>
                {productCategory.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Description
              </label>
              <textarea
                name="productDescription"
                onChange={handleChange}
                rows="3"
                placeholder="Tell us about the craftsmanship..."
                className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-amber-500 outline-none transition-all bg-slate-50/50 rounded-t-lg resize-none"
              />
            </div>
          </div>

          <button
            disabled={loading}
            onClick={sendData}
            type="button"
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 transform active:scale-95 flex justify-center items-center gap-2 ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-[#5a3e2b] hover:bg-[#3e2b1e] hover:shadow-amber-500/20"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              "Publish Product"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
