import React from 'react';
import Link from 'next/link';

export default function SitemapPage() {
  return (
    <div className="bg-[#1e1b4b] font-space-grotesk text-[#f9f5ff] selection:bg-[#a63300] selection:text-white overflow-x-hidden min-h-screen pb-10 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .noise-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.15;
            pointer-events: none;
        }
        .torn-edge {
            clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 98% 98%, 95% 94%, 92% 99%, 88% 93%, 85% 97%, 80% 92%, 75% 98%, 70% 94%, 65% 99%, 60% 93%, 55% 97%, 50% 92%, 45% 98%, 40% 94%, 35% 99%, 30% 93%, 25% 97%, 20% 92%, 15% 98%, 10% 94%, 5% 99%, 0% 95%);
        }
        .marker-dotted {
            background-image: radial-gradient(#a63300 20%, transparent 20%);
            background-position: 0 0;
            background-size: 8px 8px;
            height: 4px;
        }
      ` }} />
      <div className="absolute inset-0 noise-overlay z-[0]"></div>

      <header className="pt-32 pb-16 px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-rubik-mono text-6xl md:text-9xl text-white drop-shadow-[8px_8px_0px_#a63300] rotate-[-1deg] tracking-tight">
            SITEMAP
          </h1>
          <p className="font-marker text-[#dff759] text-2xl mt-4 rotate-[1deg] max-w-lg relative z-20">
            NAVIGATE THE CHAOS OR GET LOST IN THE GRIND.
          </p>
        </div>
        <div className="absolute top-20 right-10 opacity-20 rotate-12 scale-150 pointer-events-none">
          <span className="material-symbols-outlined text-white text-[200px]" style={{ fontSize: '200px' }}>bolt</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-40 relative z-10">
        <div className="absolute top-[20%] left-[25%] w-[40%] h-[2px] marker-dotted rotate-[-5deg] z-0 hidden lg:block opacity-60"></div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
          
          <section className="md:col-span-5 lg:col-span-4 relative group">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#a63300]/80 -rotate-2 z-20 shadow-sm"></div>
            <div className="bg-[#fcf8ef] p-8 torn-edge shadow-[10px_10px_0px_#000000] rotate-1 transition-transform group-hover:rotate-0">
              <h2 className="font-rubik-mono text-3xl text-[#2b2959] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a63300]">shopping_cart</span>
                SHOP
              </h2>
              <ul className="space-y-4 font-space-grotesk font-bold text-lg text-[#2b2959]">
                <li><Link className="hover:text-[#a63300] hover:underline transition-all" href="/shop">DECK_DROPS</Link></li>
                <li><Link className="hover:text-[#a63300] hover:underline transition-all" href="/shop">STREET_WEAR</Link></li>
                <li><Link className="hover:text-[#a63300] hover:underline transition-all" href="/shop">TRUCKS_&_TOOLS</Link></li>
                <li><Link className="hover:text-[#a63300] hover:underline transition-all" href="/shop">CLEARANCE_BIN</Link></li>
              </ul>
              <div className="mt-8 pt-4 border-t-2 border-dashed border-[#aba7e0]">
                <span className="font-marker text-[#a63300] text-xl">NEW ARRIVALS WEEKLY!</span>
              </div>
            </div>
          </section>

          <div className="md:col-span-2 hidden md:flex justify-center pt-20 relative z-10">
            <div className="bg-white p-2 pb-10 shadow-xl -rotate-12 border border-black/10 w-48 shrink-0">
              <img className="w-full grayscale contrast-125 mb-4 aspect-square object-cover" alt="Close up of a scratched skateboard deck" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZEscWImWWSB8SsuG_eNnTJcGnGacNphRUgtLNP6I3Js9cDttHtK6ZDHJyPpfh1SHL2CHJTSckr5qD1pMsgtDGqBwCl1DkaMmebkFZ2Byk2Nc_GPZCrXsAcrsrWv-kBSf2y-WML9dKLIeRHTDmeTIDTbSj2CzGHXHDvBD6Mnsnt9ebwHHQxbhwo4-lW_BzjaJlBSLOkHRPkf0mTmZtourjo5BxK1y2PeSqwAifR8yhvgnCvcf6E-XJ2IlQ9mbN1E6MXamo-nTD3k" />
              <p className="font-marker text-xs text-black text-center">SESSION_01</p>
            </div>
          </div>

          <section className="md:col-span-5 lg:col-span-6 relative group lg:mt-12">
            <div className="absolute -top-2 right-10 w-32 h-6 bg-[#a63300]/60 rotate-3 z-20"></div>
            <div className="bg-[#fcf8ef] p-10 torn-edge shadow-[10px_10px_0px_#000000] -rotate-1 transition-transform group-hover:rotate-0">
              <h2 className="font-rubik-mono text-3xl text-[#2b2959] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#556100]">build</span>
                SKATE_BUILDER
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ul className="space-y-4 font-space-grotesk font-bold text-lg text-[#2b2959]">
                  <li><Link className="hover:text-[#556100] hover:underline transition-all" href="/build">CUSTOM_DECKS</Link></li>
                  <li><Link className="hover:text-[#556100] hover:underline transition-all" href="/build">GRIP_TAPE_ART</Link></li>
                  <li><Link className="hover:text-[#556100] hover:underline transition-all" href="/build">WHEEL_CONFIG</Link></li>
                </ul>
                <div className="relative">
                  <span className="material-symbols-outlined absolute -top-10 -right-4 text-[#a63300] opacity-40 scale-[3]">grade</span>
                  <p className="text-sm font-medium leading-tight text-[#595689]">
                    OUR INTERACTIVE STUDIO LETS YOU CRAFT THE PERFECT BOARD FROM THE GROUND UP. NO STOCK PARTS.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="md:col-span-6 lg:col-span-5 relative group">
            <div className="absolute -bottom-2 left-1/4 w-28 h-7 bg-[#556100]/70 rotate-[-5deg] z-20"></div>
            <div className="bg-[#fcf8ef] p-8 torn-edge shadow-[10px_10px_0px_#000000] rotate-2 transition-transform group-hover:rotate-0">
              <h2 className="font-rubik-mono text-3xl text-[#2b2959] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a63300]">group</span>
                USER_HUB
              </h2>
              <ul className="space-y-4 font-space-grotesk font-bold text-lg text-[#2b2959]">
                <li><Link className="hover:text-[#a63300] hover:underline transition-all" href="/my-garage">MY_STASH</Link></li>
                <li><Link className="hover:text-[#a63300] hover:underline transition-all" href="/profile">SQUAD_FINDER</Link></li>
                <li><Link className="hover:text-[#a63300] hover:underline transition-all" href="/orders">UPLOAD_CLIPS</Link></li>
                <li><Link className="hover:text-[#a63300] hover:underline transition-all" href="/profile">SETTINGS</Link></li>
              </ul>
              <div className="mt-6 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#a63300]"></div>
                <div className="w-3 h-3 rounded-full bg-[#556100]"></div>
                <div className="w-3 h-3 rounded-full bg-[#705267]"></div>
              </div>
            </div>
          </section>

          <div className="md:col-span-6 lg:col-span-3 flex justify-center items-center relative z-10">
            <div className="bg-white p-2 pb-10 shadow-xl rotate-6 border border-black/10 w-56 shrink-0 relative">
              <img className="w-full grayscale-0 contrast-110 mb-4 aspect-[4/3] object-cover" alt="Graffiti mural on a concrete skatepark wall" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHZtzoUYv59uiw94uBhuFYC8JABqfYMwoiJvFV77N1VtDWxDJzjqhaV2Cq7jk7Pxl1js9skjqtRZKK_3-stAVVnFOt4rziFrVb_81YWjRF3Ed9URtVUlhEWKtr5DdHdqjpchCxqvNHVQjlcmyxyE_Fl5Xktks_PZ-07v7S8Nbi4NsdMe2Z1T9IuStEKNG7Ty96eNFiVwySkzUdVdCg5mvUp1gXH45rAxx_37nC14W9cTp9hFclGoeWq9mOhisrwdad3ra4NsGNJRg" />
              <p className="font-marker text-sm text-black text-center">LOCAL_SPOT_6</p>
              <span className="material-symbols-outlined absolute -top-4 -left-4 text-[#556100] text-4xl">star</span>
            </div>
          </div>

          <section className="md:col-span-12 lg:col-span-4 relative group">
            <div className="bg-[#fcf8ef] p-8 torn-edge shadow-[10px_10px_0px_#000000] -rotate-1 transition-transform group-hover:rotate-0">
              <h2 className="font-rubik-mono text-3xl text-[#2b2959] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#705267]">info</span>
                INFO_&_LEGAL
              </h2>
              <div className="flex flex-col gap-4 font-space-grotesk font-bold text-[#2b2959]">
                <Link className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors flex justify-between items-center" href="/privacy-policy">
                  PRIVACY_POLICY
                  <span className="material-symbols-outlined">arrow_right_alt</span>
                </Link>
                <Link className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors flex justify-between items-center" href="/shipping-returns">
                  SHIPPING_DEETS
                  <span className="material-symbols-outlined">local_shipping</span>
                </Link>
                <Link className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors flex justify-between items-center" href="/terms">
                  RETURN_RANT
                  <span className="material-symbols-outlined">undo</span>
                </Link>
              </div>
            </div>
            
            <div className="absolute -right-8 -bottom-10 opacity-50 hidden lg:block">
              <span className="material-symbols-outlined text-[#a63300] text-8xl rotate-45" style={{ fontSize: '96px' }}>electric_bolt</span>
            </div>
          </section>
        </div>
      </main>

      <div className="fixed top-1/4 left-5 opacity-10 pointer-events-none select-none z-0">
        <span className="material-symbols-outlined text-[120px]" style={{ fontSize: '120px' }}>star</span>
      </div>
      <div className="fixed bottom-1/4 right-5 opacity-10 pointer-events-none select-none z-0">
        <span className="material-symbols-outlined text-[150px] rotate-45" style={{ fontSize: '150px' }}>bolt</span>
      </div>
    </div>
  );
}
