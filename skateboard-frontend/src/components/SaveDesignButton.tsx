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
      alert("Design saved successfully!");
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
        className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white transition-all hover:bg-purple-500 flex items-center justify-center gap-2"
      >
        <span>💾</span>
        {isAuthenticated ? "Save Design" : "Login to Save"}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Save Your Design
            </h3>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm text-zinc-400 mb-2">
                Design Name
              </label>
              <input
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="My Awesome Board"
                className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Preview */}
            <div className="mb-6 rounded-lg bg-zinc-800 p-4">
              <p className="text-xs text-zinc-500 mb-2">Configuration:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-zinc-400">Deck:</div>
                <div className="text-white truncate">{selectedDeck?.name || 'Not selected'}</div>
                <div className="text-zinc-400">Wheels:</div>
                <div className="text-white truncate">{selectedWheel?.name || 'Not selected'}</div>
                <div className="text-zinc-400">Trucks:</div>
                <div className="text-white truncate">{selectedTruck?.name || 'Not selected'}</div>
                <div className="text-zinc-400">Bolts:</div>
                <div className="text-white truncate">{selectedBolt?.name || 'Not selected'}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isSaving}
                className="flex-1 rounded-lg bg-zinc-700 py-3 font-semibold text-white hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={clsx(
                  "flex-1 rounded-lg py-3 font-semibold text-white transition-all",
                  isSaving
                    ? "bg-purple-600/50 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-500"
                )}
              >
                {isSaving ? "Saving..." : "Save Design"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
