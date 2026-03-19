"use client";

import { useCustomizerControls } from "./context";

export default function ReceiptWidget() {
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } =
    useCustomizerControls();

  const totalPrice =
    Number(selectedDeck?.price || 0) +
    Number(selectedWheel?.price || 0) +
    Number(selectedTruck?.price || 0) +
    Number(selectedBolt?.price || 0);

  const calcWeight = () => {
    return (
      (Number(selectedDeck?.weight) || 0) +
      (Number(selectedWheel?.weight) || 0) +
      (Number(selectedTruck?.weight) || 0) +
      (Number(selectedBolt?.weight) || 0)
    ).toFixed(1);
  };

  const calcStat = (statName: "durability" | "speed" | "pop") => {
    const parts = [selectedDeck, selectedWheel, selectedTruck, selectedBolt].filter(Boolean);
    if (parts.length === 0) return 0;
    const sum = parts.reduce((acc, part) => acc + (Number(part?.[statName] || 0)), 0);
    return Math.round(sum / parts.length);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md flex justify-between items-center px-8 py-4 z-20 border-t-2 border-white/10">
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2 text-white/90">
          <span className="material-symbols-outlined text-[18px]">fitness_center</span>
          <span className="text-sm font-bold">{calcWeight()}kg</span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <span className="material-symbols-outlined text-[18px]">shield</span>
          <span className="text-sm font-bold">{calcStat("durability")}%</span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <span className="material-symbols-outlined text-[18px]">speed</span>
          <span className="text-sm font-bold">{calcStat("speed")}%</span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span className="text-sm font-bold">{calcStat("pop")}%</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Estimated Total</span>
        <span className="text-2xl font-black text-[#ff6b35] tracking-tight">
          $ {totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
