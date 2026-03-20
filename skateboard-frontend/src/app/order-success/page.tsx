"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    clearCart();
  }, [clearCart]);

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#18181b', // matching bg-zinc-900
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("suburbia-skate-receipt.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="font-courier bg-background-light text-gray-900 dark:bg-background-dark dark:text-gray-100 min-h-screen relative overflow-x-hidden transition-colors duration-300 flex flex-col bg-texture">
      {/* Texture Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Watermark */}
      <div className="fixed top-20 left-0 w-full h-full pointer-events-none z-0 flex justify-center items-center overflow-hidden">
        <h1 className="text-[15vw] md:text-[20vw] leading-none select-none transform -rotate-12 opacity-5 font-rubik font-black text-transparent stroke-2 stroke-black" style={{ WebkitTextStroke: "2px rgba(0,0,0,0.1)" }}>
          SUBURBIA
        </h1>
      </div>

      <Header />

      <main className="relative z-10 container mx-auto px-4 flex-grow flex flex-col items-center justify-center py-12 md:py-20">
        <div className="text-center mb-12 relative w-full flex flex-col items-center">
             {/* Icon Bounce */}
            <div className="absolute -top-10 -right-8 md:-right-16 md:-top-16 animate-bounce">
                <svg className="w-20 h-20 md:w-32 md:h-32 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] transform rotate-12" fill="none" viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" fill="#d9f154" r="45" stroke="black" strokeWidth="3"></circle>
                    <path d="M28 50L45 67L75 35" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"></path>
                </svg>
            </div>
            <h1 className="font-rubik font-black text-5xl md:text-7xl lg:text-8xl mb-4 text-black dark:text-white drop-shadow-[4px_4px_0_#ff6b35]">
                ORDER<br/><span className="text-brand-orange">CONFIRMED!</span>
            </h1>
            <p className="inline-block font-courier font-bold text-lg md:text-xl max-w-lg bg-white text-black border-4 border-black p-3 transform -rotate-1 shadow-[4px_4px_0_0_#000]">
                Pack your bags, kid. Your gear is on the way.
            </p>
        </div>

        {/* Receipt Container */}
        <div className="w-full max-w-2xl relative z-10 mb-6 group">
          <div ref={receiptRef} className="w-full bg-zinc-900 border-4 border-black p-8 md:p-12 shadow-[8px_8px_0_0_#ff6b35] relative transform -rotate-1 transition-transform group-hover:rotate-0 duration-300">
              {/* Rough Edge Top */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-brand-orange border-2 border-black flex items-center justify-center rotate-2 shadow-[2px_2px_0_0_#000]">
                <span className="font-rubik-mono text-sm text-black uppercase">Paid in Full</span>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b-2 border-dashed border-zinc-600 pb-6 gap-4">
                  <div>
                      <h2 className="font-rubik-mono font-bold text-3xl mb-1 text-white tracking-wider">SUBURBIA SKATE</h2>
                      <h3 className="font-rubik text-xl text-brand-orange uppercase mb-1">Receipt</h3>
                      <p className="text-sm text-gray-400 font-mono">Order #SUB-8921-X</p>
                  </div>
                  <div className="text-left md:text-right font-mono">
                      <p className="font-bold text-brand-orange uppercase">Date</p>
                      <p className="text-sm text-gray-300">Oct 24, 2026</p>
                  </div>
              </div>

              <div className="space-y-6 mb-8 font-mono">
                  {/* Mock Items for Display */}
                  <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-black border-2 border-zinc-700 p-1 shrink-0 transform -rotate-2 overflow-hidden shadow-hard">
                          <Image src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=200&h=200&fit=crop" width={80} height={80} alt="Skateboard Deck Art" className="w-full h-full object-cover grayscale contrast-125" />
                      </div>
                      <div className="flex-grow">
                          <h4 className="font-bold text-lg text-white">Demon Slayer Deck</h4>
                          <p className="text-xs text-gray-400">Size: 8.25&quot; | Custom Grip</p>
                      </div>
                      <div className="text-right font-bold text-xl text-white">
                          $59.99
                      </div>
                  </div>

                  <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-black border-2 border-zinc-700 p-1 shrink-0 transform rotate-1 overflow-hidden shadow-hard">
                          <Image src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=200&h=200&fit=crop" width={80} height={80} alt="Skateboard Wheels" className="w-full h-full object-cover grayscale contrast-125" />
                      </div>
                      <div className="flex-grow">
                          <h4 className="font-bold text-lg text-white">Spitfire Wheels</h4>
                          <p className="text-xs text-gray-400">54mm | 99a</p>
                      </div>
                      <div className="text-right font-bold text-xl text-white">
                          $34.00
                      </div>
                  </div>
              </div>

              <div className="border-t-2 border-zinc-600 pt-6 font-mono space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                      <span>Subtotal</span>
                      <span>$93.99</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                      <span>Shipping</span>
                      <span>$12.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-brand-orange/80">
                      <span>Taxes (8%)</span>
                      <span>$8.48</span>
                  </div>
                  <div className="flex justify-between font-rubik font-black text-3xl mt-4 pt-4 border-t-2 border-dashed border-zinc-600 text-white">
                      <span>TOTAL</span>
                      <span className="text-suburbia-lime drop-shadow-[2px_2px_0_#000]">$114.47</span>
                  </div>
              </div>

              <div className="mt-8 border-t-2 border-zinc-600 pt-6">
                  <div className="flex flex-col gap-1 font-mono text-sm text-gray-300">
                      <p className="font-bold text-brand-orange uppercase mb-1">Payment Method</p>
                      <p>Paid via Credit Card ending in <span className="text-white font-bold">•••• 1234</span></p>
                  </div>
              </div>

              <div className="mt-8 bg-suburbia-purple text-black p-4 border-2 border-black shadow-[4px_4px_0_0_#000] flex items-start gap-4 transform rotate-1">
                  <span className="material-icons text-white text-4xl drop-shadow-[2px_2px_0_#000]">local_shipping</span>
                  <div>
                      <h5 className="font-bold uppercase text-white font-rubik text-lg">Estimated Delivery</h5>
                      <p className="text-sm font-mono text-white/90">Arriving by <span className="font-bold bg-black text-brand-orange px-2 py-0.5 ml-1 inline-block transform -rotate-2">Tuesday, Oct 31st</span></p>
                  </div>
              </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-6 w-full max-w-md z-20">
            <Link href="/orders" className="w-full group">
                <button className="w-full bg-brand-orange text-white font-rubik-mono text-2xl py-4 flex items-center justify-center border-4 border-black shadow-[6px_6px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_#000] transition-all uppercase tracking-wide relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Track Your Order
                        <span className="material-icons group-hover:translate-x-2 transition-transform">arrow_forward</span>
                    </span>
                    <div className="absolute inset-0 bg-black/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
            </Link>

            <div className="flex items-center justify-center w-full mt-2">
                <button onClick={handleDownloadReceipt} className="font-mono text-sm font-bold border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors flex items-center gap-2 cursor-pointer text-black dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange group pb-1">
                    <span className="material-icons text-xl group-hover:-translate-y-1 transition-transform">cloud_download</span>
                    DOWNLOAD RECEIPT (PDF)
                </button>
            </div>
        </div>
      </main>

      <Footer />

      {/* Decorative Floating Elements Removed per request */}

    </div>
  );
}
