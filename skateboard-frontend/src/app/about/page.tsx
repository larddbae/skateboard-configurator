import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/20 to-transparent"></div>
        <div className="absolute top-20 left-1/4 text-[300px] opacity-5 rotate-12">🛹</div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block bg-brand-lime text-zinc-900 px-4 py-1 rounded-full text-sm font-bold mb-6">
            EST. 2024
          </div>
          <Heading as="h1" size="lg" className="text-white mb-6">
            ESCAPE THE<br />CUL-DE-SAC
          </Heading>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            We&apos;re not just building skateboards. We&apos;re building a community 
            of riders who refuse to stay in their lane.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heading as="h2" size="md" className="text-white mb-6">
                Our Story
              </Heading>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Suburbia Skate was born in a garage in 2024 when a group of friends 
                  realized that buying skateboards online was boring. Pick a pre-made board, 
                  add to cart, done. Where&apos;s the creativity in that?
                </p>
                <p>
                  We built the first AI-powered skateboard configurator because we believe 
                  your board should be as unique as your riding style. Every deck, every wheel, 
                  every truck should tell YOUR story.
                </p>
                <p>
                  Today, we&apos;ve helped over 50,000 skaters worldwide create their perfect boards. 
                  And we&apos;re just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-brand-orange to-brand-purple rounded-3xl flex items-center justify-center">
                <span className="text-[150px]">🛹</span>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-lime text-zinc-900 p-6 rounded-2xl font-bold">
                <div className="text-3xl">50K+</div>
                <div className="text-sm">Boards Built</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Heading as="h2" size="md" className="text-white text-center mb-12">
            What We Stand For
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-brand-orange transition-colors">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">Creativity First</h3>
              <p className="text-zinc-400">
                Your board should be a canvas for self-expression. No two builds are the same.
              </p>
            </div>
            
            <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-brand-lime transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
              <p className="text-zinc-400">
                Our AI assistant learns your style and recommends parts that match your vibe.
              </p>
            </div>
            
            <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-brand-pink transition-colors">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
              <p className="text-zinc-400">
                Join a global community of skaters who push boundaries every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-brand-navy">
        <div className="max-w-6xl mx-auto">
          <Heading as="h2" size="md" className="text-white text-center mb-12">
            Meet The Founders
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Rodriguez", role: "CEO & Founder", emoji: "🧑‍💻" },
              { name: "Sam Kim", role: "Head of Design", emoji: "🎨" },
              { name: "Jordan Lee", role: "Lead Developer", emoji: "⚡" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-zinc-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heading as="h2" size="md" className="text-white mb-6">
            Ready to Build?
          </Heading>
          <p className="text-zinc-400 mb-8">
            Start creating your custom skateboard today
          </p>
          <ButtonLink href="/build" color="orange" icon="plus">
            Build Your Board
          </ButtonLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto text-center text-zinc-500">
          <Link href="/" className="hover:text-brand-lime transition-colors">
            ← Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
