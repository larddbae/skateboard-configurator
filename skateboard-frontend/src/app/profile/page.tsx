"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import clsx from "clsx";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  // Form states matching existing logic but with new design
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Auth check logic
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
      <div className="min-h-screen bg-zine-lavender flex items-center justify-center">
        <div className="animate-spin text-4xl text-primary">⏳</div>
      </div>
    );
  }

  // NOTE: This page implements the specific "Suburbia Skate - Account Settings" design
  // The Sidebar is included here as it appears to be a specific layout for this section in the design.
  
  return (
    <div className="bg-zine-lavender bg-grain text-ink min-h-screen flex antialiased selection:bg-primary selection:text-white font-sans overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="fixed top-10 right-10 opacity-20 pointer-events-none rotate-12 hidden lg:block z-0">
            <span className="material-symbols-outlined text-9xl text-ink">star</span>
        </div>
        <div className="fixed bottom-20 left-10 opacity-10 pointer-events-none -rotate-12 hidden lg:block z-0">
            <span className="material-symbols-outlined text-9xl text-ink">skateboarding</span>
        </div>

        {/* Sidebar Navigation */}
        <aside className="w-64 bg-paper bg-grain border-r-4 border-ink flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-10 shadow-[4px_0_0_0_rgba(0,0,0,0.1)]">
            <div className="p-6 flex items-center gap-3 border-b-2 border-ink border-dashed">
                <div className="bg-ink text-primary p-1 rounded-sm rotate-3 transform">
                    <span className="material-symbols-outlined text-3xl">skateboarding</span>
                </div>
                <div className="leading-none">
                    <h1 className="font-display text-3xl uppercase tracking-tighter text-ink -rotate-2">Suburbia</h1>
                    <span className="font-hand text-sm font-bold text-primary block ml-1">Zine Issue #4</span>
                </div>
            </div>

            <div className="px-6 py-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-ink mb-4 shadow-[4px_4px_0_0_#000] rotate-2 bg-white">
                    <img 
                        alt="User Avatar" 
                        className="w-full h-full object-cover grayscale contrast-125" 
                        src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuA4F7mzBtN8ZBSq9kwq7kQtYwQPAz3SGFTGDqeWnMPhMJkHZgEpdapZTFUQZ5-EHy5noR3mUOzDkIY0-MaZDyQazCEkF1cuzdqWTI9dfH0FgA-qW2TkTbNskXhlHAP-h51ApKFgE18nAr8GESb2F8mdGW8M3JzA_GX3__ePcnNT2ABRJ3F9jGDfvumcjbw6i9Dpz2BPMLMzLCCb4bmsCuQlQlqwoDUFCw38d5YqizmPQzImqei8GWNk2r3xHAuJ2gsw-Y7sc3hCM_I"}
                    />
                </div>
                <h2 className="font-display text-2xl uppercase tracking-wide bg-ink text-white px-2 py-0.5 -rotate-1">{user?.name || "Guest"}</h2>
                <p className="text-sm text-ink font-mono mt-2 bg-secondary/50 px-2 rotate-1">@{user?.name?.toLowerCase().replace(/\s+/g, '.') || "guest"}</p>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link href="/profile" className="group flex items-center gap-3 px-4 py-2 bg-ink text-white -rotate-1 shadow-[4px_4px_0_0_#a3e635] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#a3e635] hand-drawn-border">
                    <span className="material-symbols-outlined filled">person</span>
                    <span className="font-hand font-bold text-lg">Profile</span>
                </Link>
                <Link href="/orders" className="group flex items-center gap-3 px-4 py-2 text-ink hover:text-primary transition-colors">
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">shopping_bag</span>
                    <span className="font-hand font-bold text-lg">My Orders</span>
                </Link>
                <Link href="/my-garage" className="group flex items-center gap-3 px-4 py-2 text-ink hover:text-primary transition-colors">
                    <span className="material-symbols-outlined group-hover:-rotate-12 transition-transform">warehouse</span>
                    <span className="font-hand font-bold text-lg">My Garage</span>
                </Link>
                <Link href="/addresses" className="group flex items-center gap-3 px-4 py-2 text-ink hover:text-primary transition-colors">
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">location_on</span>
                    <span className="font-hand font-bold text-lg">Addresses</span>
                </Link>
                 <Link href="/security" className="group flex items-center gap-3 px-4 py-2 text-ink hover:text-primary transition-colors">
                    <span className="material-symbols-outlined group-hover:-rotate-12 transition-transform">shield</span>
                    <span className="font-hand font-bold text-lg">Security</span>
                </Link>
            </nav>

            <div className="p-4 mt-auto">
                <div className="w-full h-0.5 bg-ink mb-4 opacity-50"></div>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100/50 rounded-sm transition-colors font-hand font-bold">
                    <span className="material-symbols-outlined">logout</span>
                    Get Lost
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 lg:p-12 max-w-5xl z-10 relative overflow-y-auto h-screen">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
                <div className="absolute -top-6 left-20 w-32 h-8 bg-yellow-200/40 rotate-2 transform z-20 backdrop-blur-[1px]"></div>
                <div>
                    <h1 className="text-6xl font-display uppercase tracking-tight text-ink mb-1 drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">Profile Settings</h1>
                    <p className="text-ink font-mono text-sm bg-white inline-block px-2 py-1 border border-ink rotate-1">Manage your account details and stuff.</p>
                </div>
                <div className="flex gap-4 items-center">
                    <Link href="/" className="font-hand font-bold text-ink hover:underline decoration-wavy underline-offset-4 decoration-primary px-2">Cancel</Link>
                    <button className="px-6 py-2 bg-primary hover:bg-orange-500 text-white font-display uppercase tracking-wider text-lg border-2 border-ink shadow-[4px_4px_0_0_#1a1a1a] transition-all active:shadow-[2px_2px_0_0_#1a1a1a] active:translate-y-1 rotate-1">Save Changes</button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
                {/* Profile Card Col */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-paper bg-grain p-6 border-2 border-ink shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] relative -rotate-1 hand-drawn-border">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-ink shadow-sm z-20"></div>
                        <div className="flex flex-col items-center text-center pt-4">
                            <div className="relative group cursor-pointer mb-6">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-[5px] border-ink shadow-xl bg-white">
                                    <img 
                                        alt="Profile Picture" 
                                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500" 
                                        src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuB5aZ3ceyUBPfaM2eXVOF4HzkSi_ybHaV5lA55QqyUWU3koOMAvufkg2FKjP2eir4CiLd_p39kPeI2UTuwMFZTosQUwDVDyncWSm525Gj4f3TkLgtgKzhklFCKlc1DJ-XBJhTkH_eEHi7JRsVjspx1YnZHRDpGTYqZ1_Bz8hBx1NniqRtxlUdhtuACTnu0SsiTpZk99rsnqWXCMBcIB99ZbcZkuYOOn4CsjHEv5KtVTKD-6vsWQT36pCBe8AINl_eyrSj3jnohox_U"}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-primary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-[5px] border-transparent">
                                    <span className="material-symbols-outlined text-white text-4xl drop-shadow-md">photo_camera</span>
                                </div>
                                <div className="absolute bottom-1 right-2 bg-secondary text-ink p-2 rounded-full border-2 border-ink shadow-[2px_2px_0_0_#000] rotate-12 hover:rotate-0 transition-transform">
                                    <span className="material-symbols-outlined text-xl block">edit</span>
                                </div>
                            </div>
                            <h3 className="text-3xl font-display text-ink uppercase tracking-wide mb-1 -rotate-1">{user?.name || "Sophie Castillo"}</h3>
                            <span className="inline-block bg-ink text-white text-xs font-mono px-2 py-1 rotate-2">Pro Skater Member</span>
                            <div className="w-full h-px border-b-2 border-dashed border-ink my-6 opacity-30"></div>
                            <div className="w-full text-left space-y-3 font-hand">
                                <div className="flex justify-between text-sm">
                                    <span className="text-ink/60 font-bold">Joined:</span>
                                    <span className="text-ink font-bold border-b-2 border-secondary/50">Nov 2023</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-ink/60 font-bold">Location:</span>
                                    <span className="text-ink font-bold border-b-2 border-primary/50">Metro City, USA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Forms Col */}
                <div className="lg:col-span-8 space-y-10">
                    {/* The Basics Section */}
                    <section className="relative bg-paper bg-grain p-1 border-2 border-ink shadow-[8px_8px_0_0_#1a1a1a] rotate-1">
                        <div className="absolute -top-4 -left-4 bg-primary text-white border-2 border-ink px-4 py-1 rotate-[-4deg] shadow-[3px_3px_0_0_#000] z-20">
                            <h3 className="font-display text-xl uppercase tracking-wider flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">badge</span>
                                The Basics
                            </h3>
                        </div>
                        <div className="p-8 pt-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-hand font-bold text-ink" htmlFor="fullName">Full Name</label>
                                    <input 
                                        className="w-full bg-white border-2 border-ink rounded-none px-4 py-3 focus:border-primary focus:ring-0 focus:shadow-[4px_4px_0_0_#ff6b35] transition-all text-ink font-mono placeholder-gray-400" 
                                        id="fullName" 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-hand font-bold text-ink" htmlFor="username">Display Name</label>
                                    <input 
                                        className="w-full bg-white border-2 border-ink rounded-none px-4 py-3 focus:border-primary focus:ring-0 focus:shadow-[4px_4px_0_0_#ff6b35] transition-all text-ink font-mono placeholder-gray-400" 
                                        id="username" 
                                        type="text" 
                                        defaultValue="sophie.skates"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-hand font-bold text-ink" htmlFor="email">Email Address</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 material-symbols-outlined text-ink opacity-50">mail</span>
                                        <input 
                                            className="w-full bg-white border-2 border-ink rounded-none pl-10 pr-4 py-3 focus:border-primary focus:ring-0 focus:shadow-[4px_4px_0_0_#ff6b35] transition-all text-ink font-mono placeholder-gray-400" 
                                            id="email" 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-hand font-bold text-ink" htmlFor="phone">Phone Number</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 material-symbols-outlined text-ink opacity-50">call</span>
                                        <input 
                                            className="w-full bg-white border-2 border-ink rounded-none pl-10 pr-4 py-3 focus:border-primary focus:ring-0 focus:shadow-[4px_4px_0_0_#ff6b35] transition-all text-ink font-mono placeholder-gray-400" 
                                            id="phone" 
                                            type="tel" 
                                            defaultValue="+1 (555) 012-3456"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Secret Stuff Section */}
                    <section className="relative bg-paper bg-grain p-1 border-2 border-ink shadow-[8px_8px_0_0_#a3e635] -rotate-1 mt-12">
                        <div className="absolute -top-4 -right-4 bg-ink text-secondary border-2 border-secondary px-4 py-1 rotate-[2deg] shadow-[3px_3px_0_0_rgba(0,0,0,0.2)] z-20">
                            <h3 className="font-display text-xl uppercase tracking-wider flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">lock</span>
                                Secret Stuff
                            </h3>
                        </div>
                        <div className="p-8 pt-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-hand font-bold text-ink" htmlFor="currentPass">Current Password</label>
                                    <input 
                                        className="w-full bg-white border-2 border-ink rounded-none px-4 py-3 focus:border-primary focus:ring-0 focus:shadow-[4px_4px_0_0_#ff6b35] transition-all text-ink font-mono placeholder-gray-400" 
                                        id="currentPass" 
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-hand font-bold text-ink" htmlFor="newPass">New Password</label>
                                    <input 
                                        className="w-full bg-white border-2 border-ink rounded-none px-4 py-3 focus:border-primary focus:ring-0 focus:shadow-[4px_4px_0_0_#ff6b35] transition-all text-ink font-mono placeholder-gray-400" 
                                        id="newPass" 
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-hand font-bold text-ink" htmlFor="confirmPass">Confirm Password</label>
                                    <input 
                                        className="w-full bg-white border-2 border-ink rounded-none px-4 py-3 focus:border-primary focus:ring-0 focus:shadow-[4px_4px_0_0_#ff6b35] transition-all text-ink font-mono placeholder-gray-400" 
                                        id="confirmPass" 
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Ping Me When Section */}
                    <section className="relative bg-paper bg-grain torn-edge pb-12 shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.2)]">
                        <div className="border-b-2 border-dashed border-ink p-6">
                            <h3 className="font-display text-2xl uppercase text-ink flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">notifications</span>
                                Ping Me When...
                            </h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between group">
                                <div>
                                    <p className="text-lg font-display text-ink group-hover:underline decoration-wavy decoration-secondary decoration-2 underline-offset-4">Order Updates</p>
                                    <p className="text-xs font-mono text-ink/70 mt-1">Where is my stuff?</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input defaultChecked className="sr-only peer" type="checkbox" />
                                    <div className="w-14 h-8 bg-gray-200 border-2 border-ink peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-ink after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-ink after:border-2 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
                                </label>
                            </div>
                            <div className="pencil-line w-full opacity-30"></div>
                            <div className="flex items-center justify-between group">
                                <div>
                                    <p className="text-lg font-display text-ink group-hover:underline decoration-wavy decoration-primary decoration-2 underline-offset-4">Product Drops</p>
                                    <p className="text-xs font-mono text-ink/70 mt-1">Fresh decks & gear.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input defaultChecked className="sr-only peer" type="checkbox" />
                                    <div className="w-14 h-8 bg-gray-200 border-2 border-ink peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-ink after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-ink after:border-2 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
                                </label>
                            </div>
                            <div className="pencil-line w-full opacity-30"></div>
                            <div className="flex items-center justify-between group">
                                <div>
                                    <p className="text-lg font-display text-ink group-hover:underline decoration-wavy decoration-secondary decoration-2 underline-offset-4">Community News</p>
                                    <p className="text-xs font-mono text-ink/70 mt-1">Local gossip & events.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input className="sr-only peer" type="checkbox" />
                                    <div className="w-14 h-8 bg-gray-200 border-2 border-ink peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-ink after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-ink after:border-2 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end pt-8 pb-12">
                        <button className="w-full md:w-auto px-10 py-4 bg-primary hover:bg-orange-600 text-white font-display uppercase tracking-widest text-xl border-2 border-ink shadow-[6px_6px_0_0_#1a1a1a] transition-all transform active:translate-y-1 active:shadow-[2px_2px_0_0_#1a1a1a] -rotate-1">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}
