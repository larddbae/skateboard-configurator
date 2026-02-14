"use client";

import { Part } from "@/lib/types";
import clsx from "clsx";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useCustomizerControls } from "./context";
import { useRouter } from "next/navigation";

type Props = {
  wheels: Part[];
  decks: Part[];
  trucks: Part[];
  bolts: Part[];
  className?: string;
};

const CATEGORIES = [
  { key: "deck" as const, label: "DECKS" },
  { key: "wheel" as const, label: "Wheels" },
  { key: "truck" as const, label: "Trucks" },
  { key: "bolt" as const, label: "Bearings" },
];

export default function Controls({ wheels, decks, trucks, bolts, className }: Props) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<"deck" | "wheel" | "truck" | "bolt">("deck");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    setBolt,
    setDeck,
    setTruck,
    setWheel,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    selectedWheel,
  } = useCustomizerControls();

  useEffect(() => {
    const url = new URL(window.location.href);

    if (selectedWheel?.id) url.searchParams.set("wheel", String(selectedWheel.id));
    if (selectedDeck?.id) url.searchParams.set("deck", String(selectedDeck.id));
    if (selectedTruck?.id) url.searchParams.set("truck", String(selectedTruck.id));
    if (selectedBolt?.id) url.searchParams.set("bolt", String(selectedBolt.id));

    router.replace(url.href);
  }, [router, selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  // Get the parts for the active category
  const getActiveParts = () => {
    switch (activeCategory) {
      case "deck": return decks;
      case "wheel": return wheels;
      case "truck": return trucks;
      case "bolt": return bolts;
    }
  };

  // Get the selected part for the active category
  const getSelectedPart = () => {
    switch (activeCategory) {
      case "deck": return selectedDeck;
      case "wheel": return selectedWheel;
      case "truck": return selectedTruck;
      case "bolt": return selectedBolt;
    }
  };

  // Set the selected part for the active category
  const handleSelectPart = (part: Part) => {
    switch (activeCategory) {
      case "deck": setDeck(part); break;
      case "wheel": setWheel(part); break;
      case "truck": setTruck(part); break;
      case "bolt": setBolt(part); break;
    }
  };

  const activeParts = getActiveParts();
  const selectedPart = getSelectedPart();

  // Filter parts by search query
  const filteredParts = searchQuery
    ? activeParts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeParts;

  return (
    <div className={clsx("flex flex-col h-full", className)}>
      {/* Category Tabs */}
      <div className="flex overflow-x-auto border-b-4 border-black no-scrollbar bg-white">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => { setActiveCategory(cat.key); setSearchQuery(""); }}
            className={clsx(
              "px-5 py-4 text-sm font-bold border-r-2 border-black/10 transition-colors whitespace-nowrap",
              activeCategory === cat.key
                ? "font-black text-black bg-yellow-300 skew-x-[-10deg]"
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="p-4 border-b-4 border-black bg-[#e5e5e5] relative">
        <div className="relative z-10">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-black text-[20px] font-bold">search</span>
          <input
            className="w-full bg-white border-2 border-black rounded-none pl-10 pr-4 py-2 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:shadow-hard-sm transition-all font-mono"
            placeholder="Search parts..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Parts List */}
      <div className="flex-1 overflow-y-auto build-custom-scrollbar p-4 space-y-4 bg-build-paper">
        {filteredParts.map((part, index) => {
          const isSelected = part.id === selectedPart?.id;
          return (
            <PartCard
              key={part.id}
              part={part}
              isSelected={isSelected}
              onClick={() => handleSelectPart(part)}
              index={index}
            />
          );
        })}
        {filteredParts.length === 0 && (
          <div className="text-center text-gray-400 py-8 font-marker">
            No parts found...
          </div>
        )}
      </div>
    </div>
  );
}

type PartCardProps = {
  part: Part;
  isSelected: boolean;
  onClick: () => void;
  index: number;
};

function PartCard({ part, isSelected, onClick, index }: PartCardProps) {
  const rotations = ["rotate-1", "-rotate-1", "hover:-rotate-1", "hover:rotate-1"];
  const rotation = rotations[index % rotations.length];

  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative flex items-center gap-3 p-3 border-2 bg-white cursor-pointer transition-all w-full text-left",
        isSelected
          ? "border-black shadow-hard transform rotate-1"
          : `border-black/10 hover:border-black hover:shadow-hard ${rotation}`
      )}
    >
      {/* Equipped badge */}
      {isSelected && (
        <div className="absolute -top-3 -right-2 flex z-10">
          <span className="bg-purple-600 text-[10px] font-bold text-white px-2 py-1 border border-black transform rotate-3 shadow-sm">
            EQUIPPED
          </span>
        </div>
      )}

      {/* Tape strip on selected */}
      {isSelected && (
        <div className="absolute -top-2 left-6 w-8 h-4 bg-yellow-400/60 transform rotate-2 z-10 shadow-sm" />
      )}

      {/* Part thumbnail */}
      <div
        className={clsx(
          "h-16 w-16 flex-shrink-0 bg-cover bg-center border",
          isSelected
            ? "bg-white border-gray-300"
            : "bg-gray-100 border-gray-200 grayscale group-hover:grayscale-0 transition-all"
        )}
      >
        {part.texture_url ? (
          <Image
            src={part.texture_url}
            alt={part.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-300 to-zinc-500" />
        )}
      </div>

      {/* Part info */}
      <div className="flex flex-col flex-1 min-w-0">
        <span className={clsx(
          "text-xs font-bold uppercase tracking-wide transition-colors",
          isSelected
            ? "text-black bg-yellow-300 inline-block px-1 w-max transform -skew-x-12"
            : "text-gray-500 group-hover:text-black"
        )}>
          {part.category}
        </span>
        <h3 className={clsx(
          "font-bold text-sm truncate mt-1",
          isSelected ? "text-black" : "text-black/80"
        )}>
          {part.name}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-gray-500 text-xs font-mono">
            {part.stock > 0 ? `${part.stock} in stock` : "Out of stock"}
          </span>
          <span className="text-black text-xs font-bold">
            ${Number(part.price).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Add icon on hover (non-selected) */}
      {!isSelected && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-black">add_circle</span>
        </div>
      )}
    </button>
  );
}
