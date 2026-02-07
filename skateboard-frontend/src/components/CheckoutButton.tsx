"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCustomizerControls } from "@/app/build/context";
import { checkout } from "@/lib/api";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function CheckoutButton() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } = useCustomizerControls();
  
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // Calculate total price (ensure values are numbers)
  const totalPrice = Number(selectedDeck?.price || 0) + 
                     Number(selectedWheel?.price || 0) + 
                     Number(selectedTruck?.price || 0) + 
                     Number(selectedBolt?.price || 0);

  const handleCheckout = async () => {
    if (!selectedDeck || !selectedWheel || !selectedTruck || !selectedBolt) {
      setError("Please configure all parts first");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const items = [
        { part_id: selectedDeck.id, quantity: 1 },
        { part_id: selectedWheel.id, quantity: 1 },
        { part_id: selectedTruck.id, quantity: 1 },
        { part_id: selectedBolt.id, quantity: 1 },
      ];

      await checkout(items, notes || undefined);
      
      setIsOpen(false);
      setNotes("");
      router.push("/orders?success=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/build");
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full rounded-xl bg-lime-400 py-3 font-bold text-zinc-900 transition-all hover:bg-lime-300 flex items-center justify-center gap-2"
      >
        <span>🛒</span>
        Add to Cart - ${totalPrice.toFixed(2)}
      </button>

      {/* Checkout Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              🛒 Checkout
            </h3>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}

            {/* Order Summary */}
            <div className="mb-6 rounded-lg bg-zinc-800 p-4">
              <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Order Summary</p>
              <div className="space-y-2">
                {selectedDeck && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400 truncate flex-1">{selectedDeck.name}</span>
                    <span className="text-white ml-2">${Number(selectedDeck.price).toFixed(2)}</span>
                  </div>
                )}
                {selectedWheel && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400 truncate flex-1">{selectedWheel.name}</span>
                    <span className="text-white ml-2">${Number(selectedWheel.price).toFixed(2)}</span>
                  </div>
                )}
                {selectedTruck && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400 truncate flex-1">{selectedTruck.name}</span>
                    <span className="text-white ml-2">${Number(selectedTruck.price).toFixed(2)}</span>
                  </div>
                )}
                {selectedBolt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400 truncate flex-1">{selectedBolt.name}</span>
                    <span className="text-white ml-2">${Number(selectedBolt.price).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-zinc-700 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-lime-400">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-sm text-zinc-400 mb-2">
                Order Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests..."
                rows={2}
                className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isProcessing}
                className="flex-1 rounded-lg bg-zinc-700 py-3 font-semibold text-white hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={clsx(
                  "flex-1 rounded-lg py-3 font-semibold transition-all",
                  isProcessing
                    ? "bg-lime-400/50 text-zinc-700 cursor-not-allowed"
                    : "bg-lime-400 text-zinc-900 hover:bg-lime-300"
                )}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
