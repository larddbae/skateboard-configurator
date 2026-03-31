"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter, notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Part } from "@/lib/types";
import { fetchPartById, fetchPartsByCategory } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const SERVER_BASE_URL = API_URL.replace(/\/api\/?$/, "");

// Size Guide Data
const sizeGuideData = [
  { width: "7.5\" - 7.75\"", height: "5'0\" - 5'4\"", shoeSize: "6 - 8 US", style: "Technical / Street" },
  { width: "7.875\" - 8.0\"", height: "5'4\" - 5'8\"", shoeSize: "8 - 10 US", style: "Street / All-Around" },
  { width: "8.0\" - 8.25\"", height: "5'6\" - 5'10\"", shoeSize: "9 - 11 US", style: "Street / Transition" },
  { width: "8.25\" - 8.5\"", height: "5'8\" - 6'2\"", shoeSize: "10 - 12 US", style: "Transition / Bowl" },
  { width: "8.5\" +", height: "6'0\" +", shoeSize: "11+ US", style: "Pool / Cruising" },
];

// Category labels
const categoryLabels: Record<string, string> = {
  deck: "Deck",
  wheel: "Wheel",
  truck: "Truck",
  bolt: "Bolt",
};

// Artist Bio (static for now — will be dynamic in the future)
const artistBio = {
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
};

function getImageUrl(part: Part): string {
  if (part.texture_url) {
    if (part.texture_url.startsWith("/storage/")) {
      return `${SERVER_BASE_URL}${part.texture_url}`;
    }
    return part.texture_url;
  }
  return "";
}

// ─── Loading Skeleton for Product Detail ────────────────────────────────────

function ProductDetailSkeleton() {
  return (
    <div className="bg-background-light text-gray-900 min-h-screen relative overflow-x-hidden bg-texture animate-pulse">
      <main className="relative z-10 pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb skeleton */}
          <div className="flex gap-2 mb-8">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left: image skeleton */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rough-border p-8 shadow-brutal-lg">
                <div className="w-full h-[600px] bg-gray-200"></div>
              </div>
            </div>

            {/* Right: details skeleton */}
            <div className="mt-10 lg:mt-0 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-16 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-10 bg-gray-200 rounded"></div>)}
              </div>
              <div className="h-14 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Part | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedSize, setSelectedSize] = useState("8.0\"");
  const [gripTape, setGripTape] = useState("free");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "artist" | "video">("specs");
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Fetch product data
  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError(false);
        const part = await fetchPartById(Number(productId));
        setProduct(part);

        // Fetch related products (same category, exclude current)
        const related = await fetchPartsByCategory(part.category);
        setRelatedProducts(related.filter(p => p.id !== part.id).slice(0, 4));
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  // Handle add to cart with auth check
  const handleAddToCart = () => {
    if (!product) return;

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    const imageUrl = getImageUrl(product);
    addToCart({
      id: String(product.id),
      name: product.name,
      price: Number(product.price),
      image: imageUrl,
      size: selectedSize,
      gripTape: gripTape,
    });
  };

  if (isLoading) return <ProductDetailSkeleton />;
  if (error || !product) {
    notFound();
  }

  const productImageUrl = getImageUrl(product);
  const images = productImageUrl ? [productImageUrl] : [];

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
              <li><Link href="/shop" className="hover:text-black border-b border-transparent hover:border-black">Shop</Link></li>
              <li>/</li>
              <li className="text-black">{product.name}</li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left Column: Gallery */}
            <div className="flex flex-col gap-6 relative">
              <div className="relative bg-white rough-border p-8 shadow-brutal-lg group overflow-hidden">
                {product.stock <= 5 && product.stock > 0 && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-yellow-400 text-black font-marker px-3 py-1 text-lg transform rotate-6 inline-block shadow-sm">Low Stock!</span>
                  </div>
                )}
                {product.stock > 5 && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-yellow-400 text-black font-marker px-3 py-1 text-lg transform rotate-6 inline-block shadow-sm">In Stock</span>
                  </div>
                )}
                <div className="relative w-full h-[600px] bg-gray-100 flex items-center justify-center">
                  {productImageUrl ? (
                    <Image
                      src={productImageUrl}
                      alt={product.name}
                      fill
                      className="object-contain transform group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-400 gap-4">
                      <span className="material-icons text-[8rem]">skateboarding</span>
                      <span className="font-mono text-base uppercase tracking-wider">No Image Available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: details */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 relative">
               {/* Tape Effect */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200/80 -rotate-2 z-20 pointer-events-none opacity-80 shadow-sm hidden lg:block" style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0% 98%)" }}></div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-black text-white text-xs font-mono uppercase tracking-widest transform -rotate-1">{categoryLabels[product.category] || product.category}</span>
                </div>
                <h1 className="text-5xl sm:text-7xl font-anton uppercase text-black tracking-tight leading-[0.85] mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-3xl font-mono font-bold text-gray-900">${Number(product.price).toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${product.stock > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                    <span className="text-sm font-mono text-gray-600">
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>
                <p className="font-mono text-gray-700 leading-relaxed mb-8 border-l-4 border-brand-pink pl-4">
                  {product.description || "Premium skateboard component, built for performance and durability."}
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
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`w-full font-anton uppercase text-3xl py-4 px-8 shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all torn-paper border-2 border-black flex items-center justify-center ${
                      product.stock === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary hover:bg-orange-600 text-black"
                    }`}
                  >
                     Add To Cart <span className="material-icons align-middle ml-2 text-3xl">skateboarding</span>
                  </button>
                  <p className="text-center font-mono text-xs text-gray-500 flex items-center justify-center gap-2">
                    {product.stock > 0 ? (
                      <>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> In stock and ready to rip. Ships tomorrow.
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span> Currently out of stock.
                      </>
                    )}
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
                      <h4 className="font-bold font-bebas text-lg">Quality Parts</h4>
                      <p className="text-xs text-gray-500 font-mono">Premium components</p>
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
                     <li className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                       <span className="font-bold">Category:</span>
                       <span>{categoryLabels[product.category] || product.category}</span>
                     </li>
                     <li className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                       <span className="font-bold">Weight:</span>
                       <span>{product.weight} kg</span>
                     </li>
                     <li className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                       <span className="font-bold">Durability:</span>
                       <span>{product.durability}/100</span>
                     </li>
                     <li className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                       <span className="font-bold">Speed:</span>
                       <span>{product.speed}/100</span>
                     </li>
                     <li className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                       <span className="font-bold">Pop:</span>
                       <span>{product.pop}/100</span>
                     </li>
                     <li className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                       <span className="font-bold">Stock:</span>
                       <span>{product.stock} units</span>
                     </li>
                   </ul>
                   <div className="relative">
                     <h4 className="font-marker text-xl mb-4 transform -rotate-2 text-primary">Performance Stats</h4>
                     {/* Stats Bars */}
                     <div className="space-y-4">
                       {[
                         { label: "Durability", value: product.durability },
                         { label: "Speed", value: product.speed },
                         { label: "Pop", value: product.pop },
                       ].map((stat) => (
                         <div key={stat.label}>
                           <div className="flex justify-between font-mono text-sm mb-1">
                             <span className="font-bold">{stat.label}</span>
                             <span>{stat.value}%</span>
                           </div>
                           <div className="w-full bg-gray-200 h-3 border border-black">
                             <div
                               className="h-full bg-primary transition-all duration-500"
                               style={{ width: `${stat.value}%` }}
                             ></div>
                           </div>
                         </div>
                       ))}
                     </div>
                     <div className="mt-4 flex gap-2">
                       <span className="px-2 py-1 bg-gray-200 text-xs font-bold font-mono rounded">#{product.category}</span>
                       {product.stock > 0 && <span className="px-2 py-1 bg-gray-200 text-xs font-bold font-mono rounded">#InStock</span>}
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
                        src={artistBio.avatar}
                        alt={artistBio.realName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="font-marker text-primary text-lg">{artistBio.name}</span>
                  </div>

                  {/* Bio Content */}
                  <div>
                    <h3 className="font-anton text-3xl uppercase mb-1">{artistBio.realName}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        🎨 {artistBio.style}
                      </span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        📍 {artistBio.location}
                      </span>
                    </div>
                    <p className="font-sans text-gray-600 leading-relaxed mb-6">{artistBio.bio}</p>
                    <div className="flex gap-4 border-t border-dashed border-gray-300 pt-4">
                      <a
                        href={`https://instagram.com/${artistBio.socials.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-sm font-bold hover:text-primary transition-colors group"
                      >
                        <span className="material-icons text-lg group-hover:scale-110 transition-transform">camera_alt</span>
                        {artistBio.socials.instagram}
                      </a>
                      <a
                        href={`https://${artistBio.socials.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-sm font-bold hover:text-primary transition-colors group"
                      >
                        <span className="material-icons text-lg group-hover:scale-110 transition-transform">language</span>
                        {artistBio.socials.website}
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
                <h3 className="font-anton text-2xl uppercase mb-4">Board Review — {product.name}</h3>
                <p className="font-mono text-sm text-gray-500 mb-6">Watch our team rider break down the {product.name} — from first impressions to performance tests.</p>
                <div className="relative w-full aspect-video rough-border-sm overflow-hidden bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title={`${product.name} Board Review`}
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
          {relatedProducts.length > 0 && (
            <div className="mt-24 border-t-4 border-black pt-12">
               <div className="flex justify-between items-end mb-12">
                  <h2 className="text-6xl font-anton uppercase text-black leading-none tracking-tight">More {categoryLabels[product.category] || 'Parts'}</h2>
                  <Link href="/shop" className="hidden sm:inline-block font-marker text-xl text-primary hover:text-black transition-colors underline decoration-wavy">See all drops -&gt;</Link>
               </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(prod => {
                  const prodImageUrl = getImageUrl(prod);
                  return (
                    <Link key={prod.id} href={`/shop/${prod.id}`} className="group relative block">
                      <div className="aspect-[2/3] bg-gray-100 border-[4px] border-black mb-4 overflow-hidden relative shadow-hard group-hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all group-hover:-translate-y-2 flex items-center justify-center">
                        {prodImageUrl ? (
                          <Image src={prodImageUrl} alt={prod.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" unoptimized />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-zinc-400 gap-2">
                            <span className="material-icons text-5xl">skateboarding</span>
                            <span className="font-mono text-xs uppercase tracking-wider">No Image</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-bebas text-2xl text-black">{prod.name}</h3>
                      <p className="font-mono text-primary font-bold">${Number(prod.price).toFixed(2)}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
