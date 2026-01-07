import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaShareAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/Sellers/NavBar";
import UpdatePersonalInfo from "../../components/Sellers/UpdatePersonalInfo";
const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    phone: "",
    gender: "",
    panNumber: "",
    district: "",
    city: "",
    address: "",
    email: "",
    password: "",
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
            password: response.password || "",
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

  const handleUpdate = async () => {
    setLoading(true);
  };

  if (loading) {
    return (
      <div
        className="flex flex-col gap-4 w-[90%] m-5 p-5 
                  border border-[#e2e2e2] rounded-xl bg-white shadow-sm"
      >
        <p className="text-md font-bold text-[#4c3728] text-center">
          Please verify to edit personal data
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-[#5a3e2b] text-sm font-medium">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              value={password.password}
              name="password"
              className="w-full px-4 py-2 border border-[#c9a98d] rounded-lg
                     bg-white text-[#4b3a2e]
                     focus:outline-none focus:ring-2 focus:ring-[#d67d3e]/60"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center
                     text-[#8b3e2f] hover:text-[#d67d3e]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <span className="text-sm text-rose-600" id="passwordErr"></span>
          </div>

          {/* Centered Button */}
          <div className="flex justify-between mt-2">
            <button
              className="px-8 py-2 rounded-md text-sm font-medium text-white
                     bg-gradient-to-r from-blue-500 to-blue-700
                     hover:from-blue-600 hover:to-blue-800
                     transition-all duration-200"
              onClick={() => {
                setLoading(false);
              }}
            >
              Cancle
            </button>
            <button
              className="px-8 py-2 rounded-md text-sm font-medium text-white
                     bg-gradient-to-r from-orange-500 to-orange-700
                     hover:from-orange-600 hover:to-orange-800
                     transition-all duration-200"
              onClick={() => {
                if (password.password === data.password) {
                  setLoading(false);
                  setUpdating(true);
                  setPassword({ password: "" });
                } else {
                  document.getElementById("passwordErr").innerText =
                    "Password doesnt match";
                }
              }}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="section">
      {!updating ? (
        <>
          {/* Top Navbar */}
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
                <p className="text-sm text-gray-500 uppercase font-medium">
                  Phone
                </p>
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
              <button
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Edit Profile
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => {
                  const ans = prompt("Do you really want to logout Y/N");
                  if (ans && ans.toLowerCase() === "y") {
                    localStorage.removeItem("seller");
                    localStorage.removeItem("shop");
                    localStorage.removeItem("name");
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
      ) : (
        <UpdatePersonalInfo
          id={id}
          onCancel={() => setUpdating(false)}
          onUpdate={() => setUpdating(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
