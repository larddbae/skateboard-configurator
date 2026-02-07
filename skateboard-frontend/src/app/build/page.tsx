import { Heading } from "@/components/Heading";
import { Logo } from "@/components/Logo";
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
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
        defaultBolt={defaultBolt}
      >
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview
              deckTextureURLs={deckTextureURLs}
              wheelTextureURLs={wheelTextureURLs}
            />
          </div>

          <Link href="/" className="absolute left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>
        <div className="grow overflow-y-auto bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-[420px] lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm" className="mb-4 mt-0">
            Build your board
          </Heading>
          <Controls
            wheels={wheels}
            decks={decks}
            trucks={trucks}
            bolts={bolts}
            className="mb-4"
          />
          <CheckoutButton />
          <SaveDesignButton />

          {/* AI Assistant Section */}
          <div className="border-t border-zinc-700 pt-4">
            <Heading as="h2" size="xs" className="mb-3 flex items-center gap-2">
              <span>🤖</span> AI Style Assistant
            </Heading>
            <AIStyleAnalyzer allParts={allParts} />
          </div>
        </div>
      </CustomizerControlsProvider>
      <Loading />
    </div>
  );
}
