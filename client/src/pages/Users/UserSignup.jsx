import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HandleCorrections1 from "../../controllers/users/SignupController";

const UserSignup = () => {
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [district, setDistrict] = useState("");
  const [step, setStep] = useState({ value: 1, text: "Personal Information" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    gender: "",
    age: "",
    district: "",
    city: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(`/userHomePage/${localStorage.getItem("user")}`);
    }
  }, []);

  // helper to update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = HandleCorrections1.HandleCorrections1(data);
    setErrors(response);
    if (response.page == 1) {
      setStep({ text: "Personal Information", value: 1 });
    } else if (response.page == 2) {
      setStep({ text: "Account Information", value: 1 });
    }

    if (Object.keys(response).length === 0) {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/user/addUser`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = req.json();
      if (req.ok) {
        console.log(res.message);
        navigate("/pages/users/userLogin");
      } else {
        if (res.emailErr) {
          setErrors({ email: res.emailErr });
          setStep({ value: 2 });
        }
        if (res.phoneErr) {
          setErrors({ phone: res.phoneErr });
          setStep({ value: 1 });
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#f7f1e3] to-[#eaddcf] border border-[#d4a373] rounded-2xl shadow-[0_10px_30px_rgba(90,62,43,0.3)] p-8">
        <h2 className="text-3xl font-bold text-center text-[#5a3e2b]">
          Signup
          <p className="p-0 m-0 font-light text-[18px]">{step.text}</p>
        </h2>

        {/* STEP 1: Personal Info */}
        {step.value === 1 && (
          <>
            <div className="mt-3">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                placeholder="full name"
                maxLength={20}
                className="w-full px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6]"
              />
              <p className="text-sm text-red-500 ml-1" id="p1">
                {errors.fullName}
              </p>
            </div>

            <div className="mt-3">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="phone number"
                maxLength={10}
                className="w-full px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6]"
              />
              <p className="text-sm text-red-500 ml-1" id="p2">
                {errors.phone}
              </p>
            </div>

            {/* Gender */}
            <div className="mt-3">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                Gender
              </label>
              <div className="flex flex-row gap-5">
                <label>
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={data.gender === "male"}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </label>
                <label>
                  Female
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={data.gender === "female"}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </label>
              </div>
              <p className="text-sm text-red-500 ml-1" id="p3">
                {errors.gender}
              </p>
            </div>

            {/* Age */}
            <div className="mt-3">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={data.age}
                onChange={handleChange}
                placeholder="age"
                className="w-full px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6]"
              />
              <p className="text-sm text-red-500 ml-1" id="p4">
                {errors.age}
              </p>
            </div>

            {/* District */}
            <div className="mt-3">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                District
              </label>
              <select
                name="district"
                value={data.district}
                onChange={(e) => {
                  handleChange(e);
                  setDistrict(e.target.value);
                  setData((prev) => ({ ...prev, city: "" })); // reset city
                }}
                className="w-full px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6]"
              >
                <option value="">--Select District--</option>
                <option value="kathmandu">Kathmandu</option>
                <option value="lalitpur">Lalitpur</option>
                <option value="bhaktapur">Bhaktapur</option>
              </select>
              <p className="text-sm text-red-500 ml-1" id="p5">
                {errors.district}
              </p>
            </div>

            {/* City */}
            <div className="mt-3">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                City
              </label>
              <select
                name="city"
                value={data.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6]"
              >
                <option value="">--Select City--</option>
                {district &&
                  kathmanduValleyMunicipalities[district]?.map(
                    (elem, index) => (
                      <option key={index} value={elem}>
                        {elem}
                      </option>
                    )
                  )}
              </select>
              <p className="text-sm text-red-500 ml-1" id="p6">
                {errors.city}
              </p>
            </div>

            {/* Address */}
            <div className="mt-3">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                placeholder="address"
                maxLength={35}
                className="w-full px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6]"
              />
              <p className="text-sm text-red-500 ml-1" id="p7">
                {errors.address}
              </p>
            </div>

            <div className="flex justify-between mt-5">
              <button
                className="w-[30%] py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => navigate("/")}
              >
                Back
              </button>
              <button
                className="w-[30%] py-2 bg-[#8b3e2f] text-white rounded-lg"
                onClick={() => {
                  setStep({ value: 2, text: "Account Information" });
                }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 2: Account Info */}
        {step.value === 2 && (
          <>
            <div className="mt-3">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="email"
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-[#d4a373]"
                } rounded-lg bg-[#fdfaf6]`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 ml-1" id="p8">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-3 relative">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="password"
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-[#d4a373]"
                } rounded-lg bg-[#fdfaf6] pr-10`}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-[#5a3e2b]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-sm text-red-500 ml-1" id="p9">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mt-3 relative">
              <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="confirm password"
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#d4a373]"
                } rounded-lg bg-[#fdfaf6] pr-10`}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-[#5a3e2b]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 ml-1" id="p10">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-5">
              <button
                className="w-[30%] py-2 bg-gray-400 text-white rounded-lg"
                onClick={() =>
                  setStep({ value: 1, text: "Personal Information" })
                }
              >
                Back
              </button>
              <button
                className="w-[30%] py-2 bg-green-600 text-white rounded-lg"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSignup;
