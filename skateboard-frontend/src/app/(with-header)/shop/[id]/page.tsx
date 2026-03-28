"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

// Mock Data for this specific product
// To use your own images:
//   1. Place images in /public/images/products/ (e.g. ghost-ride-1.jpg)
//   2. The paths below already point to /images/products/...
//   3. The Image component will load them from the public folder
const product = {
  id: "1",
  name: "The Ghost Ride Pro",
  subtitle: "Pro Model",
  price: 74.99,
  rating: 4.5,
  reviews: 42,
  description:
    "Not just a board, that's as real as the places you take it. Featuring our signature \"Pop-Forever\" maple construction. Designed to handle the grittiest street spots and the smoothest bowls.",
  images: [
    "/images/products/ghost-ride-1.jpg",
    "/images/products/ghost-ride-2.jpg",
    "/images/products/ghost-ride-3.jpg",
    "/images/products/ghost-ride-4.jpg",
    "/images/products/ghost-ride-5.jpg",
  ],
  specs: [
    { label: "Concave", value: "Medium Steep" },
    { label: "Construction", value: "7-Ply Canadian Maple" },
    { label: "Wheelbase", value: "14.25\"" },
    { label: "Nose", value: "7.0\"" },
    { label: "Tail", value: "6.625\"" },
  ],
  shapeDesc: "The 'Ghost Ride' shape is built for technical street skating. The slightly steeper concave gives you that extra snap on your ollies, while the tapered nose helps with quick flip tricks. It's a classic popsicle shape refined for the modern era.",
  tags: ["#Street", "#Tech", "#Park"],
  artistBio: {
    name: "@alienz",
    realName: "Alex \"Alienz\" Rivera",
    avatar: "/images/products/artist-avatar.jpg",
    bio: "Born and raised in East LA, Alex has been creating art inspired by street culture and sci-fi since the age of 14. His unique style blends geometric precision with organic, otherworldly forms — earning him the nickname \"Alienz\" in the local skate scene. He's collaborated with brands like Thrasher, Vans, and now Victus to bring his vision to the board.",
    style: "Geometric / Alien Surrealism",
    location: "Los Angeles, CA",
    socials: {
      instagram: "@alienz.art",
      website: "alienz-art.com",
    },
  },
};

const relatedProducts = [
  {
    id: 101,
    name: "Demon Slayer 8.0\"",
    price: 59.99,
    image: "/images/products/demon-slayer.jpg"
  },
  {
    id: 102,
    name: "Pink Fury 8.25\"",
    price: 89.99,
    image: "/images/products/pink-fury.jpg",
    badge: "HOT"
  },
  {
    id: 103,
    name: "Thank You Repeat",
    price: 69.99,
    image: "/images/products/thank-you-repeat.jpg"
  },
  {
    id: 104,
    name: "Yellow Haze 8.5\"",
    price: 79.99,
    image: "/images/products/yellow-haze.jpg"
  }
];

// Size Guide Data
const sizeGuideData = [
  { width: "7.5\" - 7.75\"", height: "5'0\" - 5'4\"", shoeSize: "6 - 8 US", style: "Technical / Street" },
  { width: "7.875\" - 8.0\"", height: "5'4\" - 5'8\"", shoeSize: "8 - 10 US", style: "Street / All-Around" },
  { width: "8.0\" - 8.25\"", height: "5'6\" - 5'10\"", shoeSize: "9 - 11 US", style: "Street / Transition" },
  { width: "8.25\" - 8.5\"", height: "5'8\" - 6'2\"", shoeSize: "10 - 12 US", style: "Transition / Bowl" },
  { width: "8.5\" +", height: "6'0\" +", shoeSize: "11+ US", style: "Pool / Cruising" },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("8.0\"");
  const [gripTape, setGripTape] = useState("free");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "artist" | "video">("specs");
  const { addToCart } = useCart();

  return (
    <div className="bg-background-light text-gray-900 min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-white bg-texture">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply z-[49] bg-paper-texture"></div>

      {/* Scattered Skate Icon Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-skate-pattern"></div>
      
      {/* Added Team Page Stardust Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Warm Spotlight Glow behind product area */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-product-spotlight"></div>

      {/* ══════════ Size Guide Modal ══════════ */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSizeGuideOpen(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rough-border shadow-brutal-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
              <h2 className="font-anton text-3xl uppercase tracking-wide">Size Guide</h2>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-white hover:text-primary transition-colors"
              >
                <span className="material-icons text-3xl">close</span>
              </button>
            </div>

            <div className="p-6">
              {/* Intro */}
              <p className="font-mono text-sm text-gray-600 mb-6 border-l-4 border-primary pl-4">
                Not sure what size to pick? Use this guide to find the perfect deck width based on your height, shoe size, and riding style.
              </p>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left px-4 py-3 font-bebas text-lg tracking-wide border-b-2 border-black">Deck Width</th>
                      <th className="text-left px-4 py-3 font-bebas text-lg tracking-wide border-b-2 border-black">Rider Height</th>
                      <th className="text-left px-4 py-3 font-bebas text-lg tracking-wide border-b-2 border-black">Shoe Size</th>
                      <th className="text-left px-4 py-3 font-bebas text-lg tracking-wide border-b-2 border-black">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-dashed border-gray-300 hover:bg-brand-pink/20 transition-colors ${
                          selectedSize.startsWith(row.width.substring(0, 3)) ? "bg-primary/10 font-bold" : ""
                        }`}
                      >
                        <td className="px-4 py-3">{row.width}</td>
                        <td className="px-4 py-3">{row.height}</td>
                        <td className="px-4 py-3">{row.shoeSize}</td>
                        <td className="px-4 py-3">{row.style}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tips */}
              <div className="mt-6 bg-gray-50 rough-border-sm p-4">
                <h4 className="font-marker text-lg text-primary mb-2 transform -rotate-1">Pro Tips 💡</h4>
                <ul className="space-y-2 text-sm font-mono text-gray-600">
                  <li className="flex gap-2">
                    <span className="material-icons text-sm text-secondary mt-0.5">chevron_right</span>
                    Wider decks = more stability for transition skating & bigger feet
                  </li>
                  <li className="flex gap-2">
                    <span className="material-icons text-sm text-secondary mt-0.5">chevron_right</span>
                    Narrower decks = lighter weight & easier flip tricks
                  </li>
                  <li className="flex gap-2">
                    <span className="material-icons text-sm text-secondary mt-0.5">chevron_right</span>
                    When in doubt, go with 8.0&quot; — it&apos;s the most versatile size
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ══════════ Image Gallery Lightbox ══════════ */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-50 p-2 border-2 border-transparent hover:border-white rounded-full flex items-center justify-center"
          >
            <span className="material-icons text-4xl">close</span>
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
             <Image
              src={product.images[selectedImage]}
              alt="Gallery Image"
              fill
              className="object-contain"
              unoptimized
             />
             
             {/* Nav buttons */}
             <button
               onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1)); }}
               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 md:p-4 shadow-hard hover:bg-primary hover:scale-110 transition-all flex items-center justify-center border-4 border-black"
             >
               <span className="material-icons text-xl md:text-2xl ml-[-2px]">arrow_back_ios_new</span>
             </button>
             <button
               onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0)); }}
               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 md:p-4 shadow-hard hover:bg-primary hover:scale-110 transition-all flex items-center justify-center border-4 border-black"
             >
               <span className="material-icons text-xl md:text-2xl mr-[-2px]">arrow_forward_ios</span>
             </button>
          </div>
          
          {/* Thumbnails row */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 px-4 max-w-full overflow-x-auto pb-4">
             {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 flex-shrink-0 transition-all bg-white ${selectedImage === idx ? 'border-4 border-primary scale-110 z-10 shadow-brutal' : 'border-2 border-black opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`Thumb ${idx+1}`} fill className="object-cover" unoptimized />
                </button>
             ))}
          </div>
        </div>
      )}

      <main className="relative z-10 pt-12 pb-24">
         {/* Background Text Overlay */}
        <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-5 z-0">
          <h2 className="text-[15rem] leading-none font-anton uppercase text-black whitespace-nowrap">Escape The Cul-De-Sac</h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex mb-8 font-mono text-sm font-bold text-gray-500">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-black border-b border-transparent hover:border-black">Home</Link></li>
              <li>/</li>
              <li><Link href="/shop" className="hover:text-black border-b border-transparent hover:border-black">Decks</Link></li>
              <li>/</li>
              <li className="text-black">{product.name}</li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left Column: Gallery */}
            <div className="flex flex-col gap-6 relative">
              <div className="relative bg-white rough-border p-8 shadow-brutal-lg group overflow-hidden">
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-yellow-400 text-black font-marker px-3 py-1 text-lg transform rotate-6 inline-block shadow-sm">Best Seller!</span>
                </div>
                <div className="relative w-full h-[600px] bg-gray-100 flex items-center justify-center">
                   <Image
                    src={product.images[selectedImage]}
                    alt="Main Product Image"
                    fill
                    className="object-contain transform group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                   />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx + 1)}
                    className={`rough-border-sm bg-white p-2 hover:bg-gray-100 transition relative h-24 shadow-sm hover:shadow-hard-hover hover:-translate-y-1 ${selectedImage === idx + 1 ? 'border-4 border-black ring-0' : 'border-2 border-black opacity-80 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-contain" unoptimized />
                  </button>
                ))}
                {product.images.length > 4 && (
                  <button
                     onClick={() => { setLightboxOpen(true); setSelectedImage(4); }}
                     className={`rough-border-sm bg-white p-2 transition relative h-24 overflow-hidden border-2 border-black shadow-sm group hover:shadow-hard-hover hover:-translate-y-1`}
                   >
                      <Image src={product.images[4]} alt="Lifestyle View" fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-anton text-2xl group-hover:bg-primary/80 transition-colors">
                       +{product.images.length - 4}
                     </div>
                   </button>
                )}
              </div>
            </div>

            {/* Right Column: details */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 relative">
               {/* Tape Effect */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200/80 -rotate-2 z-20 pointer-events-none opacity-80 shadow-sm hidden lg:block" style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0% 98%)" }}></div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-black text-white text-xs font-mono uppercase tracking-widest transform -rotate-1">{product.subtitle}</span>
                </div>
                <h1 className="text-5xl sm:text-7xl font-anton uppercase text-black tracking-tight leading-[0.85] mb-4">
                  The Ghost <br/>Ride <span className="text-primary grunge-text">Pro</span>
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-3xl font-mono font-bold text-gray-900">${product.price}</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4].map(s => <span key={s} className="material-icons text-yellow-500 text-xl">star</span>)}
                    <span className="material-icons text-yellow-500 text-xl">star_half</span>
                    <span className="text-sm font-bold ml-2 underline decoration-wavy decoration-gray-400 text-gray-600 cursor-pointer">{product.reviews} Reviews</span>
                  </div>
                </div>
                <p className="font-mono text-gray-700 leading-relaxed mb-8 border-l-4 border-brand-pink pl-4">
                  {product.description}
                </p>
              </div>

              <div className="space-y-6 border-t-2 border-dashed border-gray-300 pt-6">
                 {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bebas text-2xl tracking-wide text-gray-900">Select Size</h3>
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-xs font-marker bg-brand-pink border-2 border-black px-3 py-1 shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1 transform rotate-2"
                    >
                      <span className="material-icons text-[14px]">straighten</span> Size Guide?
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {["7.75\"", "8.0\"", "8.25\"", "8.5\""].map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`rough-border-sm py-2 font-bold font-mono text-sm transition-colors ${selectedSize === size ? "bg-black text-white transform -rotate-1 shadow-brutal" : "bg-gray-100 hover:bg-black hover:text-white"}`}
                        >
                            {size}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Grip Tape Selector */}
                <div>
                  <h3 className="font-bebas text-2xl tracking-wide text-gray-900 mb-3">Grip Tape</h3>
                  <div className="flex gap-4">
                    <label className="cursor-pointer">
                      <input type="radio" name="griptape" className="peer sr-only" checked={gripTape === "free"} onChange={() => setGripTape("free")} />
                      <div className="rough-border-sm px-4 py-2 border-2 border-transparent peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all font-mono text-sm font-bold bg-white">
                        Free Black
                      </div>
                    </label>
                    <label className="cursor-pointer">
                       <input type="radio" name="griptape" className="peer sr-only" checked={gripTape === "clear"} onChange={() => setGripTape("clear")} />
                      <div className="rough-border-sm px-4 py-2 border-2 border-transparent peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all font-mono text-sm font-bold bg-white flex items-center gap-2">
                        Clear (+$5) <span className="w-3 h-3 bg-gray-200 border border-gray-400 rounded-full inline-block"></span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div className="flex flex-col gap-4 pt-4">
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[selectedImage],
                      size: selectedSize,
                      gripTape: gripTape
                    })}
                    className="w-full bg-primary hover:bg-orange-600 text-black font-anton uppercase text-3xl py-4 px-8 shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all torn-paper border-2 border-black flex items-center justify-center"
                  >
                     Add To Cart <span className="material-icons align-middle ml-2 text-3xl">skateboarding</span>
                  </button>
                  <p className="text-center font-mono text-xs text-gray-500 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> In stock and ready to rip. Ships tomorrow.
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3 p-3 bg-white rough-border-sm">
                    <span className="material-icons text-2xl text-secondary">local_shipping</span>
                    <div>
                      <h4 className="font-bold font-bebas text-lg">Free Shipping</h4>
                      <p className="text-xs text-gray-500 font-mono">On orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rough-border-sm">
                    <span className="material-icons text-2xl text-secondary">verified</span>
                    <div>
                      <h4 className="font-bold font-bebas text-lg">Quality Wood</h4>
                      <p className="text-xs text-gray-500 font-mono">100% Canadian Maple</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════ Tabbed Specs / Artist Bio / Video Review Section ══════════ */}
          <div className="mt-24 max-w-4xl mx-auto">
             <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-6 py-3 text-xl md:text-2xl font-rubik-mono uppercase transition-all border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                    activeTab === "specs" ? "bg-primary text-black" : "bg-white text-gray-500 hover:text-black"
                  }`}
                >
                  The Specs
                </button>
                <button
                  onClick={() => setActiveTab("artist")}
                  className={`px-6 py-3 text-xl md:text-2xl font-rubik-mono uppercase transition-all border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                    activeTab === "artist" ? "bg-team-yellow text-black" : "bg-white text-gray-500 hover:text-black"
                  }`}
                >
                  Artist Bio
                </button>
                <button
                  onClick={() => setActiveTab("video")}
                  className={`px-6 py-3 text-xl md:text-2xl font-rubik-mono uppercase transition-all border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                    activeTab === "video" ? "bg-brand-pink text-black" : "bg-white text-gray-500 hover:text-black"
                  }`}
                >
                  Video Review
                </button>
            </div>

            {/* ── Tab: Specs ── */}
            {activeTab === "specs" && (
              <div className="bg-white border-[4px] border-black shadow-hard p-8 md:p-12 relative z-10 mix-blend-normal">
                 <div className="absolute -left-4 -top-4 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white z-20 border-2 border-white">
                   <span className="material-icons">bolt</span>
                 </div>
                 <div className="grid md:grid-cols-2 gap-8">
                   <ul className="space-y-4 font-mono text-sm">
                     {product.specs.map((spec, idx) => (
                       <li key={idx} className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                         <span className="font-bold">{spec.label}:</span>
                         <span>{spec.value}</span>
                       </li>
                     ))}
                   </ul>
                   <div className="relative">
                     <h4 className="font-marker text-xl mb-4 transform -rotate-2 text-primary">Why this shape?</h4>
                     <p className="font-sans text-gray-600 leading-relaxed">{product.shapeDesc}</p>
                     <div className="mt-4 flex gap-2">
                       {product.tags.map(tag => (
                         <span key={tag} className="px-2 py-1 bg-gray-200 text-xs font-bold font-mono rounded">{tag}</span>
                       ))}
                     </div>
                   </div>
                 </div>
              </div>
            )}

            {/* ── Tab: Artist Bio ── */}
            {activeTab === "artist" && (
              <div className="bg-white border-[4px] border-black shadow-hard p-8 md:p-12 relative z-10 mix-blend-normal">
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-black border-2 border-black shadow-sm z-20">
                  <span className="material-icons">brush</span>
                </div>
                <div className="grid md:grid-cols-[180px_1fr] gap-8">
                  {/* Artist Avatar */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-36 h-36 relative rounded-full overflow-hidden rough-border-sm bg-gray-100">
                      <Image
                        src={product.artistBio.avatar}
                        alt={product.artistBio.realName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="font-marker text-primary text-lg">{product.artistBio.name}</span>
                  </div>

                  {/* Bio Content */}
                  <div>
                    <h3 className="font-anton text-3xl uppercase mb-1">{product.artistBio.realName}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        🎨 {product.artistBio.style}
                      </span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        📍 {product.artistBio.location}
                      </span>
                    </div>
                    <p className="font-sans text-gray-600 leading-relaxed mb-6">{product.artistBio.bio}</p>
                    <div className="flex gap-4 border-t border-dashed border-gray-300 pt-4">
                      <a
                        href={`https://instagram.com/${product.artistBio.socials.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-sm font-bold hover:text-primary transition-colors group"
                      >
                        <span className="material-icons text-lg group-hover:scale-110 transition-transform">camera_alt</span>
                        {product.artistBio.socials.instagram}
                      </a>
                      <a
                        href={`https://${product.artistBio.socials.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-sm font-bold hover:text-primary transition-colors group"
                      >
                        <span className="material-icons text-lg group-hover:scale-110 transition-transform">language</span>
                        {product.artistBio.socials.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab: Video Review ── */}
            {activeTab === "video" && (
              <div className="bg-white border-[4px] border-black shadow-hard p-8 md:p-12 relative z-10 mix-blend-normal">
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-black border-2 border-black shadow-sm z-20">
                  <span className="material-icons">play_arrow</span>
                </div>
                <h3 className="font-anton text-2xl uppercase mb-4">Board Review — The Ghost Ride Pro</h3>
                <p className="font-mono text-sm text-gray-500 mb-6">Watch our team rider break down the Ghost Ride Pro — from first impressions to kickflip tests.</p>
                <div className="relative w-full aspect-video rough-border-sm overflow-hidden bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Ghost Ride Pro Board Review"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mt-4 font-mono text-xs text-gray-400 text-center">
                  Video by Victus Skate Media · Published Jan 2026
                </p>
              </div>
            )}
          </div>

          {/* Related Products: Fresh Cuts */}
          <div className="mt-24 border-t-4 border-black pt-12">
             <div className="flex justify-between items-end mb-12">
                <h2 className="text-6xl font-anton uppercase text-black leading-none tracking-tight">Fresh Cuts</h2>
                <Link href="/shop" className="hidden sm:inline-block font-marker text-xl text-primary hover:text-black transition-colors underline decoration-wavy">See all drops -&gt;</Link>
             </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(prod => (
                 <div key={prod.id} className="group relative">
                    {prod.badge && (
                       <div className="absolute -top-2 -left-2 bg-brand-pink text-black font-bold font-mono text-xs px-2 py-1 z-20 border border-black transform -rotate-6">{prod.badge}</div>
                    )}
                    <div className="aspect-[2/3] bg-gray-100 border-[4px] border-black mb-4 overflow-hidden relative shadow-hard group-hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all group-hover:-translate-y-2">
                       <Image src={prod.image} alt={prod.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" unoptimized />
                       <button className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center border-2 border-transparent">
                          <span className="material-icons">add</span>
                       </button>
                    </div>
                    <h3 className="font-bebas text-2xl text-black">{prod.name}</h3>
                    <p className="font-mono text-primary font-bold">${prod.price}</p>
                 </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
