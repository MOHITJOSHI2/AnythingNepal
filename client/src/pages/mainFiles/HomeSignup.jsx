import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeAuth = () => {
  const [showSignup, setShowSignup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("seller")) {
      navigate(`/adminHomePage/${localStorage.getItem("seller")}`);
    } else if (localStorage.getItem("user")) {
      navigate(`/userHomePage/${localStorage.getItem("user")}`);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#f7f1e3] to-[#eaddcf] border border-[#d4a373] rounded-2xl shadow-[0_10px_30px_rgba(90,62,43,0.3)] p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#5a3e2b] drop-shadow-sm">
          {showSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-[#8b3e2f] mt-1">
          {showSignup ? "Signup with AnythingNepal" : "Login to AnythingNepal"}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col space-y-4">
          {showSignup ? (
            <>
              <button
                className="w-full py-3 bg-gradient-to-r from-[#d67d3e] via-[#b3541e] to-[#8b3e2f] text-white font-semibold rounded-lg shadow-[0_5px_15px_rgba(214,125,62,0.4)] hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/pages/users/userSignup")}
              >
                Signup as a User
              </button>
              <button
                className="w-full py-3 bg-gradient-to-r from-[#b3541e] via-[#8b3e2f] to-[#5a3e2b] text-white font-semibold rounded-lg shadow-[0_5px_15px_rgba(139,62,47,0.4)] hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/pages/sellers/sellerSignup")}
              >
                Signup as an Seller
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full py-3 bg-gradient-to-r from-[#d67d3e] via-[#b3541e] to-[#8b3e2f] text-white font-semibold rounded-lg shadow-[0_5px_15px_rgba(214,125,62,0.4)] hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/pages/users/userLogin")}
              >
                Login as a User
              </button>
              <button
                className="w-full py-3 bg-gradient-to-r from-[#b3541e] via-[#8b3e2f] to-[#5a3e2b] text-white font-semibold rounded-lg shadow-[0_5px_15px_rgba(139,62,47,0.4)] hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/pages/sellers/sellerLogin")}
              >
                Login as an Seller
              </button>
            </>
          )}
        </div>

        {/* Switch between Signup & Login */}
        <p className="text-center text-sm text-[#5a3e2b] mt-6">
          {showSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setShowSignup(false)}
                className="text-[#8b3e2f] font-medium hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setShowSignup(true)}
                className="text-[#8b3e2f] font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default HomeAuth;
