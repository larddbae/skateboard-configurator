"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// ─── Mock Product Data (25 products) ────────────────────────────────────────
// To add your own images:
//   1. Place images in /public/images/products/ (e.g. oni-mask-pro.jpg)
//   2. Set the `image` field to "/images/products/oni-mask-pro.jpg"
//   3. The Image component will load it from the public folder

const mockProducts = [
  { id: 1,  name: "Oni Mask Pro",      category: "Pro Models",  brand: "Suburbia",        price: 59.99,  size: "8.0",   rating: 4.5, reviews: 42,  image: "", badge: "New!",  badgeColor: "bg-primary" },
  { id: 2,  name: "Pink Glitch",       category: "Pro Models",  brand: "Alien Workshop",  price: 89.99,  size: "8.125", rating: 5,   reviews: 18,  image: "" },
  { id: 3,  name: "Thank You",         category: "Team Decks",  brand: "Baker",           price: 69.99,  size: "8.0",   rating: 4,   reviews: 5,   image: "", badge: "HOT",   badgeColor: "bg-yellow-400", badgeRounded: true },
  { id: 4,  name: "Suburbia Yell",     category: "Pro Models",  brand: "Suburbia",        price: 79.99,  size: "8.25",  rating: 5,   reviews: 128, image: "" },
  { id: 5,  name: "Azure Deep",        category: "Cruisers",    brand: "Santa Cruz",      price: 64.99,  size: "8.5",   rating: 3.5, reviews: 12,  image: "" },
  { id: 6,  name: "Raw Maple",         category: "Team Decks",  brand: "Baker",           price: 54.99,  size: "8.0",   rating: 4,   reviews: 56,  image: "" },
  { id: 7,  name: "Ghost Rider",       category: "Pro Models",  brand: "Suburbia",        price: 74.99,  size: "8.0",   rating: 4.5, reviews: 33,  image: "" },
  { id: 8,  name: "Neon Nights",       category: "Pro Models",  brand: "Alien Workshop",  price: 84.99,  size: "8.125", rating: 4,   reviews: 22,  image: "" },
  { id: 9,  name: "Skull Crusher",     category: "Team Decks",  brand: "Baker",           price: 67.99,  size: "8.25",  rating: 4.5, reviews: 45,  image: "" },
  { id: 10, name: "Wave Runner",       category: "Cruisers",    brand: "Santa Cruz",      price: 72.99,  size: "8.5",   rating: 4,   reviews: 38,  image: "" },
  { id: 11, name: "Classic Pool",      category: "Old School",  brand: "Santa Cruz",      price: 62.99,  size: "8.5",   rating: 3.5, reviews: 15,  image: "" },
  { id: 12, name: "Street Demon",      category: "Pro Models",  brand: "Suburbia",        price: 77.99,  size: "8.0",   rating: 5,   reviews: 67,  image: "" },
  { id: 13, name: "Flame Thrower",     category: "Pro Models",  brand: "Baker",           price: 82.99,  size: "8.125", rating: 4.5, reviews: 29,  image: "", badge: "New!",  badgeColor: "bg-primary" },
  { id: 14, name: "Acid Drop",         category: "Team Decks",  brand: "Alien Workshop",  price: 71.99,  size: "7.75",  rating: 4,   reviews: 41,  image: "" },
  { id: 15, name: "Retro Reissue",     category: "Old School",  brand: "Santa Cruz",      price: 69.99,  size: "8.5",   rating: 4.5, reviews: 88,  image: "" },
  { id: 16, name: "Midnight Cruiser",  category: "Cruisers",    brand: "Suburbia",        price: 66.99,  size: "8.25",  rating: 4,   reviews: 19,  image: "" },
  { id: 17, name: "Tech Slide",        category: "Pro Models",  brand: "Alien Workshop",  price: 91.99,  size: "7.75",  rating: 5,   reviews: 52,  image: "", badge: "HOT",   badgeColor: "bg-yellow-400", badgeRounded: true },
  { id: 18, name: "Dragon Scale",      category: "Team Decks",  brand: "Baker",           price: 73.99,  size: "8.0",   rating: 4.5, reviews: 36,  image: "" },
  { id: 19, name: "Zen Garden",        category: "Pro Models",  brand: "Suburbia",        price: 85.99,  size: "8.125", rating: 4,   reviews: 11,  image: "" },
  { id: 20, name: "Bone Collector",    category: "Old School",  brand: "Santa Cruz",      price: 58.99,  size: "8.38",  rating: 3.5, reviews: 27,  image: "" },
  { id: 21, name: "Cyber Punk",        category: "Pro Models",  brand: "Alien Workshop",  price: 94.99,  size: "8.0",   rating: 5,   reviews: 73,  image: "" },
  { id: 22, name: "Beach Bomb",        category: "Cruisers",    brand: "Santa Cruz",      price: 61.99,  size: "8.5",   rating: 4,   reviews: 44,  image: "" },
  { id: 23, name: "Widow Maker",       category: "Team Decks",  brand: "Baker",           price: 76.99,  size: "8.25",  rating: 4.5, reviews: 31,  image: "" },
  { id: 24, name: "Solar Flare",       category: "Pro Models",  brand: "Suburbia",        price: 88.99,  size: "7.75",  rating: 5,   reviews: 95,  image: "" },
  { id: 25, name: "Old Faithful",      category: "Old School",  brand: "Baker",           price: 55.99,  size: "8.38",  rating: 4,   reviews: 60,  image: "" },
];

const categoryOptions = ["Pro Models", "Team Decks", "Cruisers", "Old School"];
const brandOptions = ["Suburbia", "Alien Workshop", "Baker", "Santa Cruz"];
const sizeOptions = ["7.75", "8.0", "8.125", "8.25", "8.38", "8.5"];

const PRODUCTS_PER_PAGE = 12;

// ─── Star Rating Component ──────────────────────────────────────────────────

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-icons text-sm ${
            star <= Math.floor(rating)
              ? "text-yellow-400"
              : star - 0.5 <= rating
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          style={{ textShadow: star <= rating ? "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" : "none" }}
        >
          {star <= Math.floor(rating) ? "star" : star - 0.5 <= rating ? "star_half" : "star_outline"}
        </span>
      ))}
      <span className="text-xs font-mono text-gray-500 ml-1">({reviews})</span>
    </div>
  );
}

// ─── Product Card Component ─────────────────────────────────────────────────

function ProductCard({ product }: { product: typeof mockProducts[0] }) {
  const { addToCart } = useCart();
  return (
    <div className="group relative bg-white p-2 border-2 border-background-dark shadow-sketch hover:shadow-sketch-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Badge */}
      {product.badge && (
        <div className={`absolute -top-3 ${product.badge === "HOT" ? "-right-3 rotate-6" : "-left-3 -rotate-12"} z-20`}>
          <span className={`${product.badgeColor} ${product.badge === "HOT" ? "text-black rounded-full" : "text-white"} font-display font-bold px-3 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] border border-black text-sm`}>
            {product.badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative pt-6 pb-6 px-4 bg-[#f0f0f0] border-2 border-zinc-200 flex items-center justify-center aspect-[4/5] overflow-hidden group-hover:border-black transition-colors">
        {/* Tape effect */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-white/60 rotate-2 backdrop-blur-sm z-10 shadow-sm"></div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <Link href={`/shop/${product.id}`} className="font-display text-2xl text-black rotate-[-5deg] hover:scale-110 transition-transform hover:text-primary">
            &gt;&gt; VIEW &lt;&lt;
          </Link>
        </div>

        {/* Product Image Placeholder */}
        <div className="relative h-full w-full flex items-center justify-center">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-400 gap-2">
              <span className="material-icons text-5xl">skateboarding</span>
              <span className="font-mono text-xs uppercase tracking-wider">No Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow text-center relative">
        <div className="mb-1 text-xs font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-dashed border-gray-300 pb-1 mx-4">
          {product.category}
        </div>
        <h3 className="font-display text-xl text-background-dark mt-2 mb-1 group-hover:text-primary transition-colors leading-tight">
          {product.name}
        </h3>

        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="mt-auto flex items-center justify-between px-2 pt-2 border-t-2 border-black border-dashed">
          <span className="font-mono font-black text-2xl text-background-dark tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => addToCart({
              id: String(product.id),
              name: product.name,
              price: product.price,
              image: product.image,
            })}
            className="h-10 px-3 bg-primary text-white font-display font-bold border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all flex items-center justify-center text-sm -rotate-2 hover:rotate-0"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination Component ───────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  // Build page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-16 flex items-center justify-center">
      <nav className="flex items-center gap-3">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-12 h-12 flex items-center justify-center bg-white border-2 border-black shadow-sketch transition-colors transform hover:-translate-y-1 ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed hover:translate-y-0"
              : "text-black hover:bg-black hover:text-white"
          }`}
        >
          <span className="material-icons">chevron_left</span>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, idx) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${idx}`} className="text-black font-bold text-2xl px-2 tracking-widest">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-12 h-12 flex items-center justify-center font-display text-xl border-2 border-black shadow-sketch transition-colors ${
                currentPage === page
                  ? "bg-background-dark text-white -rotate-2"
                  : "bg-white text-black hover:bg-gray-100 hover:rotate-2"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-12 h-12 flex items-center justify-center bg-white border-2 border-black shadow-sketch transition-colors transform hover:-translate-y-1 ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed hover:translate-y-0"
              : "text-black hover:bg-black hover:text-white"
          }`}
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </nav>
    </div>
  );
}

// ─── Main Shop Page ─────────────────────────────────────────────────────────

export default function ShopPage() {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(150);

  // Sort & view states
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // ── Toggle helpers ──────────────────────────────────────────────────────

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  // ── Filter + Sort + Paginate pipeline ───────────────────────────────────

  const filteredAndSorted = useMemo(() => {
    let result = [...mockProducts];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price
    result = result.filter((p) => p.price <= priceRange);

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.size));
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "featured":
      default:
        // default order (by id ascending)
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [selectedCategories, priceRange, selectedBrands, selectedSizes, sortBy]);

  const totalPages = Math.ceil(filteredAndSorted.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSorted.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // Dynamic count text
  const showingStart = filteredAndSorted.length === 0 ? 0 : startIndex + 1;
  const showingEnd = Math.min(startIndex + PRODUCTS_PER_PAGE, filteredAndSorted.length);
  const totalCount = filteredAndSorted.length;

  // Category counts (based on current non-category filters)
  const categoryCounts = useMemo(() => {
    let base = [...mockProducts];
    if (selectedBrands.length > 0) base = base.filter((p) => selectedBrands.includes(p.brand));
    if (selectedSizes.length > 0) base = base.filter((p) => selectedSizes.includes(p.size));
    base = base.filter((p) => p.price <= priceRange);

    const counts: Record<string, number> = {};
    categoryOptions.forEach((cat) => {
      counts[cat] = base.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [selectedBrands, selectedSizes, priceRange]);

  // Page change handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sort change handler (resets page)
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // Price change handler (resets page)
  const handlePriceChange = (value: number) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-background-light min-h-screen">
      <main className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-4 border-background-dark border-dashed gap-4 relative">
          <div className="absolute -left-2 top-0 w-32 h-8 bg-primary/50 -rotate-3 z-0 pointer-events-none"></div>
          
          <div className="flex items-center gap-4 z-10">
            <div className="p-2 bg-background-dark text-white border-2 border-background-dark shadow-sketch transform rotate-3">
              <span className="material-icons text-3xl">filter_list</span>
            </div>
            <div>
              <h1 className="font-display text-5xl sm:text-6xl text-background-dark uppercase leading-[0.8] tracking-tighter transform -rotate-1">
                Shop Decks
              </h1>
              <p className="font-mono text-zinc-600 text-base mt-2 ml-2 transform rotate-1">
                _Showing {showingStart}-{showingEnd} of {totalCount} products_
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 z-10">
            {/* Sort Dropdown */}
            <div className="relative bg-white border-2 border-background-dark shadow-sketch">
              <select 
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-transparent text-sm font-bold font-mono pl-4 pr-12 py-3 outline-none cursor-pointer uppercase tracking-wider"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <span className="material-icons absolute right-3 top-2.5 pointer-events-none text-background-dark text-xl">expand_more</span>
            </div>

            {/* View Toggle */}
            <div className="flex bg-white border-2 border-background-dark p-1 gap-1 shadow-sketch">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1 ${viewMode === "grid" ? "bg-background-dark text-white" : "text-zinc-400 hover:text-black"} border border-background-dark transition-colors`}
              >
                <span className="material-icons text-xl">grid_view</span>
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1 ${viewMode === "list" ? "bg-background-dark text-white" : "text-zinc-400 hover:text-black"} transition-colors`}
              >
                <span className="material-icons text-xl">view_list</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-10 font-mono text-lg">
            {/* Category Filter */}
            <div className="relative">
              <div className="absolute -left-4 top-2 w-full h-4 bg-yellow-200 -z-10 -rotate-1"></div>
              <h3 className="font-display text-xl font-bold uppercase text-black mb-6 flex items-center justify-between border-b-2 border-black pb-2">
                Category
                <span className="material-icons">remove</span>
              </h3>
              <div className="space-y-3 pl-2">
                {categoryOptions.map((cat) => (
                  <label key={cat} className="flex items-center group cursor-pointer hover:translate-x-1 transition-transform">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-5 h-5 border-2 border-current rounded-none bg-transparent"
                    />
                    <span className={`ml-3 ${selectedCategories.includes(cat) ? "font-bold" : ""} group-hover:underline decoration-wavy decoration-primary`}>
                      {cat}
                    </span>
                    <span className="ml-auto font-mono text-sm bg-black text-white px-1 rounded-sm">{categoryCounts[cat]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-black mb-6 border-b-2 border-black pb-2">Price</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={priceRange}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full bg-transparent appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #1a1a1a ${((priceRange - 40) / 110) * 100}%, #e5e5e5 ${((priceRange - 40) / 110) * 100}%)`
                  }}
                />
                <div className="flex justify-between mt-4 font-mono font-bold text-sm">
                  <span>$40</span>
                  <span className="bg-yellow-400 px-1 transform -rotate-3 border border-black">${priceRange}</span>
                  <span>$150</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="relative">
              <h3 className="font-display text-xl font-bold uppercase text-black mb-6 border-b-2 border-black pb-2">Brand</h3>
              <div className="space-y-3 pl-2">
                {brandOptions.map((brand) => (
                  <label key={brand} className="flex items-center group cursor-pointer hover:translate-x-1 transition-transform">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-5 h-5 border-2 border-current rounded-none bg-transparent"
                    />
                    <span className={`ml-3 ${selectedBrands.includes(brand) ? "font-bold" : ""} group-hover:underline decoration-wavy decoration-primary`}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-black mb-6 border-b-2 border-black pb-2">Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-1 py-2 text-sm font-bold font-mono border-2 transition-colors ${
                      selectedSizes.includes(size)
                        ? "border-black bg-background-dark text-white transform -rotate-2 shadow-[2px_2px_0_0_#ccc]"
                        : "border-dashed border-gray-400 text-gray-500 hover:border-black hover:text-black bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="material-icons text-7xl text-zinc-300 mb-4">search_off</span>
                <h3 className="font-display text-2xl text-zinc-500 mb-2">No products found</h3>
                <p className="font-mono text-sm text-zinc-400">Try adjusting your filters to find what you&apos;re looking for.</p>
              </div>
            ) : (
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-8`}>
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
