import React, { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";   // ⭐ useNavigate ADD
import { ShopContext } from "../context/ShopContext";
import { products, assets } from "../assets/assets";
import Footer from "../components/Footer";   // ⭐ Footer import

const SHIPPING_FEE = 30; // ⭐ SHIPPING 30 RUPEES

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getCartTotal,
  } = useContext(ShopContext);

  const navigate = useNavigate();            // ⭐ navigator

  const itemsInCart = useMemo(
    () => products.filter((p) => cartItems[p._id] > 0),
    [cartItems]
  );

  const subtotal = getCartTotal();

  // ⭐ ALWAYS 30 IF CART HAS ITEMS, ELSE 0
  const shippingFee = subtotal > 0 ? SHIPPING_FEE : 0;

  const total = subtotal + shippingFee;

  return (
    <>
      <div className="py-10 space-y-10">
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl tracking-[0.35em] uppercase">
          Your Cart
        </h1>

        {itemsInCart.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <p className="text-sm text-gray-600">Your cart is empty.</p>
            <Link
              to="/collection"
              className="inline-block text-xs tracking-[0.2em] uppercase underline"
            >
              Browse collection
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10 items-start">
            {/* LEFT – ITEMS */}
            <div className="space-y-6">
              {itemsInCart.map((item) => {
                const qty = cartItems[item._id] || 0;
                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100">
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Price: ₹{item.price}
                        </p>

                        <div className="flex items-center gap-3 mt-1">
                          {/* Minus */}
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg"
                          >
                            −
                          </button>

                          {/* Qty */}
                          <span className="min-w-[2rem] text-center text-sm font-medium">
                            {qty}
                          </span>

                          {/* Plus */}
                          <button
                            onClick={() => addToCart(item._id)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg"
                          >
                            +
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteFromCart(item._id)}
                            className="ml-3"
                          >
                            <img
                              src={assets.bin_icon}
                              alt="Delete"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-semibold whitespace-nowrap">
                      ₹{item.price * qty}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* RIGHT – TOTALS */}
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
                  <span className="font-medium">₹{shippingFee}</span>
                </div>

                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* ⭐ NAVIGATE TO PLACEORDER */}
              <button
                className="w-full mt-4 py-3 bg-black text-white text-xs tracking-[0.25em] uppercase rounded-full"
                onClick={() => navigate("/placeorder")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ⭐ FOOTER ONLY (no subscription) */}
      <Footer />
    </>
  );
};

export default Cart;
