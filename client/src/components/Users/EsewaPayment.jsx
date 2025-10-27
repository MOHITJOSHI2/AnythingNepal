import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cryptojs from "crypto-js";

const EsewaPayment = () => {
  const [formData, setFormData] = useState({
    amount: "100",
    tax_amount: "5",
    total_amount: "105",
    transaction_uuid: uuidv4(),
    product_code: "EPAYTEST",
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: "http://localhost:5173/",
    failure_url: "http://localhost:5173/pages/users/userLogin",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  // Create Signature
  const CreateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const cryptoHashString = Cryptojs.HmacSHA256(hashString, secret);
    const bit64String = Cryptojs.enc.Base64.stringify(cryptoHashString);
    return bit64String;
  };

  //UseEffect
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const bit64 = CreateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );
    setFormData({ ...formData, signature: bit64 });
    console.log(bit64);
  }, [formData.amount]);
  return (
    <div>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <input
          type="hidden"
          id="amount"
          name="amount"
          value={formData.amount}
          required
        />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value={formData.tax_amount}
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={formData.total_amount}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={formData.transaction_uuid}
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value={formData.product_code}
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value={formData.product_service_charge}
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value={formData.product_delivery_charge}
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value={formData.success_url}
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value={formData.failure_url}
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value={formData.signed_field_names}
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={formData.signature}
          required
        />
        <input value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default EsewaPayment;
