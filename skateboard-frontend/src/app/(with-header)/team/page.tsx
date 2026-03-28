"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Types ──────────────────────────────────────────────────────────── */

type Category = "pro" | "am";

interface Skater {
  firstName: string;
  lastName: string;
  nickname?: string;
  image: string;
  stance: "Goofy" | "Regular";
  category: Category;
  rotation: string;
  namePosition: "left" | "right";
}

interface Video {
  title: string;
  subtitle: string;
  youtubeId: string;
  thumbnail: string;
}

/* ─── Data ───────────────────────────────────────────────────────────── */

const skaters: Skater[] = [
  {
    firstName: "Leo 'Ghost'",
    lastName: "Carter",
    image: "/images/team/skater-leo.jpg",
    stance: "Goofy",
    category: "pro",
    rotation: "-2deg",
    namePosition: "left",
  },
  {
    firstName: "Maya",
    lastName: "Hyland",
    image: "/images/team/skater-maya.jpg",
    stance: "Regular",
    category: "pro",
    rotation: "3deg",
    namePosition: "right",
  },
  {
    firstName: "Jaxson",
    lastName: "Reed",
    image: "/images/team/skater-jaxson.jpg",
    stance: "Goofy",
    category: "am",
    rotation: "-1deg",
    namePosition: "left",
  },
  {
    firstName: "Sofia",
    lastName: "Mendez",
    image: "/images/team/skater-sofia.jpg",
    stance: "Regular",
    category: "am",
    rotation: "4deg",
    namePosition: "right",
  },
  {
    firstName: "Kai 'Razor'",
    lastName: "Tanaka",
    image: "/images/team/skater-kai.jpg",
    stance: "Goofy",
    category: "pro",
    rotation: "2deg",
    namePosition: "left",
  },
  {
    firstName: "Zara",
    lastName: "Okonkwo",
    image: "/images/team/skater-zara.jpg",
    stance: "Regular",
    category: "am",
    rotation: "-3deg",
    namePosition: "right",
  },
  {
    firstName: "Diego 'El Diablo'",
    lastName: "Reyes",
    image: "/images/team/skater-diego.jpg",
    stance: "Goofy",
    category: "pro",
    rotation: "1deg",
    namePosition: "left",
  },
  {
    firstName: "Rin",
    lastName: "Nakamura",
    image: "/images/team/skater-rin.jpg",
    stance: "Regular",
    category: "am",
    rotation: "-4deg",
    namePosition: "right",
  },
];

const videos: Video[] = [
  {
    title: "Victus Tour: Tokyo Nights",
    subtitle: "Full Team • 2 Weeks ago",
    youtubeId: "VIDEO_ID_1",
    thumbnail: "/images/team/hero-bg.jpg",
  },
  {
    title: "Maya Hyland: Welcome",
    subtitle: "Maya Hyland • 1 Month ago",
    youtubeId: "VIDEO_ID_2",
    thumbnail: "/images/team/hero-bg.jpg",
  },
  {
    title: "Concrete Jungle: Full Length",
    subtitle: "Full Feature • 3 Months ago",
    youtubeId: "VIDEO_ID_3",
    thumbnail: "/images/team/hero-bg.jpg",
  },
  {
    title: "Street Sessions: Downtown",
    subtitle: "Team Edit • 4 Months ago",
    youtubeId: "VIDEO_ID_4",
    thumbnail: "/images/team/hero-bg.jpg",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function TeamPage() {
  /* ── Refs ─────────────────────────────────────────────────────────── */
  const pageRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroImgHolderRef = useRef<HTMLDivElement>(null);

  const rosterPinContainerRef = useRef<HTMLDivElement>(null);
  const rosterSectionRef = useRef<HTMLElement>(null);
  const rosterScrollRef = useRef<HTMLDivElement>(null);

  const videosPinContainerRef = useRef<HTMLDivElement>(null);
  const videosSectionRef = useRef<HTMLElement>(null);
  const videosScrollRef = useRef<HTMLDivElement>(null);

  /* ── GSAP ─────────────────────────────────────────────────────────── */
  useGSAP(
    () => {
      // 1. Hero text clip-reveal
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-line-1", {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
      }).from(
        ".hero-line-2",
        {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
        },
        "-=0.8"
      ).from(
        ".hero-footer-item",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        },
        "-=0.6"
      );

      // Hero Image Initial Entry Animation (floating image)
      if (heroImgRef.current) {
        tl.from(
          heroImgRef.current,
          {
            opacity: 0,
            rotation: -45, // Add a slight spin
            duration: 1.5,
            ease: "back.out(1.5)",
          },
          "-=1.2" // Start coming in with the second line of text
        );
      }

      // 2. Hero Image Scroll
      if (heroImgHolderRef.current && heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          y: "0%", // Was -110% initially via inline style
          scale: 1, // Was 0.25 initially via inline style
          rotation: 0, // Was -15deg initially via inline style
          ease: "none",
          scrollTrigger: {
            trigger: heroImgHolderRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });
      }

      // 3. Roster Horizontal Scroll (Wibe Studio 'Shop' native style)
      if (rosterPinContainerRef.current && rosterScrollRef.current) {
        // We use the full scrollWidth so it scrolls completely off-screen ("hingga kosong")
        const xDist = rosterScrollRef.current.scrollWidth;

        gsap.to(rosterScrollRef.current, {
          x: -xDist,
          ease: "none",
          scrollTrigger: {
            trigger: rosterPinContainerRef.current,
            start: "top top",
            end: () => `+=${xDist}`,
            scrub: 1,
            pin: true,
            pinType: "fixed",
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // 4. Latest Parts Vertical Scroll (Wibe Studio 'New Arrival' native style)
      if (videosPinContainerRef.current && videosScrollRef.current) {
        // We use the full scrollHeight so it scrolls completely off-screen ("hingga kosong")
        const yDist = videosScrollRef.current.scrollHeight;

        gsap.to(videosScrollRef.current, {
          y: -yDist,
          ease: "none",
          scrollTrigger: {
            trigger: videosPinContainerRef.current,
            start: "top top",
            end: () => `+=${yDist}`,
            scrub: 1,
            pin: true,
            pinType: "fixed",
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });
      }
    },
    { scope: pageRef }
  );

  return (
    <div
      ref={pageRef}
      className="bg-team-dark font-space-grotesk antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white relative overflow-x-hidden bg-texture"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* ═══════════════ HERO SECTION (Portfolio Style) ═══════════════ */}
      <section className="relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden z-10">
        <div className="w-full px-4 md:px-8 flex flex-col items-center text-center">
          <div className="overflow-hidden">
            <h1
              className="hero-line-1 text-[18vw] md:text-[16vw] font-rubik-mono text-white leading-[0.9] tracking-tight uppercase"
              style={{
                textShadow: "6px 6px 0px rgba(0,0,0,0.5)",
              }}
            >
              THE
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line-2 text-[18vw] md:text-[16vw] font-rubik-mono text-white leading-[0.9] tracking-tight uppercase relative z-[2]"
              style={{
                textShadow: "6px 6px 0px rgba(168,85,247,0.5)",
              }}
            >
              <span className="text-primary text-stroke">CR</span>
              EW
            </h1>
          </div>
        </div>

        <div className="absolute bottom-0 w-full px-4 md:px-8 py-6 flex items-end justify-between z-10">
          <div className="hero-footer-item flex items-center gap-2">
            <div className="bg-white border-2 border-black px-3 py-1 shadow-hard transform -rotate-2">
              <span className="font-marker text-black text-xs md:text-sm whitespace-nowrap">
                EST. 2024 // PURE CHAOS
              </span>
            </div>
          </div>
          <div className="hero-footer-item hidden md:block">
            <p className="font-space-mono text-white/60 text-xs uppercase tracking-[0.3em]">
              Raw Talent // Concrete
            </p>
          </div>
          <div className="hero-footer-item">
            <p className="font-space-mono text-white/60 text-xs uppercase tracking-wider">
              Showcase Mode: ON
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ HERO IMAGE HOLDER (Scroll-Animated) ═════════ */}
      <section ref={heroImgHolderRef} className="relative w-full h-[100svh] px-4 md:px-8 z-10">
        <div
          ref={heroImgRef}
          className="relative w-full h-full border-4 border-white overflow-hidden shadow-hard"
          style={{
            borderRadius: "8px",
            transform: "translateY(-110%) scale(0.25) rotate(-15deg)",
          }}
        >
          <Image
            src="/images/team/hero-bg.jpg"
            alt="Team hero image"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-team-dark/60 via-transparent to-transparent"></div>
        </div>
      </section>

      {/* ═══════════════ ROSTER SECTION (Wibe Studio 'Shop' Section) ═══════ */}
      <div ref={rosterPinContainerRef}>
        <section ref={rosterSectionRef} className="relative w-full h-screen flex overflow-hidden z-10 w-[100vw] bg-texture">
          {/* Left Panel - Fixed width flex child (Native equivalent to Wibe Studio fixed/sticky) */}
          <div className="w-[35%] h-full flex flex-col justify-center px-8 md:px-12 bg-team-dark relative z-20 flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
            <h2
              className="text-4xl md:text-6xl font-rubik-mono text-white uppercase leading-[0.9] mb-8 tracking-tight relative z-10"
              style={{ textShadow: "4px 4px 0px #a855f7" }}
            >
              Active
              <br />
              <span className="text-primary">Roster</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-space-grotesk max-w-sm relative z-10">
              Our crew is built different. From the streets to the contests,
              these riders push the boundaries of what&apos;s possible on four wheels.
              Raw talent forged on concrete.
              <br />
              <br />
              Each member brings their own unique style — no two runs are the same.
              That&apos;s what makes Victus Skateboard special.
            </p>
          </div>

          {/* Right Panel - The Scrolling Track */}
          <div className="w-[65%] h-full relative flex items-center bg-tape-orange bg-texture">
            {/* This wrapper slides to the left */}
            <div ref={rosterScrollRef} className="absolute left-0 top-0 h-full flex items-center px-12 z-10">
              {skaters.map((skater, i) => (
                <div
                  key={`${skater.lastName}-${i}`}
                  className="group relative cursor-pointer inline-block flex-shrink-0"
                  style={{ width: "280px", marginRight: "3rem", "--rotation": skater.rotation } as React.CSSProperties}
                >
                  <div className="aspect-[3/4] relative z-10">
                    <div className="absolute inset-0 bg-gray-800 overflow-hidden border-4 border-white shadow-hard transition-all duration-500 group-hover:scale-[1.02]">
                      <Image
                        src={skater.image}
                        alt={`${skater.firstName} ${skater.lastName}`}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        sizes="280px"
                      />
                    </div>
                    <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[80px] drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] animate-bounce">
                        skateboarding
                      </span>
                    </div>
                    <div className={`absolute -top-3 -right-3 z-30 transform ${skater.stance === "Goofy" ? "rotate-12" : "-rotate-6"}`}>
                      <span className={`px-3 py-1 border-2 border-black font-rubik-mono text-xs uppercase shadow-hard ${skater.stance === "Goofy" ? "bg-team-purple text-white" : "bg-white text-black"}`}>
                        {skater.stance}
                      </span>
                    </div>
                  </div>
                  <div className={`absolute bottom-6 z-40 transform transition-transform group-hover:scale-105 ${skater.namePosition === "right" ? "-right-2 rotate-2 text-right" : "-left-2 -rotate-3"}`}>
                    <div className="bg-primary px-4 py-2 border-2 border-black shadow-hard">
                      <h3 className="text-lg font-rubik-mono text-black uppercase leading-none">
                        {skater.firstName} <br />
                        <span className="text-white text-stroke-sm">{skater.lastName}</span>
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 z-30">
                    <span className={`px-2 py-0.5 text-[10px] font-rubik-mono uppercase border-2 border-black shadow-hard ${skater.category === "pro" ? "bg-primary text-black" : "bg-white text-black"}`}>
                      {skater.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════ LATEST PARTS SECTION (Wibe Studio 'New Arrival' Section) ══ */}
      <div ref={videosPinContainerRef}>
        <section ref={videosSectionRef} className="relative w-full h-screen bg-brand-navy overflow-hidden z-10 w-[100vw] bg-texture">
          {/* Overlay Frame (Viewfinder effect) - Absolutely positioned so it stays fixed while inner container scrolls */}
          <div
            className="absolute top-1/2 left-1/2 z-[11] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "45vw",
              height: "90vh",
              boxShadow: "0 0 0 50vw #1e1b4b", // Matches brand-navy hex
              border: "6px solid rgba(255,255,255,0.7)",
            }}
          ></div>

          {/* Title — positioned top-left absolute to the section */}
          <h2
            className="absolute top-12 left-6 md:left-12 z-[15] text-6xl md:text-8xl lg:text-[120px] font-marker text-white leading-[0.85]"
            style={{ textShadow: "6px 6px 0px #ff6b35" }}
          >
            Latest
            <br />
            Parts
          </h2>

          {/* Right-side Text */}
          <div className="absolute top-1/2 transform -translate-y-1/2 right-6 md:right-12 z-[12] w-[22%] hidden lg:block">
            <p className="text-white text-lg md:text-xl leading-relaxed font-space-grotesk font-medium relative shadow-sm">
              Check out the latest video parts from our team riders.
              From full-length features to quick edits, this is where
              the magic happens. Street sessions, contest runs, and
              everything in between.
              <br />
              <br />
              Stay tuned for exclusive behind-the-scenes content
              and upcoming premiere drops.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 mt-8 text-team-yellow hover:text-white text-base font-rubik-mono uppercase tracking-wider border-b-2 border-team-yellow hover:border-white transition-colors pb-1 drop-shadow-md"
            >
              View All
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>

          {/* Centered Vertical Scrolling Container (Moves UP) */}
          <div
            ref={videosScrollRef}
            className="absolute top-0 left-1/2 flex flex-col items-center transform -translate-x-1/2 min-h-screen"
            style={{ width: "38vw", paddingTop: "5vh", paddingBottom: "10vh" }}
          >
            {videos.map((video) => (
              <div key={video.youtubeId} className="flex flex-col items-center justify-center my-[4vh] w-full bg-white p-4 md:p-6 border-[6px] border-black shadow-sketch-lg transform odd:-rotate-1 even:rotate-1">
                <div className="relative w-full aspect-video bg-black border-[4px] border-black overflow-hidden group">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="38vw"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-team-yellow border-4 border-black flex items-center justify-center shadow-hard transform group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-black text-4xl md:text-5xl ml-1">play_arrow</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-black font-rubik-mono text-lg md:text-xl uppercase mt-5 mb-2 text-center leading-tight">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══════════════ NEWSLETTER SECTION ═══════════════════════════ */}
      <section className="relative rounded-none border-4 border-black p-8 md:p-12 text-center overflow-hidden bg-primary mx-4 my-16 rotate-1 shadow-hard z-10 bg-texture">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl mix-blend-multiply"></div>

        <h2 className="text-4xl md:text-6xl font-rubik-mono text-black uppercase mb-4 relative z-10 transform -rotate-1">
          Don&apos;t Miss the Next Drop
        </h2>
        <p className="text-black font-marker text-xl mb-8 max-w-lg mx-auto relative z-10">
          Sign up for exclusive access to limited edition pro models
          and video premieres.
        </p>

        <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4 relative z-10">
          <input
            className="flex-1 bg-white border-2 border-black px-4 py-3 text-black font-bold placeholder:text-gray-500 focus:shadow-hard outline-none transform rotate-1"
            placeholder="ENTER YOUR EMAIL"
            type="email"
          />
          <button
            className="bg-black hover:bg-gray-900 text-white font-rubik-mono px-8 py-3 uppercase transition-all shadow-hard hover:shadow-hard-hover transform -rotate-1 hover:rotate-0"
            type="button"
          >
            Join
          </button>
        </form>
      </section>
    </div>
  );
}
