import React, { useEffect, useState } from "react";
import { useParams, useNavigate, href } from "react-router-dom";

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const req = await fetch(
          `http://192.168.1.72:8000/seller/getSingleProduct/${id}`
        );
        const res = await req.json();

        if (req.ok) {
          setProduct({
            name: res.message[0].productName,
            src: res.message[0].productImage,
            price: res.message[0].productPrice,
            quantity: res.message[0].productQuantity,
            category: res.message[0].productCategory,
            description: res.message[0].productDescription,
          });
        } else {
          console.error(res.error || "Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
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

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center text-gray-700">
        <p>Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
      <div className="relative bg-white w-[90%] sm:w-[400px] p-6 rounded-2xl shadow-2xl animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          onClick={() => navigate(-1)}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-[#5a3e2b] mb-2 text-center">
          {product.name}
        </h2>
        <p className="text-sm text-[#8b3e2f] mb-1 text-center">
          {product.category}
        </p>
        <p className="text-md font-semibold text-[#8b3e2f] text-center mb-3">
          Rs. {product.price}
        </p>

        <div className="flex justify-center mb-4">
          <img
            src={`http://192.168.1.72:8000/assets/${product.src}`}
            alt={product.name}
            className="w-60 h-40 object-contain rounded-xl shadow-md"
            onClick={() =>
              (location.href = `http://192.168.1.72:8000/assets/${product.src}`)
            }
          />
        </div>

        <p className="text-sm text-gray-700 mb-3">{product.description}</p>
        <p className="text-xs text-gray-500 text-right">
          Available: {product.quantity}
        </p>
      </div>
    </div>
  );
};

export default ViewProductPage;
