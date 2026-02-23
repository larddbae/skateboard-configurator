"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Types ──────────────────────────────────────────────────────────── */

type Category = "pro" | "am";
type Filter = "all" | Category;

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
  tapeRotation: string;
  cardRotation: string;
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
    title: "Suburbia Tour: Tokyo Nights",
    subtitle: "Full Team • 2 Weeks ago",
    youtubeId: "VIDEO_ID_1",
    tapeRotation: "rotate-1",
    cardRotation: "group-hover:-rotate-1",
  },
  {
    title: "Maya Hyland: Welcome",
    subtitle: "Maya Hyland • 1 Month ago",
    youtubeId: "VIDEO_ID_2",
    tapeRotation: "-rotate-2",
    cardRotation: "group-hover:rotate-1",
  },
  {
    title: "Concrete Jungle: Full Length",
    subtitle: "Full Feature • 3 Months ago",
    youtubeId: "VIDEO_ID_3",
    tapeRotation: "rotate-0",
    cardRotation: "group-hover:-rotate-1",
  },
];

/* ─── Components ─────────────────────────────────────────────────────── */

function SkaterCard({ skater }: { skater: Skater }) {
  const isRight = skater.namePosition === "right";
  const stanceBg =
    skater.stance === "Goofy"
      ? "bg-team-purple text-white"
      : "bg-white text-black";

  return (
    <div
      className="group relative cursor-pointer"
      style={{ "--rotation": skater.rotation } as React.CSSProperties}
    >
      <div className="aspect-[3/4] relative z-10">
        <div className="absolute inset-0 photo-border bg-gray-800 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] group-hover:rotate-0">
          <Image
            src={skater.image}
            alt={`${skater.firstName} ${skater.lastName}`}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[120px] drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] animate-bounce">
            skateboarding
          </span>
        </div>
        <div
          className={`absolute -top-4 -right-4 z-30 transform ${
            skater.stance === "Goofy" ? "rotate-12" : "-rotate-6"
          }`}
        >
          <span
            className={`px-3 py-1 ${stanceBg} border-2 border-black font-rubik-mono text-xs uppercase shadow-hard`}
          >
            {skater.stance}
          </span>
        </div>
      </div>
      <div
        className={`absolute bottom-8 z-40 transform transition-transform group-hover:scale-105 ${
          isRight
            ? "-right-4 rotate-2 text-right"
            : "-left-4 -rotate-3"
        }`}
      >
        <div className="bg-primary px-4 py-2 border-2 border-black shadow-hard">
          <h3 className="text-xl font-rubik-mono text-black uppercase leading-none">
            {skater.firstName} <br />
            <span className="text-white text-stroke-sm">
              {skater.lastName}
            </span>
          </h3>
        </div>
      </div>
      {/* Category badge */}
      <div className="absolute top-2 left-2 z-30">
        <span
          className={`px-2 py-0.5 text-[10px] font-rubik-mono uppercase border-2 border-black shadow-hard ${
            skater.category === "pro"
              ? "bg-primary text-black"
              : "bg-white text-black"
          }`}
        >
          {skater.category}
        </span>
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div className="min-w-[300px] md:min-w-[450px] snap-center group relative">
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-200/80 z-20 transform ${video.tapeRotation} shadow-sm`}
      ></div>
      <div
        className={`relative aspect-video bg-black border-4 border-white shadow-hard mb-4 transform ${video.cardRotation} transition-transform overflow-hidden`}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <h3 className="text-white font-rubik-mono text-xl uppercase leading-tight group-hover:text-primary transition-colors">
        {video.title}
      </h3>
      <p className="text-gray-400 font-marker text-sm mt-1 transform -rotate-1">
        {video.subtitle}
      </p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function TeamPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredSkaters =
    filter === "all"
      ? skaters
      : skaters.filter((s) => s.category === filter);

  const filterButtons: { label: string; value: Filter }[] = [
    { label: "ALL", value: "all" },
    { label: "PRO", value: "pro" },
    { label: "AM", value: "am" },
  ];

  return (
    <div className="bg-team-dark font-space-grotesk antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-noise mix-blend-overlay"></div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 gap-16 relative z-10">
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[500px] flex items-center p-6 md:p-12">
          {/* Hero Background Image */}
          <div
            className="absolute inset-0 m-4 md:m-0 transform rotate-1 border-4 border-white shadow-hard overflow-hidden"
            style={{ borderRadius: "2px" }}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/team/hero-bg.jpg"
                alt="Team hero background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-team-dark via-transparent to-transparent opacity-90"></div>
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto text-center md:text-left">
            <div className="inline-block transform -rotate-3 mb-6">
              <div className="bg-white border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-marker text-black text-sm md:text-base">
                  EST. 2024 // PURE CHAOS
                </span>
              </div>
            </div>

            <h1 className="text-7xl md:text-9xl font-rubik-mono text-white leading-[0.8] tracking-tight mb-8 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]">
              THE <br />
              <span className="text-primary text-stroke relative inline-block">
                CREW
                <span
                  className="absolute -z-10 -top-4 -left-4 text-purple-600 opacity-60 transform scale-150 rotate-12 whitespace-nowrap font-marker text-4xl select-none pointer-events-none"
                  style={{ textShadow: "none", WebkitTextStroke: "0" }}
                >
                  /////////////
                </span>
              </span>
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="bg-black/80 backdrop-blur-sm p-4 md:p-6 border-2 border-white transform rotate-1 max-w-lg shadow-[8px_8px_0px_0px_#a855f7]">
                <p className="text-white text-lg md:text-xl font-marker leading-relaxed">
                  Raw talent on concrete. <br />
                  <span className="text-primary">
                    NO RULES. JUST RIDE.
                  </span>
                </p>
              </div>

              <button className="group relative inline-block focus:outline-none focus:ring-0">
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-y-2.5 group-hover:translate-x-2.5"></div>
                <div className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-black text-black transition-all duration-200 bg-primary border-2 border-black font-rubik-mono uppercase tracking-widest clip-slant hover:-translate-y-1">
                  Meet the Team
                  <span className="material-symbols-outlined ml-2 font-black">
                    arrow_downward
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ROSTER SECTION */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between border-b-4 border-black pb-4 relative">
            <div className="absolute bottom-[-14px] left-0 w-full h-4 bg-team-dark torn-paper-top z-10"></div>
            <h2 className="text-4xl md:text-5xl font-rubik-mono text-white uppercase tracking-tight transform -rotate-1 drop-shadow-[3px_3px_0px_#a855f7]">
              Active Roster
            </h2>
            <div className="mt-4 md:mt-0 flex gap-4 font-marker">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`px-4 py-2 border-2 transition-all transform hover:-translate-y-1 ${
                    filter === btn.value
                      ? "text-black bg-white border-black shadow-hard rotate-1"
                      : "text-white border-transparent hover:text-primary hover:rotate-2"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 px-4">
            {filteredSkaters.map((skater, i) => (
              <SkaterCard key={`${skater.lastName}-${i}`} skater={skater} />
            ))}

            {filteredSkaters.length === 0 && (
              <div className="col-span-full text-center py-16">
                <span className="material-symbols-outlined text-6xl text-gray-600 mb-4 block">
                  skateboarding
                </span>
                <p className="text-gray-400 font-marker text-xl">
                  No skaters found in this category
                </p>
              </div>
            )}
          </div>
        </section>

        {/* VIDEOS SECTION */}
        <section className="py-12 relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-team-purple/20 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-rubik-mono text-white uppercase tracking-tight text-stroke-sm drop-shadow-[2px_2px_0px_#ff6b35]">
              Latest Parts
            </h2>
            <Link
              href="#"
              className="text-primary hover:text-white text-sm font-rubik-mono uppercase tracking-wider flex items-center gap-2 border-b-2 border-primary hover:border-white transition-colors pb-1"
            >
              View All Videos{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory px-2">
            {videos.map((video) => (
              <VideoCard key={video.youtubeId} video={video} />
            ))}
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="relative rounded-none border-4 border-black p-8 md:p-12 text-center overflow-hidden bg-primary mx-4 rotate-1 shadow-hard">
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
      </main>
    </div>
  );
}
