        import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Builder",
  description: "Enter the Victus lab. Use our 3D custom builder to assemble your ultimate skateboard setup choosing decks, wheels, and more.",
};

import Link from "next/link";
import React from "react";

import { CustomizerControlsProvider } from "./context";
import { fetchParts } from "@/lib/api";
import Preview from "./Preview";
import Controls from "./Controls";
import Loading from "./Loading";
import BuildPageFooter from "./BuildPageFooter";
import ReceiptWidget from "./ReceiptWidget";
import TopLeftControls from "./TopLeftControls";

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

        {/* Main Content */}
        <main className="flex-1 flex relative overflow-hidden z-10">
          {/* Left Side - Preview Area */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {/* Top-left info overlay */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
              <TopLeftControls />
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

            {/* Bottom Status Bar */}
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
