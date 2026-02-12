"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Toggle Password
  const togglePassword = () => setShowPassword(!showPassword);

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
    <div className="flex min-h-screen bg-paper-cream relative overflow-hidden font-space-mono text-marker-black selection:bg-tape-orange selection:text-white">
      {/* Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
      
      {/* Big Rotated Background Text */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-5 overflow-hidden">
         <h1 className="font-display text-[20vw] text-black leading-none rotate-12 whitespace-nowrap select-none">SUBURBIA</h1>
      </div>

      {/* Main Content Container */}
      <main className="w-full max-w-6xl relative z-10 flex flex-col md:flex-row items-center justify-center p-4 md:p-12 gap-8 md:gap-20 mx-auto">
        
        {/* Left Side: Polaroid Image */}
        <div className="w-full md:w-[45%] relative group perspective-1000 hidden md:block">
            <div className="relative bg-white p-4 pb-16 shadow-polaroid transform rotate-[-3deg] transition-transform duration-500 hover:rotate-0 hover:scale-105 border border-gray-200">
                {/* Tape Strip */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/80 shadow-tape transform rotate-2 z-20 backdrop-blur-sm"></div>
                
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/5] border-2 border-zinc-100 bg-zinc-100">
                    <img 
                        alt="Skater mid-air kickflip" 
                        className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-90 group-hover:grayscale-0 transition-all duration-700" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD59Mm_y_kntqr8FmEMBNr56CY5YtnBHFWYV2njRwQmT2ZI-5gTk9X18nN8eSilgJh_h_E3dLfyrXD-BkFHF8VxfGfEpUctWKg2kOqzFmRSTIFdRAfizz6NR2h2kfBwKFRj8KVkwsF-sSdx51rFzliMHO2ARQrBhqHPtU6AP6wDLewTrfQaVOW5CDbgWSXOrn4YE80RwaxF4kV94GnrE2u-gjYmbC7cCSOPevWB7q8JPdczgVayzhTEimNWNXGqFwbFgtCWKNuh_HI"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 mix-blend-overlay"></div>
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
            <div className="bg-white p-8 md:p-10 shadow-brutal border-4 border-black rotate-2 relative">
                {/* Tape Strips */}
                <div className="absolute -top-3 -left-3 w-20 h-8 bg-purple-200/60 shadow-tape -rotate-45 z-20"></div>
                <div className="absolute -bottom-3 -right-3 w-20 h-8 bg-purple-200/60 shadow-tape -rotate-45 z-20"></div>

                <div className="mb-8 relative z-10">
                    <h2 className="font-rubik-mono text-4xl md:text-5xl text-black mb-2 uppercase tracking-tighter">
                        BACK TO<br/><span className="text-primary underline decoration-wavy decoration-4 underline-offset-4">GRIND</span>
                    </h2>
                    <p className="font-marker text-gray-500 text-lg rotate-1 ml-2">sign inside the lines...</p>
                </div>
                
                {/* Error Message */}
                {error && (
                    <div className="mb-4 bg-red-100 border-2 border-red-500 text-red-600 p-3 font-bold text-sm transform -rotate-1">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-black pl-1" htmlFor="email">User / Email</label>
                        <div className="relative">
                            <input 
                                className="w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-primary focus:bg-yellow-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none" 
                                id="email" 
                                placeholder="skater_boi_99" 
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

                    <div className="space-y-2">
                        <div className="flex justify-between items-center pl-1">
                            <label className="block text-xs font-bold uppercase tracking-widest text-black" htmlFor="password">Password</label>
                            <Link className="text-xs font-bold text-black border-b-2 border-black hover:text-primary hover:border-primary transition-colors font-mono" href="#">Lost it?</Link>
                        </div>
                        <div className="relative">
                            <input 
                                className="w-full bg-transparent border-2 border-black text-black placeholder-gray-400 px-4 py-3 focus:ring-0 focus:border-primary focus:bg-yellow-50 transition-all font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none pr-10" 
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
                    <div className="flex items-center gap-3 pl-1">
                        <input 
                            className="h-5 w-5 cursor-pointer appearance-none border-2 border-black bg-white checked:bg-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]" 
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox"
                        />
                        <label className="text-sm font-bold text-zinc-600 font-mono select-none cursor-pointer" htmlFor="remember-me">Keep me logged in</label>
                    </div>

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
                </form>

                <div className="relative my-8 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="relative bg-white px-4">
                        <span className="font-marker text-zinc-400 text-lg">or else</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     {/* Google & Apple buttons simplified for implementation */}
                     {['Google', 'Apple'].map((provider) => (
                        <button key={provider} className="flex items-center justify-center px-4 py-2 border-2 border-black bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none text-black font-bold font-mono text-sm gap-2">
                             <span>{provider}</span>
                        </button>
                     ))}
                </div>

                <p className="mt-8 text-center text-sm font-mono text-zinc-600">
                    No account? 
                    <Link className="font-bold text-black underline decoration-2 decoration-primary underline-offset-2 hover:bg-primary hover:text-white transition-colors px-1 ml-1" href="/auth/register">Join the crew</Link>
                </p>
            </div>
            
            {/* Background Blob Svg */}
            <div className="absolute -bottom-10 -left-8 w-32 h-32 pointer-events-none opacity-80 mix-blend-multiply z-0">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45.7,-76.3C58.9,-69.3,69.1,-58.3,77.3,-46.3C85.5,-34.3,91.7,-21.3,90.4,-8.9C89.1,3.5,80.3,15.3,71.2,26.4C62.1,37.5,52.7,47.9,41.9,56.1C31.1,64.3,18.9,70.3,6.2,71.5C-6.5,72.7,-19.7,69.1,-32.4,62.6C-45.1,56.1,-57.3,46.7,-66.6,35.1C-75.9,23.5,-82.3,9.7,-80.6,-3.4C-78.9,-16.5,-69.1,-28.9,-58.4,-39.3C-47.7,-49.7,-36.1,-58.1,-23.9,-65.6C-11.7,-73.1,1.1,-79.7,13.9,-79.4C26.7,-79.1,32.5,-83.3,45.7,-76.3Z" fill="#a3e635" transform="translate(100 100)"></path>
                </svg>
            </div>
        </div>

      </main>

      {/* Footer Copyright */}
      <div className="fixed bottom-4 left-0 right-0 text-center pointer-events-none hidden md:block">
        <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">© 2024 SUBURBIA SKATE CO. // EST. 1999</p>
      </div>
    </div>
  );
}
