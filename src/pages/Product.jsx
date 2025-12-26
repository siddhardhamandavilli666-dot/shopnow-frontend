import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { products, assets } from "../assets/assets";
import Footer from "../components/Footer";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(ShopContext);

  const product = products.find((p) => p._id === id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("description"); // "description" | "reviews"
  const [error, setError] = useState("");        // error message

  if (!product) {
    return (
      <div className="py-10">
        <p>Product not found.</p>
      </div>
    );
  }

  // ⭐ RELATED PRODUCTS (same category, excluding current)
  const related = products
    .filter(
      (p) => p.category === product.category && p._id !== product._id
    )
    .slice(0, 8);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    if (qty < 1) setQty(1);
    setAdded(false);
    setError(""); // size select ayyaka error clear
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select size first.");
      return;
    }

    setError("");

    // ⭐ IMPORTANT: only (id, qty) pass cheyyali
    addToCart(product._id, qty);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const increaseQty = () => {
    setQty((prev) => (prev < 10 ? prev + 1 : prev));
  };

  const decreaseQty = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      {/* TOP SECTION: IMAGE + MAIN DETAILS */}
      <div className="py-10 grid md:grid-cols-2 gap-10">
        {/* LEFT – IMAGE */}
        <div className="w-full">
          <div className="w-full rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-[460px] md:h-[520px] object-cover"
            />
          </div>
        </div>

        {/* RIGHT – DETAILS */}
        <div className="space-y-5">
          {/* Category */}
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
            {product.category}
          </p>

          {/* Name + Price + Reviews */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={assets.star_icon}
                  alt="star"
                  className="w-3 h-3"
                />
              ))}
              <span>(122)</span>
            </div>

            <p className="text-xl font-semibold">₹{product.price}</p>
          </div>

          {/* SHORT DESCRIPTION */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* SELECT SIZE */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`w-10 h-10 rounded-full border text-sm flex items-center justify-center transition
                    ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY – ONLY AFTER SIZE SELECT */}
          {selectedSize && (
            <div className="flex items-center gap-4">
              <button
                onClick={decreaseQty}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-lg"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {qty}
              </span>
              <button
                onClick={increaseQty}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-lg"
              >
                +
              </button>
            </div>
          )}

          {/* ADD TO CART + MESSAGES */}
          <div className="space-y-2">
            <button
              onClick={handleAddToCart}
              className={`mt-2 px-10 py-3 rounded-full text-xs tracking-[0.25em] uppercase
                ${
                  selectedSize
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
            >
              Add to Cart
            </button>

            {/* error / success messages */}
            {error && (
              <p className="text-xs text-red-500 font-medium">
                {error}
              </p>
            )}
            {added && (
              <p className="text-xs text-green-600 font-medium">
                ✓ Added to cart
              </p>
            )}
          </div>

          {/* EXTRA INFO LIST */}
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside pt-2">
            <li>100% Original product.</li>
            <li>Cash on delivery is available on this product.</li>
            <li>Easy return and exchange policy within 7 days.</li>
          </ul>
        </div>
      </div>

      {/* DESCRIPTION / REVIEWS TABS + RELATED PRODUCTS */}
      <div className="space-y-10 pb-10">
        {/* TABS */}
        <div className="border-b border-gray-200">
          <div className="flex gap-6 text-sm">
            <button
              className={`pb-3 uppercase tracking-[0.25em] ${
                tab === "description"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
              onClick={() => setTab("description")}
            >
              Description
            </button>
            <button
              className={`pb-3 uppercase tracking-[0.25em] ${
                tab === "reviews"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
              onClick={() => setTab("reviews")}
            >
              Reviews (122)
            </button>
          </div>
        </div>

        {/* TAB CONTENT */}
        {tab === "description" && (
          <div className="text-sm leading-relaxed text-gray-700 bg-slate-50 p-4 rounded-2xl">
            <p>{product.description}</p>
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-3 text-sm text-gray-700">
            <p className="text-xs text-gray-500">
              ★★★★☆ 4.5/5 based on 122 reviews
            </p>
          </div>
        )}

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div className="space-y-4 mt-6">
            <h2 className="text-lg tracking-[0.25em] uppercase">
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="space-y-2 group"
                >
                  <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    {item.category}
                  </p>
                  <p className="text-sm font-medium line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-sm font-semibold">₹{item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
                                                               