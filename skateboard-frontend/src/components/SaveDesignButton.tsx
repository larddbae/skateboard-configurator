"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCustomizerControls } from "@/app/build/context";
import { saveDesign } from "@/lib/api";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function SaveDesignButton() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } = useCustomizerControls();
  
  const [isOpen, setIsOpen] = useState(false);
  const [designName, setDesignName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSave = async () => {
    if (!designName.trim()) {
      setError("Please enter a design name");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      if (!selectedDeck || !selectedWheel || !selectedTruck || !selectedBolt) {
        setError("Please configure all parts first");
        return;
      }
      await saveDesign(designName, {
        deck_id: selectedDeck.id,
        wheel_id: selectedWheel.id,
        truck_id: selectedTruck.id,
        bolt_id: selectedBolt.id,
      });
      
      setIsOpen(false);
      setDesignName("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save design");
    } finally {
      setIsSaving(false);
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
        className="w-full py-3 px-4 rounded-sm bg-white border-2 border-black text-black font-black text-sm transition-transform hover:-translate-y-1 hover:bg-gray-100 shadow-hard-sm hover:shadow-hard uppercase tracking-wide flex items-center justify-center gap-2 group"
      >
        <span className="material-symbols-outlined text-[20px] font-bold">save</span>
        {isAuthenticated ? "SAVE DESIGN" : "LOGIN TO SAVE"}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative transform rotate-1">
            <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tighter">
              Save Your Design
            </h3>

            {error && (
              <div className="mb-4 bg-red-50 p-3 text-sm text-red-600 border-2 border-red-500 font-bold shadow-hard-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm text-black font-bold uppercase mb-2">
                Design Name
              </label>
              <input
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="My Awesome Board"
                className="w-full border-2 border-black bg-white px-4 py-3 text-black placeholder-gray-400 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-shadow font-medium"
              />
            </div>

            {/* Preview */}
            <div className="mb-6 bg-gray-50 border-2 border-black p-4 shadow-hard-sm">
              <p className="text-xs text-black font-bold uppercase mb-3 px-1 border-b-2 border-black pb-1">Configuration</p>
              <div className="grid grid-cols-2 gap-y-2 text-sm font-medium">
                <div className="text-gray-500">Deck:</div>
                <div className="text-black font-bold truncate text-right">{selectedDeck?.name || 'Not selected'}</div>
                <div className="text-gray-500">Wheels:</div>
                <div className="text-black font-bold truncate text-right">{selectedWheel?.name || 'Not selected'}</div>
                <div className="text-gray-500">Trucks:</div>
                <div className="text-black font-bold truncate text-right">{selectedTruck?.name || 'Not selected'}</div>
                <div className="text-gray-500">Bolts:</div>
                <div className="text-black font-bold truncate text-right">{selectedBolt?.name || 'Not selected'}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isSaving}
                className="flex-1 bg-white border-2 border-black py-3 font-black text-black hover:bg-gray-100 uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={clsx(
                  "flex-1 border-2 border-black py-3 font-black text-white uppercase tracking-wider transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
                  isSaving
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-500"
                )}
              >
                {isSaving ? "Saving..." : "Save Design"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Toast Notification */}
      {showToast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] animate-fade-in pointer-events-none">
          <div className="bg-purple-500 border-4 border-black px-6 py-3 text-white font-black text-xl shadow-[8px_8px_0px_rgba(0,0,0,1)] transform -rotate-2 flex items-center gap-3 uppercase tracking-wider">
            <span className="material-symbols-outlined text-[24px]">verified</span>
            Design saved successfully!
          </div>
        </div>
      )}
    </>
  );
}
