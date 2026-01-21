import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaShareAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/Users/NavBar";
import UpdatePersonalInfo from "../../components/Sellers/UpdatePersonalInfo";

const UserProfile = () => {
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
    age: "",
    district: "",
    city: "",
    address: "",
    email: "",
  });

  const handlePassword = async () => {
    const new_string = `${id}^${password.password}`;
    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/user/checkUser/${new_string}`
      );
      const res = await req.json();
      if (req.ok && res.message) {
        setLoading(false);
        setUpdating(true);
        setPassword({ password: "" });
      } else {
        document.getElementById("passwordErr").innerText =
          "Password doesn't match";
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function getData() {
      if (id && localStorage.getItem("user")) {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/user/getUserData/${id}`
        );
        const res = await req.json();
        if (req.ok) {
          const response = res.message;
          setData({
            fullName: response.fullName || "",
            phone: response.phone || "",
            gender: response.gender || "",
            age: response.age || "",
            district: response.district || "",
            city: response.city || "",
            address: response.address || "",
            email: response.email || "",
          });
        }
      } else {
        navigate("/");
      }
    }
    getData();
  }, [id, navigate]);

  // Verification UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-6 text-center">
            <h2 className="text-xl font-bold text-white">
              Security Verification
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Please enter your password to edit your profile
            </p>
          </div>
          <div className="p-8">
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword({ password: e.target.value })}
                value={password.password}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-indigo-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <p
                id="passwordErr"
                className="text-xs text-red-500 mt-2 absolute"
              ></p>
            </div>
            <div className="flex gap-3 mt-10">
              <button
                onClick={() => setLoading(false)}
                className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePassword}
                className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar
        Id={id}
        Contact="Contact"
        Products="Products"
        Messages="Messages"
        Signup="Categories"
      />

      <main className="max-w-5xl mx-auto px-4 py-12">
        {!updating ? (
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 overflow-hidden">
            {/* Header Section */}
            <div className="relative h-48 bg-gradient-to-r from-slate-800 to-slate-900">
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
                <div className="w-32 h-32 rounded-3xl bg-indigo-600 border-4 border-white flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                  {data.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              </div>
            </div>

            <div className="pt-20 pb-10 px-8 md:px-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                      {data.fullName}
                    </h1>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `http://localhost:5173/static_pages/sellerProfile/${id}`
                        );
                        alert("Link copied!");
                      }}
                      className="p-2 rounded-full hover:bg-indigo-50 text-indigo-500 transition-colors"
                    >
                      <FaShareAlt size={18} />
                    </button>
                  </div>
                  <p className="flex items-center gap-2 text-slate-500 mt-1">
                    <FaEnvelope className="text-sm" /> {data.email}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setLoading(true)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?")) {
                        localStorage.clear();
                        navigate("/");
                      }
                    }}
                    className="px-6 py-3 bg-white border border-red-100 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Stats/Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                <InfoCard
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={`${data.district}, ${data.city}`}
                />
                <InfoCard
                  icon={<FaPhone />}
                  label="Phone Number"
                  value={data.phone}
                />
                <InfoCard
                  icon={<FaUser />}
                  label="Gender"
                  value={data.gender}
                />
                <InfoCard
                  icon={<FaCalendarAlt />}
                  label="Age"
                  value={`${data.age} Years`}
                />
                <div className="md:col-span-2">
                  <InfoCard
                    icon={<FaMapMarkerAlt />}
                    label="Detailed Address"
                    value={data.address}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <UpdatePersonalInfo
              id={id}
              onCancel={() => setUpdating(false)}
              onUpdate={() => setUpdating(false)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
    <div className="text-indigo-500 bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-all">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-slate-700 font-semibold">{value || "Not specified"}</p>
    </div>
  </div>
);

export default UserProfile;
