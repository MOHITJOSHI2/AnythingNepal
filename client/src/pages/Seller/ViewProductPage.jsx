import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    src: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // Check user type
  const isSeller = localStorage.getItem("seller");
  const isUser = localStorage.getItem("user");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getSingleProduct/${id}`
        );
        const res = await req.json();

        if (req.ok) {
          const p = res.message[0];
          setProduct({
            name: p.productName,
            src: p.productImage,
            price: p.productPrice,
            quantity: p.productQuantity,
            category: p.productCategory,
            description: p.productDescription,
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center px-4 py-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Image */}
        <div className="flex justify-center items-start">
          <img
            src={`${import.meta.env.VITE_localhost}/assets/${product.src}`}
            alt={product.name}
            className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow"
          />
        </div>

        {/* RIGHT: Product Details */}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500 mb-1">{product.category}</p>

          <p className="text-2xl font-semibold text-[#8b3e2f] mb-4">
            Rs. {product.price}
          </p>

          <p className="text-sm text-gray-600 mb-6">
            <span className="font-semibold">Available: </span>
            {product.quantity}
          </p>

          <p className="text-gray-700 leading-relaxed text-sm mb-6">
            {product.description}
          </p>

          {/* USER BUTTONS */}
          {isUser && !isSeller && (
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="px-6 py-3 bg-[#8b3e2f] text-white rounded-xl shadow-md hover:bg-[#723225] transition-all font-semibold">
                Add to Cart
              </button>

              <button className="px-6 py-3 bg-black text-white rounded-xl shadow-md hover:bg-gray-900 transition-all font-semibold">
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mt-10 w-fit px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewProductPage;
