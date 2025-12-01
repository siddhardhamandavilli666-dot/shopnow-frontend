// src/pages/OrderDetails.jsx
import React, { useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Footer from "../components/Footer";

const formatDate = (ts) => {
  if (!ts) return "Date not available";
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OrderDetails = () => {
  const { id } = useParams(); // /order/:id
  const { orders = [], products = [] } = useContext(ShopContext) || {};

  // find order by id
  const order = orders.find((o) => o.id === id);

  // item → product info (prefer snapshot, else global products)
  const enrichItems = useMemo(() => {
    if (!order || !order.items) return [];

    return order.items.map((item) => {
      // 1) snapshot inside order
      const snap = item.product || null;

      // 2) otherwise from products list
      const prodFromList =
        products.find(
          (p) =>
            p._id === item.productId ||
            p._id === item.id ||
            p._id === item._id
        ) || null;

      const product = snap || prodFromList;

      return {
        ...item,
        product,
      };
    });
  }, [order, products]);

  if (!order) {
    // wrong id or no orders
    return (
      <>
        <div className="py-12 min-h-[60vh] text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Order not found
          </h1>
          <p className="text-sm text-gray-600">
            This order doesn&apos;t exist or may have been removed.
          </p>
          <Link
            to="/orders"
            className="inline-block mt-2 px-6 py-2 bg-black text-white text-xs tracking-[0.25em] uppercase rounded-full"
          >
            Back to My Orders
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const placedDate = formatDate(order.date);
  const subtotal =
    order.subtotal ??
    enrichItems.reduce(
      (sum, it) => sum + (it.product?.price || 0) * (it.qty || 1),
      0
    );
  const shippingFee = order.shippingFee ?? 30;
  const total = order.total ?? subtotal + shippingFee;

  return (
    <>
      <div className="py-10 space-y-8 min-h-[60vh]">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
              Order Details
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Order #{order.id}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Placed on {placedDate} • {order.items?.length || 0} item
              {order.items?.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="text-right space-y-1 text-sm">
            <p
              className={`font-semibold ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : order.status === "Cancelled"
                  ? "text-red-500"
                  : "text-orange-500"
              }`}
            >
              {order.status || "In progress"}
            </p>
            <p>
              Total paid:{" "}
              <span className="font-semibold">₹{total}</span>
            </p>
          </div>
        </div>

        {/* ITEMS LIST – Flipkart / Amazon style */}
        <div className="border border-gray-200 rounded-3xl p-6 bg-white space-y-4">
          {enrichItems.map((item, idx) => {
            const p = item.product || {};
            const img = p.image?.[0];
            const name = p.name || "Product";
            const price = p.price ?? 0;
            const qty = item.qty || 1;

            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center gap-4 border-b last:border-none border-gray-100 pb-4 last:pb-0"
              >
                {/* IMAGE */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  {img ? (
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-gray-500">
                    Size: {item.size || "-"} • Qty: {qty}
                  </p>
                  <p className="text-xs text-gray-500">
                    Item price: ₹{price} • Item total: ₹
                    {(price * qty).toFixed(2)}
                  </p>
                </div>

                {/* STATUS SMALL BLOCK */}
                <div className="text-xs text-right text-gray-500 md:w-40">
                  {order.status === "Delivered" && (
                    <p className="text-green-600 font-semibold">
                      Delivered
                    </p>
                  )}
                  {order.status === "Shipped" && (
                    <p className="text-orange-500 font-semibold">
                      On the way
                    </p>
                  )}
                  {order.status === "Cancelled" && (
                    <p className="text-red-500 font-semibold">
                      Cancelled
                    </p>
                  )}
                  <p className="mt-1">
                    Need help? Contact customer support.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* PRICE SUMMARY */}
        <div className="border border-gray-200 rounded-3xl p-6 bg-white space-y-3 max-w-md">
          <h2 className="text-sm uppercase tracking-[0.25em] text-gray-500">
            Price Summary
          </h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Fee</span>
              <span>₹{shippingFee}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
              <span>Total Paid</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* BACK LINK */}
        <div>
          <Link
            to="/orders"
            className="text-xs uppercase tracking-[0.25em] underline text-gray-700"
          >
            ← Back to My Orders
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderDetails;
