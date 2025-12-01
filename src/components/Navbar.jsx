// src/components/Navbar.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [activeDrop, setActiveDrop] = useState("");
  const dropRef = useRef(null);

  const navigate = useNavigate();
  const { cartCount } = useContext(ShopContext) || { cartCount: 0 };

  // outside click -> close dropdown
  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const baseNav =
    "flex flex-col items-center gap-1 text-xs tracking-[0.20em]";

  const navLinkClass = ({ isActive }) =>
    `${baseNav} ${
      isActive
        ? "text-black border-b-[2px] border-gray-700 pb-1"
        : "text-gray-500"
    }`;

  // 🔍 search icon → collection page search focus
  const handleSearchClick = () => {
    setVisible(false);
    navigate("/collection", { state: { focusSearch: true } });
  };

  return (
    <div className="w-full flex items-center justify-between py-5 px-8 bg-white shadow-sm select-none">
      {/* LEFT LOGO */}
      <h1 className="text-3xl tracking-[0.35em] font-semibold">
        SHOPNOW<span className="text-pink-500">.</span>
      </h1>

      {/* CENTER LINKS */}
      <ul className="hidden md:flex items-center gap-10">
        <li>
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/collection"
            className={navLinkClass}
            onClick={() => setVisible(false)}
          >
            COLLECTION
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setVisible(false)}
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={navLinkClass}
            onClick={() => setVisible(false)}
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* SEARCH ICON */}
        <img
          src={assets.search_icon}
          alt="search"
          className="w-9 cursor-pointer"
          onClick={handleSearchClick}
        />

        {/* PROFILE + DROPDOWN */}
        <div className="relative" ref={dropRef}>
          <img
            src={assets.profile_icon}
            alt="profile"
            className="w-7 cursor-pointer"
            onClick={() => setVisible((v) => !v)}
          />

          <div
            className={`absolute right-0 top-10 bg-white shadow-md rounded-lg w-40 py-2 transition-all duration-200 ${
              visible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {/* LOGIN */}
            <p
              onClick={() => {
                setActiveDrop("login");
                setVisible(false);
                navigate("/login");
              }}
              className={`px-4 py-2 cursor-pointer rounded ${
                activeDrop === "login"
                  ? "bg-gray-200 text-black font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Login
            </p>

            {/* SIGNUP */}
            <p
              onClick={() => {
                setActiveDrop("signup");
                setVisible(false);
                navigate("/signup");
              }}
              className={`px-4 py-2 cursor-pointer rounded ${
                activeDrop === "signup"
                  ? "bg-gray-200 text-black font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Signup
            </p>

            {/* small divider */}
            <hr className="my-1 border-gray-100" />

            {/* ORDERS */}
            <p
              onClick={() => {
                setActiveDrop("orders");
                setVisible(false);
                navigate("/orders");   // ⭐ ippudu Orders page ki velluthundi
              }}
              className={`px-4 py-2 cursor-pointer rounded ${
                activeDrop === "orders"
                  ? "bg-gray-200 text-black font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Orders
            </p>

            {/* LOGOUT */}
            <p
              onClick={() => {
                setActiveDrop("logout");
                setVisible(false);
                alert("Logged out (demo)");
              }}
              className={`px-4 py-2 cursor-pointer rounded ${
                activeDrop === "logout"
                  ? "bg-gray-200 text-black font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Logout
            </p>
          </div>
        </div>

        {/* CART ICON + COUNT BADGE */}
        <Link to="/cart" onClick={() => setVisible(false)} className="relative">
          <img
            src={assets.cart_img}
            alt="cart"
            className="w-7 cursor-pointer"
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full bg-black text-white text-[10px] flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
