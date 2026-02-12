"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    category: "Orders",
    question: "How long does it take to build my custom deck?",
    answer: "We hand-press and print every custom order. Usually, it takes about 3-5 business days to craft your masterpiece before it ships. If you ordered a stock design from the \"Latest Drop\", those ship within 24 hours."
  },
  {
    category: "Shipping",
    question: "Do you ship internationally?",
    answer: "Hell yeah! We ship worldwide. International shipping usually takes 7-14 business days depending on customs. Shipping rates are calculated at checkout."
  },
  {
    category: "Product",
    question: "What if I snap my board immediately?",
    answer: "Skateboarding is destruction. Boards break. But if it snaps due to a manufacturing defect within 30 days (delamination, warping), send us a pic and we'll sort you out. Snapped tails from a massive stair set? That's on you, legend."
  },
  {
    category: "Product",
    question: "Can I upload my own artwork?",
    answer: "Absolutely. Use our custom builder. We accept high-res PNG and JPG files. Make sure you own the rights to the artwork! No copyrighted stuff unless you want legal trouble (we don't)."
  },
  {
     category: "Returns",
     question: "Can I return a custom board?",
     answer: "Since it's custom made just for you, we can't accept returns on custom printed decks unless there's a manufacturing defect. Stock items (apparel, wheels) can be returned within 30 days if unused."
  },
  {
     category: "Orders",
     question: "Where is the store located?",
     answer: "We are born in the garage, raised on the streets. We don't have a physical retail store yet, but our warehouse is in Southern California. Local pickup available soon!"
  }
];

const categories = ["All", "Orders", "Shipping", "Returns", "Product"];

export default function FAQPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(faq => {
      const matchesCategory = filter === "All" || faq.category === filter;
      const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-suburbia-pink min-h-screen relative overflow-hidden font-space-mono text-gray-900">
       {/* Background Noise & Decorations */}
       <div className="fixed inset-0 pointer-events-none opacity-20 bg-grain-texture z-0 mix-blend-overlay"></div>
       <div className="absolute top-20 left-10 opacity-10 transform -rotate-12 pointer-events-none">
            <h1 className="font-marker text-9xl text-black">SK8</h1>
        </div>
        <div className="absolute bottom-40 right-10 opacity-10 transform rotate-12 pointer-events-none">
            <h1 className="font-marker text-9xl text-black">GRIND</h1>
        </div>
        
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
             <h1 className="font-display text-6xl md:text-8xl text-black uppercase tracking-tight leading-none mb-6 relative inline-block">
                Frequently Asked <br/>
                <span className="relative inline-block">
                    Questions
                    <svg className="absolute -bottom-4 left-0 w-full h-6 text-brand-orange" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.00025 6.99997C2.00025 6.99997 101.916 5.86178 123.636 4.90487C145.356 3.94796 179.948 0.444458 198.001 2.49997" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                    </svg>
                </span>
            </h1>
            <p className="font-space-mono text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mt-4 mb-8">
                Stuck on a trick? Or just stuck on shipping? We got you.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative group">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-focus-within:translate-x-2 group-focus-within:translate-y-2 transition-transform" style={{ clipPath: "polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)" }}></div>
                <div className="relative bg-paper-cream border-2 border-black p-1 flex items-center shadow-lg" style={{ clipPath: "polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)" }}>
                    <span className="material-icons text-3xl text-gray-500 pl-3">search</span>
                    <input 
                        className="w-full bg-transparent border-none focus:ring-0 text-black font-space-mono text-lg placeholder-gray-500 h-12" 
                        placeholder="Type your question..." 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat, index) => (
                <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`
                        px-6 py-3 font-display text-xl uppercase tracking-wide transform hover:-translate-y-1 transition-transform border-2 border-black shadow-[2px_3px_5px_rgba(0,0,0,0.3)]
                        ${filter === cat ? 'bg-brand-orange text-black' : 'bg-white text-black hover:bg-gray-100'} 
                    `}
                    style={{ 
                        clipPath: "polygon(3% 0%, 97% 2%, 100% 95%, 0% 100%)",
                        transform: `rotate(${index % 2 === 0 ? '-1deg' : '2deg'})` 
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-6 max-w-3xl mx-auto">
            {filteredFaqs.map((faq, index) => (
                <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" style={{ clipPath: "polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)" }}></div>
                    <div className="relative bg-paper-cream border-2 border-black p-6 group-open:bg-white" style={{ clipPath: "polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)" }}>
                        <details className="group/details">
                            <summary className="flex justify-between items-start cursor-pointer list-none">
                                <h3 className="font-display text-2xl md:text-3xl text-black uppercase leading-tight pr-8">
                                    {faq.question}
                                </h3>
                                <span className="text-suburbia-lime flex-shrink-0 transform transition-transform group-open/details:rotate-45">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path></svg>
                                </span>
                            </summary>
                            <div className="mt-4 font-space-mono text-gray-800 leading-relaxed border-t-2 border-black/10 pt-4 border-dashed animate-in fade-in slide-in-from-top-2">
                                <p>{faq.answer}</p>
                            </div>
                        </details>
                    </div>
                </div>
            ))}
            {filteredFaqs.length === 0 && (
                <div className="text-center py-10 font-bold font-marker text-2xl opacity-50">
                    No answers found. Try searching for something else!
                </div>
            )}
        </div>

        {/* Contact CTA */}
        <div className="mt-24 text-center">
            <div className="inline-block relative transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2" style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 95%, 0% 100%)" }}></div>
                <div className="relative bg-brand-orange p-8 md:p-12 border-2 border-black" style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 95%, 0% 100%)" }}>
                    <h2 className="font-display text-4xl md:text-5xl uppercase text-black mb-4">
                        Still have questions?
                    </h2>
                    <p className="font-space-mono font-bold text-black mb-6">Don&apos;t be shy. Slide into our DMs or email support.</p>
                    <Link href="/contact" className="inline-block bg-black text-white font-display text-2xl uppercase px-8 py-3 transform -rotate-1 hover:scale-105 transition-transform border-2 border-transparent hover:border-white">
                        Contact Us
                    </Link>
                </div>
            </div>
             {/* Use next/image for the skater icon if possible, but the URL is external. Assuming configured or using allow-list. Using img for now to match code.html style rapidly or next/image with domains config. 
                 It's an external googleusercontent URL, which might not be in next.config.ts images.domains. 
                 I'll use a standard <img /> tag or skip it. Code.html used it. I'll omit it or use a simple placeholder if I don't want to break build. 
                 Actually, I'll allow googleusercontent.com in next.config or just use <img /> since user asked to match code.html. 
                 Wait, next/image requires domain config. Static img tag works but warned. I'll use <img /> to avoid config editing overhead unless necessary.
              */}
            {/* Replaced img with div to avoid next/image config issues */}
            <div className="w-24 h-24 absolute -bottom-10 right-0 md:right-20 opacity-20 filter invert hover:opacity-40 transition-opacity animate-bounce bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtnr_Ba-rw0fct4WQUPJAr8nfqOf7VLU8TabmEmLw1AHUvVYHM7LrEqdW3LKAoG5RT8izgayC-4_YdRgmPstNnR5SU4VMWM1PPLjgFVLDZ_J-jDcuh5-aNFyT0bkYxA9Fim5TrR2oNyEIV06WncDqSw0JELJlEUeeEJnVC4V6yIAnKrjq8rlmQiEj1QVbV75YSR3jP32HL63eBT1jISmhHBvnm8oCPLrjxrJod9_G2HmSNzcrSo81nxIPA2rp0s-SHNBV4ASQ0Usc')] bg-contain bg-no-repeat bg-center"></div>
        </div>

      </main>
    </div>
  );
}
