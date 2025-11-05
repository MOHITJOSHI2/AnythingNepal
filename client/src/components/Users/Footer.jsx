import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] border-t border-[#d4a373] shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#5a3e2b]">AnythingNepal</h2>
          <p className="mt-3 text-[#5a3e2b] text-sm leading-relaxed">
            Bringing you authentic Nepali art, handicrafts, and cultural
            treasures — straight from the heart of Nepal.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#8b3e2f]">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-[#5a3e2b] text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#8b3e2f]">Contact Us</h3>
          <p className="mt-3 text-[#5a3e2b] text-sm">📍 Kathmandu, Nepal</p>
          <p className="text-[#5a3e2b] text-sm">📞 +977-9868708712</p>
          <p className="text-[#5a3e2b] text-sm">✉ support@anythingnepal.com</p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-[#8b3e2f]">Follow Us</h3>
          <div className="flex mt-3 space-x-4 text-[#5a3e2b]">
            <a
              href="https://www.facebook.com/mohit.joshi.932339"
              className="hover:text-[#d67d3e]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/spyneriscool?igsh=aDJsMHFuY3Mzbjgx"
              className="hover:text-[#d67d3e]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/MohitJoshi84310?t=dQnKrNMHSwth83c493VMEA&s=09"
              className="hover:text-[#d67d3e]"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com/@xmet461?si=TZYMkjWXXmmPejvg"
              className="hover:text-[#d67d3e]"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#d4a373] text-white text-center py-3 text-sm">
        © {new Date().getFullYear()} AnythingNepal. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
