
import React, { useState } from "react";
import Footer from "../components/Footer";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form:", form);
  };

  return (
    <>
      {/* MAIN SIGNUP SECTION */}
      <div className="py-10 min-h-[70vh] flex items-center justify-center">
        {/* max width */}
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT: BRAND TEXT */}
          <div className="text-left">
            <h2 className="text-3xl tracking-[0.35em] font-semibold mb-4">
              SHOPNOW<span className="text-pink-500">.</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-xs">
              Create your account to track orders, save your favourite products
              and enjoy a faster checkout experience.
            </p>
          </div>

          {/* RIGHT*/}
          <div className="border border-gray-200 rounded-3xl p-10 bg-white shadow-sm w-full">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">
              Account
            </p>
            <h1 className="text-xl font-semibold mb-6">Sign up</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FULL NAME */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
                  required
                />
              </div>

             {/* PASSWORD */}
<div className="space-y-1">
  <label className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
    Password
  </label>
  <div className="relative">
    <input
      type={showPass ? "text" : "password"}
      name="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Enter password"
      className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none pr-16"
      style={{ fontFamily: "sans-serif" }} 
      required
    />
    <button
      type="button"
      onClick={() => setShowPass((v) => !v)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.2em] text-gray-500"
    >
      {showPass ? "Hide" : "Show"}
    </button>
  </div>
</div>


             {/* CONFIRM PASSWORD */}
<div className="space-y-1">
  <label className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
    Confirm password
  </label>
  <div className="relative">
    <input
      type={showConfirm ? "text" : "password"}
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={handleChange}
      placeholder="Re-enter password"
      className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none pr-16"
      style={{ fontFamily: "sans-serif" }}
      required
    />
    <button
      type="button"
      onClick={() => setShowConfirm((v) => !v)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.2em] text-gray-500"
    >
      {showConfirm ? "Hide" : "Show"}
    </button>
  </div>
</div>


              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-black text-white text-xs tracking-[0.3em] uppercase rounded-full"
              >
                Create account
              </button>

              <p className="text-xs text-gray-600 text-center mt-2">
                Already have an account?{" "}
                <a href="/login" className="underline">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Signup;
