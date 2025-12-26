import React from "react";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";   

const About = () => {
  return (
    <div className="py-10 space-y-16">
      
      {/* TOP SECTION */}
      <section className="grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT IMAGE */}
        <div className="w-full">
          <img
            src={assets.image} 
            alt="About ShopNow"
            className="w-full max-w-md h-80 mx-auto rounded-2xl object-cover shadow-sm"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="space-y-6">
          
          <h2 className="text-3xl font-semibold mt-2">ABOUT US</h2>

          <p className="text-sm leading-relaxed text-gray-700">
            ShopNow was born out of a passion for innovation and a desire to
            revolutionize the online shopping experience.
          </p>

          <p className="text-sm leading-relaxed text-gray-700">
            We provide a wide range of high–quality products backed by trust,
            transparency, and seamless service.
          </p>

          <div>
            <h3 className="text-base font-semibold mb-2">Our Mission</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              Our mission is to bring you comfort, style, and convenience through
              world–class online shopping that’s fast, secure, and effortless.
            </p>
          </div>
        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold">WHY CHOOSE US</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border border-gray-200 rounded-2xl p-6 bg-slate-50">
            <h4 className="font-semibold mb-2">Quality Assurance</h4>
            <p className="text-sm text-gray-700">
              All products are handpicked and tested for durability and comfort.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-slate-50">
            <h4 className="font-semibold mb-2">Convenience</h4>
            <p className="text-sm text-gray-700">
              You can shop anytime, anywhere with our easy–to–use platform.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-slate-50">
            <h4 className="font-semibold mb-2">Customer Support</h4>
            <p className="text-sm text-gray-700">
              Our support team is always ready to assist you with your orders.
            </p>
          </div>

        </div>
      </section>

      {/* SUBSCRIBE SECTION */}
      <section className="border-y border-gray-200 py-10 text-center space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Subscribe now &amp; get 20% off
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Subscribe to get updates on new collections and special offers.
        </p>
        <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-full text-sm outline-none"
          />
          <button
            type="button"
            className="px-6 py-2 bg-black text-white text-xs font-medium uppercase tracking-[0.2em] rounded-full"
          >
            SUBSCRIBE
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default About;
