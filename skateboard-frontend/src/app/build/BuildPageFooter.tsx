"use client";

import { useState } from "react";
import { Part } from "@/lib/types";
import { useCustomizerControls } from "./context";
import CheckoutButton from "@/components/CheckoutButton";
import SaveDesignButton from "@/components/SaveDesignButton";
import AIStyleAnalyzer from "@/components/AIStyleAnalyzer";

type Props = {
  allParts: Part[];
};

export default function BuildPageFooter({ allParts }: Props) {
  const [showAI, setShowAI] = useState(false);
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } =
    useCustomizerControls();

  const totalPrice =
    Number(selectedDeck?.price || 0) +
    Number(selectedWheel?.price || 0) +
    Number(selectedTruck?.price || 0) +
    Number(selectedBolt?.price || 0);

  return (
    <div className="p-5 border-t-4 border-black bg-white z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] relative flex flex-col gap-4">
      {/* Decorative SVG */}
      <svg className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none" viewBox="0 0 100 100">
        <path d="M0,0 Q50,50 100,0 V100 H0 Z" fill="black" />
      </svg>

      {/* Total Cost */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-gray-500 uppercase">Total Cost</span>
        <span className="text-xl font-black text-black">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      {/* AI Style Assist Button */}
      <button
        onClick={() => setShowAI(!showAI)}
        className="w-full bg-[#a855f7] border-2 border-black text-white font-bold py-3 shadow-hard transform -rotate-1 hover:rotate-0 transition-transform flex items-center justify-center gap-2 group uppercase tracking-wider relative z-20"
      >
        <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
        AI Style Assist
      </button>

      {/* AI Chat Panel (collapsible) */}
      {showAI && (
        <div className="border-2 border-black p-3 bg-gray-50 transform rotate-0 relative">
          <div className="absolute -top-2 left-4 w-8 h-3 bg-tape/70 transform rotate-2 z-10" />
          <AIStyleAnalyzer allParts={allParts} className="[&_.bg-zinc-800]:bg-gray-200 [&_.text-zinc-500]:text-gray-500 [&_.bg-zinc-900]:bg-white [&_.bg-zinc-700]:bg-gray-300 [&_.text-zinc-300]:text-gray-600 [&_.text-zinc-400]:text-gray-500 [&_.text-white]:text-black [&_.text-zinc-200]:text-gray-700 [&_.bg-purple-600]:bg-purple-500 [&_.focus\:ring-purple-500]:focus:ring-purple-400" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <div className="flex-1">
          <SaveDesignButton />
        </div>
        <div className="flex-[2]">
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}
