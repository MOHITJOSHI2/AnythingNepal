import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignupController from "../../controllers/sellers/SignupController";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handelData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmition = async () => {};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#f7f1e3] to-[#eaddcf] border border-[#d4a373] rounded-2xl shadow-[0_10px_30px_rgba(90,62,43,0.3)] p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#5a3e2b] drop-shadow-sm">
          Welcome Back
        </h2>
        <p className="text-center text-[#8b3e2f] mt-1">
          Login to AnythingNepal
        </p>

        {/* Email */}
        <div className="mt-6">
          <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={handelData}
            value={data.email}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-[#d4a373] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d67d3e] bg-[#fdfaf6] text-[#5a3e2b]"
          />
          <p className="text-sm text-red-500 ml-1" id="p1">
            {}
          </p>
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="block text-[#5a3e2b] text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="password"
              value={data.password}
              onChange={handelData}
              className="w-full px-4 py-2 border border-[#d4a373] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d67d3e] bg-[#fdfaf6] text-[#5a3e2b]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-[#8b3e2f] hover:text-[#d67d3e]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="text-sm text-red-500 ml-1" id="p2"></p>
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-between items-center mt-3 text-sm">
          <a href="/forgot-password" className="text-[#8b3e2f] hover:underline">
            Forgot Password?
          </a>
          <a href="/signup" className="text-[#8b3e2f] hover:underline">
            Sign Up
          </a>
        </div>

        {/* Login Button */}
        <button
          type="button"
          className="mt-6 w-full py-2.5 bg-gradient-to-r from-[#d67d3e] via-[#b3541e] to-[#8b3e2f] text-white font-semibold rounded-lg shadow-[0_5px_15px_rgba(214,125,62,0.4)] hover:scale-105 transition-all duration-300"
          onClick={handelSubmition}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
