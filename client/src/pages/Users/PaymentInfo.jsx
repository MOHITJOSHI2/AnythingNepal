import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentInfo = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const hasCalledAPI = useRef(false); // Using standard useRef
  const navigate = useNavigate();

  const userId = localStorage.getItem("user");
  const encodedUrl = searchParams.get("data");

  useEffect(() => {
    if (!encodedUrl) {
      setLoading(false);
      return;
    }

    if (encodedUrl && !hasCalledAPI.current) {
      hasCalledAPI.current = true;

      try {
        const decodedUrl = atob(encodedUrl);
        const response = JSON.parse(decodedUrl);

        if (response.status === "COMPLETE") {
          setDatabaseData(response.total_amount);
        } else {
          setLoading(false); // Handle non-complete status
        }
      } catch (err) {
        console.error("Failed to parse payment data", err);
        setLoading(false);
      }
    }
  }, [encodedUrl]);

  async function setDatabaseData(amount) {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/user/savePayment?id=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount }),
        }
      );

      if (req.ok) {
        navigate(window.location.pathname, { replace: true });
        setLoading(false);
      } else {
        const res = await req.json();
        console.log(res.err);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
      {loading ? (
        <p>Verifying Payment...</p>
      ) : (
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-stone-800">
            Payment Successful!
          </h1>
          <p className="text-stone-500 mt-2">
            Your order has been placed successfully.
          </p>
          <button
            onClick={() => navigate("/showProducts")}
            className="mt-6 bg-stone-900 text-white px-8 py-3 rounded-xl"
          >
            Back to Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
