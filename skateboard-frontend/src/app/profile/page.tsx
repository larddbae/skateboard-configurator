"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import clsx from "clsx";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessage({ type: "success", text: "Profile updated successfully!" });
    setIsSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      setIsSaving(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessage({ type: "success", text: "Password changed successfully!" });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsSaving(false);
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" size="md" className="text-white mb-2">
              Account Settings
            </Heading>
            <p className="text-zinc-400">Manage your profile and preferences</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
                {/* User Info */}
                <div className="text-center pb-4 mb-4 border-b border-zinc-800">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-brand-purple rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                    {user?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <p className="font-bold text-white">{user?.name}</p>
                  <p className="text-sm text-zinc-500">{user?.email}</p>
                </div>

                {/* Tabs */}
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={clsx(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        activeTab === tab.id
                          ? "bg-brand-lime text-zinc-900"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                      )}
                    >
                      <span>{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Links */}
              <div className="mt-4 space-y-2">
                <Link
                  href="/my-garage"
                  className="block text-center py-2 text-sm text-zinc-400 hover:text-brand-lime transition-colors"
                >
                  🚗 My Garage
                </Link>
                <Link
                  href="/orders"
                  className="block text-center py-2 text-sm text-zinc-400 hover:text-brand-lime transition-colors"
                >
                  📦 My Orders
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                {/* Message */}
                {message && (
                  <div
                    className={clsx(
                      "mb-6 p-4 rounded-xl flex items-center gap-2",
                      message.type === "success"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    )}
                  >
                    <span>{message.type === "success" ? "✅" : "⚠️"}</span>
                    {message.text}
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>
                    
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-brand-purple rounded-full flex items-center justify-center text-3xl">
                        {name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm hover:bg-zinc-700 transition-colors"
                        >
                          Change Avatar
                        </button>
                        <p className="text-xs text-zinc-500 mt-1">JPG, PNG. Max 2MB</p>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className={clsx(
                        "px-6 py-3 rounded-xl font-bold transition-all",
                        isSaving
                          ? "bg-brand-lime/50 text-zinc-800 cursor-not-allowed"
                          : "bg-brand-lime text-zinc-900 hover:bg-brand-orange hover:text-white"
                      )}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4">Change Password</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className={clsx(
                        "px-6 py-3 rounded-xl font-bold transition-all",
                        isSaving
                          ? "bg-brand-lime/50 text-zinc-800 cursor-not-allowed"
                          : "bg-brand-lime text-zinc-900 hover:bg-brand-orange hover:text-white"
                      )}
                    >
                      {isSaving ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white mb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      {[
                        { id: "orders", label: "Order updates", desc: "Get notified when your order status changes" },
                        { id: "promos", label: "Promotions", desc: "Receive special offers and discounts" },
                        { id: "news", label: "Newsletter", desc: "Stay updated with the latest drops" },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl"
                        >
                          <div>
                            <p className="font-medium text-white">{item.label}</p>
                            <p className="text-sm text-zinc-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-lime"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-zinc-500 hover:text-brand-lime transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
