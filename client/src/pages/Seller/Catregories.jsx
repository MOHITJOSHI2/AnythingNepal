import React, { useEffect, useState } from "react";
import Product from "../../components/Sellers/Product";
import NavBar from "../../components/Users/NavBar";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const id = localStorage.getItem("seller");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.log("id not found");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getTotalProduct`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const res = await req.json();
        if (req.ok) {
          setProducts(res.message);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);

  // filter products by category
  const artProducts = products.filter(
    (p) => p.productCategory === "Art and Artitecture"
  );
  const clothesProducts = products.filter(
    (p) => p.productCategory === "Clothes"
  );
  const potteryProducts = products.filter(
    (p) => p.productCategory === "Pottery"
  );

  return (
    <>
      <NavBar
        Contact={"Contact"}
        Products={"Products"}
        Shop={"ManageShop"}
        Signup={id ? "Categories" : "Signup/login"}
        Name={"Mohit Joshi"}
        Id={id}
        Contact1={"#footer"}
        Products1={`/products/${id}`}
        Shop1={"/shop"}
        Signup1={id ? "/categories" : "/signup-login"}
      />
      <div className="p-4 bg-white">
        {products.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        ) : (
          <>
            {/* Art and Artitecture */}
            {artProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-center mb-4">
                  Art and Artitecture
                </h2>
                <div className="flex overflow-x-auto gap-4 pb-2">
                  {artProducts.map((elem) => (
                    <Product
                      key={elem._id}
                      productId={elem._id}
                      src={elem.productImage}
                      name={elem.productName}
                      price={elem.productPrice}
                      quantity={elem.productQuantity}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Clothes */}
            {clothesProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-center mb-4">Clothes</h2>
                <div className="flex overflow-x-auto gap-4 pb-2">
                  {clothesProducts.map((elem) => (
                    <Product
                      key={elem._id}
                      productId={elem._id}
                      src={elem.productImage}
                      name={elem.productName}
                      price={elem.productPrice}
                      quantity={elem.productQuantity}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pottery */}
            {potteryProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-center mb-4">Pottery</h2>
                <div className="flex overflow-x-auto gap-4 pb-2">
                  {potteryProducts.map((elem) => (
                    <div key={elem._id} className="flex-shrink-0 w-58 mr-10">
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
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Categories;
