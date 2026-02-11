"use client";

import Link from "next/link";
import Image from "next/image";

export default function ShippingReturnsPage() {
  return (
    <div className="bg-suburbia-pink min-h-screen relative overflow-hidden font-space-mono text-gray-900 leading-relaxed">
      {/* Background Noise & Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply"></div>
      
      {/* Background Big Text */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display text-black opacity-[0.03] pointer-events-none whitespace-nowrap z-0 rotate-12 select-none">
        SUBURBIA
      </div>

      <main className="relative z-10 pt-12 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-20 relative">
          <h1 className="text-5xl md:text-8xl font-display text-black mb-4 drop-shadow-sketch-lg">
            SHIPPING &<br/><span className="text-brand-orange">RETURNS</span>
          </h1>
          <div className="absolute -top-10 right-10 md:right-20 animate-bounce hidden md:block rotate-12">
             <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACtbtBJYCQmcp1NJbvLsJEINVmm5r_tE7GXwW_XmlQOPaL7BpNOLCDF57DFMAmEwksoYrDNs4acU4x7sJt7LP9cd3v9-1NzzwdDwWZa_JvFChGcohCFbwk6b5Rm2xbhRCf-qgybPtDN2UVr4LkDeQWX7KJLLLO-ss1lfg81XDbkt7PbU6JGX7tBuYfL3uAcr10UhJ6t56ioYvGpVCnHkkmZo5t0YqMRxUo9mVaKi357PKtwjgvdPJvEFLutWs2pLfsT8at5T8GrTE" 
                alt="Skateboard Character" 
                width={100} 
                height={100}
                className="object-contain"
             />
          </div>
          <p className="font-marker text-xl md:text-2xl text-black -rotate-2 inline-block bg-suburbia-lime px-4 py-2 border-2 border-black shadow-sketch transform hover:rotate-0 transition-transform cursor-default">
             Fast shipping. Easy returns. No drama.
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Shipping Section */}
          <section className="bg-paper-cream text-black p-8 shadow-sketch border-2 border-black relative -rotate-1 group hover:rotate-0 transition-transform duration-300">
            {/* Tape Effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 transform rotate-2 shadow-sm z-10"></div>
            
            <div className="flex items-center gap-4 mb-6 border-b-2 border-black pb-4 border-dashed">
              <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center border-2 border-black shadow-sketch-white">
                <span className="material-icons text-white text-2xl">local_shipping</span>
              </div>
              <h2 className="text-3xl font-display uppercase">Shipping</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-4 font-display">Domestic Rates (US)</h3>
                <table className="w-full text-left border-collapse font-space-mono">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="py-2 font-bold uppercase text-sm">Service</th>
                      <th className="py-2 font-bold uppercase text-sm">Time</th>
                      <th className="py-2 font-bold uppercase text-sm">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-300">
                      <td className="py-2">Standard Ground</td>
                      <td className="py-2">3-5 Days</td>
                      <td className="py-2 text-green-700 font-bold">Free ($75+)</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2">Expedited</td>
                      <td className="py-2">2 Days</td>
                      <td className="py-2">$15.00</td>
                    </tr>
                    <tr>
                      <td className="py-2">Overnight</td>
                      <td className="py-2">Next Day</td>
                      <td className="py-2">$35.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-100 p-4 border-2 border-black border-dashed rounded relative mt-8">
                <span className="absolute -top-3 -right-3 bg-suburbia-lime px-2 py-0.5 text-xs font-bold border-2 border-black shadow-sm font-marker transform rotate-3">NOTE!</span>
                <p className="text-sm">
                  <span className="font-bold">International homies:</span> Currently shipping to CA, UK, EU, and AU. Custom fees are on you (sorry, we don&apos;t make the rules).
                </p>
              </div>
              
              <div className="flex justify-center mt-6">
                 <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_nErbSi5GHO2fuekjOC44ZYKmoX-dsfyz7vrho0z5Hj5pGHKbhQOtPNQnTqEq4ybS6ZjZ1hm5YPhKpVe-pW1CC-QE_x3infqFkTDCYZhhk5orIapuzgsuj4qunpL_OPw3naDZXZLw__rAHuU4hoCYy1jmlMUcmxE5C7OA1HaWcfX_QHgW9f5QgiD9F-N2-h7bsTdyg9wsElkffHEdbeH6tLEjefnkqy8Xko5e6YAb5jPVrksDYcQj3zFm7KVtsJZiJhGcAHkzh-k" 
                    alt="Delivery Van Doodle" 
                    width={150} 
                    height={100}
                    className="object-contain opacity-80 mix-blend-multiply grayscale contrast-150"
                 />
              </div>
            </div>
          </section>

          {/* Returns Section */}
          <section className="bg-paper-cream text-black p-8 shadow-sketch border-2 border-black relative rotate-2 group hover:rotate-0 transition-transform duration-300 mt-12 md:mt-0">
             {/* Tape Effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-red-200/80 transform -rotate-1 shadow-sm z-10"></div>
            
            <div className="flex items-center gap-4 mb-6 border-b-2 border-black pb-4 border-dashed">
              <div className="w-12 h-12 bg-suburbia-lime rounded-full flex items-center justify-center border-2 border-black shadow-sketch-white">
                <span className="material-icons text-black text-2xl">assignment_return</span>
              </div>
              <h2 className="text-3xl font-display uppercase">Returns</h2>
            </div>
            
            <div className="space-y-6">
              <div className="prose prose-sm font-space-mono text-black">
                <p className="font-bold text-lg mb-2">Didn&apos;t vibe with the setup? It happens.</p>
                <p>You&apos;ve got <span className="bg-brand-orange text-white px-1">30 days</span> from delivery to send it back. Item must be unskated, unused, and in original packaging. If you gripped it, you own it.</p>
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="font-bold font-display text-lg border-b-2 border-black inline-block">The Process</h3>
                
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1 font-bold">1</div>
                  <p className="text-sm">Email <a className="underline hover:text-brand-orange font-bold" href="mailto:help@suburbiaskate.com">help@suburbiaskate.com</a> with your Order #.</p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1 font-bold">2</div>
                  <p className="text-sm">Print the label we send you. Slap it on the box.</p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1 font-bold">3</div>
                  <p className="text-sm">Drop it off. Once we inspect it, refunds hit in 3-5 days.</p>
                </div>
              </div>

              <div className="bg-brand-purple p-4 border-2 border-black transform rotate-1 mt-8 text-white shadow-sketch">
                <h4 className="font-display text-lg uppercase mb-1">Exchange?</h4>
                <p className="text-xs font-mono">Need a different size? Start a return and place a new order. It&apos;s faster for everyone.</p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <h3 className="font-marker text-3xl md:text-4xl mb-8 text-black transform -rotate-1">STILL CONFUSED?</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/faq" className="inline-flex items-center gap-2 bg-white border-2 border-black px-6 py-3 shadow-sketch hover:bg-suburbia-lime transition-colors font-bold uppercase font-display text-sm tracking-wide text-black group transform hover:-translate-y-1">
               <span className="material-icons group-hover:rotate-12 transition-transform">help_outline</span>
               Read Full FAQ
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-black text-white border-2 border-transparent px-6 py-3 shadow-sketch hover:bg-gray-800 transition-colors font-bold uppercase font-display text-sm tracking-wide transform hover:-translate-y-1">
               <span className="material-icons">mail</span>
               Contact Support
            </Link>
          </div>
        </section>

      </main>

      {/* Floating Free Shipping Badge */}
      <div className="fixed bottom-10 left-10 z-20 hidden lg:block pointer-events-none">
        <div className="bg-suburbia-lime w-28 h-28 rounded-full flex items-center justify-center border-2 border-black shadow-sketch animate-pulse">
            <span className="font-display text-center leading-none text-xs transform -rotate-12 text-black">
                FREE<br/>SHIPPING<br/>OVER $75
            </span>
        </div>
      </div>

    </div>
  );
}
