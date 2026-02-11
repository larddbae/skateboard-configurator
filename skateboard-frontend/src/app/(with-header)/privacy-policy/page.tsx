"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-suburbia-pink min-h-screen relative overflow-hidden font-space-mono text-gray-900 leading-relaxed selection:bg-brand-orange selection:text-white">
      {/* Background Noise & Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply"></div>
      
      {/* Background Big Text */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <h1 className="text-[20vw] font-display text-white opacity-20 select-none rotate-12 leading-none whitespace-nowrap">SUBURBIA</h1>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Navigation */}
        <aside className="lg:w-1/4 relative z-20">
          <div className="sticky top-24">
             {/* Decorative Tape */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white/30 rotate-2 z-20 backdrop-blur-sm shadow-sm"></div>
            
            <div className="bg-white border-2 border-black p-6 shadow-sketch transform -rotate-1 transition-transform hover:rotate-0">
              <h2 className="font-display text-3xl mb-6 uppercase border-b-4 border-brand-orange pb-2 inline-block">Contents</h2>
              <ul className="space-y-4 text-sm font-bold list-none">
                {[
                  { id: "section-1", label: "Information We Collect" },
                  { id: "section-2", label: "How We Use It" },
                  { id: "section-3", label: "Cookies & Tracking" },
                  { id: "section-4", label: "Third Parties" },
                  { id: "section-5", label: "Your Rights" },
                ].map((item, index) => (
                  <li key={item.id}>
                    <Link href={`#${item.id}`} className="flex items-center group hover:text-brand-orange transition-colors">
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center mr-3 text-xs group-hover:bg-brand-orange transition-colors font-mono">
                        {index + 1}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300">
                <p className="font-mono text-xs text-gray-500 mb-2">Need help?</p>
                <a className="font-display text-xl hover:text-brand-orange underline decoration-wavy decoration-brand-orange break-words" href="mailto:legal@suburbiaskate.com">
                  LEGAL@SUBURBIA.COM
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="lg:w-3/4 relative z-10">
          {/* Page Title */}
          <div className="mb-12 relative">
             <span className="absolute -left-6 top-0 text-6xl text-brand-orange opacity-50 font-display -rotate-12 hidden lg:block">→</span>
             <h1 className="font-display text-7xl md:text-8xl mb-4 leading-none uppercase text-black drop-shadow-sm">
                 Privacy<br/>
                 <span className="text-white bg-black px-2 inline-block transform -rotate-2">Policy</span>
             </h1>
             <div className="flex items-center gap-4 mt-6 flex-wrap">
                <span className="bg-brand-orange text-white font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest border-2 border-black shadow-sm transform rotate-1">Legal Doc 01</span>
                <span className="font-mono text-sm font-bold text-gray-700 italic">Last Updated: October 24, 2023</span>
             </div>
          </div>

          {/* Privacy Content Container */}
          <div className="bg-paper-cream relative p-8 md:p-12 shadow-2xl mb-24 border-t-2 border-x-2 border-black">
             {/* Torn Paper Effect at Bottom */}
             <div className="absolute -bottom-[20px] left-0 w-full h-[20px] bg-repeat-x rotate-180"
                  style={{ 
                      backgroundImage: "radial-gradient(circle at 10px -5px, transparent 12px, #fdfbf7 13px)",
                      backgroundSize: "20px 20px"
                  }}>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -top-3 right-12 w-24 h-8 bg-yellow-200 opacity-80 rotate-3 z-10 shadow-sm transform skew-x-12 border-2 border-transparent"></div>
             <div className="absolute top-12 -right-2 w-4 h-32 bg-brand-orange/20 rotate-0"></div>

             <div className="prose prose-lg max-w-none font-space-mono text-gray-800">
                <p className="text-lg leading-relaxed border-l-4 border-brand-orange pl-6 italic mb-12 bg-orange-50/50 p-4">
                    Hey skater. At Suburbia, we respect your grind and your data. This document explains what we collect, why we collect it, and how we keep it safe while you&apos;re shredding the streets. No corporate suit talk, just the facts.
                </p>

                <div id="section-1" className="mb-16 scroll-mt-32">
                   <h2 className="font-display text-4xl mb-6 flex items-center">
                      <span className="bg-black text-white w-10 h-10 flex items-center justify-center text-2xl mr-4 transform -rotate-3 border-2 border-transparent">1</span>
                      Information We Collect
                   </h2>
                   <p className="mb-4">We collect information you provide directly to us when you build a custom board, make a purchase, or join the crew.</p>
                   <ul className="list-none pl-0 space-y-4">
                      <li className="flex items-start">
                         <span className="material-icons text-brand-orange mr-3 mt-1 text-xl">check_circle</span>
                         <span><strong>Identity Data:</strong> Name, username, or similar identifier. Basically, who you are.</span>
                      </li>
                      <li className="flex items-start">
                         <span className="material-icons text-brand-orange mr-3 mt-1 text-xl">check_circle</span>
                         <span><strong>Contact Data:</strong> Billing address, delivery address, email address and telephone numbers. So we can ship your deck.</span>
                      </li>
                      <li className="flex items-start">
                         <span className="material-icons text-brand-orange mr-3 mt-1 text-xl">check_circle</span>
                         <span><strong>Financial Data:</strong> Bank account and payment card details. (We don&apos;t store this, our payment processors do).</span>
                      </li>
                  </ul>
                </div>

                <div id="section-2" className="mb-16 scroll-mt-32 relative">
                   <div className="absolute -right-4 top-10 w-24 h-24 border-4 border-dashed border-brand-orange rounded-full opacity-20 pointer-events-none animate-spin-slow"></div>
                   <h2 className="font-display text-4xl mb-6 flex items-center">
                      <span className="bg-black text-white w-10 h-10 flex items-center justify-center text-2xl mr-4 transform rotate-2">2</span>
                      How We Use It
                   </h2>
                   <p>We use your personal data to:</p>
                   <div className="grid md:grid-cols-2 gap-6 mt-6 not-prose">
                      {[
                        { icon: "inventory_2", title: "Order Fulfillment", desc: "To process and deliver your custom decks and gear.", rotate: "rotate-1" },
                        { icon: "campaign", title: "Marketing", desc: "To tell you about new drops (only if you said yes).", rotate: "-rotate-1" },
                        { icon: "security", title: "Security", desc: "To prevent fraud and keep the community safe.", rotate: "rotate-1" },
                        { icon: "analytics", title: "Analytics", desc: "To understand how you use our site to make it better.", rotate: "-rotate-1" }
                      ].map((card, i) => (
                        <div key={i} className={`bg-white p-6 border-2 border-black transform ${card.rotate} hover:rotate-0 transition-transform shadow-sm`}>
                            <span className="material-icons text-4xl text-brand-blue mb-4">{card.icon}</span>
                            <h3 className="font-display text-xl mb-2 uppercase">{card.title}</h3>
                            <p className="text-sm font-mono">{card.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div id="section-3" className="mb-16 scroll-mt-32">
                   <h2 className="font-display text-4xl mb-6 flex items-center">
                      <span className="bg-black text-white w-10 h-10 flex items-center justify-center text-2xl mr-4 transform -rotate-1">3</span>
                      Cookies & Tracking
                   </h2>
                   <div className="bg-brand-orange/10 p-6 border-l-4 border-brand-orange">
                      <p className="font-bold mb-2">🍪 We use cookies.</p>
                      <p className="text-sm mb-0">Not the oatmeal raisin kind. The digital kind that helps us remember what&apos;s in your cart and keep you logged in. You can block them in your browser, but the site might act weird, like a board with loose trucks.</p>
                   </div>
                </div>

                <div id="section-4" className="mb-16 scroll-mt-32">
                   <h2 className="font-display text-4xl mb-6 flex items-center">
                      <span className="bg-black text-white w-10 h-10 flex items-center justify-center text-2xl mr-4 transform rotate-3">4</span>
                      Third Parties
                   </h2>
                   <p>We don&apos;t sell your data. That&apos;s weak. We do share it with trusted partners who help us run the show:</p>
                   <ul className="list-disc pl-6 marker:text-brand-orange marker:text-xl">
                      <li>Payment processors (Stripe, PayPal)</li>
                      <li>Shipping providers (FedEx, UPS)</li>
                      <li>Email services (for order updates)</li>
                   </ul>
                </div>

                <div id="section-5" className="mb-8 scroll-mt-32">
                   <h2 className="font-display text-4xl mb-6 flex items-center">
                      <span className="bg-black text-white w-10 h-10 flex items-center justify-center text-2xl mr-4 transform -rotate-2">5</span>
                      Your Rights
                   </h2>
                   <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
                   <div className="mt-6 flex flex-wrap gap-3 not-prose">
                      {["Request Access", "Request Correction", "Request Erasure", "Object to Processing"].map((action) => (
                        <span key={action} className="px-4 py-2 border-2 border-black rounded-full text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer bg-white">
                            {action}
                        </span>
                      ))}
                   </div>
                </div>
             </div>

             <div className="mt-16 pt-8 border-t-2 border-black flex justify-between items-end opacity-70">
                <div className="font-display text-2xl uppercase">
                    Suburbia<br/>Skate Co.
                </div>
                <div className="w-24 h-24 border-4 border-brand-orange rounded-full flex items-center justify-center transform -rotate-12 border-dashed">
                    <span className="font-display text-brand-orange text-xl uppercase text-center leading-none">Official<br/>Legal<br/>Doc</span>
                </div>
             </div>
          </div>
        </article>
      </main>
    </div>
  );
}
