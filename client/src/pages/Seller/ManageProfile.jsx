import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaShareAlt,
  FaMapMarkerAlt,
  FaIdCard,
  FaUser,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/Sellers/NavBar";
import UpdatePersonalInfo from "../../components/Sellers/UpdatePersonalInfo";

const ManageProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({ password: "" });
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
      if (id && localStorage.getItem("seller")) {
        try {
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
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        navigate("/");
      }
    }
    getData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBFA] p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <FaLock size={24} />
            </div>
            <h2 className="text-xl font-bold">Security Check</h2>
            <p className="text-amber-50 text-sm mt-1">
              Please verify your password to continue
            </p>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword({ password: e.target.value })}
                  value={password.password}
                  className="w-full px-5 py-3 border-2 border-orange-50 rounded-xl focus:border-amber-400 focus:outline-none transition-all bg-orange-50/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-amber-700 opacity-60 hover:opacity-100"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p
                className="text-xs text-red-500 font-medium h-2"
                id="passwordErr"
              ></p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setLoading(false)}
                  className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (password.password === data.password) {
                      setLoading(false);
                      setUpdating(true);
                      setPassword({ password: "" });
                    } else {
                      document.getElementById("passwordErr").innerText =
                        "Password doesn't match";
                    }
                  }}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-200 transition-all active:scale-95"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBFA]">
      {!updating ? (
        <>
          <NavBar
            Contact="Contact"
            Products="Products"
            Shop="ManageShop"
            Signup={id ? "Categories" : "Signup/login"}
            Name={data.fullName || "Seller"}
            Id={id}
            Products1={`/products/${id}`}
            Signup1={id ? "/categories" : "/signup-login"}
          />

          <main className="max-w-6xl mx-auto px-6 py-12">
            {/* Profile Header Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-orange-100 overflow-hidden mb-10">
              <div className="h-40 bg-gradient-to-r from-amber-100 via-orange-50 to-rose-100 relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              </div>

              <div className="px-10 pb-10">
                <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 gap-6 text-center md:text-left">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 border-4 border-white flex items-center justify-center text-4xl font-black text-white shadow-xl transform hover:rotate-3 transition-transform">
                    {data.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div className="flex-1 mb-2">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                        {data.fullName}
                      </h1>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `http://localhost:5173/static_pages/sellerProfile/${id}`
                          );
                          alert("Profile link copied!");
                        }}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                      >
                        <FaShareAlt size={18} />
                      </button>
                    </div>
                    <p className="text-gray-500 font-medium">{data.email}</p>
                  </div>

                  <div className="flex gap-3 mb-2">
                    <button
                      onClick={() => setLoading(true)}
                      className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-95"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Logout of your merchant account?")) {
                          localStorage.clear();
                          navigate("/");
                        }
                      }}
                      className="px-8 py-3 bg-white border-2 border-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailCard
                icon={<FaMapMarkerAlt />}
                label="District & City"
                value={`${data.district}, ${data.city}`}
              />
              <DetailCard
                icon={<FaUser />}
                label="Gender"
                value={data.gender}
              />
              <DetailCard
                icon={<FaPhone />}
                label="Contact Phone"
                value={data.phone}
              />
              <DetailCard
                icon={<FaIdCard />}
                label="Merchant PAN"
                value={data.panNumber}
              />
              <div className="md:col-span-2">
                <DetailCard
                  icon={<FaMapMarkerAlt />}
                  label="Registered Shop Address"
                  value={data.address}
                  isFull
                />
              </div>
            </div>
          </main>
        </>
      ) : (
        <div className="p-6 md:p-12 max-w-4xl mx-auto">
          <button
            onClick={() => setUpdating(false)}
            className="mb-8 text-amber-700 font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
          >
            ← Back to Dashboard
          </button>
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-orange-50">
            <UpdatePersonalInfo
              id={id}
              onCancel={() => setUpdating(false)}
              onUpdate={() => setUpdating(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Component for Info Cards
const DetailCard = ({ icon, label, value, isFull }) => (
  <div
    className={`bg-white p-6 rounded-3xl border border-orange-50 hover:border-amber-200 transition-all group ${
      isFull ? "h-full" : ""
    }`}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
          {label}
        </p>
        <p className="text-gray-800 font-bold text-lg leading-tight mt-0.5">
          {value || "Not Set"}
        </p>
      </div>
    </div>
  </div>
);

export default ManageProfile;
