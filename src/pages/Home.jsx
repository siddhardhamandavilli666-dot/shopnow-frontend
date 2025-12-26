import React from "react";
import { Link } from "react-router-dom";
import { assets, products } from "../assets/assets";
import Subscription from "../components/Subscription";
import Footer from "../components/Footer";   

const Home = () => {
  
  const newArrivals = [...products]
    .sort((a, b) => b.date - a.date)
    .slice(0, 8);

  
  const newArrivalIds = newArrivals.map((p) => p._id);

  
  const mostLoved = products
    .filter((p) => p.bestseller && !newArrivalIds.includes(p._id))
    .slice(8, 16);

  return (
    <div className="py-10 space-y-16">

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
            Our bestsellers
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
            Latest Arrivals
            <br />
            <span className="font-normal">Shop Now</span>
          </h1>
          <p className="text-sm text-gray-600 max-w-md">
            Discover fresh styles and everyday essentials carefully selected for
            comfort and quality.
          </p>
        </div>

        <div className="w-full">
          <img
            src={assets.hero_img}
            alt="ShopNow Hero"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.25em] uppercase">
            Latest Collections
          </h2>
          <Link
            to="/collection"
            className="text-xs tracking-[0.2em] uppercase underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((item) => (
            <Link key={item._id} to={`/product/${item._id}`} className="space-y-2 group">
              <div className="w-full aspect-[4/5] rounded-2xl bg-slate-100 overflow-hidden">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{item.category}</p>
              <p className="text-sm font-medium line-clamp-1">{item.name}</p>
              <p className="text-sm font-semibold">₹{item.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* MOST LOVED STYLES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.25em] uppercase">
            Most Loved Styles
          </h2>
          <Link
            to="/collection"
            className="text-xs tracking-[0.2em] uppercase underline"
          >
            Browse all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mostLoved.map((item) => (
            <Link key={item._id} to={`/product/${item._id}`} className="space-y-2 group">
              <div className="w-full aspect-[4/5] rounded-2xl bg-slate-100 overflow-hidden">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{item.category}</p>
              <p className="text-sm font-medium line-clamp-1">{item.name}</p>
              <p className="text-sm font-semibold">₹{item.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <Subscription />

      {/* FOOTER  */}
      <Footer />
    </div>
  );
};

export default Home;
