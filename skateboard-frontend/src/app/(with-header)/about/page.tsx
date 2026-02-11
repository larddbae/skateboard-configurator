"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-brand-lavender min-h-screen relative overflow-x-hidden font-space-mono text-gray-900 leading-relaxed selection:bg-brand-orange selection:text-white">
      {/* Background Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-15 z-50 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] mix-blend-overlay"></div>
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-brand-lavender">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/crinkled-paper.png')] mix-blend-multiply"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-suburbia-lime rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-brand-orange rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
                <div className="inline-block transform -rotate-6 mb-4">
                    <span className="bg-black text-white px-4 py-1 font-marker text-xl border-2 border-white shadow-lg">EST. 2024</span>
                </div>
                <h1 className="font-display text-6xl md:text-8xl leading-[0.9] text-black tracking-tighter drop-shadow-sm">
                    ESCAPE <br/>
                    THE <br/>
                    <span className="text-brand-orange">CUL-DE-SAC</span>
                </h1>
                <p className="font-mono text-lg md:text-xl max-w-lg mx-auto md:mx-0 bg-white/50 p-4 border-l-4 border-black backdrop-blur-sm">
                    Not just a board, it&apos;s your canvas. We are reclaiming the streets, one custom deck at a time.
                </p>
                <div className="pt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                    <Link href="#story" className="group relative inline-block">
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                        <button className="relative bg-brand-orange border-2 border-black px-8 py-4 font-display text-xl uppercase tracking-widest text-black hover:bg-white transition-colors w-full md:w-auto">
                            Read Our Story
                        </button>
                    </Link>
                </div>
            </div>
            
            <div className="relative group perspective-1000">
                <div className="relative transform rotate-3 transition-transform duration-500 group-hover:rotate-0">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 rotate-1 shadow-sm z-20"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 -rotate-2 shadow-sm z-20"></div>
                    <div className="bg-white p-3 pb-12 shadow-sketch-lg border-2 border-gray-200 rotate-1">
                        <div className="w-full h-[400px] relative overflow-hidden bg-gray-200">
                            <Image 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLoOcUKBnDo5y6ejKxI99Vi54vf3VY8wJS6Iyi9eogVdaspJVFMMaUdPTsQ0ViCwC_EoEFMOVes3QyortSCb8LSeZW7PDTrb2Khiu8ZDx-xlh740SczweCep5fu9vNAlQaH0P_e4nJT5YNGMYjplK3OIGnTr7ySizQWzzeJO7dxd46FlOQxKy_miva2jvoPiNFYmSfDWFwbbTBPvYSbXG0XNn63dzaSrh_eXxQcAs5Q1mVMxnH7zSg69lbBaB-LMbSK96cXmg5bN8" 
                                alt="Skater doing a trick"
                                fill
                                className="object-cover filter grayscale contrast-125 hover:filter-none transition-all duration-500"
                            />
                        </div>
                        <div className="font-marker text-2xl text-center mt-4 text-gray-800 rotate-1">
                            Shredding Since Day 1
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-suburbia-lime rounded-full flex items-center justify-center border-4 border-black animate-bounce shadow-sketch z-30 hidden md:flex">
                     <div className="text-center font-display leading-tight text-black text-sm">
                        50K+<br/>BOARDS<br/>BUILT
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* Story Section */}
      <section id="story" className="py-24 bg-paper-cream relative border-t-4 border-black border-dashed">
         <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-7 space-y-8">
                     <h2 className="font-display text-5xl text-black mb-8 relative inline-block">
                        FROM THE GARAGE
                        <span className="absolute -bottom-2 left-0 w-full h-4 bg-brand-orange -z-10 transform -rotate-1 opacity-60"></span>
                     </h2>
                     <div className="prose prose-lg font-space-mono text-gray-800">
                        <p className="first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                            It started with a busted deck and a can of spray paint. We were tired of the same old mass-produced graphics that didn&apos;t say anything about who we were.
                        </p>
                        <p>
                            Suburbia Skate was born in a dusty garage in 2024, fueled by stale pizza and a desire to disrupt the concrete jungle. We believe every skater deserves a board that screams their identity before their wheels even hit the pavement.
                        </p>
                        <p>
                            Today, we&apos;re a collective of artists, engineers, and rebels, building the most customizable high-performance decks on the market.
                        </p>
                     </div>
                     <div className="font-marker text-3xl text-suburbia-blue transform -rotate-2 mt-8">
                        &quot;Built different, just like you.&quot;
                     </div>
                </div>
                <div className="md:col-span-5 relative flex flex-col items-center justify-center">
                    <div className="bg-white p-4 pb-16 shadow-xl transform rotate-3 w-full max-w-sm border border-gray-200">
                        <div className="bg-black w-full h-64 overflow-hidden relative group">
                            <Image 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvaLdP9BuxHEquKjZefq-UAFoG9g03QWD2fmVPG35BGtuPjWZ3ru7YieBdMhx-9AYasfzWDdFAjxiX7qmiwXZpMM5kdpihhiRJF1J8fwkta95HIxmLpXuC83X2-ttIFY6g4nLkIum5tw5awirOiHr9r7RLKZk4Ucggv0WcgCjwrNoH47cwyVt_Cm7sj3XegkQ9PZUSeieZlloqqUMzeGPKQ0N3CZ76TtySc1AbH3EH-WB7QVBa_s52_orMVHuoGB1cLnywiv5tGJo"
                                alt="Skateboard workshop"
                                fill
                                className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-brand-orange/20 mix-blend-multiply"></div>
                        </div>
                        <div className="font-marker text-xl text-center mt-6 text-black">
                            The First Workshop <br/> <span className="text-sm text-gray-500">circa 2024</span>
                        </div>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-red-500/80 rotate-2 shadow-sm z-20 mix-blend-multiply"></div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-suburbia-blue relative text-white overflow-hidden">
         {/* Top Torn Edge SVG */}
         <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 transform translate-y-[-1px]">
             <svg className="relative block w-[calc(100%+1.3px)] h-[50px] fill-paper-cream" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
                 <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                 <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
                 <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
             </svg>
         </div>

         <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
            <h2 className="text-center font-display text-5xl md:text-6xl mb-16 text-white drop-shadow-sketch-lg">
                WHAT WE STAND FOR
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: 'brush', title: 'Unfiltered Creativity', desc: 'No rules. No guidelines. Just raw artistic expression. Our customizer lets you break the mold.', shout: 'Go Wild!' },
                    { icon: 'psychology', title: 'AI-Powered Design', desc: 'The future is now. Use our AI tools to generate graphics that have literally never existed before.', shout: 'Future Tech' },
                    { icon: 'groups', title: 'Skater Owned', desc: 'For skaters, by skaters. We know what pop means, and we know durability isn\'t just a buzzword.', shout: 'Respect the grind' }
                ].map((item, idx) => (
                    <div key={idx} className={`bg-white text-black p-8 shadow-sketch border-2 border-black transform hover:-translate-y-2 transition-transform relative group ${idx === 1 ? 'md:mt-0 mt-8' : 'mt-8 md:mt-0'}`}>
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center border-2 border-black group-hover:animate-pulse">
                            <span className="material-icons text-3xl text-white">{item.icon}</span>
                        </div>
                        <h3 className="font-display text-2xl mb-4 border-b-4 border-brand-orange inline-block pb-1 leading-tight">{item.title}</h3>
                        <p className="font-mono text-sm leading-relaxed">{item.desc}</p>
                        <div className={`mt-4 font-marker text-brand-orange text-xl ${idx % 2 === 0 ? 'rotate-2' : '-rotate-1'}`}>{item.shout}</div>
                    </div>
                ))}
            </div>
         </div>

         {/* Bottom BG SVG */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[1px]">
             <svg className="relative block w-[calc(100%+1.3px)] h-[50px] fill-brand-lavender" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
                 <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                 <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
                 <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
             </svg>
         </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-brand-lavender">
         <div className="max-w-7xl mx-auto">
             <h2 className="text-center font-display text-5xl md:text-7xl mb-4 text-black uppercase">
                Meet the Crew
             </h2>
             <p className="text-center font-mono text-gray-600 mb-16 max-w-2xl mx-auto">
                The misfits and dreamers behind the scenes.
             </p>
             <div className="grid md:grid-cols-4 gap-8">
                {[
                    { name: 'Sophie', role: 'Creative Director', quote: 'Make it loud.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqQBmdJCVSkmV3McT46lR77FKBQw-RM_TWq8hib36RhF8HbHjBs402e4TOetibWm7N37BUZv_eZt1sswQgFNI2-uY0oLVPNFWrDHosgynwzew_KT0-QP4ChNSHDTM26wlq6yJjOGWrOkjKRc75GsRue-Izu2V-cWGvChF910txQLSlST2K6UbqoHxPlAROw5OFgIWDnSWV3j72sTVL3CrPM5BdoBX0zkJ-wmBsNs0ZrDTOsgZeNXHKiYcVuhdy95206I3ABG2b2xE', badge: 'FOUNDER' },
                    { name: 'Dylan', role: 'Tech Lead', quote: 'Code & Concrete.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwMoWiuM0hax6drTiKyr09UP7aGs1sr-NeFR05rH5k7gKOdbe1gZcVeQ4R1hF-rvFXk3yvZgRa6FgdYkH0dI-r-P8yYFo1KZZzacXGesv-TJNCuH0zDV_v01flF1N7XX9qUv0Mcoxjl3BNsDQhJ3_BmAkfLtHE1xxq-12vM-31dRpnaaqJXSw68-IB4rOxCuUphDf9XdvWcADIGtQpYWS4X_ZvgL2dCJbRVK-ycPZb8NGtTlUbSxJpRGGMeO75fyjYgdK8GftRs2I' },
                    { name: 'Carter', role: 'Pro Rider', quote: 'Always rolling.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIrQLLl8MMbP7QQxucqseyDuQ8RWW4uBUDTgcgTmgn8LCpu-EcA_n07dKWDuAtOGN3XzdSa4uK5S-JQoqKxw9EOExa5AcoVub65O8lLyyqwbQRhNbzQAA2n7vTZtNRwGgf9F_X1sumw3jKYACQ9fsZx_8dN6tBr-Dv8i4BTPbTPxZjtKFTglWxMqhlhp9n3ZzICazoAqEtIQ0wyXcUjn6Oo2BEY-bDdMBhKsqw0V9CM251EQrG-hMAcRhBpq_1mgYaqvecvNrn41c' },
                    { name: 'Jordan', role: 'Operations', quote: 'Keeping it real.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGJMa-RnXyWWE7RVET7pvNJANGvwKwo1K2nB2vYyinlHDt3NiITm9g7_afpv8hC4QfFmSvaMkdLcIBPwQBmzKQ4lKsmV0A18jBxWP95M9eS5F7lJc0ueAApCAnGkVdU6fZ5lKN8-AkNsPhwDdKJTrpdrgM1_8BnJ0RdNA6n-zQhTOC5lGa02aVb4s3G7LCZTAgHoe4nXkLE6qtzeD5khgtbszOw8HNsIQHTMd98-xnQ-I5D-GoYXHs30dh6Q52buG-1RLxeM3BMpM' }
                ].map((member, i) => (
                    <div key={member.name} className={`flex flex-col items-center ${i % 2 !== 0 ? 'md:mt-12 mt-0' : ''}`}>
                        <div className="relative w-48 h-48 mb-6 group">
                            <div className="absolute inset-0 bg-suburbia-blue rounded-full transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
                            <div className="relative w-full h-full rounded-full border-4 border-black overflow-hidden bg-gray-200">
                                <Image
                                    src={member.img}
                                    alt={`Team member ${member.name}`}
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                            {member.badge && (
                                <span className="absolute -right-2 top-0 bg-brand-orange text-white text-xs px-2 py-1 font-bold border border-black rotate-12 z-10">{member.badge}</span>
                            )}
                        </div>
                        <h3 className="font-display text-2xl">{member.name}</h3>
                        <p className="font-mono text-sm text-center text-gray-600 mb-2">{member.role}</p>
                        <div className={`font-marker text-suburbia-blue text-sm ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}>
                            &quot;{member.quote}&quot;
                        </div>
                    </div>
                ))}
             </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-paper-dark relative overflow-hidden text-center px-6">
         <div className="absolute inset-0 bg-black/80 z-0">
            <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNRaGSbhW9poh8Gj0sDlZJG2NgrVdvZ_Zx6dD4rUEq35VHZqEDfYgL8GirkUjffGgTu7FdlXY3IgkSga_Iz_lKznlheFY_WnMnqMtcqBsL81s9sZ0ejjKUUidKvA-DIlDzP5pxN9Zrw3B4TEVIUW4e-4Lztjk1dgX_mdQLmy04-mBxdGD5tBPHi74WVxSUOJ6nGVXw0ilFG3EEf--1tXoFz0KpjCmX8UJQ43egfesW9PPFcrSeFWSsj7oZywbw05CMT_qeqd81fzs"
                alt="Concrete texture"
                fill
                className="object-cover opacity-20"
            />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h2 className="font-display text-5xl md:text-8xl text-white leading-none">
                READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">RIDE?</span>
            </h2>
            <p className="font-mono text-gray-300 text-xl md:text-2xl">
                Stop pushing wood that looks like everyone else&apos;s.
            </p>
            <div className="pt-8">
                <Link href="/shop" className="relative group inline-block">
                    <div className="absolute top-2 left-2 w-full h-full bg-black rounded-sm group-hover:top-1 group-hover:left-1 transition-all duration-200"></div>
                    <button className="relative bg-brand-orange px-12 py-6 border-4 border-black rounded-sm transform group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-200 flex items-center gap-4">
                        <span className="font-display text-2xl md:text-4xl uppercase tracking-wider text-black">Start Building</span>
                        <span className="material-icons text-4xl text-black">arrow_forward</span>
                    </button>
                    <div className="absolute -top-3 left-4 w-16 h-6 bg-white/30 rotate-3 z-20"></div>
                    <div className="absolute -bottom-3 right-4 w-16 h-6 bg-white/30 -rotate-2 z-20"></div>
                </Link>
            </div>
         </div>
      </section>

    </div>
  );
}
