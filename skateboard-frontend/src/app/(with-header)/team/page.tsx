"use client";

import Link from "next/link";
import Image from "next/image";

export default function TeamPage() {
  return (
    <div className="bg-team-dark font-space-grotesk antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-noise mix-blend-overlay"></div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 gap-16 relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[500px] flex items-center p-6 md:p-12">
          {/* Hero Background Image */}
          <div className="absolute inset-0 m-4 md:m-0 transform rotate-1 border-4 border-white shadow-hard bg-cover bg-center overflow-hidden" style={{ borderRadius: "2px" }}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIOQ3rWwrCFaW2yc0ENSo6tNYEM_V-tvUDB8HThgtjp0OJlYlRR6BNBAzpWnw3do0B9lm8tGPIheR_v_5E6JU6Qf_Rg8e3nd9e-NZScGQKegAF6SEcrPboV2ktilgQbelXIyz9amK2dYxUL--7ZLz5F6iYcBVB3YoAAYcDf46w0P4ZupGyskbdMueBdc17CCadNP-Bh8KRYm--IEwbhv31VasZlQP7JEvcgc6BhfDvcCm268TfRWnUnyM5W-4qPkxNdQ8ocK1NWZE')" }}></div>
            <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-team-dark via-transparent to-transparent opacity-90"></div>
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto text-center md:text-left">
            <div className="inline-block transform -rotate-3 mb-6">
              <div className="bg-white border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-marker text-black text-sm md:text-base">EST. 2024 // PURE CHAOS</span>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-rubik-mono text-white leading-[0.8] tracking-tight mb-8 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]">
              THE <br />
              <span className="text-primary text-stroke relative inline-block">
                CREW
                <span className="absolute -z-10 -top-4 -left-4 text-purple-600 opacity-60 transform scale-150 rotate-12 whitespace-nowrap font-marker text-4xl select-none pointer-events-none" style={{ textShadow: "none", WebkitTextStroke: "0" }}>/////////////</span>
              </span>
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="bg-black/80 backdrop-blur-sm p-4 md:p-6 border-2 border-white transform rotate-1 max-w-lg shadow-[8px_8px_0px_0px_#a855f7]">
                <p className="text-white text-lg md:text-xl font-marker leading-relaxed">
                  Raw talent on concrete. <br />
                  <span className="text-primary">NO RULES. JUST RIDE.</span>
                </p>
              </div>
              
              <button className="group relative inline-block focus:outline-none focus:ring-0">
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-y-2.5 group-hover:translate-x-2.5"></div>
                <div className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-black text-black transition-all duration-200 bg-primary border-2 border-black font-rubik-mono uppercase tracking-widest clip-slant hover:-translate-y-1">
                  Meet the Team
                  <span className="material-symbols-outlined ml-2 font-black">arrow_downward</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ROSTER SECTION */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between border-b-4 border-black pb-4 relative">
            <div className="absolute bottom-[-14px] left-0 w-full h-4 bg-team-dark torn-paper-top z-10"></div>
            <h2 className="text-4xl md:text-5xl font-rubik-mono text-white uppercase tracking-tight transform -rotate-1 drop-shadow-[3px_3px_0px_#a855f7]">
              Active Roster
            </h2>
            <div className="mt-4 md:mt-0 flex gap-4 font-marker">
              <button className="px-4 py-2 text-black bg-white border-2 border-black shadow-hard hover:shadow-hard-hover transition-all transform hover:-translate-y-1 rotate-1">ALL</button>
              <button className="px-4 py-2 text-white hover:text-primary transition-colors transform hover:-rotate-2">PRO</button>
              <button className="px-4 py-2 text-white hover:text-primary transition-colors transform hover:rotate-2">AM</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 px-4">
            {/* Skater 1 */}
            <div className="group relative cursor-pointer" style={{ "--rotation": "-2deg" } as React.CSSProperties}>
              <div className="aspect-[3/4] relative z-10">
                <div className="absolute inset-0 photo-border bg-gray-800 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] group-hover:rotate-0">
                  <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMragqFc8kMZIOMYovn6XAJhtO-VDb82xbrOFST3ye0ZDM5iGBcvZ7E_3rua3K6__qK9GiR5N5pC0jdlkjxwbD8bIYHEam6d7Ii3lFga0uEt7zZXW5lWXvJo-EK3J4Z-6IlfMnF2_bbmlLnMglB_OV8svH7_dpVyNEyKeL-IuLA6nY6ugSpUa4i-x-N7kjE3hczWUDsYtxToL5IRpDbIXFB3tHwsTbqlekT-6NPmLe-p6eEdTYIrEYLuhIfzDtWpfPCoNE2ilgKiM')" }}></div>
                </div>
                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[120px] drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] animate-bounce">skateboarding</span>
                </div>
                <div className="absolute -top-4 -right-4 z-30 transform rotate-12">
                  <span className="px-3 py-1 bg-team-purple border-2 border-black text-white font-rubik-mono text-xs uppercase shadow-hard">Goofy</span>
                </div>
              </div>
              <div className="absolute bottom-8 -left-4 z-40 transform -rotate-3 transition-transform group-hover:scale-105">
                <div className="bg-primary px-4 py-2 border-2 border-black shadow-hard">
                  <h3 className="text-xl font-rubik-mono text-black uppercase leading-none">Leo 'Ghost' <br /><span className="text-white text-stroke-sm">Carter</span></h3>
                </div>
              </div>
            </div>

            {/* Skater 2 */}
            <div className="group relative cursor-pointer mt-8 md:mt-0" style={{ "--rotation": "3deg" } as React.CSSProperties}>
              <div className="aspect-[3/4] relative z-10">
                <div className="absolute inset-0 photo-border bg-gray-800 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] group-hover:rotate-0">
                  <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkYlx7ifs48FLLy9yFkzWYHISkURphfIUMxhuTzlIZHw34mnlir5JaUX65E-kKNEl9mk6om8aiwqYIB0akQAKCCbB-sjrbtH2ZiAWedCaotK9q7-R3gqVhdPGCcKBTJ7z7JUuPv9-miyeOJZW4Kv0o6IbtS60rg-BOa40DTDo7Lu-oThhABQEMMgE2ydrXgXyKuEN8tVmD4smE5P4SeR9BkTrnVUYSpo4nqgT98jrNOP0uqmyvz7MTmYUm9PwD2mtvPhZTBnwBuig')" }}></div>
                </div>
                <div className="absolute -top-4 -right-4 z-30 transform -rotate-6">
                  <span className="px-3 py-1 bg-white border-2 border-black text-black font-rubik-mono text-xs uppercase shadow-hard">Regular</span>
                </div>
              </div>
              <div className="absolute bottom-8 -right-4 z-40 transform rotate-2 transition-transform group-hover:scale-105">
                <div className="bg-primary px-4 py-2 border-2 border-black shadow-hard text-right">
                  <h3 className="text-xl font-rubik-mono text-black uppercase leading-none">Maya <br /><span className="text-white text-stroke-sm">Hyland</span></h3>
                </div>
              </div>
            </div>

            {/* Skater 3 */}
            <div className="group relative cursor-pointer" style={{ "--rotation": "-1deg" } as React.CSSProperties}>
              <div className="aspect-[3/4] relative z-10">
                <div className="absolute inset-0 photo-border bg-gray-800 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] group-hover:rotate-0">
                  <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDo-kfALZGf0CyIwR2Lpymv2WLpQa-tIlqQz5lqpYvFbmvGnooHNq9YHDP8_EsmTjinGWlqP9iUz4CGqCoUM_SUc1Ks-y6-8c469QG5gWYvbWMUjoWsSwUm8-vyzsCt_Ju3TzsJnD4wb_UO4I6HQSqKawB_D3jfEktWnV4gvLXXxu5Kz2Rjtkg-Aj6maFHvsU4cf7ESf9u599lDJfN4pFkVlx-wGYGrbbcGUlo49brOQOu-YXLYRQF5CJw3GDdzmaY7t6u-u9YcFhA')" }}></div>
                </div>
                <div className="absolute -top-4 -right-4 z-30 transform rotate-6">
                  <span className="px-3 py-1 bg-team-purple border-2 border-black text-white font-rubik-mono text-xs uppercase shadow-hard">Goofy</span>
                </div>
              </div>
              <div className="absolute bottom-8 -left-2 z-40 transform -rotate-1 transition-transform group-hover:scale-105">
                <div className="bg-primary px-4 py-2 border-2 border-black shadow-hard">
                  <h3 className="text-xl font-rubik-mono text-black uppercase leading-none">Jaxson <br /><span className="text-white text-stroke-sm">Reed</span></h3>
                </div>
              </div>
            </div>

            {/* Skater 4 */}
            <div className="group relative cursor-pointer mt-8 md:mt-0" style={{ "--rotation": "4deg" } as React.CSSProperties}>
              <div className="aspect-[3/4] relative z-10">
                <div className="absolute inset-0 photo-border bg-gray-800 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] group-hover:rotate-0">
                  <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHw8zVfOZgn0EQJ0G11ppvy5csyb_QE3B61Nqnb4Y2r6wwxfFC02XP8FiZHEKosnLYcz9EfGp9jRNziP9wLArekdICpeww5yYgyxCHtrO867CBlQGbVBPzLlUEEDIWjjS3fpvXJ8_TBSr5HqwJRiPGTBm5QOKGSizZjmYIhNRb9gf92vBGgBdkVHAHn74z6MWRTgnCbKjP0iW7_mcgQdn745EL12qW_OaW6NUyRxCMF-Z-7Ny-Ot7Iy0nsw6DMmI9A44W7ldQm2rk')" }}></div>
                </div>
                <div className="absolute -top-4 -right-4 z-30 transform -rotate-3">
                  <span className="px-3 py-1 bg-white border-2 border-black text-black font-rubik-mono text-xs uppercase shadow-hard">Regular</span>
                </div>
              </div>
              <div className="absolute bottom-8 -right-2 z-40 transform rotate-3 transition-transform group-hover:scale-105">
                <div className="bg-primary px-4 py-2 border-2 border-black shadow-hard text-right">
                  <h3 className="text-xl font-rubik-mono text-black uppercase leading-none">Sofia <br /><span className="text-white text-stroke-sm">Mendez</span></h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEOS SECTION */}
        <section className="py-12 relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-team-purple/20 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-rubik-mono text-white uppercase tracking-tight text-stroke-sm drop-shadow-[2px_2px_0px_#ff6b35]">Latest Parts</h2>
            <Link href="#" className="text-primary hover:text-white text-sm font-rubik-mono uppercase tracking-wider flex items-center gap-2 border-b-2 border-primary hover:border-white transition-colors pb-1">
              View All Videos <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory px-2">
            
            {/* Video 1 */}
            <div className="min-w-[300px] md:min-w-[450px] snap-center group cursor-pointer relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-200/80 z-20 transform rotate-1 shadow-sm"></div>
              <div className="relative aspect-video bg-black border-4 border-white shadow-hard mb-4 transform group-hover:-rotate-1 transition-transform">
                <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDY78GgvavRXe2Wkp0HYzDJP5mf67EVPSw0wFLGJPI7pUCeuRvn6sqTNNrqB5oW33rx95ODAjl9igOeYWv9_m2B66C01dzJK38U98d69R4wCyl3Wgf99w3tpQ8LMOvMwlxEbgKTS8dOCQ8zJyEAjVF-zjFWK-u9PIuyywx18-EzV3NlmVuhMNXsQVXDvi1VYBChwOWneJUs_xC8PspTPjaAhnfmcIxWrM6Wup4iz3gv6xg2raH_mO753KUJoTe6ssqQRvEhMZZaQ8M')" }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary border-2 border-black rounded-full flex items-center justify-center shadow-hard group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-black text-3xl">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black text-white font-mono text-xs border border-white">12:45</div>
              </div>
              <h3 className="text-white font-rubik-mono text-xl uppercase leading-tight group-hover:text-primary transition-colors">Suburbia Tour: Tokyo Nights</h3>
              <p className="text-gray-400 font-marker text-sm mt-1 transform -rotate-1">Full Team • 2 Weeks ago</p>
            </div>

            {/* Video 2 */}
            <div className="min-w-[300px] md:min-w-[450px] snap-center group cursor-pointer relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-200/80 z-20 transform -rotate-2 shadow-sm"></div>
              <div className="relative aspect-video bg-black border-4 border-white shadow-hard mb-4 transform group-hover:rotate-1 transition-transform">
                <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXkk2ySYlVrjPAZL-m8ClGw_2IAGq9Sl-PrsnA6qaRWpXutORB20LN_opQS9QJErEyyNrt1LG3TCW1lSY29nVXhZWtiowf4YMP4aGLPz7xv1ak60JMQU5rmlxCHYMuLDjJ5CnK6vxRhbaxoBtUnba3PRWj4FPRZ4zmde4D4uY3JQfb6dJgYnAjDNJwCfLe4OcQmvOY6jc3_LAb_GBLJbiNb2qDCNl3BQHLNdca0mlZi9h5Mgco7jN9sLshlqtzhsWrctmWwUqKf2U')" }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary border-2 border-black rounded-full flex items-center justify-center shadow-hard group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-black text-3xl">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black text-white font-mono text-xs border border-white">04:20</div>
              </div>
              <h3 className="text-white font-rubik-mono text-xl uppercase leading-tight group-hover:text-primary transition-colors">Maya Hyland: Welcome</h3>
              <p className="text-gray-400 font-marker text-sm mt-1 transform rotate-1">Maya Hyland • 1 Month ago</p>
            </div>

            {/* Video 3 */}
            <div className="min-w-[300px] md:min-w-[450px] snap-center group cursor-pointer relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-200/80 z-20 transform rotate-0 shadow-sm"></div>
              <div className="relative aspect-video bg-black border-4 border-white shadow-hard mb-4 transform group-hover:-rotate-1 transition-transform">
                <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDoSQ4gL2cSkFsaYW1b7jkUo1pubVyUG7f-c2jcY4zN7JGsY5I9-isuWqJLw9jcwxgI7I3YrGx-RTtZijGJTOs7Tu0j62efgr49VqudsR3B0RWpMuZ79CD1vCi3TyobE2UsizjvpGcLbD_WH8UZVyFkd4Qeds4JUIrieibuL1449HWhEYETJ33otyAttQuLcyJAk4eodCOKdfT3EVa4-TBZbK86HrIZm7od3hMUGmh8jmGRkz3qbX_VoJiyBJ4Ubmir5BFcVzJjyUc')" }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary border-2 border-black rounded-full flex items-center justify-center shadow-hard group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-black text-3xl">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black text-white font-mono text-xs border border-white">45:00</div>
              </div>
              <h3 className="text-white font-rubik-mono text-xl uppercase leading-tight group-hover:text-primary transition-colors">Concrete Jungle: Full Length</h3>
              <p className="text-gray-400 font-marker text-sm mt-1 transform -rotate-1">Full Feature • 3 Months ago</p>
            </div>

          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="relative rounded-none border-4 border-black p-8 md:p-12 text-center overflow-hidden bg-primary mx-4 rotate-1 shadow-hard">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl mix-blend-multiply"></div>
          
          <h2 className="text-4xl md:text-6xl font-rubik-mono text-black uppercase mb-4 relative z-10 transform -rotate-1">
            Don't Miss the Next Drop
          </h2>
          <p className="text-black font-marker text-xl mb-8 max-w-lg mx-auto relative z-10">
            Sign up for exclusive access to limited edition pro models and video premieres.
          </p>
          
          <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4 relative z-10">
            <input 
              className="flex-1 bg-white border-2 border-black px-4 py-3 text-black font-bold placeholder:text-gray-500 focus:shadow-hard outline-none transform rotate-1" 
              placeholder="ENTER YOUR EMAIL" 
              type="email" 
            />
            <button 
              className="bg-black hover:bg-gray-900 text-white font-rubik-mono px-8 py-3 uppercase transition-all shadow-hard hover:shadow-hard-hover transform -rotate-1 hover:rotate-0" 
              type="button"
            >
              Join
            </button>
          </form>
        </section>

      </main>
    </div>
  );
}
