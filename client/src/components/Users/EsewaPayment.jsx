import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cryptojs from "crypto-js";

const EsewaPayment = ({ amount, productData }) => {
  const [transactionId] = useState(uuidv4());
  const [signature, setSignature] = useState("");

  const product_code = "EPAYTEST";
  const secret = "8gBm/:&EnhH.1/q";
  // Calculate amounts
  const product_delivery_charge = 100;
  const tax_amount = amount * 0.13;
  const total_amount = amount + tax_amount + product_delivery_charge;

  useEffect(() => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transactionId},product_code=${product_code}`;

    const cryptoHashString = Cryptojs.HmacSHA256(hashString, secret);
    const bit64String = Cryptojs.enc.Base64.stringify(cryptoHashString);

    setSignature(bit64String);
  }, [amount, transactionId]);

  return (
    <div className="w-full bg-white p-8 rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center">
      {/* Security Badge */}
      <div className="flex items-center gap-2 mb-6 bg-green-50 px-4 py-1.5 rounded-full">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">
          Secure eSewa Gateway
        </span>
      </div>

      <div className="text-center mb-8">
        <p className="text-stone-500 text-sm uppercase tracking-tighter mb-1">
          Final Payable Amount
        </p>
        <h2 className="text-4xl font-black text-stone-900">
          <span className="text-lg font-normal mr-1 text-stone-500">Rs.</span>
          {total_amount.toLocaleString()}
        </h2>
      </div>

      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="w-full"
      >
        <input type="hidden" name="amount" value={amount} required />
        <input type="hidden" name="tax_amount" value={tax_amount} required />
        <input
          type="hidden"
          name="total_amount"
          value={total_amount}
          required
        />
        <input
          type="hidden"
          name="transaction_uuid"
          value={transactionId}
          required
        />
        <input
          type="hidden"
          name="product_code"
          value={product_code}
          required
        />
        <input type="hidden" name="product_service_charge" value="0" required />
        <input
          type="hidden"
          name="product_delivery_charge"
          value={product_delivery_charge}
          required
        />
        <input
          type="hidden"
          name="success_url"
          value="http://localhost:5173/paymentInfo"
          required
        />
        <input
          type="hidden"
          name="failure_url"
          value="http://localhost:5173/cart"
          required
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input type="hidden" name="signature" value={signature} />

        {signature ? (
          <button
            type="submit"
            className="group relative w-full bg-[#60bb46] hover:bg-[#52a03c] text-white py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] shadow-lg shadow-green-200 overflow-hidden"
          >
            <div className="flex items-center justify-center gap-3">
              {/* Simple eSewa-style icon placeholder */}
              <span className="bg-white text-[#60bb46] px-2 py-0.5 rounded text-xs font-black">
                e
              </span>
              <span>Pay with eSewa</span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
        ) : (
          <div className="w-full bg-stone-100 py-4 rounded-2xl flex items-center justify-center gap-3 text-stone-400 font-medium italic">
            <svg
              className="animate-spin h-5 w-5 text-stone-400"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Securing Transaction...
          </div>
        )}
      </form>

      <p className="mt-6 text-[11px] text-stone-400 text-center leading-relaxed">
        By clicking above, you will be redirected to the official <br />
        <span className="font-bold text-stone-500 text-xs">
          eSewa ePay
        </span>{" "}
        portal to complete your purchase.
      </p>
    </div>
  );
};

export default EsewaPayment;
