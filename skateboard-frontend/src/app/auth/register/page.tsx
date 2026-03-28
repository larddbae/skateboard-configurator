"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import clsx from "clsx";
import gsap from "gsap";
import RotatingText from "@/components/RotatingText";
import { toast } from "react-hot-toast";

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Refs for animations 
  const blobMaskPathRef = useRef<SVGPathElement>(null);
  const blobBgPathRef = useRef<SVGPathElement>(null);

  const btnRef = useRef<HTMLButtonElement>(null);
  const btnSvgRef = useRef<SVGSVGElement>(null);
  const checkboxWrapperRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<SupahBlob | null>(null);
  const blob2Ref = useRef<SupahBlob | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Master entry timeline ref
  const entryTlRef = useRef<gsap.core.Timeline | null>(null);

  // GSAP context for cleanup
  const gsapContext = useRef<gsap.Context | null>(null);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      const msg = "Passwords do not match";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!agreedToTerms) {
      const msg = "Please agree to the terms and conditions";
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password, passwordConfirmation);
      toast.success("Welcome! Account created successfully.");
      router.push("/build");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'Google') {
        window.location.href = 'http://127.0.0.1:8000/api/auth/google/redirect';
    } else if (provider === 'Facebook') {
        window.location.href = 'http://localhost:8000/api/auth/facebook/redirect';
    } else {
        alert(`${provider} login coming soon!`);
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

  /* ------ Liquid Wobble Hover Button ------ */
  useEffect(() => {
    if (!btnRef.current || !btnSvgRef.current) return;
    
    let isActive = true;
    let cancelReqFrame: number;

    const initWobble = async () => {
      try {
        const { default: SVG } = await import('svg.js');
        // @ts-ignore
        const { spline } = await import('@georgedoescode/generative-utils');
        // @ts-ignore
        const { Vector2D } = await import('@georgedoescode/vector2d');
        const { default: debounce } = await import('debounce');

        if (!isActive) return;

        const svgNode = btnSvgRef.current;
        if (!svgNode) return;
        const svg = SVG(svgNode as unknown as HTMLElement);
        const path = svgNode.querySelector('#baseBtnPath') as SVGPathElement;
        if (!path) return;

        const pointsInPath = (path: SVGPathElement, numPoints = 10) => {
          const pathLength = path.getTotalLength();
          const step = pathLength / numPoints;
          const pts = [];
          for (let i = 0; i < pathLength; i += step) {
            pts.push(path.getPointAtLength(i));
          }
          return pts;
        };

        const pointOrigins = pointsInPath(path, 40);
        const points = pointsInPath(path, 40).map(p => ({ x: p.x, y: p.y, reset: false }));
        const bgPoints = pointsInPath(path, 40).map(p => ({ x: p.x, y: p.y, reset: false }));

        let btnPathData = spline(points as any, 1, true);
        let bgPathData = spline(bgPoints as any, 1, true);

        const bgPath = svg
          .path(bgPathData)
          .fill("#000000") // Black shadow back drop
          .attr("id", "bgPath")
          .attr("filter", "url(#btnShadow)");
          
        const btnPath = svg
          .path(btnPathData)
          .fill("url(#btnGradient)") // Will be brand-lime gradient
          .attr("id", "btnPath");

        let mousePos = new Vector2D(0, 0);
        let mouseHasMoved = false;

        const pt = svgNode.createSVGPoint();
        function transformCoords(evt: MouseEvent) {
          pt.x = evt.clientX;
          pt.y = evt.clientY;
          if (!svgNode) return pt;
          const ctm = svgNode.getScreenCTM();
          if (ctm) {
            return pt.matrixTransform(ctm.inverse());
          }
          return pt;
        }

        const range = 45;

        const animate = () => {
          if (!isActive) return;

          if (mouseHasMoved) {
            points.forEach((p, index) => {
              const point = new Vector2D(pointOrigins[index].x, pointOrigins[index].y);
              const d = Vector2D.sub(point, mousePos);
              const l = Math.hypot(d.x, d.y);
              let y;

              if (l < range && !p.reset) {
                point.sub(new Vector2D(d.x, -(d.y * 0.675)));
                y = point.y;
              } else {
                y = pointOrigins[index].y;
              }

              p.y += (y - p.y) * 0.1;
            });

            bgPoints.forEach((p, index) => {
              const point = new Vector2D(pointOrigins[index].x, pointOrigins[index].y);
              const d = Vector2D.sub(point, mousePos);
              const l = Math.hypot(d.x, d.y);
              let y;

              if (l < range && !p.reset) {
                point.sub(new Vector2D(d.x, -(d.y * 0.675)));
                y = point.y;
              } else {
                y = pointOrigins[index].y;
              }

              p.y += (y - p.y) * 0.05;
            });
          }

          bgPathData = spline(bgPoints as any, 1, true);
          bgPath.attr("d", bgPathData);

          btnPathData = spline(points as any, 1, true);
          btnPath.attr("d", btnPathData);

          cancelReqFrame = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
          const { x, y } = transformCoords(e);
          mousePos.x = x;
          mousePos.y = y;
          mouseHasMoved = true;

          points.forEach((p, index) => {
            const point = new Vector2D(pointOrigins[index].x, pointOrigins[index].y);
            const d = Vector2D.sub(point, mousePos);
            const l = Math.hypot(d.x, d.y);

            if (l < range) {
              p.reset = false;
              debounce(() => {
                if (isActive) p.reset = true;
              }, 200)();
            } else {
              p.reset = false;
            }
          });

          bgPoints.forEach((p, index) => {
            const point = new Vector2D(pointOrigins[index].x, pointOrigins[index].y);
            const d = Vector2D.sub(point, mousePos);
            const l = Math.hypot(d.x, d.y);

            if (l < range) {
              p.reset = false;
              debounce(() => {
                if (isActive) p.reset = true;
              }, 200)();
            } else {
              p.reset = false;
            }
          });
        };

        window.addEventListener("mousemove", handleMouseMove);

        (svgNode as any)._cleanupWobble = () => {
          window.removeEventListener("mousemove", handleMouseMove);
          if (cancelReqFrame) cancelAnimationFrame(cancelReqFrame);
          bgPath.remove();
          btnPath.remove();
        };

      } catch (err) {
        console.error("Failed to init wobble API", err);
      }
    };

    initWobble();

    // --- Master Entry Animations ---
    gsapContext.current = gsap.context(() => {
      // Create master timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      entryTlRef.current = tl;

      // 1. Background Blur Orbs (Slow fade-in)
      tl.from(".gsap-bg-orb", {
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
      }, 0);

      // 2. Left Side: Blob Image & Decoration (Scale + Fade)
      tl.from(".gsap-left-blob", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.75)",
      }, 0.2);

      // 3. Left Side: Rotating Text Box (Slide up slightly)
      tl.from(".gsap-left-text", {
        y: 40,
        opacity: 0,
        rotation: -5,
        duration: 0.8,
        ease: "back.out(1.5)",
      }, 0.4);

      // 4. Right Side: Titles (Staggered slide up)
      tl.from(".gsap-right-title", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      }, 0.3);

      // 5. Right Side: Form Inputs (Staggered slide from left)
      tl.from(".gsap-form-field", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      }, 0.6);

      // 6. Right Side: Buttons & Bottom Elements (Fade up)
      tl.from(".gsap-form-bottom", {
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      }, 0.9);
      
    }, containerRef); // Scope to container if needed, but we use classes

    return () => {
      isActive = false;
      if (btnSvgRef.current && (btnSvgRef.current as any)._cleanupWobble) {
        (btnSvgRef.current as any)._cleanupWobble();
      }
      gsapContext.current?.revert(); // Clean up all GSAP animations
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
    <div className="flex min-h-screen bg-paper-cream relative overflow-hidden font-space-mono text-marker-black selection:bg-tape-orange selection:text-white" ref={containerRef}>
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
          <div className="register-blob-container" style={{ maxWidth: "600px" }}>
            {/* SVG Blob + Image (both inside SVG so clipPath coordinates match) */}
            <svg viewBox="0 0 800 800" aria-hidden="true">
              <defs>
                <clipPath id="registerBlobMask">
                  <path ref={blobMaskPathRef} />
                </clipPath>
              </defs>
              <path ref={blobBgPathRef} className="blob-bg-path" />
              <image
                href="https://lh3.googleusercontent.com/aida-public/AB6AXuBwMoWiuM0hax6drTiKyr09UP7aGs1sr-NeFR05rH5k7gKOdbe1gZcVeQ4R1hF-rvFXk3yvZgRa6FgdYkH0dI-r-P8yYFo1KZZzacXGesv-TJNCuH0zDV_v01flF1N7XX9qUv0Mcoxjl3BNsDQhJ3_BmAkfLtHE1xxq-12vM-31dRpnaaqJXSw68-IB4rOxCuUphDf9XdvWcADIGtQpYWS4X_ZvgL2dCJbRVK-ycPZb8NGtTlUbSxJpRGGMeO75fyjYgdK8GftRs2I"
                x="0" y="0" width="800" height="800"
                clipPath="url(#registerBlobMask)"
                preserveAspectRatio="xMidYMid slice"
              />
            </svg>

            {/* Decorative blurred circles behind blob */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-lime rounded-full mix-blend-multiply filter blur-xl opacity-60 pointer-events-none"></div>
            <div className="absolute top-20 -right-10 w-40 h-40 bg-brand-orange rounded-full mix-blend-multiply filter blur-xl opacity-60 pointer-events-none"></div>
          </div>

          {/* Label below blob */}
          <div className="mt-6 rotate-1 select-none gsap-left-text">
              <RotatingText
                texts={["Join The Crew", "Start Your Legacy", "Be Part Of Us", "Ride With Us"]}
                mainClassName="inline-flex font-rubik-mono text-xl md:text-2xl text-black uppercase tracking-tight overflow-hidden py-1 px-4 justify-center bg-brand-pink -skew-x-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full md:w-[45%] relative">
            <div className="bg-white p-8 md:p-10 shadow-brutal border-4 border-black -rotate-1 relative">
                {/* Tape Strips */}
                <div className="absolute -top-3 right-10 w-24 h-8 bg-yellow-100/80 shadow-tape rotate-2 z-20"></div>

                <div className="mb-6 relative z-10 gsap-right-title">
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
                    <div className="gsap-form-field">
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

                    <div className="gsap-form-field">
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

                    <div className="grid grid-cols-2 gap-4 gsap-form-field">
                        <div>
                             <label className="block text-xs font-bold uppercase tracking-widest text-black pl-1 mb-1" htmlFor="password">Password</label>
                             <div className="relative">
                                <input 
                                    className="w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-brand-orange focus:bg-orange-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none pr-10" 
                                    id="password" 
                                    placeholder="Min 8 chars" 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors p-0.5"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                </button>
                             </div>
                        </div>
                         <div>
                             <label className="block text-xs font-bold uppercase tracking-widest text-black pl-1 mb-1" htmlFor="confirmPassword">Confirm</label>
                             <div className="relative">
                                <input 
                                    className={clsx(
                                        "w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-brand-orange focus:bg-orange-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none pr-10",
                                        passwordConfirmation && password !== passwordConfirmation ? "border-red-500 bg-red-50" : ""
                                    )}
                                    id="confirmPassword" 
                                    placeholder="Repeat it" 
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors p-0.5"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                </button>
                             </div>
                        </div>
                    </div>

                    {/* Terms — Party Checkbox */}
                    <div ref={checkboxWrapperRef} className="register-checkbox-wrapper gsap-form-field">
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

                    {/* JOIN NOW Button with Liquid Wobble */}
                    <div className="gsap-form-bottom">
                    <button 
                        ref={btnRef}
                        type="submit" 
                        disabled={isLoading}
                        className="wobble-btn w-full relative h-[64px] bg-transparent text-black font-rubik-mono text-xl mt-4 uppercase tracking-wider outline-none cursor-pointer overflow-visible drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 active:translate-y-0 active:drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                    >
                        {/* SVG Liquid Background */}
                        <svg ref={btnSvgRef} className="absolute top-0 left-0 w-full h-full -z-10 overflow-visible drop-shadow-none" viewBox="0 0 500 64" preserveAspectRatio="none" aria-hidden="true">
                          <defs>
                            <linearGradient id="btnGradient" gradientTransform="rotate(90)">
                              <stop offset="5%" stopColor="#212121ff" /> {/* brand-lime */}
                              <stop offset="95%" stopColor="#080808ff" /> {/* darker lime */}
                            </linearGradient>
                            <filter id="btnShadow" filterUnits="userSpaceOnUse" height="200" width="1000" y="-50" x="-50">
                              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#ea580c" floodOpacity="0.8" />
                            </filter>
                          </defs>
                          {/* The base path we will extract points from in JS */}
                          <path id="baseBtnPath" d="M0 32C0 14.327 14.327 0 32 0H468C485.673 0 500 14.327 500 32C500 49.673 485.673 64 468 64H32C14.327 64 0 49.673 0 32Z" fill="transparent" />
                        </svg>

                        <span className="relative z-10 flex items-center justify-center gap-3 w-full h-full pointer-events-none text-white">
                            {isLoading ? "CREATING..." : "JOIN NOW"} <span className="material-icons text-white">east</span>
                        </span>
                    </button>
                    </div>
                </form>

                <div className="relative my-6 flex items-center justify-center gsap-form-bottom">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="relative bg-white px-4">
                        <span className="font-marker text-zinc-400 text-sm">or register via</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 gsap-form-bottom">
                     {['Google', 'Facebook'].map((provider) => (
                        <button 
                            key={provider} 
                            type="button"
                            onClick={() => handleSocialLogin(provider)}
                            className="flex items-center justify-center px-4 py-2 border-2 border-black bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none text-black font-bold font-mono text-sm gap-2"
                        >
                             <img 
                                 src={`/images/register/${provider.toLowerCase()}.png`} 
                                 alt={`${provider} icon`} 
                                 className="w-5 h-5 object-contain"
                             />
                             <span>{provider}</span>
                        </button>
                     ))}
                </div>

                <p className="mt-8 text-center text-sm font-mono text-zinc-600 gsap-form-bottom">
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
