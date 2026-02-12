"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchOrders } from "@/lib/api";
import { Order } from "@/lib/types";
import { Header } from "@/components/Header";
import clsx from "clsx";

export default function OrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const showSuccess = searchParams.get("success") === "true";

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

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10">
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
                                            src="https://loremflickr.com/320/240/skateboard" // Placeholder or actual item image if available
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
                            <button className="font-bold uppercase text-xs text-brand-orange hover:text-orange-600 transition-colors border-2 border-transparent hover:border-b-brand-orange pb-0.5">
                                Buy Again
                            </button>
                             <button className="font-bold uppercase text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors border-2 border-transparent hover:border-b-gray-500 pb-0.5">
                                Invoice
                            </button>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16 text-center">
          <Link href="/" className="text-zinc-500 hover:text-brand-primary font-display uppercase tracking-widest border-b-2 border-transparent hover:border-brand-primary pb-1 transition-all">
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
