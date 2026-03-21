"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCustomizerControls } from "@/app/build/context";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } = useCustomizerControls();
  
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  // Calculate total price (ensure values are numbers)
  const totalPrice = Number(selectedDeck?.price || 0) + 
                     Number(selectedWheel?.price || 0) + 
                     Number(selectedTruck?.price || 0) + 
                     Number(selectedBolt?.price || 0);

  const handleCheckout = () => {
    if (!selectedDeck || !selectedWheel || !selectedTruck || !selectedBolt) {
      setError("Please configure all parts first");
      return;
    }

    const queryParams = new URLSearchParams({
      deck: selectedDeck.id.toString(),
      wheel: selectedWheel.id.toString(),
      truck: selectedTruck.id.toString(),
      bolt: selectedBolt.id.toString(),
      notes: notes,
    });
    
    setIsOpen(false);
    router.push(`/checkout?${queryParams.toString()}`);
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
        className="w-full py-3 px-4 rounded-sm bg-[#ff6b00] border-2 border-black text-white font-black text-sm transition-transform hover:-translate-y-1 hover:bg-[#e65100] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] uppercase tracking-wide flex items-center justify-center gap-2 relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-2">
          ADD TO CART - ${totalPrice.toFixed(2)}
          <span className="material-symbols-outlined text-[20px] font-bold">shopping_cart</span>
        </span>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-30"></div>
      </button>

      {/* Checkout Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative transform -rotate-1">
            <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tighter flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px]">shopping_cart</span>
              Checkout
            </h3>

            {error && (
              <div className="mb-4 bg-red-50 p-3 text-sm text-red-600 border-2 border-red-500 font-bold shadow-hard-sm">
                {error}
              </div>
            )}

            {/* Order Summary */}
            <div className="mb-6 bg-gray-50 border-2 border-black p-4 shadow-hard-sm">
              <p className="text-xs text-black font-bold uppercase mb-3 px-1 border-b-2 border-black pb-1">Order Summary</p>
              <div className="space-y-3 font-medium text-sm">
                {selectedDeck && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 truncate flex-1">{selectedDeck.name}</span>
                    <span className="text-black font-black bg-yellow-300 px-2 py-0.5 border-2 border-black rotate-1 inline-block">${Number(selectedDeck.price).toFixed(2)}</span>
                  </div>
                )}
                {selectedWheel && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 truncate flex-1">{selectedWheel.name}</span>
                    <span className="text-black font-black bg-yellow-300 px-2 py-0.5 border-2 border-black -rotate-1 inline-block">${Number(selectedWheel.price).toFixed(2)}</span>
                  </div>
                )}
                {selectedTruck && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 truncate flex-1">{selectedTruck.name}</span>
                    <span className="text-black font-black bg-yellow-300 px-2 py-0.5 border-2 border-black rotate-1 inline-block">${Number(selectedTruck.price).toFixed(2)}</span>
                  </div>
                )}
                {selectedBolt && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 truncate flex-1">{selectedBolt.name}</span>
                    <span className="text-black font-black bg-yellow-300 px-2 py-0.5 border-2 border-black -rotate-1 inline-block">${Number(selectedBolt.price).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t-4 border-black pt-3 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-black font-black uppercase text-lg">Total</span>
                    <span className="text-[#ff6b00] font-black text-2xl">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm text-black font-bold uppercase mb-2">
                Order Notes (opt)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests..."
                rows={2}
                className="w-full border-2 border-black bg-white px-4 py-3 text-black placeholder-gray-400 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-shadow font-medium resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-white border-2 border-black py-3 font-black text-black hover:bg-gray-100 uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-[#ff6b00] border-2 border-black py-3 font-black text-white hover:bg-[#e65100] uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
