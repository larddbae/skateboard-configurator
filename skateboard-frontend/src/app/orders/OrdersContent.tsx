"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchOrders } from "@/lib/api";
import { Order } from "@/lib/types";
import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
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
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-zinc-500/20 text-zinc-400";
    }
  };

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 pt-40 pb-20">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 rounded-lg bg-green-500/10 p-4 text-green-400 border border-green-500/20 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold">Order placed successfully!</p>
              <p className="text-sm opacity-80">Thank you for your purchase.</p>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Heading as="h1" size="md" className="text-white">
              📦 My Orders
            </Heading>
            <p className="mt-2 text-zinc-400">
              Your order history
            </p>
          </div>
          <ButtonLink href="/build" color="purple" icon="plus">
            Build New Board
          </ButtonLink>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl bg-zinc-800"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl bg-zinc-900 p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <Heading as="h2" size="sm" className="text-white mb-2">
              No orders yet
            </Heading>
            <p className="text-zinc-400 mb-6">
              Build your custom skateboard and place your first order!
            </p>
            <ButtonLink href="/build" color="lime" icon="plus">
              Start Building
            </ButtonLink>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-zinc-900 p-6 transition-all hover:ring-1 hover:ring-zinc-700"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-white">
                        Order #{order.id}
                      </span>
                      <span className={clsx(
                        "rounded-full px-3 py-1 text-xs font-semibold uppercase",
                        getStatusColor(order.status)
                      )}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Placed {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {order.notes && (
                      <p className="mt-2 text-sm text-zinc-500 italic">
                        &ldquo;{order.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-lime-400">
                      ${Number(order.total_price).toFixed(2)}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {order.items?.length || 0} items
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                {order.items && order.items.length > 0 && (
                  <div className="mt-4 border-t border-zinc-800 pt-4">
                    <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="rounded-lg bg-zinc-800 p-2">
                          <p className="text-zinc-400 truncate">{item.name}</p>
                          <p className="text-white">${Number(item.price).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-zinc-500 hover:text-zinc-400">
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
