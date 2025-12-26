import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { products } from "../assets/assets";
import Footer from "../components/Footer";

const categoryOptions = ["Men", "Women", "Boys", "Unisex"];
const typeOptions = ["Topwear", "Bottomwear", "Winterwear"];

const Collection = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sort, setSort] = useState("relevant"); 
  const [search, setSearch] = useState("");

  const searchInputRef = useRef(null);
  const location = useLocation(); 

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleType = (t) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleSearchFocus = () => {
    if (searchInputRef.current) searchInputRef.current.focus();
  };


  useEffect(() => {
    if (location.state?.focusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      
    }
  }, [location]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (selectedCategories.length > 0) {
      data = data.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (selectedTypes.length > 0) {
      data = data.filter((item) =>
        selectedTypes.includes(item.subcategory)
      );
    }

    const term = search.trim().toLowerCase();
    if (term) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
    }

    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }
    

    return data;
  }, [selectedCategories, selectedTypes, sort, search]);

  return (
    <>
      <div className="py-3 space-y-2">
        {/* TOP TITLE */}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
            All Collections
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Browse All Products
          </h1>
        </div>

        {/* MAIN: LEFT FILTERS + RIGHT LIST */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT SIDEBAR FILTERS */}
          <aside className="w-full md:w-1/4 space-y-6 md:sticky md:top-24 h-fit">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Filters
            </p>

            {/* CATEGORIES BOX */}
            <div className="border border-gray-200 rounded-3xl p-5 space-y-3 bg-white">
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                Categories
              </p>
              <div className="space-y-2 text-sm">
                {categoryOptions.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-3 h-3"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* TYPE BOX */}
            <div className="border border-gray-200 rounded-3xl p-5 space-y-3 bg-white">
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                Type
              </p>
              <div className="space-y-2 text-sm">
                {typeOptions.map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-3 h-3"
                      checked={selectedTypes.includes(t)}
                      onChange={() => toggleType(t)}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE – SEARCH + SORT + GRID */}
          <main className="flex-1 space-y-6">
            {/* SEARCH + SORT BAR */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between md:pr-24">
              {/* Search bar – bigger & slightly right */}
              <div className="relative w-full sm:w-96 sm:ml-auto">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={handleSearchFocus}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                >
                  🔍
                </button>
              </div>

              {/* Sort dropdown  */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded-full px-3 py-2 text-xs outline-none w-full sm:w-auto"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>
            </div>

            {/* PRODUCTS GRID / EMPTY STATE */}
            {filteredProducts.length === 0 ? (
              <p className="text-sm text-gray-500 mt-10">
                No products found. Try a different search or filter.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    className="space-y-2 group"
                  >
                    <div className="overflow-hidden rounded-2xl bg-slate-100">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
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
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Collection; 