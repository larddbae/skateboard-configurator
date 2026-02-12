"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import clsx from "clsx";

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
        
        {/* Left Side: Image Collage (Hidden on mobile) */}
        <div className="w-full md:w-[45%] relative group hidden md:block">
            <div className="relative transform rotate-3 transition-transform duration-500 hover:rotate-0">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-lime rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
                <div className="absolute top-20 -right-10 w-40 h-40 bg-brand-orange rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
                
                <div className="relative bg-white p-4 pb-16 shadow-polaroid border border-gray-200">
                    <div className="absolute -top-4 right-1/2 translate-x-1/2 w-32 h-8 bg-purple-200/80 shadow-tape transform -rotate-1 z-20 backdrop-blur-sm"></div>
                    <div className="relative overflow-hidden aspect-[4/5] border-2 border-zinc-100 bg-zinc-100">
                        <img 
                            alt="Skate crew hanging out" 
                            className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-90 group-hover:grayscale-0 transition-all duration-700" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwMoWiuM0hax6drTiKyr09UP7aGs1sr-NeFR05rH5k7gKOdbe1gZcVeQ4R1hF-rvFXk3yvZgRa6FgdYkH0dI-r-P8yYFo1KZZzacXGesv-TJNCuH0zDV_v01flF1N7XX9qUv0Mcoxjl3BNsDQhJ3_BmAkfLtHE1xxq-12vM-31dRpnaaqJXSw68-IB4rOxCuUphDf9XdvWcADIGtQpYWS4X_ZvgL2dCJbRVK-ycPZb8NGtTlUbSxJpRGGMeO75fyjYgdK8GftRs2I"
                        />
                         <div className="absolute inset-0 bg-brand-orange opacity-10 mix-blend-overlay"></div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="font-marker text-2xl text-black rotate-1">
                            Join The Crew
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full md:w-[45%] relative">
            <div className="bg-white p-8 md:p-10 shadow-brutal border-4 border-black -rotate-1 relative">
                {/* Tape Strips */}
                <div className="absolute -top-3 right-10 w-24 h-8 bg-yellow-100/80 shadow-tape rotate-2 z-20"></div>

                <div className="mb-6 relative z-10">
                    <h2 className="font-rubik-mono text-3xl md:text-4xl text-black mb-2 uppercase tracking-tighter">
                        NEW <span className="text-secondary bg-brand-lime px-2 transform -skew-x-6 inline-block">BLOOD</span>
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

                    {/* Terms */}
                    <div className="flex items-start gap-3 pl-1">
                        <input 
                            className="mt-1 h-4 w-4 cursor-pointer appearance-none border-2 border-black bg-white checked:bg-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]" 
                            id="terms" 
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                         <label className="text-xs font-bold text-zinc-600 font-mono select-none cursor-pointer leading-tight" htmlFor="terms">
                            I agree to the <Link href="#" className="text-brand-orange hover:text-black underline">Terms</Link> and <Link href="#" className="text-brand-orange hover:text-black underline">Privacy Policy</Link>. No poseurs allowed.
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-black hover:bg-zinc-800 text-white font-rubik-mono text-xl py-4 border-2 border-transparent hover:border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mt-4 uppercase tracking-wider relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isLoading ? "CREATING..." : "JOIN NOW"} <span className="material-icons text-brand-lime">east</span>
                        </span>
                        <div className="absolute inset-0 bg-brand-lime opacity-0 group-hover:opacity-10 transition-opacity"></div>
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
