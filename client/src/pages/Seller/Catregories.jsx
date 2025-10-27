import React, { useEffect, useState } from "react";
import Product from "../../components/Users/Product";

const Catregories = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const req = await fetch(
          "http://192.168.1.72:8000/seller/getTotalProduct",
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

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">Loading...</div>
      ) : (
        products.map((elem) =>
          elem.productCategory == "Art and Artitecture" ? (
            <div className="text-center text-bold">
              <p>Art and Artitecture</p>
              <Product
                productId={elem._id}
                src={elem.productImage}
                name={elem.productName}
                price={elem.productPrice}
              />
            </div>
          ) : elem.productCategory == "Clothes" ? (
            <div className="text-center text-bold">
              <p>Clothes</p>
              <Product
                productId={elem._id}
                src={elem.productImage}
                name={elem.productName}
                price={elem.productPrice}
              />
            </div>
          ) : elem.productCategory == "Pottery" ? (
            <div className="text-center text-bold">
              <p>Pottery</p>
              <Product
                productId={elem._id}
                src={elem.productImage}
                name={elem.productName}
                price={elem.productPrice}
              />
            </div>
          ) : (
            ""
          )
        )
      )}
    </div>
  );
};

export default Catregories;
