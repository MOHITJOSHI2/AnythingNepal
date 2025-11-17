import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import NavBar from "../../components/Users/NavBar";

const Contact = () => {
  const [emailData, setEmailData] = useState({
    email: "",
    subject: "",
    body: "",
  });
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem("seller");
  useEffect(() => {
    if (!localStorage.getItem("seller")) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    const req = await fetch(
      `${import.meta.env.VITE_localhost}/seller/sendEmail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      }
    );

    const res = await req.json();
    if (req.ok) {
      alert("Your email has been sent successfully!");
      setEmailData({ email: "", subject: "", body: "" });
      setLoading(true);
    } else {
      console.log("Error occurecd", res.err);
      alert("Sorry cannot send email at the moment");
      setLoading(true);
    }
  };

  if (!loading) {
    return (
      <div className="text-3xl text-gray-800 text-center">
        Sending Email.....
      </div>
    );
  }

  return (
    <>
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

      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#fff7e6] to-[#ffe9c7] px-4 py-10 sm:px-6 md:px-10">
        <div className="bg-white/90 backdrop-blur-md w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden border border-[#f3d7b8]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 p-6 sm:p-10 md:p-14">
            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-semibold text-[#8b3e2f] mb-4">
                Contact Us
              </h3>
              <p className="text-[#5a3e2b] text-base mb-2">
                📍 Kathmandu, Nepal
              </p>
              <p className="text-[#5a3e2b] text-base mb-2">
                📞 +977-9868708712
              </p>
              <p className="text-[#5a3e2b] text-base mb-8">
                ✉ support@anythingnepal.com
              </p>

              {/* Socials */}
              <div>
                <h3 className="text-xl font-semibold text-[#8b3e2f] mb-3">
                  Follow Us
                </h3>
                <div className="flex space-x-6 text-[#5a3e2b] text-2xl">
                  <a
                    href="https://www.facebook.com/mohit.joshi.932339"
                    className="hover:text-[#d67d3e] transition-transform transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.instagram.com/spyneriscool?igsh=aDJsMHFuY3Mzbjgx"
                    className="hover:text-[#d67d3e] transition-transform transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://x.com/MohitJoshi84310?t=dQnKrNMHSwth83c493VMEA&s=09"
                    className="hover:text-[#d67d3e] transition-transform transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://youtube.com/@xmet461?si=TZYMkjWXXmmPejvg"
                    className="hover:text-[#d67d3e] transition-transform transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* Email Form */}
            <div className="bg-[#fffaf3] p-6 sm:p-8 rounded-2xl shadow-inner border border-[#f2e3d2] w-full">
              <h3 className="text-2xl font-semibold text-[#8b3e2f] mb-6 text-center">
                Send Us an Email
              </h3>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-5 text-[#5a3e2b]"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={emailData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-[#e0c9a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d67d3e] transition"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={emailData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-[#e0c9a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d67d3e] transition"
                />
                <textarea
                  name="body"
                  rows="6"
                  placeholder="Your message"
                  value={emailData.body}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-[#e0c9a6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d67d3e] transition resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#d67d3e] to-[#b85c2f] text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-lg"
                  onClick={handleSubmit}
                >
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
