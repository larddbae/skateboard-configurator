"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchDesigns, deleteDesign } from "@/lib/api";
import { SavedDesign } from "@/lib/types";
import { Header } from "@/components/Header";
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-zinc-900 font-sans relative overflow-x-hidden selection:bg-brand-lime selection:text-black">
      <Header />
      
      {/* Background Noise & Grunge Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/grunge-wall.png')] opacity-10"></div>
      
      {/* Big Rotated Text Background */}
      <div className="fixed top-20 right-0 w-full h-full pointer-events-none z-0 overflow-hidden flex justify-center items-center opacity-[0.03]">
         <span className="font-display text-[20vw] text-black whitespace-nowrap rotate-12 select-none">GARAGE</span>
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-20 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-orange/20 rounded-full blur-2xl"></div>
                <h1 className="font-display text-5xl md:text-7xl uppercase text-black dark:text-white tracking-tight relative inline-block">
                    My Garage
                    <span className="material-icons text-4xl md:text-6xl text-brand-orange align-middle ml-2 animate-bounce">garage</span>
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold font-mono uppercase tracking-widest text-sm bg-white dark:bg-zinc-800 inline-block px-2 transform -skew-x-12 border border-black dark:border-gray-700">
                    Manage your sickest builds
                </p>
                <div className="h-2 w-full bg-gradient-to-r from-brand-purple to-brand-orange mt-2 skew-x-12"></div>
            </div>

            <Link href="/build" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-display text-white transition-all duration-200 bg-brand-purple font-bold uppercase tracking-wider focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-0.5 hover:-translate-x-0.5 border-2 border-black transform hover:rotate-1">
                <span className="material-icons mr-2 group-hover:rotate-90 transition-transform">add_circle</span>
                Create New Design
            </Link>
        </div>

        {/* Designs Grid */}
        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-xl bg-gray-200 dark:bg-zinc-800 border-2 border-transparent"
              />
            ))}
          </div>
        ) : designs.length === 0 ? (
          <div className="group relative rounded-xl border-4 border-dashed border-gray-300 dark:border-zinc-700 bg-gray-50/50 dark:bg-white/5 flex flex-col items-center justify-center text-center p-12 min-h-[400px] hover:border-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer">
                <div className="w-32 h-32 mb-6 text-gray-300 dark:text-zinc-600 group-hover:text-brand-primary transition-colors duration-300 transform group-hover:scale-110">
                    <span className="material-icons text-9xl">skateboarding</span>
                </div>
                <h3 className="font-display text-3xl uppercase mb-2 text-gray-800 dark:text-gray-200">Got an idea?</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-8 font-mono">Don't let your dreams be dreams. Build that crazy deck you've been thinking about.</p>
                
                <Link href="/build" className="bg-brand-primary text-black font-display uppercase py-3 px-8 rounded border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all">
                    Go To Builder
                </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {designs.map((design) => (
              <div
                key={design.id}
                className="group relative bg-white dark:bg-zinc-900 rounded-xl p-[2px] transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:-translate-y-1"
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-orange rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                
                <div className="relative bg-white dark:bg-zinc-900 h-full rounded-[10px] p-6 flex flex-col border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {/* Tape Strip */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/90 shadow-sm opacity-90 transform -rotate-1 z-10"></div>

                    <div className="flex justify-between items-start mb-4">
                        <div className="overflow-hidden">
                            <h3 className="font-display text-2xl uppercase leading-none mb-1 group-hover:text-brand-purple transition-colors truncate">
                                {design.name}
                            </h3>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                {new Date(design.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="px-2 py-1 bg-brand-lime text-black text-xs font-bold font-display uppercase skew-x-[-10deg] border border-black min-w-[60px] text-center">
                            #{design.id}
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="relative h-48 w-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 ease-out bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700">
                        {design.thumbnail_url ? (
                             <img
                                src={design.thumbnail_url}
                                alt={design.name}
                                className="h-full w-full object-contain p-4 drop-shadow-xl transform rotate-12 group-hover:rotate-0 transition-all duration-500"
                            />
                        ) : (
                             <span className="text-6xl animate-pulse">🛹</span>
                        )}
                    </div>

                    {/* Parts Icons */}
                    <div className="flex gap-2 mb-6 justify-center">
                        {['deck', 'hardware', 'build'].map((icon, idx) => (
                             <div key={icon} className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-black dark:text-white border border-black dark:border-zinc-600" title="Part">
                                <span className="material-icons text-sm">{icon}</span>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto grid grid-cols-4 gap-2">
                        <Link
                            href={loadDesignUrl(design)}
                            className="col-span-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-display uppercase py-3 px-4 rounded-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                        >
                            Load <span className="material-icons text-sm">arrow_forward</span>
                        </Link>
                        <button
                            onClick={() => handleDelete(design.id)}
                            disabled={deletingId === design.id}
                            className="col-span-1 bg-zinc-200 hover:bg-red-500 text-black hover:text-white rounded-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center group/trash"
                        >
                            <span className="material-icons group-hover/trash:text-white">
                                {deletingId === design.id ? "hourglass_empty" : "delete_outline"}
                            </span>
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
