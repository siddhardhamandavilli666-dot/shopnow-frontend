// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";   // ⭐ Added
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="py-14 min-h-[65vh] flex items-center justify-center">
        <div className="w-full max-w-md space-y-10">
          
          {/* TITLE */}
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
              Account
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">Login</h1>
          </div>

          {/* FORM */}
          <form className="space-y-6 border border-gray-200 rounded-3xl p-8 bg-white">
            
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-xs tracking-[0.2em] uppercase text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
              />
            </div>

            {/* PASSWORD + SHOW/HIDE + FORGOT */}
            <div className="space-y-1">
              <label className="text-xs tracking-[0.2em] uppercase text-gray-600 block">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none pr-10"
                />

                {/* SWITCH SHOW/HIDE */}
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              {/* ⭐ FORGOT PASSWORD — now navigates to the correct page */}
              <Link
                to="/forgot-password"
                className="text-[11px] text-gray-500 hover:text-black underline-offset-2 hover:underline mt-1 inline-block"
              >
                Forgot your password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full mt-2 py-3 bg-black text-white text-xs tracking-[0.25em] uppercase rounded-full"
            >
              LOGIN
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;