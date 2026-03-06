"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import clsx from "clsx";
import gsap from "gsap";

/* ============================================================
   SupahBlob — Adapted from morphing-blob-image template
   Generates a morphing blob path using polar coordinates
   ============================================================ */
class SupahBlob {
  el: SVGPathElement;
  points: { x: number; y: number }[];
  segments: number;
  centerX: number;
  centerY: number;
  minRadius: number;
  maxRadius: number;
  minDuration: number;
  maxDuration: number;
  maskEl: HTMLElement | null;
  maskID: string | null;
  tl: gsap.core.Timeline | null;

  constructor(opts: {
    el: SVGPathElement;
    segments?: number;
    centerX?: number;
    centerY?: number;
    minRadius?: number;
    maxRadius?: number;
    minDuration?: number;
    maxDuration?: number;
    maskEl?: HTMLElement | null;
    maskID?: string | null;
  }) {
    this.el = opts.el;
    this.segments = opts.segments || 8;
    this.centerX = opts.centerX || 400;
    this.centerY = opts.centerY || 400;
    this.minRadius = opts.minRadius || 300;
    this.maxRadius = opts.maxRadius || 380;
    this.minDuration = opts.minDuration || 1;
    this.maxDuration = opts.maxDuration || 2;
    this.maskEl = opts.maskEl || null;
    this.maskID = opts.maskID || null;
    this.points = [];
    this.tl = null;
    this.init();
  }

  init() {
    this.points = [];
    const slice = (Math.PI * 2) / this.segments;
    this.tl = gsap.timeline({
      onUpdate: () => this.update(),
    });

    for (let i = 0; i < this.segments; i++) {
      const angle = slice * i;
      const duration = gsap.utils.random(this.minDuration, this.maxDuration);
      const p = {
        x: this.centerX + Math.cos(angle) * this.minRadius,
        y: this.centerY + Math.sin(angle) * this.minRadius,
      };
      const tween = gsap.to(p, {
        duration,
        x: this.centerX + Math.cos(angle) * this.maxRadius,
        y: this.centerY + Math.sin(angle) * this.maxRadius,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      this.tl.add(tween, -duration);
      this.points.push(p);
    }
  }

  update() {
    this.el.setAttribute("d", this.createPath());
    if (this.maskEl && this.maskID) {
      const s = this.maskEl.style as unknown as Record<string, string>;
      s.clipPath = "none";
      s.webkitClipPath = "none";
      void this.maskEl.offsetWidth;
      s.clipPath = `url("${this.maskID}")`;
      s.webkitClipPath = `url("${this.maskID}")`;
    }
  }

  createPath() {
    const data = this.points;
    const size = data.length;
    let path = `M${data[0].x} ${data[0].y} C`;
    for (let i = 0; i < size; i++) {
      const p0 = data[(i - 1 + size) % size];
      const p1 = data[i];
      const p2 = data[(i + 1) % size];
      const p3 = data[(i + 2) % size];
      const x1 = p1.x + (p2.x - p0.x) * 0.15;
      const y1 = p1.y + (p2.y - p0.y) * 0.15;
      const x2 = p2.x - (p3.x - p1.x) * 0.15;
      const y2 = p2.y - (p3.y - p1.y) * 0.15;
      path += ` ${x1} ${y1} ${x2} ${y2} ${p2.x} ${p2.y}`;
    }
    return `${path}z`;
  }

  kill() {
    this.tl?.kill();
  }
}

/* ============================================================
   ButtonBlob — Smaller blob for button hover effect
   Uses same SupahBlob approach but driven by hover timeline
   ============================================================ */
class ButtonBlob {
  el: SVGPathElement;
  points: { x: number; y: number; origX: number; origY: number }[];
  segments: number;
  centerX: number;
  centerY: number;
  radius: number;
  morphAmount: number;
  tl: gsap.core.Timeline;

  constructor(opts: {
    el: SVGPathElement;
    segments?: number;
    centerX?: number;
    centerY?: number;
    radius?: number;
    morphAmount?: number;
  }) {
    this.el = opts.el;
    this.segments = opts.segments || 6;
    this.centerX = opts.centerX || 250;
    this.centerY = opts.centerY || 30;
    this.radius = opts.radius || 250;
    this.morphAmount = opts.morphAmount || 40;
    this.points = [];
    this.tl = gsap.timeline({ paused: true });
    this.init();
  }

  init() {
    const slice = (Math.PI * 2) / this.segments;
    for (let i = 0; i < this.segments; i++) {
      const angle = slice * i;
      const x = this.centerX + Math.cos(angle) * this.radius;
      const y = this.centerY + Math.sin(angle) * this.radius;
      this.points.push({ x, y, origX: x, origY: y });
    }
    this.updatePath();

    // Build the hover morph timeline
    for (let i = 0; i < this.points.length; i++) {
      const angle = (slice * i) + (Math.random() - 0.5) * 0.5;
      const offsetX = Math.cos(angle) * this.morphAmount * (0.5 + Math.random());
      const offsetY = Math.sin(angle) * this.morphAmount * (0.5 + Math.random());
      this.tl.to(
        this.points[i],
        {
          duration: 0.6,
          x: this.points[i].origX + offsetX,
          y: this.points[i].origY + offsetY,
          ease: "back.out(1.7)",
          onUpdate: () => this.updatePath(),
        },
        0
      );
    }
  }

  updatePath() {
    this.el.setAttribute("d", this.createPath());
  }

  createPath() {
    const data = this.points;
    const size = data.length;
    if (size === 0) return "";
    let path = `M${data[0].x} ${data[0].y} C`;
    for (let i = 0; i < size; i++) {
      const p0 = data[(i - 1 + size) % size];
      const p1 = data[i];
      const p2 = data[(i + 1) % size];
      const p3 = data[(i + 2) % size];
      const x1 = p1.x + (p2.x - p0.x) * 0.15;
      const y1 = p1.y + (p2.y - p0.y) * 0.15;
      const x2 = p2.x - (p3.x - p1.x) * 0.15;
      const y2 = p2.y - (p3.y - p1.y) * 0.15;
      path += ` ${x1} ${y1} ${x2} ${y2} ${p2.x} ${p2.y}`;
    }
    return `${path}z`;
  }

  play() {
    this.tl.play().timeScale(1);
  }

  reverse() {
    this.tl.reverse().timeScale(2.5);
  }

  kill() {
    this.tl.kill();
  }
}

/* ============================================================
   Confetti helper — Adapted from party-checkboxes template
   ============================================================ */
function spawnConfetti(container: HTMLElement) {
  const particles = 14;
  for (let p = 0; p < particles; p++) {
    const angleInc = 360 / particles;
    let angle = angleInc * p;
    if (p % 2 === 1) angle -= angleInc / 2;

    const particle = document.createElement("span");
    particle.classList.add("confetti-particle");

    const angleInRad = (angle * Math.PI) / 180;
    const angleSin = Math.sin(angleInRad);
    const angleCos = Math.cos(angleInRad);

    const start = 0.75;
    const end = 2.25;
    const middle = (start + end) / 2;

    const pointA = { x: start * angleSin, y: start * angleCos };
    const pointB = { x: middle * angleSin, y: middle * angleCos };
    const pointC = { x: end * angleSin, y: end * angleCos };

    const bgHue = Math.round(angle);
    particle.style.background = `hsl(${bgHue}, 90%, 50%)`;

    container.appendChild(particle);

    const animation = particle.animate(
      [
        { transform: `translate(${pointA.x}em, ${pointA.y}em) scale(0)` },
        { transform: `translate(${pointB.x}em, ${pointB.y}em) scale(1)` },
        { transform: `translate(${pointC.x}em, ${pointC.y}em) scale(0)` },
      ],
      {
        duration: 375,
        easing: "linear",
        delay: 125,
      }
    );
    animation.onfinish = () => particle.remove();
  }
}

function clearConfetti(container: HTMLElement) {
  const particles = container.querySelectorAll("span.confetti-particle");
  particles.forEach((p) => p.remove());
}

/* ============================================================
   Register Page Component
   ============================================================ */
export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Refs for animations 
  const blobMaskPathRef = useRef<SVGPathElement>(null);
  const blobBgPathRef = useRef<SVGPathElement>(null);
  const blobImagesRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnBlobPathRef = useRef<SVGPathElement>(null);
  const checkboxWrapperRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<SupahBlob | null>(null);
  const blob2Ref = useRef<SupahBlob | null>(null);
  const btnBlobRef = useRef<ButtonBlob | null>(null);
  const btnCirclesTlRef = useRef<gsap.core.Timeline | null>(null);

  // Toggle Password
  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password, passwordConfirmation);
      router.push("/build");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  /* ------ GSAP Init: Morphing Blob Image ------ */
  useEffect(() => {
    if (!blobMaskPathRef.current || !blobBgPathRef.current) return;

    blob1Ref.current = new SupahBlob({
      el: blobMaskPathRef.current,
      segments: 9,
      centerX: 400,
      centerY: 400,
      minRadius: 280,
      maxRadius: 360,
      minDuration: 1,
      maxDuration: 3,
      maskEl: blobImagesRef.current,
      maskID: "#registerBlobMask",
    });

    blob2Ref.current = new SupahBlob({
      el: blobBgPathRef.current,
      segments: 9,
      centerX: 400,
      centerY: 400,
      minRadius: 300,
      maxRadius: 380,
      minDuration: 2,
      maxDuration: 3,
    });

    return () => {
      blob1Ref.current?.kill();
      blob2Ref.current?.kill();
    };
  }, []);

  /* ------ GSAP Init: Button Hover Blob ------ */
  useEffect(() => {
    if (!btnBlobPathRef.current || !btnRef.current) return;

    btnBlobRef.current = new ButtonBlob({
      el: btnBlobPathRef.current,
      segments: 6,
      centerX: 250,
      centerY: 30,
      radius: 260,
      morphAmount: 35,
    });

    // Circles stagger timeline
    const circleEls = btnRef.current.querySelectorAll(".btn-blob-circle");
    const circlesTl = gsap.timeline({ paused: true });
    circlesTl.fromTo(
      circleEls,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 0.6,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: 0.06,
      }
    );
    btnCirclesTlRef.current = circlesTl;

    const handleMouseEnter = () => {
      btnBlobRef.current?.play();
      btnCirclesTlRef.current?.play().timeScale(1);
    };
    const handleMouseLeave = () => {
      btnBlobRef.current?.reverse();
      btnCirclesTlRef.current?.reverse().timeScale(2.5);
    };

    const btn = btnRef.current;
    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mouseleave", handleMouseLeave);
      btnBlobRef.current?.kill();
      btnCirclesTlRef.current?.kill();
    };
  }, []);

  /* ------ Checkbox Confetti Handler ------ */
  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAgreedToTerms(e.target.checked);
      const wrapper = checkboxWrapperRef.current;
      if (!wrapper) return;

      if (e.target.checked) {
        spawnConfetti(wrapper);
      } else {
        clearConfetti(wrapper);
      }
    },
    []
  );

  return (
    <div className="flex min-h-screen bg-paper-cream relative overflow-hidden font-space-mono text-marker-black selection:bg-tape-orange selection:text-white">
      {/* Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
      
      {/* Big Rotated Background Text */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-5 overflow-hidden">
         <h1 className="font-display text-[20vw] text-black leading-none -rotate-12 whitespace-nowrap select-none">CREW</h1>
      </div>

      {/* Main Content Container */}
      <main className="w-full max-w-6xl relative z-10 flex flex-col md:flex-row items-center justify-center p-4 md:p-12 gap-8 md:gap-20 mx-auto">
        
        {/* Left Side: Morphing Blob Image */}
        <div className="w-full md:w-[45%] relative group hidden md:flex flex-col items-center">
          <div className="register-blob-container" style={{ maxWidth: "500px" }}>
            {/* SVG Blob */}
            <svg viewBox="0 0 800 800" aria-hidden="true">
              <defs>
                <clipPath id="registerBlobMask">
                  <path ref={blobMaskPathRef} />
                </clipPath>
              </defs>
              <path ref={blobBgPathRef} className="blob-bg-path" />
            </svg>

            {/* Image clipped by blob */}
            <div ref={blobImagesRef} className="register-blob-images">
              <img
                alt="Skate crew hanging out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwMoWiuM0hax6drTiKyr09UP7aGs1sr-NeFR05rH5k7gKOdbe1gZcVeQ4R1hF-rvFXk3yvZgRa6FgdYkH0dI-r-P8yYFo1KZZzacXGesv-TJNCuH0zDV_v01flF1N7XX9qUv0Mcoxjl3BNsDQhJ3_BmAkfLtHE1xxq-12vM-31dRpnaaqJXSw68-IB4rOxCuUphDf9XdvWcADIGtQpYWS4X_ZvgL2dCJbRVK-ycPZb8NGtTlUbSxJpRGGMeO75fyjYgdK8GftRs2I"
              />
            </div>

            {/* Decorative blurred circles behind blob */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-lime rounded-full mix-blend-multiply filter blur-xl opacity-60 pointer-events-none"></div>
            <div className="absolute top-20 -right-10 w-40 h-40 bg-brand-orange rounded-full mix-blend-multiply filter blur-xl opacity-60 pointer-events-none"></div>
          </div>

          {/* Label below blob */}
          <p className="font-marker text-2xl text-black mt-4 rotate-1 select-none">
            Join The Crew
          </p>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full md:w-[45%] relative">
            <div className="bg-white p-8 md:p-10 shadow-brutal border-4 border-black -rotate-1 relative">
                {/* Tape Strips */}
                <div className="absolute -top-3 right-10 w-24 h-8 bg-yellow-100/80 shadow-tape rotate-2 z-20"></div>

                <div className="mb-6 relative z-10">
                    <h2 className="font-rubik-mono text-3xl md:text-4xl text-black mb-2 uppercase tracking-tighter">
                        NEW <span className="text-tersier bg-brand-pink px-2 transform -skew-x-6 inline-block">BLOOD</span>
                    </h2>
                    <p className="font-marker text-gray-500 text-lg -rotate-1 ml-1">start your legacy.</p>
                </div>
                
                {/* Error Message */}
                {error && (
                    <div className="mb-4 bg-red-100 border-2 border-red-500 text-red-600 p-3 font-bold text-sm transform rotate-1">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-black pl-1 mb-1" htmlFor="name">Full Name</label>
                        <input 
                            className="w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-brand-orange focus:bg-orange-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none" 
                            id="name" 
                            placeholder="Tony Hawk" 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-black pl-1 mb-1" htmlFor="email">Email</label>
                        <input 
                            className="w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-brand-orange focus:bg-orange-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none" 
                            id="email" 
                            placeholder="sk8er@example.com" 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-xs font-bold uppercase tracking-widest text-black pl-1 mb-1" htmlFor="password">Password</label>
                             <div className="relative">
                                <input 
                                    className="w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-brand-orange focus:bg-orange-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none pr-8" 
                                    id="password" 
                                    placeholder="Min 8 chars" 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                             </div>
                        </div>
                         <div>
                             <label className="block text-xs font-bold uppercase tracking-widest text-black pl-1 mb-1" htmlFor="confirmPassword">Confirm</label>
                             <div className="relative">
                                <input 
                                    className={clsx(
                                        "w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-brand-orange focus:bg-orange-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none",
                                        passwordConfirmation && password !== passwordConfirmation ? "border-red-500 bg-red-50" : ""
                                    )}
                                    id="confirmPassword" 
                                    placeholder="Repeat it" 
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                             </div>
                        </div>
                    </div>
                    {/* Show Password Toggle */}
                    <div className="flex justify-end -mt-2">
                        <button 
                            type="button"
                            onClick={togglePassword}
                            className="text-xs font-bold text-zinc-500 hover:text-black uppercase tracking-widest"
                        >
                            {showPassword ? "Hide Password" : "Show Password"}
                        </button>
                    </div>

                    {/* Terms — Party Checkbox */}
                    <div ref={checkboxWrapperRef} className="register-checkbox-wrapper">
                        <input 
                            id="terms" 
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={handleCheckboxChange}
                        />
                         <label className="text-xs font-bold text-zinc-600 font-mono select-none cursor-pointer leading-tight" htmlFor="terms">
                            I agree to the <Link href="#" className="text-brand-orange hover:text-black underline">Terms</Link> and <Link href="#" className="text-brand-orange hover:text-black underline">Privacy Policy</Link>. No poseurs allowed.
                        </label>
                    </div>

                    {/* JOIN NOW Button with Blob Hover */}
                    <button 
                        ref={btnRef}
                        type="submit" 
                        disabled={isLoading}
                        className="register-btn w-full bg-black hover:bg-zinc-800 text-white font-rubik-mono text-xl py-4 border-2 border-transparent hover:border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mt-4 uppercase tracking-wider"
                    >
                        {/* SVG Blob overlay */}
                        <svg viewBox="0 0 500 60" preserveAspectRatio="none" aria-hidden="true">
                          <path ref={btnBlobPathRef} className="btn-blob-path" />
                          <circle className="btn-blob-circle" cx="60" cy="10" r="6" />
                          <circle className="btn-blob-circle" cx="440" cy="10" r="5" />
                          <circle className="btn-blob-circle" cx="80" cy="50" r="4" />
                          <circle className="btn-blob-circle" cx="420" cy="50" r="7" />
                          <circle className="btn-blob-circle" cx="250" cy="5" r="5" />
                          <circle className="btn-blob-circle" cx="150" cy="55" r="4" />
                          <circle className="btn-blob-circle" cx="350" cy="55" r="6" />
                          <circle className="btn-blob-circle" cx="30" cy="30" r="5" />
                          <circle className="btn-blob-circle" cx="470" cy="30" r="4" />
                        </svg>

                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isLoading ? "CREATING..." : "JOIN NOW"} <span className="material-icons text-brand-lime">east</span>
                        </span>
                    </button>
                </form>

                <div className="relative my-6 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="relative bg-white px-4">
                        <span className="font-marker text-zinc-400 text-sm">socials</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     {['Google', 'Apple'].map((provider) => (
                        <button key={provider} className="flex items-center justify-center px-4 py-2 border-2 border-black bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none text-black font-bold font-mono text-sm gap-2">
                             <span>{provider}</span>
                        </button>
                     ))}
                </div>

                <p className="mt-8 text-center text-sm font-mono text-zinc-600">
                    Already skating? 
                    <Link className="font-bold text-black underline decoration-2 decoration-brand-lime underline-offset-2 hover:bg-brand-lime hover:text-black transition-colors px-1 ml-1" href="/auth/login">Login here</Link>
                </p>
            </div>
             {/* Background Decoration */}
             <div className="absolute -bottom-12 -right-12 w-32 h-32 pointer-events-none z-0 rotate-12">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,88.4,-3.3C86.7,11.4,80.7,25.3,71.2,37.1C61.7,48.9,48.7,58.6,35.3,65.3C21.9,72,8.1,75.7,-4.8,74.1C-17.7,72.5,-29.7,65.6,-40.7,57.1C-51.7,48.6,-61.7,38.5,-68.9,26.7C-76.1,14.9,-80.5,1.4,-78.6,-11.4C-76.7,-24.2,-68.5,-36.3,-57.9,-46C-47.3,-55.7,-34.3,-62.9,-20.9,-69.3C-7.5,-75.7,6.3,-81.3,20.5,-81.4C34.7,-81.5,49.3,-76.1,44.7,-76.4Z" fill="#a855f7" opacity="0.6" transform="translate(100 100)"></path>
                </svg>
            </div>
        </div>
      </main>
    </div>
  );
}
