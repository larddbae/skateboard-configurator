"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { fetchOrders } from "@/lib/api";
import { Order } from "@/lib/types";
import { Header } from "@/components/Header";
import clsx from "clsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function OrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const showSuccess = searchParams.get("success") === "true";
  
  const { addToCart } = useCart();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/orders");
      return;
    }

    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated, authLoading, router]);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-brand-lime text-black rotate-[-2deg]";
      case "pending":
        return "bg-yellow-400 text-black rotate-[1deg]";
      case "cancelled":
        return "bg-red-500 text-white rotate-[2deg]";
      default:
        return "bg-zinc-200 text-zinc-900";
    }
  };

  const handleBuyAgain = (order: Order) => {
    if (!order.items) return;
    order.items.forEach((item) => {
      addToCart({
        id: item.part_id.toString(),
        name: item.name,
        price: Number(item.price),
        image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=320&h=240&fit=crop",
      });
    });
  };

  const handleDownloadInvoice = async (order: Order) => {
    setActiveInvoiceOrder(order);
    setIsGeneratingPdf(true);
    // Wait for the next tick so the hidden receipt div renders
    setTimeout(async () => {
      if (receiptRef.current) {
        try {
          const canvas = await html2canvas(receiptRef.current, {
            scale: 2,
            backgroundColor: "#18181b", // matching bg-zinc-900
          });
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`suburbia-receipt-${order.id}.pdf`);
        } catch (error) {
          console.error("Error generating PDF:", error);
        } finally {
          setIsGeneratingPdf(false);
          setActiveInvoiceOrder(null);
        }
      }
    }, 100);
  };

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-texture">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <Header />
      
      <main className="mx-auto max-w-5xl px-4 pt-32 pb-20 w-full">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 relative bg-brand-lime/10 border-2 border-brand-lime p-4 flex items-center gap-4 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             <div className="absolute -top-3 -left-3 bg-brand-lime text-black font-bold px-2 py-1 text-xs border border-black transform -rotate-6">SUCCESS!</div>
            <span className="material-icons text-4xl text-brand-lime">check_circle</span>
            <div>
              <p className="font-rubik-mono text-xl uppercase text-black dark:text-white">Order placed successfully!</p>
              <p className="text-sm font-mono opacity-80">Thank you for supporting the underground.</p>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between relative">
          <div>
            <div className="flex items-center gap-4 mb-2">
                <span className="material-icons text-5xl text-brand-orange transform -rotate-12">inventory_2</span>
                <span className="font-marker text-gray-500 dark:text-gray-400 opacity-60 text-lg rotate-2">EST. 2024</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl uppercase text-black dark:text-white leading-none">
              My Orders
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 font-mono text-sm max-w-md bg-white dark:bg-zinc-800 p-1 inline-block transform rotate-1 border border-dashed border-gray-400">
              Track your decks from the workshop to the streets.
            </p>
          </div>
          
          <Link href="/build" className="group relative inline-block">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rotate-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
                <div className="relative bg-brand-orange text-white px-8 py-4 font-display text-xl uppercase tracking-wider transform -rotate-1 group-hover:rotate-0 transition-transform border-2 border-black">
                    Build New Board <span className="material-icons align-middle ml-2">skateboarding</span>
                </div>
          </Link>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-sm"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="relative bg-white dark:bg-zinc-900 p-12 text-center border-4 border-dashed border-gray-300 dark:border-zinc-700">
            <div className="text-9xl mb-4 opacity-20">📦</div>
            <h2 className="font-display text-3xl uppercase text-black dark:text-white mb-2">
              No orders yet
            </h2>
            <p className="text-zinc-500 font-mono mb-8">
              Your stash is empty. Time to build something sick?
            </p>
            <Link href="/build" className="inline-block bg-brand-lime text-black font-display uppercase py-3 px-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
              Start Building
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group relative bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all overflow-hidden"
              >
                {/* Receipt Zigzag Top/Bottom (CSS illusion or SVG) */}
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-purple"></div>

                <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <span className={clsx(
                                "text-xs font-bold px-3 py-1 uppercase tracking-widest border border-black shadow-sm",
                                getStatusColor(order.status)
                            )}>
                                {order.status}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                                {new Date(order.created_at).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric"
                                })}
                            </span>
                        </div>
                        
                        <h3 className="font-display text-3xl md:text-4xl mb-2 text-black dark:text-white">
                            Order #{order.id}
                        </h3>
                        
                        {order.notes && (
                            <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 text-sm font-mono italic text-gray-600 dark:text-gray-300 max-w-md">
                                &ldquo;{order.notes}&rdquo;
                            </div>
                        )}

                        {/* Order Items Thumbs */}
                        {order.items && order.items.length > 0 && (
                            <div className="flex -space-x-4 mb-6 mt-4">
                                {order.items.slice(0, 4).map((item, idx) => (
                                    <div key={idx} className="w-16 h-16 rounded-full border-2 border-white dark:border-zinc-800 bg-gray-100 dark:bg-zinc-800 overflow-hidden relative shadow-md transform hover:scale-110 hover:z-10 transition-transform">
                                        <img 
                                            src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=320&h=240&fit=crop" // Placeholder or actual item image if available
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                {order.items.length > 4 && (
                                    <div className="w-16 h-16 rounded-full border-2 border-white dark:border-zinc-800 bg-gray-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-xs shadow-md z-0">
                                        +{order.items.length - 4}
                                    </div>
                                )}
                            </div>
                        )}
                        
                         {/* Order Items Details (Collapsible or just list) */}
                         <div className="mt-4 border-t border-dashed border-gray-300 dark:border-zinc-700 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                                {order.items?.map((item, i) => (
                                    <div key={i} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span className="text-black dark:text-white">${Number(item.price).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>

                    <div className="flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-dashed border-gray-300 dark:border-zinc-700 md:pl-6 pt-6 md:pt-0">
                        <div className="text-right">
                            <span className="block text-xs uppercase text-gray-500 dark:text-gray-400 mb-1 font-mono tracking-widest">Total</span>
                            <span className="font-display text-4xl text-brand-lime drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-black px-2 py-1 transform -rotate-2 inline-block border-2 border-white/20">
                                ${Number(order.total_price).toFixed(2)}
                            </span>
                        </div>
                        
                        <div className="flex gap-4 mt-6">
                            <button 
                                onClick={() => handleBuyAgain(order)}
                                className="font-bold uppercase text-xs text-brand-orange hover:text-orange-600 transition-colors border-2 border-transparent hover:border-b-brand-orange pb-0.5"
                            >
                                Buy Again
                            </button>
                             <button 
                                onClick={() => handleDownloadInvoice(order)}
                                disabled={isGeneratingPdf}
                                className="font-bold uppercase text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors border-2 border-transparent hover:border-b-gray-500 pb-0.5 disabled:opacity-50"
                            >
                                {isGeneratingPdf && activeInvoiceOrder?.id === order.id ? 'Loading...' : 'Invoice'}
                            </button>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16 mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 group bg-white dark:bg-zinc-900 border-2 border-black text-black dark:text-white font-rubik-mono uppercase tracking-widest px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            <span className="material-icons transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to home
          </Link>
        </div>
      </main>

      {/* Hidden Receipt used for HTML to PDF Generation */}
      {activeInvoiceOrder && (
        <div className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none">
          <div ref={receiptRef} className="w-[800px] bg-zinc-900 border-4 border-black p-12 shadow-[8px_8px_0_0_#ff6b35] relative">
              <div className="flex justify-between items-end mb-8 border-b-2 border-dashed border-zinc-600 pb-6 gap-4">
                  <div>
                      <h2 className="font-rubik-mono font-bold text-3xl mb-1 text-white tracking-wider">SUBURBIA SKATE</h2>
                      <h3 className="font-rubik text-xl text-brand-orange uppercase mb-1">Receipt</h3>
                      <p className="text-sm text-gray-400 font-mono">Order #SUB-{activeInvoiceOrder.id}</p>
                  </div>
                  <div className="text-right font-mono">
                      <p className="font-bold text-brand-orange uppercase">Date</p>
                      <p className="text-sm text-gray-300">
                          {new Date(activeInvoiceOrder.created_at).toLocaleDateString("en-US", {
                              year: "numeric", month: "long", day: "numeric"
                          })}
                      </p>
                  </div>
              </div>

              <div className="space-y-6 mb-8 font-mono">
                  {activeInvoiceOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div className="flex-grow">
                            <h4 className="font-bold text-lg text-white">{item.name}</h4>
                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right font-bold text-xl text-white">
                            ${Number(item.price).toFixed(2)}
                        </div>
                    </div>
                  ))}
              </div>

              <div className="border-t-2 border-zinc-600 pt-6 font-mono space-y-2">
                  <div className="flex justify-between font-rubik font-black text-3xl mt-4 pt-4 border-t-2 border-dashed border-zinc-600 text-white">
                      <span>TOTAL</span>
                      <span className="text-suburbia-lime drop-shadow-[2px_2px_0_#000]">${Number(activeInvoiceOrder.total_price).toFixed(2)}</span>
                  </div>
              </div>

              <div className="mt-8 border-t-2 border-zinc-600 pt-6">
                  <div className="flex flex-col gap-1 font-mono text-sm text-gray-300">
                      <p className="font-bold text-brand-orange uppercase mb-1">Status</p>
                      <p className="uppercase">{activeInvoiceOrder.status}</p>
                  </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
