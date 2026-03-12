"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get("token");
      const err = searchParams.get("error");

      if (err) {
        setError(`Authentication failed: ${err}`);
        setTimeout(() => router.push("/auth/login"), 3000);
        return;
      }

      if (token) {
        // Save token to localStorage exactly like api.ts does
        localStorage.setItem("auth_token", token);
        
        // Refresh the user context so the app knows we are logged in
        await refreshUser();
        
        // Redirect to build page or dashboard
        router.push("/");
      } else {
        setError("No authentication token found.");
        setTimeout(() => router.push("/auth/login"), 3000);
      }
    };

    handleAuth();
  }, [searchParams, router, refreshUser]);

  return (
    <div className="flex min-h-screen bg-paper-cream items-center justify-center font-space-mono text-marker-black">
      <div className="text-center p-8 bg-white shadow-brutal border-4 border-black transform -rotate-1">
        {error ? (
          <div>
            <h1 className="text-red-500 font-bold text-2xl mb-2 font-rubik-mono">ERROR</h1>
            <p className="font-mono">{error}</p>
            <p className="mt-4 text-sm text-gray-500 font-mono">Redirecting to login...</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6 font-rubik-mono uppercase">Logging you in...</h1>
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}
