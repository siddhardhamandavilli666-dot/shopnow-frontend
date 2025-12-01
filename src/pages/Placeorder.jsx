// src/pages/Placeorder.jsx
import React, { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { products, assets } from "../assets/assets";
import Footer from "../components/Footer";

const SHIPPING_FEE = 30; // same as Cart

const Placeorder = () => {
  const {
    cartItems,
    getCartTotal,
    deleteFromCart,
    orders,
    setOrders,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  // cart lo unna products
  const itemsInCart = useMemo(
    () => products.filter((p) => cartItems[p._id] > 0),
    [cartItems]
  );

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shippingFee;

  // cart empty ayithe
  if (itemsInCart.length === 0) {
    return (
      <>
        <div className="py-16 text-center space-y-4">
          <h1 className="text-2xl md:text-3xl tracking-[0.35em] uppercase">
            Checkout
          </h1>
          <p className="text-sm text-gray-600">
            Your cart is empty. Add items before placing an order.
          </p>
          <Link
            to="/collection"
            className="inline-block text-xs tracking-[0.2em] uppercase underline"
          >
            Browse collection
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // ⭐ 1) New order object (Flipkart/Amazon style)
    const newOrder = {
      id: "ORD" + Date.now(), // simple unique id
      date: Date.now(),
      status: "Placed",
      total: total,
      items: Object.entries(cartItems).map(([productId, qty]) => ({
        productId,
        qty,
      })),
    };

    // ⭐ 2) Save into context orders array
    setOrders((prev) => [newOrder, ...(prev || [])]);

    // ⭐ 3) Clear cart (anni items remove cheyyadam)
    Object.keys(cartItems).forEach((id) => {
      deleteFromCart(id);
    });

    // ⭐ 4) Redirect to Orders page
    navigate("/orders");
  };

  return (
    <>
      <div className="py-10 space-y-10">
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl tracking-[0.35em] uppercase">
          Delivery Information
        </h1>

        <form
          onSubmit={handlePlaceOrder}
          className="grid lg:grid-cols-[2fr_1fr] gap-10 items-start"
        >
          {/* LEFT – DELIVERY FORM */}
          <div className="space-y-6">
            {/* Name row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  First name
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  Last name
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            {/* Street */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                Street
              </label>
              <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* City / State */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  City
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  State
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            {/* Zip / Country */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  Zipcode
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  Country
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT – CART TOTALS + PAYMENT */}
          <div className="space-y-8">
            {/* CART TOTALS BOX */}
            <div className="border border-gray-200 rounded-3xl p-6 space-y-4 bg-white">
              <h2 className="text-lg tracking-[0.25em] uppercase">
                Cart Totals
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span>₹{shippingFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="border border-gray-200 rounded-3xl p-6 space-y-4 bg-white">
              <h2 className="text-lg tracking-[0.25em] uppercase">
                Payment Method
              </h2>

              <div className="space-y-3 text-sm">
                {/* Stripe */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    className="w-3 h-3"
                  />
                  <span>Stripe</span>
                  <img
                    src={assets.stripe_logo}
                    alt="Stripe"
                    className="h-4 ml-2"
                  />
                </label>

                {/* Razorpay */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    className="w-3 h-3"
                  />
                  <span>Razorpay</span>
                  <img
                    src={assets.razorpay_logo}
                    alt="Razorpay"
                    className="h-4 ml-2"
                  />
                </label>

                {/* Cash on Delivery (default) */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    defaultChecked
                    className="w-3 h-3"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {/* PLACE ORDER BUTTON */}
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-black text-white text-xs tracking-[0.25em] uppercase rounded-full"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Placeorder;
