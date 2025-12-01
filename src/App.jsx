import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlaceOrder from "./pages/Placeorder";
import ProductPage from "./pages/Product";
import ForgotPassword from "./pages/ForgotPassword";
import Orders from "./pages/Orders";

// 🟢 CORRECT IMPORT
import OrderDetails from "./pages/OrderDetails";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />

        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/placeorder" element={<PlaceOrder />} />

        {/* 🟢 Order details works now */}
        <Route path="/order/:id" element={<OrderDetails />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
