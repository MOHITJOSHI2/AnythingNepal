import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Users/HomePage";
import UserLogin from "./pages/Users/UserLogin";
import UserSignup from "./pages/Users/UserSignup";
import AdminLogin from "./pages/Seller/AdminLogin";
import AdminSignup from "./pages/Seller/AdminSignup";
import HomeSignup from "./pages/mainFiles/HomeSignup";
import Product from "./pages/Users/Product";
import AdminHomePage from "./pages/Seller/AdminHomePage";
import AVProduct from "./pages/Seller/AVProduct";
import ManageProfile from "./pages/Seller/ManageProfile";
import SellerProfile from "./static_pages/SellerProfile";
import Catregories from "./pages/Seller/Catregories";
import ViewProductPage from "./pages/Seller/ViewProductPage";
import ShopPage from "./pages/Seller/ShopPage";
import UpdateProduct from "./pages/Seller/UpdateProduct";
import Contact from "./pages/Seller/Contact";
import Cart from "./pages/Users/Cart";
import UserProfile from "./pages/Users/UserProfile";
import CategoriesProduct from "./pages/Users/CategoriesProduct";
import Payment from "./pages/Users/Payment";
import Messages from "./pages/Users/Messages";
import PaymentInfo from "./pages/Users/PaymentInfo";
import IndividualCategory from "./pages/Users/IndividualCategory";
import IndCategory from "./pages/Seller/IndCategory";

const MyRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/** This is main home Page route */}
          <Route path="/" element={<HomeSignup />} />

          {/** These are login, signup and home routes Page fo user */}
          <Route path="/userHomePage/:id" element={<HomePage />} />
          <Route path="/pages/users/userLogin" element={<UserLogin />} />
          <Route path="/pages/users/userSignup" element={<UserSignup />} />

          {/** These are login, signup and home routes Page fo seller */}
          <Route path="/adminHomePage/:id" element={<AdminHomePage />} />
          <Route path="/pages/sellers/sellerLogin" element={<AdminLogin />} />
          <Route path="/pages/sellers/sellerSignup" element={<AdminSignup />} />
          {/** These are other seller routes */}
          <Route
            path="/static_pages/sellerProfile/:id"
            element={<SellerProfile />}
          />
          <Route path="/shop/:id" element={<ShopPage />} />
          <Route
            path="/pages/sellers/manageProfile/:id"
            element={<ManageProfile />}
          />
          <Route path="/showProducts" element={<Product />} />
          <Route path="/products/:id" element={<AVProduct />} />
          <Route path="/categories" element={<Catregories />} />
          <Route path="/viewProduct/:id" element={<ViewProductPage />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/individualCategory/:category"
            element={<IndCategory />}
          />

          {/** User routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/productCategories" element={<CategoriesProduct />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/paymentInfo" element={<PaymentInfo />} />
          <Route
            path="/getSingleCategory/:category"
            element={<IndividualCategory />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MyRoutes;
