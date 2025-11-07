import React from "react";
import cat from "../../assets/cat.png";
import CreateShop from "../../components/Sellers/CreateShop";
import NavBar from "../../components/Users/NavBar";

const ShopPage = () => {
  const id = localStorage.getItem("seller");

  return (
    <div className="bg-white">
      <div>
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
      </div>
      <div className="flex justify-center items-start min-h-screen ">
        <CreateShop />
      </div>
    </div>
  );
};

export default ShopPage;
