import React, { useEffect, useState } from "react";
import Product from "../../components/Users/Product";
import NavBar from "../../components/Users/NavBar";
import { useNavigate } from "react-router-dom";

const CategoriesProduct = () => {
  const [products, setProducts] = useState([]);
  const id = localStorage.getItem("user");
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
        Messages={"Messages"}
        Signup={"Categories"}
        Id={id}
      />
      <div className="p-4">
        {products.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        ) : (
          <>
            {/* Art and Artitecture */}
            {artProducts.length > 0 && (
              <div className="mb-10 px-10">
                <h2
                  className="cursor-pointer text-2xl font-bold text-center mb-4"
                  onClick={() =>
                    navigate(`/getSingleCategory/${"Art and Architecture"}`)
                  }
                >
                  Art and Artitecture
                </h2>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-9">
                  {artProducts.map((elem) => (
                    <div className="flex-shrink-0">
                      <Product
                        key={elem._id}
                        productId={elem._id}
                        src={elem.productImage}
                        name={elem.productName}
                        price={elem.productPrice}
                        quantity={elem.productQuantity}
                        shop={elem.shop}
                        id={id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clothes */}
            {clothesProducts.length > 0 && (
              <div className="mb-10 px-10">
                <h2
                  className="cursor-pointer text-2xl font-bold text-center mb-4"
                  onClick={() => navigate(`/getSingleCategory/${"Clothes"}`)}
                >
                  Clothes
                </h2>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-9">
                  {clothesProducts.map((elem) => (
                    <div className="flex-shrink-0">
                      <Product
                        key={elem._id}
                        productId={elem._id}
                        src={elem.productImage}
                        name={elem.productName}
                        price={elem.productPrice}
                        quantity={elem.productQuantity}
                        shop={elem.shop}
                        id={id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pottery */}
            {potteryProducts.length > 0 && (
              <div className="mb-10 px-10">
                <h2
                  className="cursor-pointer text-2xl font-bold text-center mb-4"
                  onClick={() => navigate(`/getSingleCategory/${"Pottery"}`)}
                >
                  Pottery
                </h2>
                <div className="flex overflow-x-auto gap-4 pb-9">
                  {potteryProducts.map((elem) => (
                    <div key={elem._id} className="flex-shrink-0">
                      <Product
                        productId={elem._id}
                        src={elem.productImage}
                        name={elem.productName}
                        price={elem.productPrice}
                        quantity={elem.productQuantity}
                        shop={elem.shop}
                        id={id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clothes */}
            {HandiCraft.length > 0 && (
              <div className="mb-10 px-10">
                <h2
                  className="cursor-pointer text-2xl font-bold text-center mb-4"
                  onClick={() => navigate(`/getSingleCategory/${"HandiCraft"}`)}
                >
                  HandiCraft
                </h2>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-9">
                  {HandiCraft.map((elem) => (
                    <div className="flex-shrink-0">
                      <Product
                        key={elem._id}
                        productId={elem._id}
                        src={elem.productImage}
                        name={elem.productName}
                        price={elem.productPrice}
                        quantity={elem.productQuantity}
                        shop={elem.shop}
                        id={id}
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

export default CategoriesProduct;
