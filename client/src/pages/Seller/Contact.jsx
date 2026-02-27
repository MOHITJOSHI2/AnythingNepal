import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import NavBar from "../../components/Sellers/NavBar";
import NavBar1 from "../../components/Users/NavBar";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [emailData, setEmailData] = useState({
    email: "",
    subject: "",
    body: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let id = "";

  useEffect(() => {
    if (!localStorage.getItem("seller") && !localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  if (localStorage.getItem("seller")) {
    id = localStorage.getItem("seller");
  } else if (localStorage.getItem("user")) {
    id = localStorage.getItem("user");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/seller/sendEmail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        }
      );

      if (req.ok) {
        alert("Your email has been sent successfully!");
        setEmailData({ email: "", subject: "", body: "" });
      } else {
        alert("Sorry, cannot send email at the moment");
      }
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setLoading(true);
    }
  };

  if (!loading) {
    return (
      <div className="min-h-screen bg-[#EBF4DD] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-800"></div>
          <p className="text-xl font-bold text-stone-700 tracking-widest uppercase">
            Sending Message...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBF4DD] overflow-x-hidden">
      {localStorage.getItem("user") ? (
        <NavBar1
          Contact={"Contact"}
          Products={"Products"}
          Messages={"Messages"}
          Signup={"Categories"}
          Id={id}
        />
      ) : (
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
      )}

      <div className="relative flex items-center justify-center px-4 py-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5A7863]/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-full max-w-6xl bg-white/30 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/40 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 bg-stone-900/90 text-white flex flex-col justify-between">
              <div>
                <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs">
                  Get in Touch
                </span>
                <h3 className="text-5xl font-serif font-bold mt-4 mb-8">
                  Let's Talk <br />{" "}
                  <span className="italic font-light text-stone-400">
                    Nepal.
                  </span>
                </h3>

                <div className="space-y-6 text-stone-300">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-red-500">
                      📍
                    </span>
                    <p>Kathmandu, Nepal</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-red-500">
                      📞
                    </span>
                    <p>+977-9868708712</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-red-500">
                      ✉
                    </span>
                    <p>support@anythingnepal.com</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-12">
                <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-6">
                  Connect with us
                </h4>
                <div className="flex space-x-5 text-xl">
                  {[
                    {
                      icon: <FaFacebookF />,
                      link: "https://www.facebook.com/mohit.joshi.932339",
                    },
                    {
                      icon: <FaInstagram />,
                      link: "https://www.instagram.com/spyneriscool",
                    },
                    {
                      icon: <FaTwitter />,
                      link: "https://x.com/MohitJoshi84310",
                    },
                    {
                      icon: <FaYoutube />,
                      link: "https://youtube.com/@xmet461",
                    },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-800 hover:border-red-800 transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-stone-900 mb-8 font-serif">
                Send an Inquiry
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={emailData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-stone-200 outline-none focus:border-red-800 focus:bg-white transition-all shadow-sm"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={emailData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-stone-200 outline-none focus:border-red-800 focus:bg-white transition-all shadow-sm"
                />
                <textarea
                  name="body"
                  rows="5"
                  placeholder="Tell us about your requirement..."
                  value={emailData.body}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-stone-200 outline-none focus:border-red-800 focus:bg-white transition-all shadow-sm resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white font-bold py-4 rounded-2xl hover:bg-red-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 mt-4"
                >
                  Send Message
                  <span className="text-xl">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
