import React from "react";

const Subscription = () => {
  return (
    <section className="py-12 border-t border-gray-200 text-center mt-10">
      <h2 className="text-2xl font-semibold">Subscribe now & get 20% off</h2>
      <p className="text-sm text-gray-600 mt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-5 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 px-4 py-2 rounded-full flex-1"
        />
        <button className="bg-black text-white px-6 py-2 rounded-full text-xs tracking-widest">
          SUBSCRIBE
        </button>
      </div>
    </section>
  );
};

export default Subscription;
