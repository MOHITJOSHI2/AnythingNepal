import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Users/HomePage";
import UserLogin from "./pages/Users/UserLogin";
import UserSignup from "./pages/Users/UserSignup";
import AdminLogin from "./pages/Seller/AdminLogin";
import AdminSignup from "./pages/Seller/AdminSignup";
import HomeSignup from "./pages/mainFiles/HomeSignup";
import Product from "./pages/Users/Product";
import EsewaPayment from "./components/Users/EsewaPayment";
import AdminHomePage from "./pages/Seller/AdminHomePage";
import AVProduct from "./pages/Seller/AVProduct";
import ManageProfile from "./pages/Seller/ManageProfile";
import SellerProfile from "./static_pages/SellerProfile";
import Catregories from "./pages/Seller/Catregories";
import ViewProductPage from "./pages/Seller/ViewProductPage";
import ShopPage from "./pages/Seller/ShopPage";
import UpdateProduct from "./pages/Seller/UpdateProduct";
import Contact from "./pages/Seller/Contact";

const MyRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeSignup />} />
          <Route path="/userHomePage/:id" element={<HomePage />} />
          <Route path="/adminHomePage/:id" element={<AdminHomePage />} />
          <Route
            path="/static_pages/sellerProfile/:id"
            element={<SellerProfile />}
          />
          <Route path="/pages/users/userLogin" element={<UserLogin />} />
          <Route path="/pages/sellers/sellerLogin" element={<AdminLogin />} />
          <Route path="/pages/users/userSignup" element={<UserSignup />} />
          <Route path="/pages/sellers/sellerSignup" element={<AdminSignup />} />
          <Route path="/shop/:id" element={<ShopPage />} />
          <Route
            path="/pages/sellers/manageProfile/:id"
            element={<ManageProfile />}
          />
          <Route path="/showProducts" element={<Product />} />
          <Route path="/products/:id" element={<AVProduct />} />
          <Route path="/payment" element={<EsewaPayment />} />
          <Route path="/categories" element={<Catregories />} />
          <Route path="/viewProduct/:id" element={<ViewProductPage />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MyRoutes;
