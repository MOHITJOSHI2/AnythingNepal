import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Mission */}
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
            Anything<span className="text-red-700">Nepal.</span>
          </h2>
          <p className="text-sm leading-relaxed text-stone-400 font-medium">
            Preserving the soul of Himalayan craftsmanship. We bridge the gap
            between rural artisans and the global stage.
          </p>
          <div className="flex space-x-5 text-lg">
            {[
              {
                icon: <FaFacebookF />,
                link: "https://www.facebook.com/mohit.joshi.932339",
              },
              {
                icon: <FaInstagram />,
                link: "https://www.instagram.com/spyneriscool",
              },
              { icon: <FaTwitter />, link: "https://x.com/MohitJoshi84310" },
              { icon: <FaYoutube />, link: "https://youtube.com/@xmet461" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="text-stone-500 hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Curation (Quick Links) */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-6">
            The Curation
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <a href="/" className="hover:text-red-500 transition-colors">
                Home Archive
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-red-500 transition-colors">
                The Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-500 transition-colors">
                Our Story
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-red-500 transition-colors"
              >
                Contact Center
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-6">
            Artisan Support
          </h3>
          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-3">
              <span className="text-red-700 italic">Loc:</span> Kathmandu, Nepal
            </p>
            <p className="flex items-center gap-3">
              <span className="text-red-700 italic">Tel:</span> +977-9868708712
            </p>
            <p className="flex items-center gap-3">
              <span className="text-red-700 italic">Mail:</span>{" "}
              support@anythingnepal.com
            </p>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
          <h3 className="text-white font-bold text-sm mb-4 tracking-tight">
            Stay Connected
          </h3>
          <p className="text-xs text-stone-500 mb-4 leading-relaxed">
            Get stories of Nepali heritage delivered to your inbox.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-stone-800 border-none rounded-xl p-3 text-xs focus:ring-1 focus:ring-red-800 outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-red-700 hover:text-white transition-colors">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Credits Bar */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600">
          <p>
            © {new Date().getFullYear()} AnythingNepal. Crafted in the
            Himalayas.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Shipping & Returns
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
