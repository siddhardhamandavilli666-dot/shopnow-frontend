// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    // Real project lo ikkada API call vuntundi
    setMessage(
      "If an account exists with this email, a password reset link will be sent."
    );
  };

  return (
    <>
      {/* MAIN SECTION */}
      <div className="py-10 min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT TEXT */}
          <div className="text-left">
            <h2 className="text-3xl tracking-[0.35em] font-semibold mb-4">
              SHOPNOW<span className="text-pink-500">.</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-xs">
              Enter your email address and we&apos;ll help you reset your
              password.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="border border-gray-200 rounded-3xl p-10 bg-white shadow-sm w-full">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">
              Account
            </p>
            <h1 className="text-xl font-semibold mb-6">Reset password</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
                  required
                />
              </div>

              {/* MESSAGE */}
              {message && (
                <p className="text-[11px] text-green-600">{message}</p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-black text-white text-xs tracking-[0.3em] uppercase rounded-full"
              >
                Send reset link
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default ForgotPassword;
