"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        {/* Logo */}
        <Link href="/" className="justify-self-start">
          <Logo className="text-brand-purple ~h-12/20" />
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Main"
          className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
        >
          <ul className="flex flex-wrap items-center justify-center gap-8">
            <li>
              <Link href="/" className="~text-lg/xl hover:text-purple-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/build" className="~text-lg/xl hover:text-purple-400 transition-colors">
                Build
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right side - Auth or User Menu */}
        <div className="justify-self-end flex items-center gap-3">
          {isLoading ? (
            <div className="h-10 w-10 rounded-full bg-zinc-700 animate-pulse" />
          ) : isAuthenticated && user ? (
            <div className="relative" ref={menuRef}>
              {/* User Avatar Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 rounded-full bg-purple-600 px-3 py-2 text-white hover:bg-purple-500 transition-colors"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-800 text-sm font-bold">
                  {getInitials(user.name)}
                </span>
                <span className="hidden md:inline text-sm font-medium">{user.name.split(" ")[0]}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-zinc-900 py-2 shadow-xl border border-zinc-800">
                  <div className="px-4 py-2 border-b border-zinc-800">
                    <p className="text-sm text-white font-medium truncate">{user.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/my-garage"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    🚗 My Garage
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    📦 My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-800"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ButtonLink href="/auth/login" color="purple">
              Sign In
            </ButtonLink>
          )}
        </div>
      </div>
    </header>
  );
}
