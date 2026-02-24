import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../components/Users/Product";

const IndividualCategory = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  let category = "HandiCraft";
  const id = localStorage.getItem("user");

  useEffect(() => {
    async function fetchProducts() {
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
          console.log(res.message);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);
  return (
    <div>
      <div className="flex-shrink-0">
        {products.map((elem) => (
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
        ))}
      </div>
    </div>
  );
};

export default IndividualCategory;
