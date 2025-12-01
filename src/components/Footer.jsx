import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 text-sm text-gray-600">
        {/* TOP 3 COLUMNS */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* BRAND + TEXT */}
          <div>
            <h2 className="text-xl tracking-[0.35em] font-semibold mb-3">
              SHOPNOW<span className="text-pink-400">.</span>
            </h2>
            <p className="text-xs leading-relaxed text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* COMPANY COLUMN */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>

          {/* GET IN TOUCH COLUMN */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] mb-4">
              GET IN TOUCH
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>+1-000-000-0000</li>
              <li>shopnow@example.com</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT LINE */}
        <p className="text-[11px] text-gray-400 text-center tracking-wide">
          Copyright © {new Date().getFullYear()} ShopNow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
