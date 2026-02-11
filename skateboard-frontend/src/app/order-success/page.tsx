"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Clear cart on mount (simulating post-checkout clean slate)
    // In a real app, this would happen only if we verify the order ID or payment status
    // For now, we assume if they land here, it's done.
    // However, to avoid clearing it if they refresh? 
    // We'll clear it with a small delay to ensure the UI doesn't flash empty if we were showing it? 
    // Actually, this page doesn't show the cart items from context, it shows a static/mock receipt.
    // So clearing immediately is fine.
    clearCart();
  }, [clearCart]);

  if (!mounted) return null;

  return (
    <div className="font-courier bg-background-light text-gray-900 dark:text-gray-100 min-h-screen relative overflow-x-hidden transition-colors duration-300">
       {/* Background Noise used in code.html 'bg-noise' */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-grain-texture z-0 mix-blend-overlay"></div>
      
      {/* Watermark */}
      <div className="fixed top-20 left-0 w-full h-full pointer-events-none z-0 flex justify-center items-center overflow-hidden">
        <h1 className="text-[15vw] md:text-[20vw] leading-none select-none transform -rotate-12 opacity-5 font-rubik font-black text-transparent stroke-2 stroke-black" style={{ WebkitTextStroke: "2px rgba(0,0,0,0.1)" }}>
          SUBURBIA
        </h1>
      </div>

      <nav className="sticky top-0 z-50 bg-background-light/90 backdrop-blur-sm border-b-2 border-black px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Link href="/" className="font-display text-2xl md:text-3xl text-black transform -rotate-2">SUBURBIA</Link>
            <span className="bg-suburbia-lime text-black text-xs font-bold px-2 py-1 rounded-sm shadow-[2px_2px_0_0_#000] transform rotate-3 border border-black">SKATE</span>
        </div>
        <div className="hidden md:flex gap-8 font-bold uppercase tracking-wider text-sm">
            <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-brand-orange transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-brand-orange transition-colors">Zine</Link>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-orange rounded-full border-2 border-black flex items-center justify-center font-bold text-white shadow-[2px_2px_0_0_#000] cursor-pointer">
                AD
            </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-12 relative">
             {/* Icon Bounce */}
            <div className="absolute -top-10 -right-8 md:-right-16 md:-top-16 animate-bounce">
                <svg className="w-20 h-20 md:w-32 md:h-32 drop-shadow-lg transform rotate-12" fill="none" viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" fill="#d9f154" r="45" stroke="black" strokeWidth="3"></circle>
                    <path d="M28 50L45 67L75 35" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"></path>
                </svg>
            </div>
            <h1 className="font-rubik font-black text-5xl md:text-7xl lg:text-8xl mb-4 text-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                ORDER<br/><span className="text-brand-orange">CONFIRMED!</span>
            </h1>
            <p className="font-courier font-bold text-lg md:text-xl max-w-lg mx-auto bg-white border-2 border-black p-2 transform -rotate-1 shadow-[4px_4px_0_0_#000]">
                Pack your bags, kid. Your gear is on the way.
            </p>
        </div>

        {/* Receipt Container */}
        <div className="w-full max-w-2xl bg-paper-cream border-2 border-black p-8 md:p-12 shadow-[4px_4px_0_0_#000] relative">
            {/* Rough Edge Bottom - simulated with clip-path or image. Design uses clip-path .rough-edge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-suburbia-purple/80 rotate-2 shadow-sm border border-white/20"></div>
            
            <div className="flex justify-between items-start mb-8 border-b-2 border-dashed border-black/20 pb-6">
                <div>
                    <h3 className="font-rubik font-bold text-2xl mb-1 text-black">Receipt</h3>
                    <p className="text-sm opacity-60">Order #SUB-8921-X</p>
                </div>
                <div className="text-right">
                    <p className="font-bold">Date</p>
                    <p className="text-sm">Oct 24, 2026</p>
                </div>
            </div>

            <div className="space-y-6 mb-8">
                 {/* Mock Items for Display (since we cleared cart) */}
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 border-2 border-black p-1 shrink-0 transform -rotate-2 overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=200&h=200&fit=crop" width={80} height={80} alt="Skateboard Deck Art" className="w-full h-full object-cover grayscale contrast-125" />
                    </div>
                    <div className="flex-grow">
                        <h4 className="font-bold text-lg text-black">Demon Slayer Deck</h4>
                        <p className="text-sm opacity-70">Size: 8.25&quot; | Custom Grip</p>
                    </div>
                    <div className="text-right font-bold text-xl text-black">
                        $59.99
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 border-2 border-black p-1 shrink-0 transform rotate-1 overflow-hidden">
                         <Image src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=200&h=200&fit=crop" width={80} height={80} alt="Skateboard Wheels" className="w-full h-full object-cover grayscale contrast-125" />
                    </div>
                    <div className="flex-grow">
                        <h4 className="font-bold text-lg text-black">Spitfire Wheels</h4>
                        <p className="text-sm opacity-70">54mm | 99a</p>
                    </div>
                    <div className="text-right font-bold text-xl text-black">
                        $34.00
                    </div>
                </div>
            </div>

            <div className="border-t-2 border-black pt-6 space-y-2">
                <div className="flex justify-between text-sm font-bold">
                    <span>Subtotal</span>
                    <span>$93.99</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                    <span>Shipping</span>
                    <span>$12.00</span>
                </div>
                <div className="flex justify-between font-rubik font-black text-2xl mt-4 pt-4 border-t-2 border-dashed border-black/20 text-black">
                    <span>TOTAL</span>
                    <span>$105.99</span>
                </div>
            </div>

            <div className="mt-8 bg-suburbia-lime/20 p-4 border-2 border-dashed border-suburbia-lime rounded-lg flex items-start gap-3">
                <span className="material-icons text-suburbia-purple text-3xl">local_shipping</span>
                <div>
                    <h5 className="font-bold uppercase text-black">Estimated Delivery</h5>
                    <p className="text-sm">Arriving by <span className="font-bold underline">Tuesday, Oct 31st</span></p>
                </div>
            </div>

             {/* Rough Edge SVG Effect at bottom? Design uses rough-edge class with polygon. 
                 I'll apply a clip-path to the bottom of the container or use a pseudo element.
                 The main container has "rough-edge" usage. 
                 Since I can't easily add complex polygon class globally right now without editing globals.css extensively or pasting it here.
                 I'll add the style inline.
              */}
              {/* <div className="absolute bottom-0 left-0 w-full h-4 bg-paper-cream" style={{ clipPath: "polygon(0% 0%, ...)" }}></div> */}
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-6 w-full max-w-md">
            <Link href="#" className="w-full group">
                <button className="w-full bg-brand-orange text-white font-rubik text-2xl py-4 px-8 border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all uppercase tracking-wide relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Track Your Order
                        <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </span>
                     {/* Hover Effect */}
                    <div className="absolute inset-0 bg-black/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
            </Link>

            <div className="flex items-center gap-6 text-sm font-bold">
                <Link href="/shop" className="hover:text-brand-orange underline decoration-2 decoration-wavy underline-offset-4 transition-colors">Continue Shopping</Link>
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <Link href="#" className="hover:text-brand-orange flex items-center gap-1 transition-colors">
                    <span className="material-icons text-sm">download</span> Download Receipt
                </Link>
            </div>
        </div>

      </main>

        {/* Decorative Floating Elements */}
        <div className="fixed bottom-10 left-10 hidden lg:block z-0 pointer-events-none transform rotate-12 opacity-80">
            <svg height="80" viewBox="0 0 200 100" width="150" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,50 Q50,10 90,50 T170,50" fill="none" stroke="#8b5cf6" strokeLinecap="round" strokeWidth="8"></path>
                <path d="M20,60 Q60,20 100,60 T180,60" fill="none" stroke="#ff7347" strokeDasharray="10,10" strokeLinecap="round" strokeWidth="4"></path>
            </svg>
        </div>
        <div className="fixed top-1/2 right-10 hidden lg:block z-0 pointer-events-none transform -rotate-45 opacity-60">
             {/* Stroke Text Effect */}
            <span className="font-rubik font-black text-6xl text-transparent" style={{ WebkitTextStroke: "2px #d9f154" }}>YEAH!</span>
        </div>

    </div>
  );
}
