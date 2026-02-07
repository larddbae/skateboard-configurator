"use client";

import { Suspense } from "react";
import OrdersContent from "./OrdersContent";

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
