import React, { useState } from "react";
import NavBar from "../../components/Users/NavBar";
import ShopProfile from "../../components/Sellers/ShopProfile";
import UpdateShop from "../../components/Sellers/UpdateShop";
import OrderMessage from "../../components/Sellers/OrderMessage";
import CreateShop from "../../components/Sellers/CreateShop";

const ShopPage = () => {
  const id = localStorage.getItem("seller");
  let shopId = localStorage.getItem("shop");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!shopId) {
    useState(() => {
      async function checkShop() {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getShopBySellerId/${id}`
        );
        const res = await req.json();
        if (req.ok) {
          console.log(res.encryptedShopId);
          console.log(res.message);
          if (!localStorage.getItem("shop")) {
            localStorage.setItem("shop", res.encryptedShopId);
            shopId = localStorage.getItem("shop");
            window.location.reload();
          }
        } else {
          console.log(res.shopMessage || res.err);
        }
      }
      checkShop();
    }, []);
  }

  return (
    <div className="bg-white min-h-screen">
      {!isUpdating && (
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
      )}

      {shopId ? (
        <>
          {!isUpdating ? (
            <ShopProfile onUpdateClick={() => setIsUpdating(true)} />
          ) : (
            <UpdateShop
              id={shopId}
              onCancel={() => setIsUpdating(false)}
              onUpdated={() => setIsUpdating(false)}
            />
          )}
        </>
      ) : (
        !isUpdating && (
          <div className="flex justify-center items-start min-h-screen ">
            <CreateShop id={id} />
          </div>
        )
      )}

      {!isUpdating && <OrderMessage />}
    </div>
  );
};

export default ShopPage;
