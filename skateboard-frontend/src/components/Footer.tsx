"use client";

import Link from "next/link";

export function Footer() {
  const shopLinks = [
    { href: "/shop/decks", label: "Decks" },
    { href: "/shop/trucks", label: "Trucks" },
    { href: "/shop/wheels", label: "Wheels" },
    { href: "/shop/apparel", label: "Apparel" },
    { href: "/shop/accessories", label: "Accessories" },
    { href: "/build", label: "Build Custom" },
  ];

  const supportLinks = [
    { href: "/shipping-returns", label: "Shipping & Returns" },
    { href: "/faq", label: "FAQ" },
    { href: "/orders", label: "Track Order" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="w-full bg-background-dark text-white relative border-t-8 border-primary overflow-hidden">
      {/* Graffiti pattern overlay */}
      <div className="absolute inset-0 bg-graffiti-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group cursor-pointer w-fit">
              <div className="relative">
                <span className="material-icons text-zine-blue text-4xl absolute -top-5 -left-3 transform -rotate-12 z-10">
                  skateboarding
                </span>
                <div className="font-display text-3xl leading-none text-white drop-shadow-[2px_2px_0_rgba(255,107,53,1)]">
                  SUBURBIA<br />
                  <span className="text-2xl ml-6">SKATE</span>
                </div>
              </div>
            </Link>
            <p className="font-mono text-gray-400 text-sm leading-relaxed">
              Crafting the sickest decks since 2024. Not just a board, it&apos;s your canvas. 
              Escape the cul-de-sac and shred the world.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 flex items-center justify-center rounded-none border border-zinc-700 hover:bg-primary hover:text-black hover:border-black transition-all duration-300"
              >
                <span className="material-icons text-lg">photo_camera</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 flex items-center justify-center rounded-none border border-zinc-700 hover:bg-primary hover:text-black hover:border-black transition-all duration-300"
              >
                <span className="material-icons text-lg">alternate_email</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 flex items-center justify-center rounded-none border border-zinc-700 hover:bg-primary hover:text-black hover:border-black transition-all duration-300"
              >
                <span className="material-icons text-lg">play_arrow</span>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-display text-2xl mb-6 text-primary tracking-wide border-b-2 border-zinc-700 pb-2 inline-block">
              SHOP
            </h3>
            <ul className="space-y-3 font-mono text-sm uppercase tracking-wide">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:translate-x-2 transition-transform block hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-display text-2xl mb-6 text-primary tracking-wide border-b-2 border-zinc-700 pb-2 inline-block">
              SUPPORT
            </h3>
            <ul className="space-y-3 font-mono text-sm uppercase tracking-wide">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary hover:translate-x-2 transition-transform block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-display text-2xl mb-6 text-primary tracking-wide border-b-2 border-zinc-700 pb-2 inline-block">
              THE DROP
            </h3>
            <p className="font-mono text-sm text-gray-400 mb-4">
              Get notified about limited edition drops and zine releases.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full bg-zinc-800 border-2 border-zinc-700 focus:border-primary focus:ring-0 text-white font-mono py-3 px-4 placeholder-gray-500 outline-none"
                  style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)" }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-zine-blue text-white font-display text-lg py-3 hover:bg-white hover:text-black transition-colors border-2 border-transparent hover:border-zine-blue transform hover:-rotate-1 shadow-[4px_4px_0_rgba(255,255,255,0.2)]"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-xs font-mono text-gray-500">
            © 2024 SUBURBIA SKATE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-6 text-xs font-mono text-gray-500 uppercase">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
          {/* Payment Icons */}
          <div className="flex items-center space-x-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="material-icons text-2xl text-white">credit_card</span>
            <span className="material-icons text-2xl text-white">payments</span>
            <span className="material-icons text-2xl text-white">account_balance</span>
          </div>
        </div>

        {/* SK8 Watermark */}
        <div className="absolute bottom-0 right-10 opacity-10 pointer-events-none transform translate-y-1/3 hidden lg:block">
          <span className="font-display text-[150px] text-white leading-none">SK8</span>
        </div>
      </div>
    </footer>
  );
}
