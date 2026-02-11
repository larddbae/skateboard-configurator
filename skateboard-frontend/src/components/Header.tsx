"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { items, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/build", label: "Build", highlight: true },
    { href: "/team", label: "Team" },
    { href: "/about", label: "About" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="relative z-50 w-full bg-background-light dark:bg-zinc-900 border-b-4 border-black dark:border-white transition-colors duration-300">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-paper-texture pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center group cursor-pointer">
            <div className="relative transform group-hover:rotate-3 transition-transform duration-300">
              <div className="relative">
                <span className="material-icons text-zine-blue dark:text-blue-400 text-5xl absolute -top-6 -left-4 transform -rotate-12 z-10 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  skateboarding
                </span>
                <div className="font-display text-3xl md:text-4xl leading-none text-black dark:text-white drop-shadow-[3px_3px_0_rgba(255,107,53,1)]">
                  SUBURBIA<br />
                  <span className="text-2xl md:text-3xl ml-8">SKATE</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-xl uppercase tracking-wider transition-all transform hover:-translate-y-1 relative group ${
                  link.highlight 
                    ? "text-primary hover:scale-110" 
                    : isActiveLink(link.href)
                      ? "text-primary"
                      : "hover:text-primary dark:hover:text-primary"
                }`}
              >
                {link.label}
                {link.highlight ? (
                  <span className="absolute -z-10 -bottom-1 -right-1 w-full h-full bg-black dark:bg-white skew-x-6 group-hover:skew-x-0 transition-transform" />
                ) : (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left skew-x-12" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side - Search, Cart, User */}
          <div className="flex items-center space-x-6">
            {/* Search Button */}
            <button className="text-black dark:text-white hover:text-primary transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
              <span className="material-icons text-3xl">search</span>
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative group cursor-pointer zine-rotate focus:outline-none"
            >
              <span className="material-icons text-3xl text-black dark:text-white group-hover:text-primary transition-colors">
                shopping_bag
              </span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold font-display px-2 py-1 rounded-none border-2 border-black dark:border-white shadow-sketch">
                  {items.length}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isLoading ? (
              <div className="h-10 w-10 rounded-full bg-zinc-700 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="relative group" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 bg-primary border-2 border-black dark:border-white rounded-full overflow-hidden shadow-sketch dark:shadow-sketch-white flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  <span className="hidden lg:block font-display text-sm bg-secondary text-white px-3 py-1 border-2 border-black -ml-4 z-10 transform rotate-3">
                    {user.name.split(" ")[0].toUpperCase()}
                  </span>
                  <span className="material-icons text-black dark:text-white">expand_more</span>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute right-0 mt-4 w-56 transform transition-transform origin-top-right duration-200 z-50 ${
                  isMenuOpen ? "scale-100" : "scale-0"
                }`}>
                  <div className="bg-[#fdfbf7] dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-zinc-600 shadow-sketch-lg torn-paper p-1 pt-4 pb-6">
                    <div className="flex flex-col space-y-2 px-4">
                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 hover:text-primary transition-colors font-bold font-mono text-sm py-2 border-b-2 border-dotted border-gray-300 dark:border-zinc-600"
                      >
                        <span className="material-icons text-sm">person</span>
                        <span>PROFILE</span>
                      </Link>
                      <Link
                        href="/my-garage"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 hover:text-primary transition-colors font-bold font-mono text-sm py-2 border-b-2 border-dotted border-gray-300 dark:border-zinc-600"
                      >
                        <span className="material-icons text-sm">construction</span>
                        <span>MY GARAGE</span>
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 hover:text-primary transition-colors font-bold font-mono text-sm py-2 border-b-2 border-dotted border-gray-300 dark:border-zinc-600"
                      >
                        <span className="material-icons text-sm">receipt_long</span>
                        <span>MY ORDERS</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 hover:text-red-600 transition-colors font-bold font-mono text-sm py-2"
                      >
                        <span className="material-icons text-sm">logout</span>
                        <span>LOGOUT</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="font-display text-sm uppercase tracking-wider hover:text-primary transition-colors hidden sm:block"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary text-white font-display text-sm uppercase px-4 py-2 border-2 border-black shadow-sketch hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-black dark:text-white"
            >
              <span className="material-icons text-3xl">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black dark:border-white py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-display text-xl uppercase tracking-wider px-4 py-2 ${
                    link.highlight 
                      ? "text-primary" 
                      : isActiveLink(link.href)
                        ? "text-primary bg-black/5"
                        : "hover:text-primary hover:bg-black/5"
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
