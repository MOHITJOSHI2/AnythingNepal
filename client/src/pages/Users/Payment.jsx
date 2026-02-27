import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import EsewaPayment from "../../components/Users/EsewaPayment";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(false);

  const { userId, amount, productData } = location.state || {};

  useEffect(() => {
    if (!userId || !productData) {
      navigate("/showProducts");
    }
  }, [userId, productData, navigate]);

  if (!productData) return null;

  const handlePurchase = async () => {
    setPayment(true);
  };

  if (payment) {
    return <EsewaPayment amount={amount} productData={productData} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Product List */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">
            Review Your Order
          </h2>

          {productData.map((elem) => (
            <div
              key={elem._id}
              className="flex items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 flex-shrink-0 bg-stone-100 rounded-xl overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_localhost}/assets/${
                    elem.productImage
                  }`}
                  alt={elem.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow">
                <h3 className="font-semibold text-stone-800">
                  {elem.productName}
                </h3>
                <p className="text-sm text-stone-500 italic">
                  Qty: {elem.quantity || 1}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-stone-900">
                  Rs. {elem.productPrice?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Summary Card */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100 sticky top-10">
            <h2 className="text-xl font-bold text-stone-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 pb-6 border-b border-stone-100">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>Rs. {amount?.toLocaleString()}</span>
              </div>
              <div className="flex flex-col justify-between text-stone-600">
                <div className="flex flex-row justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Rs 100</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span>Tax 13%</span>
                  <span className="text-green-600">{amount * 0.13}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-6">
              <span className="text-lg font-bold text-stone-800">Total</span>
              <span className="text-2xl font-black text-stone-900 text-nowrap">
                Rs. {(amount + 100 + amount * 0.13)?.toLocaleString()}
              </span>
            </div>

            <button
              className="w-full bg-stone-900 hover:bg-black text-white py-4 rounded-2xl font-bold transition-all transform active:scale-[0.98] shadow-lg shadow-stone-200"
              onClick={handlePurchase}
            >
              Complete Purchase
            </button>

            <p className="text-[10px] text-center text-stone-400 mt-4 uppercase tracking-widest">
              Secure SSL Encrypted Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
