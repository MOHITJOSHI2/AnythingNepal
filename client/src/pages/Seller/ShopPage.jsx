import React, { useEffect, useState } from "react";
import NavBar from "../../components/Sellers/NavBar";
import ShopProfile from "../../components/Sellers/ShopProfile";
import UpdateShop from "../../components/Sellers/UpdateShop";
import OrderMessage from "../../components/Sellers/OrderMessage";
import CreateShop from "../../components/Sellers/CreateShop";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const id = localStorage.getItem("seller");
  let shopId = localStorage.getItem("shop");
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    if (!shopId) {
      async function checkShop() {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/getShopBySellerId/${id}`
        );
        const res = await req.json();

        if (req.ok) {
          if (!localStorage.getItem("shop")) {
            localStorage.setItem("shop", res.encryptedShopId);
            window.location.reload();
          }
        } else {
          console.log(res.shopMessage || res.err);
        }
      }
      checkShop();
    }
  }, []);

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
          Products1={`/products/${id}`}
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
          <div className="flex justify-center w-full items-start min-h-screen ">
            <CreateShop id={id} />
          </div>
        )
      )}

      {!isUpdating && <OrderMessage />}
    </div>
  );
};

export default ShopPage;
