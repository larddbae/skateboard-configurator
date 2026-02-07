"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchDesigns, deleteDesign } from "@/lib/api";
import { SavedDesign } from "@/lib/types";
import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import clsx from "clsx";

export default function MyGaragePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/my-garage");
      return;
    }

    if (isAuthenticated) {
      loadDesigns();
    }
  }, [isAuthenticated, authLoading, router]);

  const loadDesigns = async () => {
    try {
      const data = await fetchDesigns();
      setDesigns(data);
    } catch (error) {
      console.error("Failed to load designs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this design?")) return;
    
    setDeletingId(id);
    try {
      await deleteDesign(id);
      setDesigns(designs.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Failed to delete design:", error);
      alert("Failed to delete design");
    } finally {
      setDeletingId(null);
    }
  };

  const loadDesignUrl = (design: SavedDesign) => {
    const config = design.configuration;
    return `/build?deck=${config.deck_id}&wheel=${config.wheel_id}&truck=${config.truck_id}&bolt=${config.bolt_id}`;
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
      
      <main className="mx-auto max-w-6xl px-4 pt-40 pb-20">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Heading as="h1" size="md" className="text-white">
              🚗 My Garage
            </Heading>
            <p className="mt-2 text-zinc-400">
              Your saved skateboard configurations
            </p>
          </div>
          <ButtonLink href="/build" color="purple" icon="plus">
            Create New Design
          </ButtonLink>
        </div>

        {/* Designs Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-zinc-800"
              />
            ))}
          </div>
        ) : designs.length === 0 ? (
          <div className="rounded-2xl bg-zinc-900 p-12 text-center">
            <div className="text-6xl mb-4">🛹</div>
            <Heading as="h2" size="sm" className="text-white mb-2">
              No saved designs yet
            </Heading>
            <p className="text-zinc-400 mb-6">
              Create your first custom skateboard and save it here!
            </p>
            <ButtonLink href="/build" color="lime" icon="plus">
              Build Your First Board
            </ButtonLink>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {designs.map((design) => (
              <div
                key={design.id}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900 transition-all hover:ring-2 hover:ring-purple-500"
              >
                {/* Thumbnail or Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                  {design.thumbnail_url ? (
                    <img
                      src={design.thumbnail_url}
                      alt={design.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">🛹</span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white truncate">
                    {design.name}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Created {new Date(design.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 p-4 pt-0">
                  <Link
                    href={loadDesignUrl(design)}
                    className="flex-1 rounded-lg bg-purple-600 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-purple-500"
                  >
                    Load Design
                  </Link>
                  <button
                    onClick={() => handleDelete(design.id)}
                    disabled={deletingId === design.id}
                    className={clsx(
                      "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                      deletingId === design.id
                        ? "bg-zinc-700 text-zinc-500"
                        : "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                    )}
                  >
                    {deletingId === design.id ? "..." : "🗑️"}
                  </button>
                </div>
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
