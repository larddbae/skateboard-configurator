"use client";

import { Suspense } from "react";
import OrdersContent from "./OrdersContent";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-mono relative selection:bg-brand-lime selection:text-black">
      {/* Background Noise & Grunge Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/grunge-wall.png')] opacity-10"></div>
      
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
        </div>
      }>
        <OrdersContent />
      </Suspense>
    </div>
  );
}
