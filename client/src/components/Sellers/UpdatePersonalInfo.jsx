import React, { useState } from "react";
import SignupController from "../../controllers/sellers/SignupController";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UpdatePersonalInfo = ({ id, onUpdate, onCancel }) => {
  const kathmanduValleyMunicipalities = {
    kathmandu: [
      "Kathmandu Metropolitan City",
      "Kageshwori Manohara Municipality",
      "Gokarneshwor Municipality",
      "Budhanilkantha Municipality",
      "Tokha Municipality",
      "Nagarjun Municipality",
      "Tarakeshwar Municipality",
      "Chandragiri Municipality",
      "Dakshinkali Municipality",
      "Shankharapur Municipality",
    ],
    lalitpur: [
      "Lalitpur Metropolitan City",
      "Mahalaxmi Municipality",
      "Godawari Municipality",
      "Konjyosom Rural Municipality",
      "Bagmati Rural Municipality",
    ],
    bhaktapur: [
      "Bhaktapur Municipality",
      "Madhyapur Thimi Municipality",
      "Changunarayan Municipality",
      "Suryabinayak Municipality",
    ],
  };

  const [data, setData] = useState({
    fullName: "",
    phone: "",
    district: "",
    city: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [majorErr, setMajorErr] = useState({
    emailErr: "",
    phoneErr: "",
  });
  const [errors, setErrors] = useState({});
  const [district, setDistrict] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useState(() => {
    async function getData() {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/seller/sellerData/${id}`
      );

      const res = await req.json();
      if (req.ok) {
        setDistrict(res.getData.district);
        setData({
          fullName: res.getData.fullName,
          phone: res.getData.phone,
          district: res.getData.district,
          city: res.getData.city,
          address: res.getData.address,
          email: res.getData.email,
          password: res.getData.password,
        });
      }
    }
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelUpdate = async () => {
    const response = SignupController.HandleCorrections3(data);
    setErrors(response);

    if (Object.keys(response).length === 0) {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/seller/updateSeller/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const res = await req.json();
      if (req.ok) {
        console.log(res.message);
        onUpdate();
      } else {
        if (res.emailErr) {
          setMajorErr({ emailErr: res.emailErr });
        }
        if (res.phoneErr) {
          setMajorErr({ phoneErr: res.phoneErr });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ea] flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border border-[#e6dcc8] p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#5a3e2b] mb-8 text-center">
          Update Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-[#d7b892] rounded-lg bg-[#fdfaf6]
                         focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
            <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="9800000000"
              className="w-full px-4 py-2 border border-[#d7b892] rounded-lg bg-[#fdfaf6]
                         focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
            <p className="text-sm text-red-500 mt-1">
              {errors.phoneErr ? errors.phoneErr : majorErr.phoneErr}
            </p>
          </div>

          {/* District */}
          <div>
            <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
              District
            </label>
            <select
              name="district"
              value={data.district}
              onChange={(e) => {
                handleChange(e);
                setDistrict(e.target.value);
                setData((prev) => ({ ...prev, city: "" }));
              }}
              className="w-full px-4 py-2 border border-[#d7b892] rounded-lg bg-[#fdfaf6]
                         focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            >
              <option value="">-- Select District --</option>
              <option value="kathmandu">Kathmandu</option>
              <option value="lalitpur">Lalitpur</option>
              <option value="bhaktapur">Bhaktapur</option>
            </select>
            <p className="text-sm text-red-500 mt-1">{errors.district}</p>
          </div>

          {/* City */}
          <div>
            <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
              City
            </label>
            <select
              name="city"
              value={data.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#d7b892] rounded-lg bg-[#fdfaf6]
                         focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            >
              <option value="">-- Select City --</option>
              {district &&
                kathmanduValleyMunicipalities[district]?.map((elem, i) => (
                  <option key={i} value={elem}>
                    {elem}
                  </option>
                ))}
            </select>
            <p className="text-sm text-red-500 mt-1">{errors.city}</p>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="House No, Street, Area"
              className="w-full px-4 py-2 border border-[#d7b892] rounded-lg bg-[#fdfaf6]
                         focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
            <p className="text-sm text-red-500 mt-1">{errors.address}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-[#d7b892] rounded-lg bg-[#fdfaf6]
                         focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
            <p className="text-sm text-red-500 mt-1">
              {errors.emailErr ? errors.emailErr : majorErr.emailErr}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
                value={data.password}
                name="password"
                className="w-full px-4 py-2 border border-[#d4a373] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d67d3e] bg-[#fdfaf6] text-[#5a3e2b]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-[#8b3e2f] hover:text-[#d67d3e]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={onCancel}
            className="px-8 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-700 
                       font-semibold shadow-sm hover:shadow-md transition"
          >
            Cancel
          </button>

          <button
            onClick={handelUpdate}
            className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white
                       font-semibold shadow-sm hover:shadow-md transition"
          >
            Update Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePersonalInfo;
