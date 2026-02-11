"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"shipping" | "payment" | "done">("shipping");
  const router = useRouter();

  // Calculated values (mock)
  const shippingCost = 12.00;
  const taxes = step === "payment" ? subtotal * 0.08 : 0; // Show taxes in payment step? Design says "Calculated next step" in shipping
  const total = subtotal + shippingCost + taxes;

  const handleContinue = () => {
    if (step === "shipping") setStep("payment");
    else if (step === "payment") {
       // Complete Order Logic
       // In real app, await payment processing here
       clearCart();
       router.push("/order-success");
    }
  };

  return (
    <div className="font-mono bg-suburbia-blue text-gray-900 min-h-screen relative overflow-x-hidden selection:bg-brand-orange selection:text-white">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-texture z-0 mix-blend-overlay"></div>

      {/* Decorative Background Text */}
      <div className="absolute top-20 left-10 opacity-20 transform -rotate-12 pointer-events-none z-0">
        <h1 className="font-display text-9xl text-white">SK8</h1>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 transform rotate-6 pointer-events-none z-0">
        <h1 className="font-display text-9xl text-brand-orange">RIDE</h1>
      </div>

      {/* Simplified Header */}
      <nav className="relative z-20 w-full px-8 py-6 flex justify-between items-center bg-transparent">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="font-marker text-3xl md:text-4xl text-white transform -rotate-2 drop-shadow-md group-hover:scale-105 transition-transform">
            <span className="text-brand-orange">SUB</span>URBIA
          </div>
        </Link>
        <div className="hidden md:flex gap-8 text-white font-bold uppercase tracking-widest text-sm">
            {/* Minimal nav links or breadcrumbs to return */}
          <Link href="/shop" className="hover:text-brand-orange transition-colors">Return to Shop</Link>
        </div>
        <div className="flex items-center gap-4 text-white">
          <span className="material-icons cursor-pointer hover:text-brand-orange">search</span>
          <div className="relative">
             {/* Cart Icon (ReadOnly here?) */}
            <Link href="#" className="relative">
                <span className="material-icons cursor-pointer hover:text-brand-orange">shopping_bag</span>
                <span className="absolute -top-1 -right-1 bg-brand-orange text-black text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">{items.length}</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 pb-20 pt-8 flex flex-col items-center">
        <div className="w-full max-w-6xl bg-paper-cream shadow-[4px_4px_0px_0px_#000000] border-2 border-black relative overflow-hidden">
          
          {/* Top Torn Edge */}
          <div 
            className="absolute top-0 left-0 w-full h-4 bg-suburbia-purple z-20 torn-paper-top"
            style={{ clipPath: "polygon(0% 100%, 2% 0%, 4% 100%, 6% 0%, 8% 100%, 10% 0%, 12% 100%, 14% 0%, 16% 100%, 18% 0%, 20% 100%, 22% 0%, 24% 100%, 26% 0%, 28% 100%, 30% 0%, 32% 100%, 34% 0%, 36% 100%, 38% 0%, 40% 100%, 42% 0%, 44% 100%, 46% 0%, 48% 100%, 50% 0%, 52% 100%, 54% 0%, 56% 100%, 58% 0%, 60% 100%, 62% 0%, 64% 100%, 66% 0%, 68% 100%, 70% 0%, 72% 100%, 74% 0%, 76% 100%, 78% 0%, 80% 100%, 82% 0%, 84% 100%, 86% 0%, 88% 100%, 90% 0%, 92% 100%, 94% 0%, 96% 100%, 98% 0%, 100% 100%)" }}
          ></div>

          <div className="p-6 md:p-12 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7">
              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-12 border-b-2 border-black pb-6 border-dashed">
                <div className={`flex items-center gap-3 ${step === "shipping" ? "opacity-100" : "opacity-50"}`}>
                  <div className={`w-10 h-10 ${step === "shipping" ? "bg-suburbia-purple text-white" : "bg-white text-gray-400"} font-display text-xl flex items-center justify-center rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_#000000]`}>1</div>
                  <span className={`font-display text-2xl uppercase ${step === "shipping" ? "text-suburbia-purple" : "text-gray-400"} tracking-wide`}>Shipping</span>
                </div>
                <div className="h-0.5 w-12 bg-gray-300"></div>
                <div className={`flex items-center gap-3 ${step === "payment" ? "opacity-100" : "opacity-50"}`}>
                  <div className={`w-10 h-10 ${step === "payment" ? "bg-suburbia-purple text-white" : "bg-white text-gray-400"} font-display text-xl flex items-center justify-center rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_#000000]`}>2</div>
                  <span className={`font-display text-2xl uppercase ${step === "payment" ? "text-suburbia-purple" : "text-gray-400"}`}>Payment</span>
                </div>
                <div className="h-0.5 w-12 bg-gray-300"></div>
                <div className={`flex items-center gap-3 ${step === "done" ? "opacity-100" : "opacity-50"}`}>
                    <div className="w-10 h-10 bg-white text-gray-400 font-display text-xl flex items-center justify-center rounded-sm border-2 border-black">3</div>
                    <span className="font-display text-2xl uppercase text-gray-400 hidden md:block">Done</span>
                </div>
              </div>

              {step === "shipping" ? (
                <form className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                  <div>
                    <h3 className="font-display text-3xl mb-6 uppercase">Contact Info</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Email Address</label>
                        <input className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-[2px_2px_0px_0px_#000000] transition-all font-mono" placeholder="skater@example.com" type="email"/>
                      </div>
                      <div className="flex items-center gap-2">
                        <input className="w-5 h-5 text-brand-orange border-2 border-black focus:ring-0 rounded-none cursor-pointer" id="news" type="checkbox"/>
                        <label className="text-sm font-bold cursor-pointer" htmlFor="news">Keep me posted on new drops & zines</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl mb-6 uppercase mt-10">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Full Name</label>
                        <input className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-[2px_2px_0px_0px_#000000] transition-all font-mono" placeholder="Tony Hawk" type="text"/>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Address</label>
                        <input className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-[2px_2px_0px_0px_#000000] transition-all font-mono" placeholder="123 Halfpipe Lane" type="text"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">City</label>
                        <input className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-[2px_2px_0px_0px_#000000] transition-all font-mono" placeholder="San Diego" type="text"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Postal Code</label>
                        <input className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-[2px_2px_0px_0px_#000000] transition-all font-mono" placeholder="90210" type="text"/>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Country</label>
                        <select className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-[2px_2px_0px_0px_#000000] transition-all font-mono cursor-pointer">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              ) : step === "payment" ? (
                 <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="font-display text-3xl mb-6 uppercase">Payment Method</h3>
                    <div className="bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_#000000]">
                         <p className="font-mono mb-4">Select Payment:</p>
                         <div className="space-y-3">
                             <label className="flex items-center gap-3 cursor-pointer group">
                                 <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-brand-orange border-2 border-black focus:ring-0" />
                                 <span className="font-bold group-hover:text-brand-orange">Credit Card</span>
                             </label>
                             <label className="flex items-center gap-3 cursor-pointer group">
                                 <input type="radio" name="payment" className="w-5 h-5 text-brand-orange border-2 border-black focus:ring-0" />
                                 <span className="font-bold group-hover:text-brand-orange">PayPal</span>
                             </label>
                         </div>
                         
                         <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300">
                             <p className="text-sm text-gray-500">Secure Payment inputs would go here...</p>
                         </div>
                    </div>
                 </div>
              ) : (
                <div className="text-center py-12 animate-in zoom-in duration-500">
                    <span className="material-icons text-6xl text-brand-orange mb-4">check_circle</span>
                    <h3 className="font-display text-4xl mb-2">Order Confirmed!</h3>
                    <p className="font-mono text-gray-600">Check your email for the receipt.</p>
                    <Link href="/" className="inline-block mt-8 bg-black text-white px-6 py-3 font-bold uppercase hover:bg-brand-orange hover:text-black border-2 border-black transition-colors">
                        Back to Shop
                    </Link>
                </div>
              )}

              {step !== "done" && (
                <div className="pt-8">
                    <button 
                        onClick={handleContinue}
                        className="group relative w-full inline-flex items-center justify-center px-8 py-4 font-display text-2xl uppercase tracking-wider text-black transition-transform active:translate-y-1 active:translate-x-1"
                    >
                    <span className="absolute inset-0 translate-x-1 translate-y-1 bg-black group-hover:translate-y-2 group-hover:translate-x-2 transition-transform"></span>
                    <span className="absolute inset-0 bg-brand-orange border-2 border-black flex items-center justify-center" style={{ clipPath: "polygon(0% 10px, 5% 0px, 10% 12px, 15% 2px, 20% 10px, 25% 0px, 30% 12px, 35% 2px, 40% 10px, 45% 0px, 50% 12px, 55% 2px, 60% 10px, 65% 0px, 70% 12px, 75% 2px, 80% 10px, 85% 0px, 90% 12px, 95% 2px, 100% 10px, 100% 100%, 0% 100%)"}}></span>
                    <span className="relative flex items-center gap-3 z-10">
                        {step === "shipping" ? "Continue to Payment" : "Complete Order"}
                        <span className="material-icons">arrow_forward</span>
                    </span>
                    </button>
                    {step === "payment" && (
                         <button onClick={() => setStep("shipping")} className="mt-4 text-sm font-bold underline hover:text-brand-orange w-full text-center">Back to Shipping</button>
                    )}
                </div>
              )}
            </div>

            {/* Right Column: Your Stash */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white/40 rotate-2 z-10 backdrop-blur-sm shadow-sm pointer-events-none"></div>
              <div className="bg-background-light border-2 border-black p-6 shadow-[4px_4px_0px_0px_#000000] transform rotate-1 relative">
                <h3 className="font-marker text-3xl mb-6 text-center transform -rotate-1 text-suburbia-blue">Your Stash</h3>
                
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex gap-4 items-center bg-white p-3 border border-black shadow-sm group hover:scale-[1.02] transition-transform">
                        <div className="w-20 h-24 bg-gray-100 overflow-hidden border border-black relative shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-display text-xl uppercase leading-none mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-500 font-bold uppercase mb-2">Size: {item.size || "Standard"}</p>
                            <div className="flex justify-between items-center">
                                <span className="font-mono font-bold">${item.price.toFixed(2)}</span>
                                <span className="text-xs border border-black px-2 py-0.5 rounded-full font-mono">Qty: {item.quantity}</span>
                            </div>
                        </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                      <p className="text-center text-gray-500 italic">Your stash is empty.</p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t-2 border-dashed border-black space-y-2 font-mono">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-500">
                    <span>Taxes</span>
                    <span>{step === "shipping" ? "Calculated next step" : `$${taxes.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t-4 border-black flex justify-between items-end">
                  <span className="font-marker text-2xl transform -rotate-2">Total</span>
                  <span className="font-display text-4xl text-brand-orange">${total.toFixed(2)}</span>
                </div>

                {/* Decorative SVG */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-80 transform rotate-12 hidden md:block pointer-events-none">
                  <svg className="text-suburbia-purple" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 100 100">
                    <path d="M10,50 Q30,10 50,50 T90,50"></path>
                    <circle cx="20" cy="80" fill="currentColor" r="8"></circle>
                    <circle cx="80" cy="80" fill="currentColor" r="8"></circle>
                    <path d="M15,60 L85,60" strokeWidth="5"></path>
                  </svg>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <input className="flex-1 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 p-2 focus:outline-none focus:border-brand-orange font-mono text-sm" placeholder="Gift card or discount code" type="text"/>
                  <button className="bg-black text-white px-4 py-2 font-bold uppercase text-sm border border-white/30 hover:bg-brand-orange hover:text-black transition-colors">Apply</button>
                </div>
              </div>
            </div>

          </div>

          <div className="w-full h-3 bg-suburbia-purple mt-12 border-t border-black"></div>
        </div>
        
        {/* Footer Links */}
        <div className="mt-12 flex gap-6 text-white/60 text-sm font-mono">
          <Link href="#" className="hover:text-brand-orange underline decoration-wavy">Refund Policy</Link>
          <Link href="#" className="hover:text-brand-orange underline decoration-wavy">Shipping Policy</Link>
          <Link href="#" className="hover:text-brand-orange underline decoration-wavy">Privacy Policy</Link>
          <Link href="#" className="hover:text-brand-orange underline decoration-wavy">Terms of Service</Link>
        </div>
      </main>
      
      {/* Help Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-orange hover:text-black transition-colors shadow-lg border border-white/20">
          <span className="material-icons text-sm">bolt</span>
        </div>
      </div>

    </div>
  );
}
