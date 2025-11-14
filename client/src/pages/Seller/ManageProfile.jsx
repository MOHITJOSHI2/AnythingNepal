import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/Users/NavBar";

const ManageProfile = () => {
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
    async function getData() {
      if (
        id &&
        (localStorage.getItem("seller") || localStorage.getItem("user"))
      ) {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/seller/sellerData/${id}`
        );
        const res = await req.json();
        if (req.ok) {
          const response = res.getData;
          setData({
            fullName: response.fullName || "",
            phone: response.phone || "",
            gender: response.gender || "",
            panNumber: response.panNumber || "",
            district: response.district || "",
            city: response.city || "",
            address: response.address || "",
            email: response.email || "",
          });
        } else {
          console.log(res.err);
        }
      } else {
        navigate("/");
      }
    }
    getData();
  }, []);

  return (
    <>
      {/* Top Navbar */}
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

      <div className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-10">
        <div className="flex flex-col items-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl -z-10"></div>

          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-red-400 flex items-center justify-center text-4xl font-bold text-white shadow-md">
            {data.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          {/* Name + Share */}
          <div className="flex items-center gap-3 mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              {data.fullName}
            </h1>
            <button
              className="text-gray-500 hover:text-amber-600 transition"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `http://localhost:5173/static_pages/sellerProfile/${id}`
                );
              }}
            >
              <FaShareAlt size={20} />
            </button>
          </div>
          <p className="text-gray-500 mt-2">{data.email}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 max-w-5xl mx-auto mb-16">
          <div>
            <p className="text-sm text-gray-500 uppercase font-medium">
              District & City
            </p>
            <p className="text-lg font-semibold">
              {data.district}, {data.city}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase font-medium">
              Gender
            </p>
            <p className="text-lg font-semibold">{data.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase font-medium">Phone</p>
            <p className="text-lg font-semibold">{data.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase font-medium">
              PAN Number
            </p>
            <p className="text-lg font-semibold">{data.panNumber}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 uppercase font-medium">
              Address
            </p>
            <p className="text-lg font-semibold">{data.address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
            Edit Profile
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => {
              const ans = prompt("Do you really want to logout Y/N");
              if (ans && ans.toLowerCase() === "y") {
                localStorage.removeItem("seller");
                localStorage.removeItem("shop");
                navigate("/");
              } else if (ans && ans.toLowerCase() === "n") {
                return;
              } else {
                alert("Please enter y or n");
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageProfile;
