// src/pages/Orders.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Footer from "../components/Footer";

// date format helper
const formatDate = (ts) => {
  if (!ts) return "Date not available";
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Orders = () => {
  // context nundi orders + products
  const { orders = [], products = [] } = useContext(ShopContext) || {};

  const hasOrders = orders && orders.length > 0;

  // item nundi product info (image, name) tiskodaniki
  const getProductFromItem = (item) => {
    // order lo direct product snapshot unte
    if (item?.product) {
      return {
        name: item.product.name || "Order items",
        thumb: item.product.image?.[0],
      };
    }

    // lekapothe global products list lo nunchi kanukko
    const p =
      products.find(
        (prod) =>
          prod._id === item?.productId ||
          prod._id === item?.id ||
          prod._id === item?._id
      ) || null;

    return {
      name: p?.name || "Order items",
      thumb: p?.image?.[0],
    };
  };

  return (
    <>
      <div className="py-10 min-h-[60vh]">
        {/* TITLE */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
            Account
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">My Orders</h1>
        </div>

        {/* NO ORDERS STATE */}
        {!hasOrders && (
          <div className="border border-gray-200 rounded-3xl p-10 text-center max-w-xl mx-auto bg-white">
            <p className="text-sm text-gray-600 mb-3">
              You don&apos;t have any orders yet.
            </p>
            <Link
              to="/collection"
              className="inline-block mt-2 px-6 py-2 bg-black text-white text-xs tracking-[0.25em] uppercase rounded-full"
            >
              Start shopping
            </Link>
          </div>
        )}

        {/* ORDERS LIST (Flipkart / Amazon style) */}
        {hasOrders && (
          <div className="space-y-4">
            {orders.map((order) => {
              const firstItem = order.items?.[0];
              const { name, thumb } = firstItem
                ? getProductFromItem(firstItem)
                : { name: "Order items", thumb: null };

              const totalQty = order.items?.reduce(
                (sum, item) => sum + (item.qty || 0),
                0
              );

              return (
                <Link
                  key={order.id}
                  to={`/order/${order.id}`} // Order details page
                  className="block border border-gray-200 rounded-3xl p-4 md:p-5 bg-white hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-4">
                    {/* LEFT – PRODUCT IMAGE */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    {/* MIDDLE – ORDER INFO */}
                    <div className="flex-1 space-y-1">
                      {/* Product name + more items */}
                      <p className="text-sm font-medium line-clamp-1">
                        {name}
                        {totalQty > 1 && (
                          <span className="text-xs text-gray-500">
                            {" "}
                            + {totalQty - 1} more item
                            {totalQty - 1 > 1 ? "s" : ""}
                          </span>
                        )}
                      </p>

                      {/* Order ID */}
                      <p className="text-xs text-gray-500">
                        Order ID:{" "}
                        <span className="font-mono text-[11px]">
                          {order.id}
                        </span>
                      </p>

                      {/* Date */}
                      <p className="text-xs text-gray-500">
                        Placed on: {formatDate(order.date)}
                      </p>
                    </div>

                    {/* RIGHT – STATUS & TOTAL */}
                    <div className="text-right space-y-1">
                      <p
                        className={`text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : order.status === "Cancelled"
                            ? "text-red-500"
                            : "text-orange-500"
                        }`}
                      >
                        {order.status || "In progress"}
                      </p>
                      <p className="text-sm font-semibold">
                        ₹{order.total ?? 0}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        View order details
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Orders;
