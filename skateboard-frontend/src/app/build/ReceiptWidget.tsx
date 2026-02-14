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

  const itemCount = [selectedDeck, selectedWheel, selectedTruck, selectedBolt].filter(Boolean).length;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-8 pointer-events-none">
      <div className="pointer-events-auto bg-white shadow-hard transform -rotate-1 font-mono text-xs relative w-[340px]">
        {/* Right zigzag edge */}
        <div className="absolute top-0 -right-2 bottom-0 w-3 overflow-hidden h-full">
          <div
            className="h-full w-full bg-white border-l border-gray-100"
            style={{
              clipPath: "polygon(0 0, 100% 2%, 0 4%, 100% 6%, 0 8%, 100% 10%, 0 12%, 100% 14%, 0 16%, 100% 18%, 0 20%, 100% 22%, 0 24%, 100% 26%, 0 28%, 100% 30%, 0 32%, 100% 34%, 0 36%, 100% 38%, 0 40%, 100% 42%, 0 44%, 100% 46%, 0 48%, 100% 50%, 0 52%, 100% 54%, 0 56%, 100% 58%, 0 60%, 100% 62%, 0 64%, 100% 66%, 0 68%, 100% 70%, 0 72%, 100% 74%, 0 76%, 100% 78%, 0 80%, 100% 82%, 0 84%, 100% 86%, 0 88%, 100% 90%, 0 92%, 100% 94%, 0 96%, 100% 98%, 0 100%, 0 0)",
            }}
          />
        </div>

        {/* Left shadow edge */}
        <div className="absolute top-0 -left-1 bottom-0 w-1 bg-black/5" />

        <div className="p-5 border-t-8 border-black/10 relative">
          {/* Tape strip */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-tape/80 backdrop-blur-sm transform rotate-1 shadow-sm z-10" />

          {/* Order header */}
          <div className="flex justify-between items-center mb-4 text-gray-500 font-bold border-b-2 border-dotted border-gray-300 pb-2">
            <span>ORDER #{String(Date.now()).slice(-4)}</span>
            <span>{itemCount} ITEM{itemCount !== 1 ? "S" : ""}</span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
            <StatBar label="Total Weight" value="2.1 kg" percent={100} color="bg-black" />
            <StatBar label="Durability" value="85%" percent={85} color="bg-yellow-400" />
            <StatBar label="Speed" value="92%" percent={92} color="bg-orange-500" />
            <StatBar label="Pop" value="78%" percent={78} color="bg-green-500" />
          </div>

          {/* Total price */}
          <div className="border-t-2 border-black pt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-black uppercase">TOTAL</span>
            <span className="text-3xl font-black text-[#ff6b35] tracking-tighter">
              $ {totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Barcode decoration */}
          <div
            className="mt-3 h-8 bg-repeat-x opacity-30"
            style={{
              backgroundImage: "linear-gradient(90deg, #000 0, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 8px, transparent 8px, transparent 9px, #000 9px, #000 12px, transparent 12px, transparent 14px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StatBar({
  label,
  value,
  percent,
  color,
}: {
  label: string;
  value: string;
  percent: number;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-end">
        <span className="text-[10px] uppercase font-bold text-gray-400">{label}</span>
        <span className="text-[10px] font-black">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden border border-black/10">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
