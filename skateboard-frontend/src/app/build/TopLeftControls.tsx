"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function TopLeftControls() {
  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex items-center gap-2 mb-3 pointer-events-auto relative">
      <Link
        href="/"
        className="bg-white border-2 border-black px-3 py-1 text-black hover:bg-black hover:text-white transition-colors text-sm font-bold flex items-center gap-1 shadow-hard-sm transform -rotate-1"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        BACK
      </Link>
      <button 
        onClick={handleShare}
        className="bg-white border-2 border-black px-3 py-1 text-black hover:bg-black hover:text-white transition-colors text-sm font-bold flex items-center gap-1 shadow-hard transform rotate-1 uppercase"
      >
        <span className="material-symbols-outlined text-[16px]">share</span>
        SHARE
      </button>

      {/* Custom Toast */}
      {showToast && (
        <div className="absolute top-12 left-0 z-50 animate-fade-in">
          <div className="bg-yellow-300 border-2 border-black px-4 py-2 text-black font-black text-sm shadow-hard transform flex items-center gap-2 uppercase">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Link Copied!
          </div>
        </div>
      )}
    </div>
  );
}
