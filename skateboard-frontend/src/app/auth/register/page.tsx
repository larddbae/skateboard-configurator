"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import clsx from "clsx";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">🛹 Suburbia</h1>
          <p className="mt-2 text-zinc-400">Create your account</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-zinc-900 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={isLoading}
                className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-zinc-500">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="passwordConfirmation" className="mb-2 block text-sm font-medium text-zinc-300">
                Confirm Password
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                disabled={isLoading}
                className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={clsx(
                "w-full rounded-lg py-3 font-semibold transition-all",
                isLoading
                  ? "cursor-not-allowed bg-purple-600/50 text-purple-200"
                  : "bg-purple-600 text-white hover:bg-purple-500"
              )}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="mt-6 text-center">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-400">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
