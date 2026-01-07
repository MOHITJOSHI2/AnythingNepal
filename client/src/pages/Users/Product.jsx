import React, { useEffect, useState } from "react";
import ProductBox from "../../components/Users/Product";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/Users/NavBar";

const Product = () => {
  const [productsName, setProductsName] = useState([]);
  const [products, setProducts] = useState([]);
  const id = localStorage.getItem("user");

  const location = useLocation();
  const searchParamenter = new URLSearchParams(location.search);
  const search = searchParamenter.get("query");

  useEffect(() => {
    async function getSearchData() {
      if (!search) {
        setProductsName([]);
      }

      const req = await fetch(
        `${
          import.meta.env.VITE_localhost
        }/user/getProductSearch?query=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await req.json();
      if (req.ok) {
        setProductsName(res.data);
      } else {
        console.log(res.err);
      }
    }
    if (search) {
      getSearchData();
    }
  }, [search]);

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
          console.log(res.message);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    if (search == null) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (!id) {
      console.log("No id");
    }
  }, []);

  return (
    <>
      <NavBar
        Contact={"Contact"}
        Products={"Products"}
        Messages={"Messages"}
        Signup={"Categories"}
      />
      <div className="min-h-screen w-full bg-[#EBF4DD] py-10 px-4">
        <div
          className="
        max-w-7xl mx-auto 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-5
      "
        >
          {productsName.length > 0
            ? productsName?.map((elem) => (
                <ProductBox
                  name={elem.item.productName}
                  price={elem.item.productPrice}
                  productId={elem.item._id}
                  quantity={elem.item.productQuantity}
                  key={elem.item._id}
                  src={elem.item.productImage}
                  shop={elem.item.shop}
                  id={id}
                />
              ))
            : products?.map((elem) => (
                <ProductBox
                  name={elem.productName}
                  price={elem.productPrice}
                  productId={elem._id}
                  quantity={elem.productQuantity}
                  key={elem._id}
                  src={elem.productImage}
                  shop={elem.shop}
                  id={id}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Product;
