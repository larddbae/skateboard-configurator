import Link from "next/link";
import React from "react";

import { CustomizerControlsProvider } from "./context";
import { fetchParts } from "@/lib/api";
import Preview from "./Preview";
import Controls from "./Controls";
import Loading from "./Loading";
import AIStyleAnalyzer from "@/components/AIStyleAnalyzer";
import SaveDesignButton from "@/components/SaveDesignButton";
import CheckoutButton from "@/components/CheckoutButton";
import BuildPageFooter from "./BuildPageFooter";
import ReceiptWidget from "./ReceiptWidget";

type SearchParams = {
  wheel?: string;
  deck?: string;
  truck?: string;
  bolt?: string;
};

export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;

  // Fetch parts from Laravel API
  const allParts = await fetchParts();

  // Separate by category
  const wheels = allParts.filter((p) => p.category === "wheel");
  const decks = allParts.filter((p) => p.category === "deck");
  const trucks = allParts.filter((p) => p.category === "truck");
  const bolts = allParts.filter((p) => p.category === "bolt");

  // Find defaults based on URL params or first item
  const defaultWheel =
    wheels.find((w) => String(w.id) === searchParams.wheel) ?? wheels[0];
  const defaultDeck =
    decks.find((d) => String(d.id) === searchParams.deck) ?? decks[0];
  const defaultTruck =
    trucks.find((t) => String(t.id) === searchParams.truck) ?? trucks[0];
  const defaultBolt =
    bolts.find((b) => String(b.id) === searchParams.bolt) ?? bolts[0];

  // Collect texture URLs for 3D preview preloading
  const wheelTextureURLs = wheels
    .map((w) => w.texture_url)
    .filter((url): url is string => Boolean(url));
  const deckTextureURLs = decks
    .map((d) => d.texture_url)
    .filter((url): url is string => Boolean(url));

  return (
    <CustomizerControlsProvider
      defaultWheel={defaultWheel}
      defaultDeck={defaultDeck}
      defaultTruck={defaultTruck}
      defaultBolt={defaultBolt}
    >
      <div className="bg-blue-600 text-ink font-space-grotesk overflow-hidden h-screen flex flex-col relative">
        {/* Background textures */}
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-0" />

        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b-4 border-black bg-white relative z-20 px-6 py-4 shadow-hard">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="size-10 bg-black text-white flex items-center justify-center rounded-full transform -rotate-3 border-2 border-white shadow-md">
                <span className="material-symbols-outlined text-[24px]">skateboarding</span>
              </div>
              <h2 className="text-black text-2xl font-black italic tracking-tighter uppercase transform skew-x-[-10deg]">
                Suburbia Skate
              </h2>
            </Link>
          </div>

          {/* Center navigation */}
          <div className="hidden md:flex flex-1 justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-6 bg-yellow-300 px-6 py-2 border-2 border-black rounded-sm transform rotate-1 shadow-hard">
              <Link className="text-black font-bold hover:text-blue-600 hover:underline decoration-wavy transition-colors text-sm uppercase" href="/my-garage">Garage</Link>
              <span className="text-black font-black">/</span>
              <Link className="text-black font-bold hover:text-blue-600 hover:underline decoration-wavy transition-colors text-sm uppercase" href="/shop">Shop</Link>
              <span className="text-black font-black">/</span>
              <Link className="text-black font-bold hover:text-blue-600 hover:underline decoration-wavy transition-colors text-sm uppercase" href="/team">Community</Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex flex-col items-end mr-2 bg-black text-white px-3 py-1 transform -rotate-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-300">Balance</span>
              <span className="text-sm font-bold font-marker">2,450 CR</span>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full size-10 border-2 border-black shadow-hard-sm" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex relative overflow-hidden z-10">
          {/* Left Side - Preview Area */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {/* Top-left info overlay */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
              <div className="flex items-center gap-2 mb-3 pointer-events-auto">
                <Link
                  href="/"
                  className="bg-white border-2 border-black px-3 py-1 text-black hover:bg-black hover:text-white transition-colors text-sm font-bold flex items-center gap-1 shadow-hard-sm transform -rotate-1"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  BACK
                </Link>
                <button className="bg-white border-2 border-black px-3 py-1 text-black hover:bg-black hover:text-white transition-colors text-sm font-bold flex items-center gap-1 shadow-hard transform rotate-1 uppercase">
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  SHARE
                </button>
                <button className="bg-white border-2 border-black px-3 py-1 text-black hover:bg-black hover:text-white transition-colors text-sm font-bold flex items-center gap-1 shadow-hard transform -rotate-1 uppercase">
                  <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                  AR VIEW
                </button>
              </div>
              <div className="bg-black inline-block px-4 py-2 transform rotate-1 shadow-hard">
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase">
                  Custom Setup
                </h1>
              </div>
              <div className="mt-2">
                <span className="bg-yellow-300 text-black text-xs px-2 py-1 font-bold border border-black transform -rotate-2 inline-block">
                  MODIFIED: JUST NOW
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-white/20 rounded-full blur-sm pointer-events-none" />

            {/* 3D Preview */}
            <div className="absolute inset-0">
              <Preview
                deckTextureURLs={deckTextureURLs}
                wheelTextureURLs={wheelTextureURLs}
              />
            </div>

            {/* View controls */}
            <div className="absolute bottom-28 right-8 flex flex-col gap-3 z-10">
              <button aria-label="Rotate View" className="build-sticker p-3 bg-white border-2 border-black rounded-full text-black hover:bg-yellow-300 shadow-hard-sm transition-all transform -rotate-3">
                <span className="material-symbols-outlined">360</span>
              </button>
              <button aria-label="Zoom In" className="build-sticker p-3 bg-white border-2 border-black rounded-full text-black hover:bg-yellow-300 shadow-hard-sm transition-all transform rotate-2">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
              <button aria-label="Zoom Out" className="build-sticker p-3 bg-white border-2 border-black rounded-full text-black hover:bg-yellow-300 shadow-hard-sm transition-all transform -rotate-1">
                <span className="material-symbols-outlined">zoom_out</span>
              </button>
            </div>

            {/* Receipt Price Widget */}
            <ReceiptWidget />
          </div>

          {/* Right Side - Controls Sidebar */}
          <aside className="w-96 bg-build-paper border-l-4 border-black flex flex-col z-20 h-full relative shadow-[-10px_0_30px_rgba(0,0,0,0.2)]">
            {/* Controls (tabs + parts list) */}
            <Controls
              wheels={wheels}
              decks={decks}
              trucks={trucks}
              bolts={bolts}
            />

            {/* Footer: Total + Buttons */}
            <BuildPageFooter allParts={allParts} />
          </aside>
        </main>

        <Loading />
      </div>
    </CustomizerControlsProvider>
  );
}
