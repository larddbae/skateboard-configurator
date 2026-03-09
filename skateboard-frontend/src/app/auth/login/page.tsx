"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

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

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas Liquid Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    if (width === 0 || height === 0) {
      width = canvas.parentElement?.offsetWidth || 384;
      height = canvas.parentElement?.offsetHeight || 512;
    }
    
    canvas.width = width;
    canvas.height = height;

    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 70,
      moving: false,
      stepCounter: 0,
    };

    let canvasPosition = canvas.getBoundingClientRect();

    let isDrawing = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - canvasPosition.left;
      mouse.y = e.clientY - canvasPosition.top;
      const newStep = mouse.stepCounter + 1;
      mouse.moving = newStep !== mouse.stepCounter;
      mouse.stepCounter = newStep;
      isDrawing = true;
    };

    const handleMouseLeave = () => {
      mouse.x = undefined;
      mouse.y = undefined;
      mouse.moving = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    const handleResize = () => {
      width = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 384;
      height = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 512;
      canvas.width = width;
      canvas.height = height;
      canvasPosition = canvas.getBoundingClientRect();
      init();
    };
    window.addEventListener("resize", handleResize);

    class Cell {
      x: number;
      y: number;
      width: number;
      height: number;
      drawOffsetX: number;
      drawOffsetY: number;

      constructor(x: number, y: number, cellWidth: number, cellHeight: number) {
        this.x = x;
        this.y = y;
        this.width = cellWidth;
        this.height = cellHeight;
        this.drawOffsetX = 0;
        this.drawOffsetY = 0;
      }
      
      update(cellW: number, cellH: number) {
        this.width = cellW;
        this.height = cellH;
        
        if (mouse.x === undefined || mouse.y === undefined) {
           if (this.drawOffsetX !== 0) {
             this.drawOffsetX -= this.drawOffsetX / 12;
             if (Math.abs(this.drawOffsetX) < 0.1) this.drawOffsetX = 0;
           }
           if (this.drawOffsetY !== 0) {
             this.drawOffsetY -= this.drawOffsetY / 12;
             if (Math.abs(this.drawOffsetY) < 0.1) this.drawOffsetY = 0;
           }
           return this.drawOffsetX !== 0 || this.drawOffsetY !== 0;
        }
        
        const dx = mouse.x - (this.x + this.width / 2);
        const dy = mouse.y - (this.y + this.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        let didMove = false;
        if (
          distance < mouse.radius &&
          this.drawOffsetX < this.width &&
          this.drawOffsetX > -this.width &&
          this.drawOffsetY < this.height &&
          this.drawOffsetY > -this.height &&
          mouse.moving
        ) {
          this.drawOffsetX -= dx;
          this.drawOffsetY -= dy;
          didMove = true;
        } else {
          if (this.drawOffsetX !== 0) {
            this.drawOffsetX -= this.drawOffsetX / 12;
            if (Math.abs(this.drawOffsetX) < 0.1) this.drawOffsetX = 0;
            didMove = true;
          }
          if (this.drawOffsetY !== 0) {
            this.drawOffsetY -= this.drawOffsetY / 12;
            if (Math.abs(this.drawOffsetY) < 0.1) this.drawOffsetY = 0;
            didMove = true;
          }
        }
        return didMove || this.drawOffsetX !== 0 || this.drawOffsetY !== 0;
      }
      
      draw(myImage: HTMLImageElement, cellW: number, cellH: number) {
        const scaleX = myImage.width / width;
        const scaleY = myImage.height / height;
        
        // Target coordinates with limits
        let sX = (this.x + this.drawOffsetX) * scaleX;
        let sY = (this.y + this.drawOffsetY) * scaleY;
        const sW = cellW * scaleX;
        const sH = cellH * scaleY;

        // Draw limits enforcement
        if (sX < 0) sX = 0;
        if (sY < 0) sY = 0;
        if (sX + sW > myImage.width) sX = myImage.width - sW;
        if (sY + sH > myImage.height) sY = myImage.height - sH;
        
        if (sW > 0 && sH > 0 && sX >= 0 && sY >= 0) {
            ctx!.drawImage(
            myImage,
            sX, sY, sW, sH,
            this.x, this.y, cellW, cellH
            );
        }
      }
    }

    let imageGrid: Cell[] = [];
    const myImage = new window.Image();
    myImage.src = "/images/login/cover-img.jpg";
    let cellW = 0;
    let cellH = 0;

    function init() {
      imageGrid = [];
      cellW = width / 18;
      cellH = height / 28;
      for (let y = 0; y < height; y += cellH) {
        for (let x = 0; x < width; x += cellW) {
          imageGrid.push(new Cell(x, y, cellW, cellH));
        }
      }
    }

    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDrawing) return;

      let needsRedraw = false;
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < imageGrid.length; i++) {
        const moved = imageGrid[i].update(cellW, cellH);
        if (moved) needsRedraw = true;
        imageGrid[i].draw(myImage, cellW, cellH);
      }
      
      if (!needsRedraw && !mouse.moving) {
          isDrawing = false;
      }
    }

    myImage.addEventListener("load", () => {
      init();
      animate();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const checkboxWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gsapContext = useRef<gsap.Context | null>(null);

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRememberMe(e.target.checked);
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

  // Toggle Password
  const togglePassword = () => setShowPassword(!showPassword);

  // GSAP Animations
  useEffect(() => {
    gsapContext.current = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background text
      tl.from(".gsap-bg-text", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0);

      // Left Polaroid
      tl.from(".gsap-polaroid", {
        x: -50,
        opacity: 0,
        rotation: -10,
        duration: 1,
        ease: "back.out(1)",
      }, 0.2);

      // Right form container
      tl.from(".gsap-form-container", {
        x: 50,
        opacity: 0,
        duration: 0.8,
      }, 0.4);

      // Form items staggering
      tl.from(".gsap-form-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, 0.6);
      
      // Blob background
      tl.from(".gsap-blob", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "back.out(1)",
      }, 0.8);

    }, containerRef);

    return () => {
      gsapContext.current?.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.push("/build");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="flex min-h-screen bg-paper-cream relative overflow-hidden font-space-mono text-marker-black selection:bg-tape-orange selection:text-white" ref={containerRef}>
      {/* Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
      
      {/* Big Rotated Background Text */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-5 overflow-hidden gsap-bg-text">
         <h1 className="font-display text-[20vw] text-black leading-none rotate-12 whitespace-nowrap select-none">SUBURBIA</h1>
      </div>

      {/* Main Content Container */}
      <main className="w-full max-w-6xl relative z-10 flex flex-col md:flex-row items-center justify-center p-4 md:p-12 gap-8 md:gap-20 mx-auto">
        
        {/* Left Side: Polaroid Image */}
        <div className="w-full md:w-[45%] relative group perspective-1000 hidden md:block gsap-polaroid">
            <div className="relative bg-white p-4 pb-16 shadow-polaroid transform rotate-[-3deg] transition-transform duration-500 hover:rotate-0 hover:scale-105 border border-gray-200">
                {/* Tape Strip */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/80 shadow-tape transform rotate-2 z-20 backdrop-blur-sm"></div>
                
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/5] border-2 border-zinc-100 bg-zinc-100 group">
                    <canvas 
                        ref={canvasRef}
                        className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-90 group-hover:grayscale-0 transition-all duration-700 block"
                        style={{ display: 'block' }}
                    />
                    <div className="absolute inset-0 bg-black opacity-20 mix-blend-overlay pointer-events-none"></div>
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="font-marker text-2xl text-black rotate-[-1deg]">
                        Kickflip @ The Cul-de-sac <span className="text-primary text-3xl">!!!</span>
                    </p>
                </div>
                
                {/* Sticker */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 text-yellow-400 drop-shadow-md rotate-12 z-20 animate-pulse">
                     <svg fill="currentColor" viewBox="0 0 100 100">
                         <path d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z" stroke="black" strokeWidth="3"></path>
                     </svg>
                </div>
            </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-[45%] relative">
            <div className="bg-white p-8 md:p-10 shadow-brutal border-4 border-black rotate-2 relative gsap-form-container">
                {/* Tape Strips */}
                <div className="absolute -top-3 -left-3 w-20 h-8 bg-purple-200/60 shadow-tape -rotate-45 z-20"></div>
                <div className="absolute -bottom-3 -right-3 w-20 h-8 bg-purple-200/60 shadow-tape -rotate-45 z-20"></div>

                <div className="mb-8 relative z-10 gsap-form-item">
                    <h2 className="font-rubik-mono text-4xl md:text-5xl text-black mb-2 uppercase tracking-tighter">
                        BACK TO<br/><span className="text-primary underline decoration-wavy decoration-4 underline-offset-4">GRIND</span>
                    </h2>
                    <p className="font-marker text-gray-500 text-lg rotate-1 ml-2">sign inside the lines...</p>
                </div>
                
                {/* Error Message */}
                {error && (
                    <div className="mb-4 bg-red-100 border-2 border-red-500 text-red-600 p-3 font-bold text-sm transform -rotate-1 gsap-form-item">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2 gsap-form-item">
                        <label className="block text-xs font-bold uppercase tracking-widest text-black pl-1" htmlFor="email">Email</label>
                        <div className="relative">
                            <input 
                                className="w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-primary focus:bg-yellow-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none" 
                                id="email" 
                                placeholder="skater_boi_99@gmail.com" 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="material-icons text-black">person</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 gsap-form-item">
                        <div className="flex justify-between items-center pl-1">
                            <label className="block text-xs font-bold uppercase tracking-widest text-black" htmlFor="password">Password</label>
                            <Link className="text-xs font-bold text-black border-b-2 border-black hover:text-primary hover:border-primary transition-colors font-mono" href="#">Lost it?</Link>
                        </div>
                        <div className="relative">
                            <input 
                                className="w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-primary focus:bg-yellow-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none pr-10 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden" 
                                id="password" 
                                placeholder="********" 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <button 
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-primary transition-colors focus:outline-none" 
                                type="button"
                                onClick={togglePassword}
                            >
                                <span className="material-icons text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div ref={checkboxWrapperRef} className="register-checkbox-wrapper pl-1 gsap-form-item">
                        <input 
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleCheckboxChange}
                        />
                        <label className="text-sm font-bold text-zinc-600 font-mono select-none cursor-pointer leading-tight pt-0.5" htmlFor="remember-me">Keep me logged in</label>
                    </div>

                    <div className="gsap-form-item w-full">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-tape-orange text-white font-rubik-mono text-xl py-4 border-2 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mt-4 uppercase tracking-wider relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {isLoading ? "SKATING..." : "SIGN IN"} <span className="material-icons group-hover:rotate-45 transition-transform">bolt</span>
                            </span>
                            <div className="absolute inset-0 bg-white opacity-10 mix-blend-overlay"></div>
                        </button>
                    </div>
                </form>

                <div className="relative my-8 flex items-center justify-center gsap-form-item">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="relative bg-white px-4">
                        <span className="font-marker text-zinc-400 text-lg">or else</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 gsap-form-item">
                     {[
                        { name: 'Google', icon: '/images/login/google.png' },
                        { name: 'Facebook', icon: '/images/login/facebook.png' }
                     ].map((provider) => (
                        <button key={provider.name} type="button" className="flex items-center justify-center px-4 py-2 border-2 border-black bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none text-black font-bold font-mono text-sm gap-2">
                             <Image src={provider.icon} alt={`${provider.name} logo`} width={20} height={20} className="w-5 h-5 object-contain" />
                             <span>{provider.name}</span>
                        </button>
                     ))}
                </div>

                <p className="mt-8 text-center text-sm font-mono text-zinc-600 gsap-form-item">
                    No account? 
                    <Link className="font-bold text-black underline decoration-2 decoration-primary underline-offset-2 hover:bg-primary hover:text-white transition-colors px-1 ml-1" href="/auth/register">Join the crew</Link>
                </p>
            </div>
            
            {/* Background Blob Svg */}
            <div className="absolute -bottom-10 -left-8 w-32 h-32 pointer-events-none opacity-80 mix-blend-multiply z-0 gsap-blob">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45.7,-76.3C58.9,-69.3,69.1,-58.3,77.3,-46.3C85.5,-34.3,91.7,-21.3,90.4,-8.9C89.1,3.5,80.3,15.3,71.2,26.4C62.1,37.5,52.7,47.9,41.9,56.1C31.1,64.3,18.9,70.3,6.2,71.5C-6.5,72.7,-19.7,69.1,-32.4,62.6C-45.1,56.1,-57.3,46.7,-66.6,35.1C-75.9,23.5,-82.3,9.7,-80.6,-3.4C-78.9,-16.5,-69.1,-28.9,-58.4,-39.3C-47.7,-49.7,-36.1,-58.1,-23.9,-65.6C-11.7,-73.1,1.1,-79.7,13.9,-79.4C26.7,-79.1,32.5,-83.3,45.7,-76.3Z" fill="#a3e635" transform="translate(100 100)"></path>
                </svg>
            </div>
        </div>

      </main>

    </div>
  );
}
