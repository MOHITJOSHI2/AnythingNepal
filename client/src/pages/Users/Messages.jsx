import React, { useEffect, useState } from "react";
import NavBar from "../../components/Users/NavBar";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const id = localStorage.getItem("user");
  const [orderDetails, setOrderDetails] = useState([]);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMessages() {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/user/getPayment?u=${id}`,
          { method: "GET" }
        );
        const res = await req.json();
        if (req.ok) {
          setOrderDetails(res.userPaymentData);

          const req1 = await fetch(
            `${import.meta.env.VITE_localhost}/user/payedProducts`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: res.userPaymentData }),
            }
          );

          const res1 = await req1.json();
          if (req1.ok) {
            console.log(res1.message);
            setProductData(res1.message);
          } else {
            console.log(res1.err);
          }
        } else {
          console.log(res.err);
        }
      } catch (error) {
        console.log("Error at getMessages: ", error);
      }
    }
    getMessages();
  }, [id]);

  const calculateDeliveryDate = (date, time) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + time);
    return newDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="mb-4 shadow-sm bg-white">
        <NavBar
          Contact="Contact"
          Products="Products"
          Messages="Messages"
          Signup="Categories"
          Id={id}
          Shop1="/shop"
        />
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Your Notifications
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {orderDetails ? (
              orderDetails.map((elem, index) => (
                <section
                  key={elem._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6"
                >
                  <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
                    Order {index + 1}
                  </h2>

                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-sm md:text-base text-gray-700">
                        The order for product{" "}
                        <span className="font-mono font-bold text-red-500 break-all">
                          {elem._id}
                        </span>{" "}
                        is received.
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <p className="text-sm md:text-base text-gray-700">
                        Your Payment for{" "}
                        <span className="font-bold text-green-600">
                          Rs. {elem.amount}
                        </span>{" "}
                        was received via eSewa.
                      </p>
                    </div>

                    <div className="mt-4 p-3 bg-gray-100 rounded text-xs md:text-sm text-gray-600">
                      <p>
                        🚀 Expected delivery:{" "}
                        <span className="font-semibold">
                          {elem.paymentTime.split(",")[0]}
                        </span>
                        {" to "}
                        <span className="font-semibold">
                          {calculateDeliveryDate(elem.paymentTime, 4)}
                        </span>
                      </p>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <p className="text-gray-500">No notifications found.</p>
            )}
          </div>

          {/* Sidebar Area (Spans 1 column) */}
          <aside className="h-fit sticky top-4">
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
                Active Orders
              </h2>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {productData.map((order, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium text-xs md:text-sm"
                    onClick={() => navigate(`/viewProduct/${order._id}`)}
                  >
                    Order {index + 1} #{order.productName}
                    <div className="w-[40%]">
                      <img
                        src={`${import.meta.env.VITE_localhost}/assets/${
                          order.productImage
                        }`}
                        alt=""
                      />
                    </div>
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Messages;
