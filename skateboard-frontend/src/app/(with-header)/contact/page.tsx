"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Simulated)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-paper-cream-light min-h-screen relative overflow-x-hidden font-space-mono text-gray-900 leading-relaxed selection:bg-brand-orange selection:text-white">
      {/* Background Textures */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden border-b-4 border-black">
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none overflow-hidden">
            <span className="font-display text-[20vw] text-black leading-none whitespace-nowrap transform -rotate-12">SUBURBIA</span>
         </div>
         <div className="relative max-w-7xl mx-auto text-center z-10">
            <div className="inline-block relative">
                <h1 className="font-display text-7xl md:text-9xl text-black uppercase tracking-tighter leading-none mb-4 relative z-10 drop-shadow-sketch-white">
                    Get In Touch
                </h1>
                <div className="hidden md:block absolute -top-12 -right-12 w-24 h-24 transform rotate-12">
                     <Image 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeBdqFaLbx5JYGVIefJA5KX3hrZgiBYPF662hiGHQHCOcUmEavpnIehUSY4AXp8x7Ky1zbSZcWf6KFWvxJy_2eBxb3gA0srXLcGFx_Xl6qu3KXDjSNYR4ATZGiATpEjkpmjhBOxb8g0es3YDBOglWWTpcJJqZN9JLn4g5BqO6PTKrHYY2uZDuDTHqEUrz_7IG2XsCggztL8QBY3vkZq2vaEsDES2x7XIQzY5Hb_aheKJpulDs0hyFfNJMionr-za0BaolqEbFwcNk" 
                        alt="Skateboard decoration" 
                        width={100} 
                        height={100}
                        className="object-contain"
                     />
                </div>
                <div className="absolute -bottom-4 left-0 w-full h-6 bg-brand-lime opacity-60 transform -skew-x-12 -rotate-1 z-0"></div>
            </div>
            <p className="mt-6 text-xl md:text-2xl font-mono text-suburbia-blue max-w-2xl mx-auto bg-white p-2 border-2 border-black transform rotate-1 inline-block shadow-sketch">
                Got a question about your custom deck? Just wanna say hi?
            </p>
         </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Contact Form */}
            <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200/80 rotate-2 z-20 shadow-sm mix-blend-multiply"></div>
                <div className="bg-white p-8 md:p-10 border-4 border-black shadow-sketch-lg transform -rotate-1 relative">
                    <h2 className="font-display text-4xl text-black mb-8 uppercase">Drop us a line</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-mono font-bold text-lg mb-2 text-black" htmlFor="name">Yo, who&apos;s this?</label>
                            <input 
                                className="w-full bg-paper-cream-light border-2 border-black p-4 font-mono focus:outline-none focus:border-brand-orange transition-colors text-black placeholder-gray-500 rounded-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]" 
                                id="name" 
                                placeholder="Your Name" 
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-mono font-bold text-lg mb-2 text-black" htmlFor="email">Where can we reach ya?</label>
                            <input 
                                className="w-full bg-paper-cream-light border-2 border-black p-4 font-mono focus:outline-none focus:border-brand-orange transition-colors text-black placeholder-gray-500 rounded-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]" 
                                id="email" 
                                placeholder="email@example.com" 
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-mono font-bold text-lg mb-2 text-black" htmlFor="message">What&apos;s on your mind?</label>
                            <textarea 
                                className="w-full bg-paper-cream-light border-2 border-black p-4 font-mono focus:outline-none focus:border-brand-orange transition-colors text-black placeholder-gray-500 resize-none rounded-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]" 
                                id="message" 
                                placeholder="Tell us everything..." 
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button className="w-full group relative inline-flex items-center justify-center pt-2" type="submit">
                            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                            <div className="relative w-full bg-brand-orange border-2 border-black px-8 py-4 font-display text-2xl uppercase tracking-wider text-black hover:-translate-y-1 transition-transform" 
                                 style={{ clipPath: "polygon(0% 10px, 5% 0px, 10% 12px, 15% 2px, 20% 10px, 25% 0px, 30% 12px, 35% 2px, 40% 10px, 45% 0px, 50% 12px, 55% 2px, 60% 10px, 65% 0px, 70% 12px, 75% 2px, 80% 10px, 85% 0px, 90% 12px, 95% 2px, 100% 10px, 100% 100%, 0% 100%)" }}>
                                Send Message
                            </div>
                        </button>
                    </form>
                    <div className="absolute -bottom-10 -right-8 w-24 h-24 bg-brand-lime rounded-full border-4 border-black flex items-center justify-center transform rotate-12 shadow-md z-20 animate-bounce">
                        <span className="font-marker text-lg text-center leading-tight">Peace<br/>✌️</span>
                    </div>
                </div>
            </div>

            {/* Contact Options */}
            <div className="space-y-12">
                <div className="grid gap-6">
                    {/* Email Card */}
                    <div className="bg-suburbia-blue p-6 border-4 border-black shadow-hard transform rotate-1 hover:rotate-0 transition-transform duration-300 group">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-black rounded-lg border-2 border-brand-lime text-brand-lime group-hover:bg-brand-lime group-hover:text-black transition-colors">
                                <span className="material-icons text-3xl">email</span>
                            </div>
                            <div>
                                <h3 className="font-display text-2xl text-white uppercase mb-1">Email Us</h3>
                                <a className="font-mono text-lg text-brand-lime hover:text-white transition-colors underline decoration-2 decoration-wavy break-all" href="mailto:shred@suburbiaskate.com">shred@suburbiaskate.com</a>
                                <p className="text-sm text-gray-300 font-mono mt-1">We usually reply within 24h unless we&apos;re skating.</p>
                            </div>
                        </div>
                    </div>

                    {/* Shop Card */}
                    <div className="bg-suburbia-blue p-6 border-4 border-black shadow-hard transform -rotate-1 hover:rotate-0 transition-transform duration-300 group">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-black rounded-lg border-2 border-brand-lime text-brand-lime group-hover:bg-brand-lime group-hover:text-black transition-colors">
                                <span className="material-icons text-3xl">place</span>
                            </div>
                            <div>
                                <h3 className="font-display text-2xl text-white uppercase mb-1">Visit The Shop</h3>
                                <p className="font-mono text-lg text-white">
                                    1984 Kickflip Ave.<br/>
                                    Cul-De-Sac City, CA 90210
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call Card */}
                    <div className="bg-suburbia-blue p-6 border-4 border-black shadow-hard transform rotate-1 hover:rotate-0 transition-transform duration-300 group">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-black rounded-lg border-2 border-brand-lime text-brand-lime group-hover:bg-brand-lime group-hover:text-black transition-colors">
                                <span className="material-icons text-3xl">call</span>
                            </div>
                            <div>
                                <h3 className="font-display text-2xl text-white uppercase mb-1">Call Us</h3>
                                <a className="font-mono text-lg text-brand-lime hover:text-white transition-colors" href="tel:+15550199">555-SKATE-99</a>
                                <p className="text-sm text-gray-300 font-mono mt-1">Mon-Fri: 10am - 8pm</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Socials / Join Crew */}
                <div className="relative pt-8">
                    <div className="absolute top-0 left-10 -rotate-3 bg-brand-orange text-black font-marker px-4 py-1 text-xl border-2 border-black z-10 shadow-sm">
                        Join the Crew!
                    </div>
                    <div className="bg-paper-cream-light border-dashed border-4 border-gray-400 p-8 rounded-xl flex flex-col items-center justify-center text-center">
                        <h3 className="font-display text-3xl text-black mb-6 uppercase">Follow for latest drops</h3>
                        <div className="flex justify-center space-x-6">
                           {[
                             { icon: "instagram", color: "bg-black" },
                             { icon: "tiktok", color: "bg-black" }, // Using generic play icon or similar if needed, or SVG
                             { icon: "discord", color: "bg-black" }, // Using generic group icon or similar
                           ].map((s, i) => (
                             <a key={i} href="#" className="group transform hover:scale-110 hover:rotate-6 transition-transform">
                                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center border-4 border-brand-orange shadow-hard group-hover:bg-brand-orange group-hover:text-black">
                                   {/* Placeholder generic icons since specific brand icons might need SVGs */}
                                    <span className="material-icons text-3xl">{i === 0 ? 'photo_camera' : i === 1 ? 'music_note' : 'forum'}</span>
                                </div>
                             </a>
                           ))}
                        </div>
                    </div>
                </div>
                
                 <div className="relative mt-8">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-yellow-200/60 rotate-1 z-20 mix-blend-multiply"></div>
                    <Link href="/faq">
                        <div className="bg-brand-orange p-6 border-2 border-dashed border-black shadow-md transform rotate-1 cursor-pointer hover:bg-orange-600 transition-colors">
                            <h4 className="font-marker text-xl text-black mb-2">Looking for answers?</h4>
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-sm text-black font-bold">Shipping, returns, deck specs...</p>
                                <span className="font-display text-lg text-black underline">Check our FAQ →</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
}
