import React, { useEffect, useState } from "react";
import NavBar from "../../components/Sellers/NavBar";
import ShopProfile from "../../components/Sellers/ShopProfile";
import UpdateShop from "../../components/Sellers/UpdateShop";
import OrderMessage from "../../components/Sellers/OrderMessage";
import CreateShop from "../../components/Sellers/CreateShop";
import { useNavigate } from "react-router-dom";
import {
  FaStore,
  FaEdit,
  FaArrowLeft,
  FaExclamationCircle,
} from "react-icons/fa";

const ShopPage = () => {
  const id = localStorage.getItem("seller");
  let shopId = localStorage.getItem("shop");
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!shopId && id) {
      async function checkShop() {
        try {
          const req = await fetch(
            `${import.meta.env.VITE_localhost}/seller/getShopBySellerId/${id}`
          );
          const res = await req.json();

          if (req.ok) {
            if (!localStorage.getItem("shop")) {
              localStorage.setItem("shop", res.encryptedShopId);
              window.location.reload();
            }
          }
        } catch (err) {
          console.error("Error fetching shop:", err);
        }
      }
      checkShop();
    }
  }, [id, shopId]);

  return (
    <div className="bg-[#FFFBFA] min-h-screen">
      {/* Conditionally hide NavBar only on mobile update or keep it for context */}
      <NavBar
        Contact="Contact"
        Products="Products"
        Shop="ManageShop"
        Signup={id ? "Categories" : "Signup/login"}
        Name="Mohit Joshi"
        Id={id}
        Products1={`/products/${id}`}
        Signup1={id ? "/categories" : "/signup-login"}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {shopId ? (
          <div className="space-y-6">
            {/* Action Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                  <span className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-200">
                    <FaStore size={24} />
                  </span>
                  {isUpdating ? "Update Shop Details" : "Store Management"}
                </h1>
                <p className="text-slate-500 mt-2 font-medium ml-1">
                  {isUpdating
                    ? "Modify your business presence and settings."
                    : "Overview of your shop performance and details."}
                </p>
              </div>

              {isUpdating && (
                <button
                  onClick={() => setIsUpdating(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
                >
                  <FaArrowLeft /> Discard Changes
                </button>
              )}
            </div>

            {/* Main Content Area */}
            <div className="transition-all duration-500 ease-in-out">
              {!isUpdating ? (
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-orange-100 overflow-hidden">
                  <ShopProfile onUpdateClick={() => setIsUpdating(true)} />
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-orange-50 animate-in fade-in slide-in-from-bottom-4">
                  <UpdateShop
                    id={shopId}
                    onCancel={() => setIsUpdating(false)}
                    onUpdated={() => setIsUpdating(false)}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty State / Create Shop */
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center mb-10 max-w-md">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaExclamationCircle size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-800">
                No Shop Found
              </h2>
              <p className="text-slate-500 mt-3 font-medium">
                It looks like you haven't set up your shop yet. Start your
                business journey today!
              </p>
            </div>

            <div className="w-full max-w-4xl bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-orange-100/50 border border-orange-50">
              <CreateShop id={id} />
            </div>
          </div>
        )}

        {/* Messaging Floating Section */}
        {!isUpdating && shopId && (
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6 ml-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <h3 className="text-lg font-bold text-slate-700">
                Recent Notifications
              </h3>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 border border-white/50 shadow-inner">
              <OrderMessage />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
