"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import clsx from "clsx";
import { Logo } from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { level: 0, text: "", color: "" };
    if (pwd.length < 6) return { level: 1, text: "Weak", color: "bg-red-500" };
    if (pwd.length < 8) return { level: 2, text: "Fair", color: "bg-yellow-500" };
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) 
      return { level: 4, text: "Strong", color: "bg-green-500" };
    return { level: 3, text: "Good", color: "bg-brand-lime" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password, passwordConfirmation);
      router.push("/build");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-orange via-brand-purple to-zinc-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 text-[180px] -rotate-12">🎨</div>
          <div className="absolute bottom-32 left-10 text-[140px] rotate-12">🛹</div>
          <div className="absolute top-1/2 right-1/4 text-[100px] rotate-45">✨</div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
          <Logo className="h-16 text-white mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">
            JOIN THE<br />MOVEMENT
          </h1>
          <p className="text-zinc-200 text-lg max-w-md">
            Create your account and start building custom skateboards 
            that match your unique style.
          </p>
          
          {/* Features */}
          <div className="mt-12 space-y-4 text-left max-w-sm">
            <div className="flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">✓</span>
              <span>AI-powered style recommendations</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">✓</span>
              <span>Save unlimited designs to your garage</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">✓</span>
              <span>Track orders in real-time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-zinc-950 px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <Logo className="h-12 text-white mx-auto" />
          </div>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white">Create account</h2>
            <p className="mt-2 text-zinc-400">Join the community today</p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl bg-zinc-900/50 backdrop-blur p-8 border border-zinc-800">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-50 transition-all"
                  placeholder="Tony Hawk"
                />
              </div>

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
                  className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-50 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-50 transition-all pr-12"
                    placeholder="Min 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {/* Password Strength */}
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={clsx(
                            "h-1 flex-1 rounded-full transition-colors",
                            level <= passwordStrength.level ? passwordStrength.color : "bg-zinc-700"
                          )}
                        />
                      ))}
                    </div>
                    <p className={clsx("text-xs mt-1", passwordStrength.color.replace("bg-", "text-"))}>
                      {passwordStrength.text}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  disabled={isLoading}
                  className={clsx(
                    "w-full rounded-xl bg-zinc-800/50 border px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-50 transition-all",
                    passwordConfirmation && password !== passwordConfirmation
                      ? "border-red-500"
                      : passwordConfirmation && password === passwordConfirmation
                      ? "border-green-500"
                      : "border-zinc-700"
                  )}
                  placeholder="••••••••"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand-orange focus:ring-brand-orange"
                />
                <label htmlFor="terms" className="text-sm text-zinc-400">
                  I agree to the{" "}
                  <Link href="#" className="text-brand-orange hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-brand-orange hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                  "w-full rounded-xl py-4 font-bold text-lg transition-all mt-2",
                  isLoading
                    ? "cursor-not-allowed bg-brand-orange/50 text-white/50"
                    : "bg-brand-orange text-white hover:bg-brand-lime hover:text-zinc-900 hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Creating account...
                  </span>
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-900/50 text-zinc-500">or sign up with</span>
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

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-brand-orange font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <p className="mt-8 text-center">
            <Link href="/" className="text-sm text-zinc-500 hover:text-brand-orange transition-colors flex items-center justify-center gap-1">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
