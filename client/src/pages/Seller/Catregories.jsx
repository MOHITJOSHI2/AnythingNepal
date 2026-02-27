import React, { useEffect, useState } from "react";
import Product from "../../components/Sellers/Product";
import NavBar from "../../components/Sellers/NavBar";
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
    (p) => p.productCategory === "Art and Architecture"
  );
  const clothesProducts = products.filter(
    (p) => p.productCategory === "Clothes"
  );
  const potteryProducts = products.filter(
    (p) => p.productCategory === "Pottery"
  );
  const HandiCraft = products.filter((p) => p.productCategory == "HandiCraft");
  return (
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
      <div className="p-4 bg-white">
        {products.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        ) : (
          <>
            {/* Art and Artitecture */}
            {artProducts.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold text-center mb-4"
                  onClick={() =>
                    navigate(`/individualCategory/${"Art and Architecture"}`)
                  }
                >
                  Art and Artitecture
                </h2>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2">
                  {artProducts.map((elem) => (
                    <div className="flex-shrink-0">
                      <Product
                        key={elem._id}
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

            {/* Clothes */}
            {clothesProducts.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold text-center mb-4"
                  onClick={() => navigate(`/individualCategory/${"Clothes"}`)}
                >
                  Clothes
                </h2>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2">
                  {clothesProducts.map((elem) => (
                    <div className="flex-shrink-0">
                      <Product
                        key={elem._id}
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

            {/* Pottery */}
            {potteryProducts.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold text-center mb-4"
                  onClick={() => navigate(`/individualCategory/${"Pottery"}`)}
                >
                  Pottery
                </h2>
                <div className="flex overflow-x-auto gap-4 pb-2">
                  {potteryProducts.map((elem) => (
                    <div key={elem._id} className="flex-shrink-0">
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

            {/* Clothes */}
            {HandiCraft.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold text-center mb-4"
                  onClick={() =>
                    navigate(`/individualCategory/${"HandiCraft"}`)
                  }
                >
                  HandiCraft
                </h2>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2">
                  {HandiCraft.map((elem) => (
                    <div className="flex-shrink-0">
                      <Product
                        key={elem._id}
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
