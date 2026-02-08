"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import clsx from "clsx";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.push("/build");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-purple via-brand-navy to-zinc-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-[200px] rotate-12">🛹</div>
          <div className="absolute bottom-20 right-10 text-[150px] -rotate-12">🔥</div>
          <div className="absolute top-1/2 left-1/3 text-[100px] rotate-45">⚡</div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
          <Logo className="h-16 text-white mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">
            ESCAPE THE<br />CUL-DE-SAC
          </h1>
          <p className="text-zinc-300 text-lg max-w-md">
            Build your custom skateboard with AI-powered recommendations. 
            Join 50,000+ skaters worldwide.
          </p>
          
          {/* Stats */}
          <div className="flex gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-lime">50K+</div>
              <div className="text-zinc-400 text-sm">Skaters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-orange">10K+</div>
              <div className="text-zinc-400 text-sm">Boards Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-pink">99%</div>
              <div className="text-zinc-400 text-sm">Happy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-zinc-950 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <Logo className="h-12 text-white mx-auto" />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-zinc-400">Sign in to continue building</p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl bg-zinc-900/50 backdrop-blur p-8 border border-zinc-800">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent disabled:opacity-50 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                    Password
                  </label>
                  <Link href="#" className="text-sm text-brand-lime hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent disabled:opacity-50 transition-all pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand-lime focus:ring-brand-lime"
                />
                <label htmlFor="remember" className="text-sm text-zinc-400">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                  "w-full rounded-xl py-4 font-bold text-lg transition-all",
                  isLoading
                    ? "cursor-not-allowed bg-brand-lime/50 text-zinc-800"
                    : "bg-brand-lime text-zinc-900 hover:bg-brand-orange hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Signing in...
                  </span>
                ) : (
                  "Sign In →"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-900/50 text-zinc-500">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 text-white hover:bg-zinc-700 transition-colors border border-zinc-700">
                <span>🌐</span> Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 text-white hover:bg-zinc-700 transition-colors border border-zinc-700">
                <span>🍎</span> Apple
              </button>
            </div>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-brand-lime font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <p className="mt-8 text-center">
            <Link href="/" className="text-sm text-zinc-500 hover:text-brand-lime transition-colors flex items-center justify-center gap-1">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
