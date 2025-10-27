import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const SellerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    gender: "",
    panNumber: "",
    district: "",
    city: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      async function getData() {
        const req = await fetch(
          `http://192.168.1.72:8000/seller/sellerData/${id}`
        );
        const res = await req.json();
        if (req.ok) {
          const response = res.getData;
          setData((prev) => ({
            ...prev,
            fullName: response.fullName || "",
            phone: response.phone || "",
            gender: response.gender || "",
            panNumber: response.panNumber || "",
            district: response.district || "",
            city: response.city || "",
            address: response.address || "",
            email: response.email || "",
          }));
        } else {
          console.log(res.err);
        }
      }
      getData();
    } else {
      alert("No id found");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-100 to-red-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2 mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700">
            {data.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          {/* Name + Share Icon */}
          <div className="flex items-center gap-2">
            <p className="text-2xl md:text-3xl font-extrabold text-gray-800">
              {data.fullName}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700">
          <div>
            <p className="font-semibold">District, City</p>
            <p>
              {data.district}
              {", "}
              {data.city}
            </p>
          </div>
          <div>
            <p className="font-semibold">Gender</p>
            <p>{data.gender}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-semibold">Email</p>
            <p>{data.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone</p>
            <p>{data.phone}</p>
          </div>
          <div>
            <p className="font-semibold">PAN Number</p>
            <p>{data.panNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
