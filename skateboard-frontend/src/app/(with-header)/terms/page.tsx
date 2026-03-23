"use client";

import React, { useState, useEffect } from "react";

const navItems = [
  { id: "overview", label: "1. Overview", icon: "gavel" },
  { id: "store-policy", label: "2. Store Policy", icon: "copyright" },
  { id: "accounts", label: "3. User Accounts", icon: "keyboard_return" },
  { id: "custom", label: "4. Custom Boards", icon: "warning" },
];

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Offset for header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="font-space-grotesk text-[#2b2959] overflow-x-hidden selection:bg-[#dff759] selection:text-[#505c00] min-h-screen bg-texture relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .text-stroke {
          -webkit-text-stroke: 2px black;
        }
        .torn-edge-top {
          clip-path: polygon(0% 15%, 5% 5%, 10% 18%, 15% 4%, 20% 15%, 25% 6%, 30% 19%, 35% 3%, 40% 14%, 45% 7%, 50% 20%, 55% 5%, 60% 16%, 65% 8%, 70% 18%, 75% 4%, 80% 15%, 85% 6%, 90% 19%, 95% 3%, 100% 15%, 100% 100%, 0% 100%);
        }
        .torn-edge-bottom {
          clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 95% 97%, 90% 81%, 85% 94%, 80% 85%, 75% 96%, 70% 82%, 65% 92%, 60% 84%, 55% 95%, 50% 80%, 45% 93%, 40% 86%, 35% 97%, 30% 81%, 25% 94%, 20% 85%, 15% 96%, 10% 82%, 5% 95%, 0% 85%);
        }
        .marker-highlight {
          background: #a63300;
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 2, 50 10 T 100 10' stroke='black' stroke-width='15' fill='none'/%3E%3C/svg%3E");
        }
      ` }} />
      {/* Team page texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <header className="mb-20 text-center relative">
          <div className="inline-block relative z-10">
            <div className="absolute inset-0 bg-[#a63300] -rotate-2 scale-110 translate-y-2 opacity-90 blur-[1px] -z-10" style={{ clipPath: "polygon(2% 15%, 98% 5%, 95% 90%, 5% 95%)" }}></div>
            <h1 className="font-rubik-mono text-4xl md:text-7xl uppercase text-white text-stroke tracking-tighter relative z-10">
              THE LEGAL STUFF
            </h1>
          </div>
          <p className="font-marker text-2xl mt-8 text-[#a63300] transform -rotate-1 relative z-10">
            Terms of Service - Last updated: Oct 2026
          </p>
          <div className="absolute -top-10 -left-10 md:left-0 rotate-12 bg-[#556100] text-white p-2 font-marker shadow-[4px_4px_0px_black] hidden lg:block z-10">READ ME</div>
          <div className="absolute -top-5 right-0 rotate-[-15deg] hidden lg:block z-0">
            <span className="material-symbols-outlined text-6xl opacity-30">skateboarding</span>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
          <aside className="sticky top-24 left-0 w-full md:w-64 border-4 border-black bg-[#ffffff] dark:bg-[#2b2959] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 p-4 z-20">
            <div className="mb-4">
              <h2 className="font-marker text-xl text-[#a63300]">LEGAL_DEPT</h2>
              <p className="font-space-grotesk font-bold uppercase text-xs text-[#2b2959]/60 dark:text-[#f9f5ff]/60 tracking-widest">READ_OR_DIE</p>
            </div>
            <nav className="relative flex flex-col gap-2 font-space-grotesk font-bold uppercase isolate">
              {/* Animated active indicator */}
              <div 
                className="absolute left-0 w-full h-[40px] bg-[#556100] -rotate-1 shadow-[2px_2px_0px_black] transition-all duration-300 ease-out z-0"
                style={{ 
                  transform: `translateY(${navItems.findIndex(i => i.id === activeTab) * 48}px) rotate(-1deg)`
                }} 
              />
              
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <a 
                    key={item.id}
                    className={`h-[40px] p-2 transition-all duration-300 flex items-center gap-2 group relative z-10 ${isActive ? "text-white" : "text-[#2b2959] dark:text-[#f7d0e9] hover:bg-[#f7d0e9]/50 dark:hover:bg-slate-800/50"}`}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="material-symbols-outlined ml-auto transition-transform">arrow_right_alt</span>
                    )}
                  </a>
                );
              })}
            </nav>
          </aside>

          <div className="flex-1 w-full relative z-10">
            <div className="bg-[#fdfbf7] dark:bg-[#222] p-8 md:p-16 border-2 border-black shadow-[12px_12px_0px_black] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-8 bg-[#f9f5ff] dark:bg-[#111] torn-edge-bottom -translate-y-4"></div>
              <div className="absolute bottom-0 left-0 w-full h-8 bg-[#f9f5ff] dark:bg-[#111] torn-edge-top translate-y-4"></div>

              <div className="max-w-3xl mx-auto space-y-12 relative z-10">
                <section id="overview" className="scroll-mt-32">
                  <h3 className="font-rubik-mono text-2xl uppercase tracking-tighter mb-6 relative inline-block">
                    <span className="relative z-10">01. Overview</span>
                    <span className="absolute bottom-1 left-0 w-full h-2 bg-[#a63300] opacity-30 -rotate-1"></span>
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed font-space-grotesk">
                    <p><span className="font-bold">1.1</span> Welcome to Suburbia Skate. This website is operated by Radical Legal Services LLC. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Suburbia Skate.</p>
                    <p><span className="font-bold">1.2</span> By visiting our site and/ or purchasing something from us, you engage in our &ldquo;Service&rdquo; and agree to be bound by the following terms and conditions.</p>
                    <p><span className="font-bold">1.3</span> Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service.</p>
                  </div>
                </section>

                <section id="store-policy" className="scroll-mt-32">
                  <h3 className="font-rubik-mono text-2xl uppercase tracking-tighter mb-6 relative inline-block">
                    <span className="relative z-10">02. Store Policy</span>
                    <span className="absolute bottom-1 left-0 w-full h-2 bg-[#556100] opacity-30 rotate-1"></span>
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed font-space-grotesk">
                    <p><span className="font-bold">2.1</span> We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted.</p>
                    <p><span className="font-bold">2.2</span> Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</p>
                  </div>
                </section>

                <section id="accounts" className="scroll-mt-32">
                  <h3 className="font-rubik-mono text-2xl uppercase tracking-tighter mb-6 relative inline-block">
                    <span className="relative z-10">03. User Accounts</span>
                    <span className="absolute bottom-1 left-0 w-full h-2 bg-[#a63300] opacity-30 -rotate-1"></span>
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed font-space-grotesk">
                    <p><span className="font-bold">3.1</span> If you create an account, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.</p>
                    <p><span className="font-bold">3.2</span> You must immediately notify Suburbia Skate of any unauthorized uses of your account or any other breaches of security.</p>
                  </div>
                </section>

                <section id="custom" className="scroll-mt-32">
                  <h3 className="font-rubik-mono text-2xl uppercase tracking-tighter mb-6 relative inline-block">
                    <span className="relative z-10">04. Custom Boards</span>
                    <span className="absolute bottom-1 left-0 w-full h-2 bg-[#556100] opacity-30 rotate-1"></span>
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed font-space-grotesk">
                    <p><span className="font-bold">4.1</span> Custom-built skateboards are final sale. We do not accept returns for custom boards unless they arrive damaged or defective.</p>
                    <p><span className="font-bold">4.2</span> You are responsible for ensuring all specifications (deck width, trucks, wheels) are correct before placing your order. We assemble based strictly on your input.</p>
                  </div>
                </section>

                <div className="pt-10 border-t-2 border-black/10">
                  <p className="font-marker text-[#2b2959]/40 dark:text-[#f9f5ff]/40 text-sm">--- End of Document ---</p>
                </div>
              </div>

              <div className="absolute bottom-10 -right-4 rotate-12 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_black] hidden lg:block z-20">
                <span className="material-symbols-outlined text-4xl text-[#b41340]" style={{ fontVariationSettings: "'FILL' 1" }}>skull</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed top-1/2 -right-6 -translate-y-1/2 rotate-90 z-0 opacity-20 pointer-events-none hidden xl:block">
        <p className="font-rubik-mono text-6xl">LEGAL_VOID</p>
      </div>

      {/* Skateboard wheel image removed as requested */}
    </div>
  );
}

