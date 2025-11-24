import React, { useEffect, useState } from "react";
import Product from "../../components/Sellers/Product";
import AddProduct from "../../components/Sellers/AddProduct";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/Sellers/NavBar";

const AVProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const shopId = localStorage.getItem("shop");

  useEffect(() => {
    if (!localStorage.getItem("seller")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      async function fetchData() {
        if (!shopId) {
          return;
        }
        try {
          const req = await fetch(
            `${import.meta.env.VITE_localhost}/seller/getProduct/${shopId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const res = await req.json();
          if (req.ok) {
            console.log(res.message);
            setProductData(res.message);
          }
        } catch (err) {
          console.log("Error fetching products:", err);
        }
      }
      fetchData();
    }
  }, [id, navigate]);

  return (
    <>
      {shopId ? (
        <>
          <div>
            <NavBar
              Contact={"Contact"}
              Products={"Products"}
              Shop={"ManageShop"}
              Signup={id ? "Categories" : "Signup/login"}
              Name={"Mohit Joshi"}
              Id={id}
              Products1={`/products/${id}`}
              Signup1={id ? "/categories" : "/signup-login"}
            />
          </div>
          <div className="min-h-screen bg-white flex flex-col items-center py-10">
            {/* Add Product Section */}

            <div className="w-full flex justify-center">
              <div className="w-[90%] md:w-[60%] lg:w-[45%]">
                <AddProduct id={id} />
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 text-center w-full">
              <p className="inline-block px-6 py-2 bg-[#fff5e1] rounded-full text-[#5a3e2b] font-bold text-xl shadow-sm border border-[#d4a373]/50">
                Your Current Products
              </p>
            </div>

            {/* Products List */}
            <div className="flex flex-wrap justify-center gap-6 px-4 py-6 w-full bg-[#fffaf3] rounded-2xl shadow-inner border border-[#d4a373]/20 max-w-6xl">
              {productData.length > 0 ? (
                productData.map((element) => (
                  <Product
                    productId={element._id}
                    key={element._id}
                    name={element.productName}
                    src={element.productImage}
                    price={element.productPrice}
                    quantity={element.productQuantity}
                  />
                ))
              ) : (
                <p className="text-gray-600 italic text-sm py-6">
                  No products found. Add your first product above!
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <NavBar
            Contact={"Contact"}
            Products={"Products"}
            Shop={"ManageShop"}
            Signup={id ? "Categories" : "Signup/login"}
            Name={"Mohit Joshi"}
            Id={id}
            Products1={`/products/${id}`}
            Signup1={id ? "/categories" : "/signup-login"}
          />
          <div className="flex flex-col justify-center text-center text-amber-700 text-1xl font-semibold m-auto mt-20 gap-6 px-4 py-10 w-full bg-[#fffaf3] rounded-2xl shadow-inner border border-[#d4a373]/20 max-w-6xl">
            No shop is Created <br />
            please Create shop to add products
            <p>
              <span
                className="hover:underline cursor-crosshair"
                onClick={() => navigate("/shop/'")}
              >
                Click here
              </span>{" "}
              to create shop
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default AVProduct;
