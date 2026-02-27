import React, { useEffect, useState } from "react";
import NavBar from "../../components/Sellers/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/Sellers/Product";
import { FiArrowLeft } from "react-icons/fi";

const IndCategory = () => {
  const id = localStorage.getItem("seller");
  let { category } = useParams();

  if (category.includes("Art")) category = "Art and Architecture";

  const navigate = useNavigate();
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const req = await fetch(
          `${
            import.meta.env.VITE_localhost
          }/user/getSingleCategory?category=${category}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const res = await req.json();
        if (req.ok) {
          setProducts(res.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav>
        <NavBar
          Shop={"ManageShop"}
          Products={"Products"}
          Signup={"Categories"}
          Contact={"Contacts"}
          Id={id}
          Products1={`/products/${id}`}
          Signup1={"/categories"}
        />
      </nav>

      <div className="w-full mx-auto px-6 pt-28 pb-10 flex flex-col gap-6">
        <h1 className=" text-center text-2xl font-bold text-gray-800 capitalize">
          {category}
        </h1>
        <div className="flex items-center ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-all font-semibold text-gray-700 shadow-sm"
          >
            <FiArrowLeft /> Back
          </button>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {product.map((elem) => (
            <div key={elem._id} className="flex justify-center">
              <Product
                productId={elem._id}
                src={elem.productImage}
                name={elem.productName}
                price={elem.productPrice}
                quantity={elem.productQuantity}
              />
            </div>
          ))}
        </div>

        {!loading && product.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default IndCategory;
