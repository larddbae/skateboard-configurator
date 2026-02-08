"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import clsx from "clsx";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold mb-6">
              GET IN TOUCH
            </div>
            <Heading as="h1" size="lg" className="text-white mb-4">
              Let&apos;s Talk
            </Heading>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Have questions? Want to collaborate? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-zinc-400 mb-6">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-brand-lime hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-50"
                        placeholder="Tony Hawk"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-50"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-50"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full rounded-xl bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent disabled:opacity-50 resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx(
                      "w-full rounded-xl py-4 font-bold text-lg transition-all",
                      isSubmitting
                        ? "cursor-not-allowed bg-brand-orange/50 text-white/50"
                        : "bg-brand-orange text-white hover:bg-brand-lime hover:text-zinc-900 hover:scale-[1.02]"
                    )}
                  >
                    {isSubmitting ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="grid gap-4">
                <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-lime/20 rounded-xl flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Email us at</p>
                    <p className="text-white font-medium">hello@suburbiaskate.com</p>
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Visit us at</p>
                    <p className="text-white font-medium">123 Skate Street, LA 90210</p>
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-pink/20 rounded-xl flex items-center justify-center text-2xl">
                    🕐
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Support Hours</p>
                    <p className="text-white font-medium">Mon - Fri, 9am - 6pm PST</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <h3 className="font-bold text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { name: "Instagram", icon: "📸", color: "hover:bg-pink-500" },
                    { name: "TikTok", icon: "🎵", color: "hover:bg-zinc-700" },
                    { name: "YouTube", icon: "▶️", color: "hover:bg-red-500" },
                    { name: "Twitter", icon: "🐦", color: "hover:bg-blue-500" },
                  ].map((social) => (
                    <button
                      key={social.name}
                      className={clsx(
                        "w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-xl transition-colors",
                        social.color
                      )}
                      title={social.name}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Hint */}
              <div className="bg-gradient-to-r from-brand-purple to-brand-navy rounded-2xl p-6">
                <h3 className="font-bold text-white mb-2">Looking for answers?</h3>
                <p className="text-zinc-300 text-sm mb-4">
                  Check out our FAQ section for quick answers to common questions.
                </p>
                <Link href="#" className="text-brand-lime font-semibold hover:underline">
                  View FAQ →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-16 text-center">
          <Link href="/" className="text-zinc-500 hover:text-brand-lime transition-colors">
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
