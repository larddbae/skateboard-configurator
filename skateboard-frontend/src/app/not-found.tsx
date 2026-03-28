"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Animated Skateboard SVG ───────────────────────────────────────── */
function SkateboardSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Deck */}
      <path
        d="M30 25 Q10 25 8 20 Q6 15 15 15 L185 15 Q194 15 192 20 Q190 25 170 25 Z"
        fill="#ff6b35"
        stroke="#1a1a1a"
        strokeWidth="2.5"
      />
      {/* Grip tape pattern */}
      <path
        d="M35 24 L165 24 L165 16 L35 16 Z"
        fill="#1a1a1a"
        opacity="0.3"
      />
      {/* Trucks */}
      <rect x="45" y="25" width="30" height="6" rx="1" fill="#888" stroke="#1a1a1a" strokeWidth="1.5" />
      <rect x="125" y="25" width="30" height="6" rx="1" fill="#888" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Wheels */}
      <circle cx="48" cy="40" r="9" fill="#d9f154" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="48" cy="40" r="4" fill="#1a1a1a" />
      <circle cx="72" cy="40" r="9" fill="#d9f154" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="72" cy="40" r="4" fill="#1a1a1a" />
      <circle cx="128" cy="40" r="9" fill="#d9f154" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="128" cy="40" r="4" fill="#1a1a1a" />
      <circle cx="152" cy="40" r="9" fill="#d9f154" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="152" cy="40" r="4" fill="#1a1a1a" />
    </svg>
  );
}

/* ─── Crack / Grind Mark SVG Decoration ─────────────────────────────── */
function GrindMarks() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full h-16 opacity-10 pointer-events-none"
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
    >
      <path d="M0 30 Q100 20 200 35 Q350 50 500 25 Q650 5 800 30 Q950 55 1100 20 L1200 30" stroke="#ff6b35" strokeWidth="2" fill="none" />
      <path d="M0 45 Q150 35 300 48 Q450 58 600 40 Q750 22 900 42 Q1050 62 1200 45" stroke="#d9f154" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ─── Floating Sticker Component ────────────────────────────────────── */
function FloatingSticker({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        animation: `stickerFloat 4s ease-in-out ${delay || 0}s infinite alternate`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── 404 Page ──────────────────────────────────────────────────────── */
export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#1e1b4b] font-space-grotesk antialiased overflow-hidden flex flex-col items-center justify-center selection:bg-primary selection:text-white"
    >
      {/* ═══ Background Layers ═══ */}
      {/* Stardust texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      {/* Grain noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-grain opacity-40 mix-blend-overlay" />
      {/* Radial spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background: `radial-gradient(ellipse 50% 50% at ${50 + mousePos.x * 0.5}% ${50 + mousePos.y * 0.5}%, rgba(255,107,53,0.12) 0%, transparent 70%)`,
          transition: "background 0.3s ease-out",
        }}
      />
      {/* Skate pattern */}
      <div className="fixed inset-0 pointer-events-none z-[3] bg-skate-pattern opacity-30" />

      {/* ═══ Floating Stickers ═══ */}
      <FloatingSticker className="top-[8%] left-[5%] md:left-[10%] rotate-[-15deg]" delay={0}>
        <div className="bg-primary border-2 border-black px-3 py-1 shadow-hard text-black font-marker text-sm md:text-base transform rotate-[-5deg]">
          OOPS!
        </div>
      </FloatingSticker>

      <FloatingSticker className="top-[12%] right-[6%] md:right-[12%] rotate-[10deg]" delay={1.2}>
        <span className="material-icons text-team-purple text-4xl md:text-5xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          skateboarding
        </span>
      </FloatingSticker>

      <FloatingSticker className="bottom-[18%] left-[8%] rotate-[8deg]" delay={0.6}>
        <div className="bg-suburbia-lime border-2 border-black px-3 py-1 shadow-hard text-black font-rubik-mono text-[10px] md:text-xs uppercase">
          Page Not Found
        </div>
      </FloatingSticker>

      <FloatingSticker className="bottom-[15%] right-[5%] md:right-[10%] rotate-[-12deg]" delay={1.8}>
        <span className="material-icons text-suburbia-lime text-3xl md:text-4xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          warning
        </span>
      </FloatingSticker>

      <FloatingSticker className="top-[40%] left-[3%] rotate-[20deg] hidden md:block" delay={2.2}>
        <div className="w-10 h-10 bg-team-purple/30 border-2 border-team-purple rounded-full" />
      </FloatingSticker>

      <FloatingSticker className="top-[35%] right-[3%] rotate-[-8deg] hidden md:block" delay={0.9}>
        <div className="w-8 h-8 bg-primary/30 border-2 border-primary transform rotate-45" />
      </FloatingSticker>

      {/* ═══ Main Content ═══ */}
      <main className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 max-w-4xl mx-auto">
        {/* 404 Number - Giant Zine Typography */}
        <div
          className={`relative mb-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className="text-[30vw] sm:text-[25vw] md:text-[20vw] lg:text-[200px] font-rubik-mono text-white leading-[0.85] tracking-tight select-none"
            style={{
              textShadow: "8px 8px 0px rgba(168,85,247,0.6), 16px 16px 0px rgba(255,107,53,0.3)",
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            4<span className="text-primary text-stroke">0</span>4
          </h1>

          {/* Decorative X marks around the 404 */}
          <div className="absolute -top-4 -left-4 md:-top-6 md:-left-8 text-primary font-marker text-2xl md:text-4xl opacity-60 animate-pulse">✕</div>
          <div className="absolute -bottom-2 -right-4 md:-bottom-4 md:-right-8 text-suburbia-lime font-marker text-xl md:text-3xl opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }}>✕</div>
        </div>

        {/* Skateboard Animation */}
        <div
          className={`relative w-48 sm:w-56 md:w-72 mb-8 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            animation: "skateRoll 3s ease-in-out infinite",
          }}
        >
          <SkateboardSVG className="w-full h-auto drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]" />
        </div>

        {/* Subtitle / Message */}
        <div
          className={`mb-6 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Tape strip label */}
          <div className="inline-block bg-primary border-2 border-black px-5 py-2 shadow-hard transform -rotate-2 mb-6">
            <span className="font-rubik-mono text-black text-sm sm:text-base md:text-lg uppercase tracking-wider">
              Bail! Wrong Spot!
            </span>
          </div>

          <p className="text-white/80 text-base sm:text-lg md:text-xl font-space-grotesk max-w-lg mx-auto leading-relaxed">
            Looks like you{" "}
            <span className="text-primary font-bold">bailed hard</span> on this
            trick. The page you&apos;re looking for doesn&apos;t exist or has
            been{" "}
            <span className="text-suburbia-lime font-bold">
              kicked out
            </span>{" "}
            of the park.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Primary CTA - Back to Home */}
          <Link
            href="/"
            className="group relative bg-primary text-black font-rubik-mono text-sm sm:text-base uppercase px-8 py-4 border-3 border-black shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex items-center gap-3"
          >
            <span className="material-icons text-xl group-hover:animate-bounce">
              home
            </span>
            Back to Home
            <span className="absolute -top-2 -right-3 bg-suburbia-lime border-2 border-black px-1.5 py-0.5 text-[10px] font-rubik-mono text-black transform rotate-12 shadow-hard-sm">
              GO!
            </span>
          </Link>

          {/* Secondary CTA - Shop */}
          <Link
            href="/shop"
            className="group bg-transparent text-white font-rubik-mono text-sm sm:text-base uppercase px-8 py-4 border-2 border-white/40 hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-3 hover:shadow-[0_0_20px_rgba(255,107,53,0.3)]"
          >
            <span className="material-icons text-xl">
              storefront
            </span>
            Hit the Shop
          </Link>
        </div>

        {/* Quick Links */}
        <div
          className={`mt-12 sm:mt-16 flex flex-wrap justify-center gap-3 sm:gap-4 transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { href: "/build", label: "Build", icon: "construction" },
            { href: "/team", label: "Team", icon: "groups" },
            { href: "/about", label: "About", icon: "info" },
            { href: "/faq", label: "FAQ", icon: "help" },
            { href: "/contact", label: "Contact", icon: "mail" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-xs sm:text-sm font-space-mono uppercase tracking-wider transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/20"
            >
              <span className="material-icons text-sm group-hover:text-primary transition-colors">
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      </main>

      {/* ═══ Bottom Grind Marks ═══ */}
      <GrindMarks />

      {/* ═══ Bottom Corner Branding ═══ */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
        <span className="font-space-mono text-white/30 text-[10px] sm:text-xs uppercase tracking-[0.3em]">
          Suburbia Skate // 404
        </span>
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
        <span className="font-space-mono text-white/30 text-[10px] sm:text-xs uppercase tracking-wider">
          Error: Page Not Found
        </span>
      </div>

      {/* ═══ Keyframe Animations (inline style tag) ═══ */}
      <style jsx>{`
        @keyframes stickerFloat {
          0% {
            transform: translateY(0px) rotate(var(--tw-rotate, 0deg));
          }
          100% {
            transform: translateY(-15px) rotate(var(--tw-rotate, 0deg));
          }
        }

        @keyframes skateRoll {
          0%, 100% {
            transform: translateX(-8px) rotate(-2deg);
          }
          50% {
            transform: translateX(8px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
