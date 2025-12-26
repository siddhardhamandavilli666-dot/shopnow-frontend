// src/pages/Contact.jsx
import React from "react";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";   

const Contact = () => {
  return (
    <div className="py-10 space-y-16">

      {/* TITLE */}
      <section className="text-center space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
          CONTACT US
        </h1>
        <div className="w-16 h-[1px] bg-black mx-auto mt-2" />
      </section>

      {/* IMAGE + DETAILS */}
      <section className="grid md:grid-cols-2 gap-10 md:items-start">

        {/* Left – Image */}
        <div className="w-full">
          <img
            src={assets.cont}   
            alt="Our Store"
            className="w-full max-w-md h-80 mx-auto rounded-2xl object-cover shadow-sm"
          />
        </div>

        {/* Right – Store Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Our Store</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              54709 Willms Station
              <br />
              Suite 350, Washington, USA
            </p>

            <p className="text-sm text-gray-700 leading-relaxed mt-4">
              Tel: (415) 555-0132
              <br />
              Email: admin@shopnow.com
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">Careers at ShopNow</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Learn more about our teams and job openings.
            </p>

            <button className="px-6 py-2 border border-black text-xs font-medium tracking-[0.15em] uppercase rounded-full hover:bg-black hover:text-white transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE SECTION  */}
      <section className="border-y border-gray-200 py-10 text-center space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Subscribe now &amp; get 20% off
        </h2>

        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
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

export default Contact;
