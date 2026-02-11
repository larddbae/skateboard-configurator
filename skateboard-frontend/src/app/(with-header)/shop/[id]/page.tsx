"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

// Mock Data for this specific product
const product = {
  id: "1",
  name: "The Ghost Ride Pro",
  subtitle: "Pro Model",
  designer: "@alienz",
  price: 74.99,
  rating: 4.5,
  reviews: 42,
  description:
    "Not just a board, that's as real as the places you take it. Featuring our signature \"Pop-Forever\" maple construction. Designed to handle the grittiest street spots and the smoothest bowls.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGAVL8BHVBmks65EOUg4ZN6qSA560uPIunP-x3AV8oHiITlolkRMCDrcK3saougbjBekhTukqcC1KqqlhXp-yQbBvvorQ1Jc_p71Qmvq93tJFdHvCrx590euMLE4r8P4exl3rssrXEOSWLlD7ZwBaVHN3h4L7nPNszu6PY8CDWgtzB7faUqBsgJvolgffph1uqq1JrWu8HZ6KL8v8VRKmO_yI4US2rxVEfEHrL_HGMWCzJ24RAlwJNerV4IVxnFbMw4kIi6aiiPxU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAivdu-MHluxmBesEg2ju6xANLTrno4Vxyh8GMM_wPnAdIn7wjnvo_cupYh4cQPEni4ieHI-mhlyFxYrAxrHVJ8SyPxSKP1CGfNkuNnUQ6aFrGt7QSDEucS-i40Xkh6CPuVUf_ZfK28GAxIi3mrLEkOpTrEFRcp4zevqYuKbl9lqf6wphfK2AJFAIEY0LCPUhLmE2YbJbMHI3BtAqjYMuaVRf-lhgw9DLZToD7sFXdcJ0RZ3t_ah01dLaf6UZU8MtTY3BdLp-J2xVw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBSML9hKkk0EXlhL-G8px6cqUkB8AMrlP2iK85Q_djVfs_Wz0yTw6FF0tU_LSkPi8V79pH-hIaWRrRp6qp2cQIUfxNz_XH_2xcB9U_dDGLlMYgFZiPAt6h4pAcp_Ld-fXpFrX9T7GWGEAWPyV2G9mp76wBwpVOs3k8VVR4j2LKHFIu2cT1Cr7OmNUxcsOMmNZhwbF9yJEWd4iZsDuzheJweJifHdAzH0dX1QGVqm2nk6jYSLl5Lz5O-SYP5VMA6Ij4fUNQK0B-1sB8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYErWCVIOjp7yc0o0aILQU7RhntCmbA5mQruGs22P02o7qgbMTle5CTvZxrUWVWQ_9KSy74SXJL5HJiz6Vj_NjNV1Gw_SvjcKUm7qkUExJbgmvLGNWJM2eWzb5bLeF1MFY1nMkQj71Mtm83fScJp2inpe12gnXGuc98lWYCbzU_dDGLlMYgFZiPAt6h4pAcp_Ld-fXpFrX9T7GWGEAWPyV2G9mp76wBwpVOs3k8VVR4j2LKHFIu2cT1Cr7OmNUxcsOMmNZhwbF9yJEWd4iZsDuzheJweJifHdAzH0dX1QGVqm2nk6jYSLl5Lz5O-SYP5VMA6Ij4fUNQK0B-1sB8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDQZ_aAJXkz76TJYXbaOwGHfPwQeYYwvpFMGkvzRPYGmAil4m3G7UrkgBFqHYRSFso2z8L4uu9-ePMgV0FdIpv0ShhkIU8zFKonzEXgp-_d4aSF1VP5Za_elPUVxyhoFX3NFzOo-aulUE2zPpLV7e5L8GMurckXglIjTtxzRRVX5WBX2X-jYJFCXxXWscnrAGpXWIIkkW3BcJVGIk7sksUx7A41ZE06pYf8UTB7NNnPITQxqZ6gZ-fxNEfY22oSK1GIlGDCKBVa5Ek",
  ],
  specs: [
    { label: "Concave", value: "Medium Steep" },
    { label: "Construction", value: "7-Ply Canadian Maple" },
    { label: "Wheelbase", value: "14.25\"" },
    { label: "Nose", value: "7.0\"" },
    { label: "Tail", value: "6.625\"" },
  ],
  shapeDesc: "The 'Ghost Ride' shape is built for technical street skating. The slightly steeper concave gives you that extra snap on your ollies, while the tapered nose helps with quick flip tricks. It's a classic popsicle shape refined for the modern era.",
  tags: ["#Street", "#Tech", "#Park"]
};

const relatedProducts = [
  {
    id: 101,
    name: "Demon Slayer 8.0\"",
    price: 59.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlshLxksLBmR70svpGGypqsnF43pQf2jfr31FGuEf03l_JEV2J9M2kt6dNek0StHtpT_vojmgEk2R2LJOk3FwhEiQoHVKzDeIz0hVNSy36feLR3I3AGU2hP2-tQxFua-FXq82y7fYPkil5da6waXlmVUJt5QK9VX4CovaBM8PDuH0jpgtDVhWXSlt6XwOmGfrUQwPrscc20hm0ldzodObXkiTNj3WJ47UTGNp3QryVWv3vabMzSDVfxib8hnkw87swZjt2-V4XXn8"
  },
  {
    id: 102,
    name: "Pink Fury 8.25\"",
    price: 89.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCrMs0a2xLuvqscrhvwlkb6BApPkPQfJIKbrG_0wLC_CJzdUwrcR4lR1muzmKZDYdTqwuf5M15YVL2raH3Pw17uu_DHYOCPtASObLtzL3syHr5uwCGIy9YGZEm_zFu7Y7T0p8absKLIOWfh_l48S4SgEmW_QUxKewPxKRmfxzs-EXdu1cN_CezcaE7UOuHck_PrTAv2frOfeg70ZbzivL9jnHClGmy8RTsjMtAAhkUrHb9V-OAChBnuoJSee7jdWFbLuu7vWOBNmo",
    badge: "HOT"
  },
  {
    id: 103,
    name: "Thank You Repeat",
    price: 69.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRu4hZekIMnAo7_oyn4a8Nqy72EquePkp1BosoZPo8EyvF96BUIh8F7_Zah9hkCDibYdUIzIysUQ05sdZUGBLQ8eweTF0eDK0eA1kR1-tb7yBzE5zkanwQVnb91GYeowZMSLRKgBGJ7mhK8zy6ov5S-Fs5XhxO_Q20zlGY6Dg_YATNI6Bq4-CzMafae-tvMBXDEjiSWYtjH7zzq3qL7VldLGlR6AE6oBZbRzscOLVQiiePgoEdkMON0dXVaz6elMHlo4wm_0cq_P0"
  },
  {
    id: 104,
    name: "Yellow Haze 8.5\"",
    price: 79.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmbjWThxgDXf9wa5SZL-_58MWHF8WBFOl9J5_30atU0hit1F6dpKgsq3syS5eNZzv6BNdg_NrXtnJdacGx8cKeMselYtERNb2sty9oyT8fi_GNuyMRsOpsEjJhdS0dy5chC2_YBnzM_rsr0tM3N0CqFao4osb6STXAa6de6rgmig9Yrp6kaZFymWXSIrjgMqic_kEJF7RJ70_rJTfyY1dO2xxsSTFpmAhUuAlk2CAovMtu1IJLpPTLvW2UU_IllKjatLeRWtnPNh8"
  }
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("8.0\"");
  const [gripTape, setGripTape] = useState("free");
  const { addToCart } = useCart();

  return (
    <div className="bg-background-light text-gray-900 min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply z-50 bg-paper-texture"></div>

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
                <div className="relative w-full h-[600px]">
                   <Image
                    src={product.images[selectedImage]}
                    alt="Main Product Image"
                    fill
                    className="object-contain transform group-hover:scale-105 transition-transform duration-500"
                   />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx + 1)}
                    className={`rough-border-sm bg-white p-2 hover:bg-gray-100 transition relative h-24 ${selectedImage === idx + 1 ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-contain" />
                  </button>
                ))}
                 <button
                    onClick={() => setSelectedImage(4)}
                    className={`rough-border-sm bg-white p-2 hover:bg-gray-100 transition relative h-24 overflow-hidden ${selectedImage === 4 ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                  >
                     <Image src={product.images[4]} alt="Lifestyle View" fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-bebas text-xl">+2</div>
                  </button>
              </div>
            </div>

            {/* Right Column: details */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 relative">
               {/* Tape Effect */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200/80 -rotate-2 z-20 pointer-events-none opacity-80 shadow-sm hidden lg:block" style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0% 98%)" }}></div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-black text-white text-xs font-mono uppercase tracking-widest transform -rotate-1">{product.subtitle}</span>
                  <span className="text-secondary font-marker text-sm">Design by {product.designer}</span>
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
                    <a href="#" className="text-xs font-bold font-mono underline hover:text-primary">Size Guide?</a>
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

          {/* Specs Section */}
          <div className="mt-24 max-w-4xl mx-auto">
             <div className="border-b-4 border-black mb-8 flex space-x-8 overflow-x-auto">
                <button className="pb-2 text-2xl font-anton uppercase border-b-4 border-primary -mb-1 text-black">The Specs</button>
                <button className="pb-2 text-2xl font-anton uppercase text-gray-400 hover:text-black transition-colors">Artist Bio</button>
                <button className="pb-2 text-2xl font-anton uppercase text-gray-400 hover:text-black transition-colors">Video Review</button>
            </div>
            <div className="bg-white rough-border p-8 relative">
               <div className="absolute -left-4 -top-4 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white z-20">
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
          </div>

          {/* Related Products: Fresh Cuts */}
          <div className="mt-24 border-t-4 border-black pt-12">
            <div className="flex justify-between items-end mb-12">
               <h2 className="text-6xl font-anton uppercase text-black leading-none">Fresh <br/>Cuts</h2>
               <Link href="/shop" className="hidden sm:block font-marker text-xl text-primary hover:text-black transition-colors underline decoration-wavy">See all drops -&gt;</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(prod => (
                 <div key={prod.id} className="group relative">
                    {prod.badge && (
                       <div className="absolute -top-2 -left-2 bg-brand-pink text-black font-bold font-mono text-xs px-2 py-1 z-20 border border-black transform -rotate-6">{prod.badge}</div>
                    )}
                    <div className="aspect-[2/3] bg-gray-100 rough-border-sm mb-4 overflow-hidden relative">
                       <Image src={prod.image} alt={prod.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" />
                       <button className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-brutal flex items-center justify-center">
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
