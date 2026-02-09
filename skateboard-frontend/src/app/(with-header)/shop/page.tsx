"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Oni Mask Pro",
    category: "Pro Model",
    price: 59.99,
    rating: 4.5,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=400&h=500&fit=crop",
    badge: "New!",
    badgeColor: "bg-primary",
  },
  {
    id: 2,
    name: "Pink Glitch",
    category: "Art Series",
    price: 89.99,
    rating: 5,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Thank You",
    category: "Team Deck",
    price: 69.99,
    rating: 4,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1564429238535-b5e3a8527c87?w=400&h=500&fit=crop",
    badge: "HOT",
    badgeColor: "bg-yellow-400",
    badgeRounded: true,
  },
  {
    id: 4,
    name: "Suburbia Yell",
    category: "Signature",
    price: 79.99,
    rating: 5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1531565637446-32307b194362?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Azure Deep",
    category: "Cruiser",
    price: 64.99,
    rating: 3.5,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?w=400&h=500&fit=crop",
  },
  {
    id: 6,
    name: "Raw Maple",
    category: "Blank",
    price: 54.99,
    rating: 4,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=500&fit=crop",
  },
];

const categories = [
  { name: "Pro Models", count: 24 },
  { name: "Team Decks", count: 12, checked: true },
  { name: "Cruisers", count: 8 },
  { name: "Old School", count: 4 },
];

const brands = [
  { name: "Suburbia", checked: true },
  { name: "Alien Workshop" },
  { name: "Baker" },
  { name: "Santa Cruz" },
];

const sizes = ["7.75", "8.0", "8.125", "8.25", "8.38", "8.5"];

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

function ProductCard({ product }: { product: typeof mockProducts[0] }) {
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

        {/* Product Image */}
        <div className="relative h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
          />
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
          <button className="h-10 px-3 bg-primary text-white font-display font-bold border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all flex items-center justify-center text-sm -rotate-2 hover:rotate-0">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [selectedSize, setSelectedSize] = useState("8.0");
  const [priceRange, setPriceRange] = useState(90);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

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
                _Showing 1-12 of 48 products_
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 z-10">
            {/* Sort Dropdown */}
            <div className="relative bg-white border-2 border-background-dark shadow-sketch">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
                {categories.map((cat) => (
                  <label key={cat.name} className="flex items-center group cursor-pointer hover:translate-x-1 transition-transform">
                    <input
                      type="checkbox"
                      defaultChecked={cat.checked}
                      className="w-5 h-5 border-2 border-current rounded-none bg-transparent"
                    />
                    <span className={`ml-3 ${cat.checked ? "font-bold" : ""} group-hover:underline decoration-wavy decoration-primary`}>
                      {cat.name}
                    </span>
                    <span className="ml-auto font-mono text-sm bg-black text-white px-1 rounded-sm">{cat.count}</span>
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
                  onChange={(e) => setPriceRange(Number(e.target.value))}
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
                {brands.map((brand) => (
                  <label key={brand.name} className="flex items-center group cursor-pointer hover:translate-x-1 transition-transform">
                    <input
                      type="checkbox"
                      defaultChecked={brand.checked}
                      className="w-5 h-5 border-2 border-current rounded-none bg-transparent"
                    />
                    <span className={`ml-3 ${brand.checked ? "font-bold" : ""} group-hover:underline decoration-wavy decoration-primary`}>
                      {brand.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-black mb-6 border-b-2 border-black pb-2">Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-1 py-2 text-sm font-bold font-mono border-2 transition-colors ${
                      selectedSize === size
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
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-8`}>
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex items-center justify-center">
              <nav className="flex items-center gap-3">
                <button className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black shadow-sketch text-black hover:bg-black hover:text-white transition-colors transform hover:-translate-y-1">
                  <span className="material-icons">chevron_left</span>
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-background-dark text-white font-display text-xl border-2 border-black shadow-sketch -rotate-2">
                  1
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-white text-black font-display text-xl border-2 border-black shadow-sketch hover:bg-gray-100 transition-colors rotate-2">
                  2
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-white text-black font-display text-xl border-2 border-black shadow-sketch hover:bg-gray-100 transition-colors">
                  3
                </button>
                <span className="text-black font-bold text-2xl px-2 tracking-widest">...</span>
                <button className="w-12 h-12 flex items-center justify-center bg-white text-black font-display text-xl border-2 border-black shadow-sketch hover:bg-gray-100 transition-colors hover:rotate-2">
                  8
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black shadow-sketch text-black hover:bg-black hover:text-white transition-colors transform hover:-translate-y-1">
                  <span className="material-icons">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
