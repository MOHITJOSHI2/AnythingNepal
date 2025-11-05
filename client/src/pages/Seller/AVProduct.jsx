import React, { useEffect, useState } from "react";
import Product from "../../components/Sellers/Product";
import AddProduct from "../../components/Sellers/AddProduct";
import { useNavigate, useParams } from "react-router-dom";

const AVProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      async function fetchData() {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getProduct/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await req.json();
        if (req.ok) {
          console.log(res.message);
          setProductData(res.message);
        }
      }
      fetchData();
    }
  }, []);
  return (
    <>
      <div className="ml-2">
        <AddProduct id={id} />
      </div>
      <div className="text-center">
        <p className="text-lg font-bold py-3 my-2 bg-amber-100 border-1 border-dotted">
          Your Current Products
        </p>
      </div>
      <div className="flex flex-wrap justify-center bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] px-2 py-2">
        {productData.map((element) => (
          <Product
            productId={element._id}
            key={element._id}
            name={element.productName}
            src={element.productImage}
            price={element.productPrice}
            quantity={element.productQuantity}
          />
        ))}
      </div>
    </>
  );
};

export default AVProduct;
