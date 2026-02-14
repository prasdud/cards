"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { MobileMenu } from "@/components/ui/mobile-menu";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { CardCanvas } from "@/components/card/card-canvas";
import { RolodexCard } from "@/components/rolodex/rolodex-card";
import { ContactCard } from "@/types/card";

// Dummy card data for the landing page
const LANDING_CARD: ContactCard = {
    id: "landing-demo",
    slug: "jane-doe",
    name: "Jane Doe",
    role: "Creative Director",
    company: "Studio 54",
    email: "jane@studio54.com",
    theme: {
        variant: "monochrome",
        fontHead: "serif",
        fontBody: "sans",
        texture: "noise"
    }
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col scroll-smooth">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 border-b-4 border-black bg-white/80 backdrop-blur-sm">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tighter">cards.</Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-xs font-mono uppercase tracking-widest hover:underline hover:underline-offset-4">Features</Link>
          <Link href="#pricing" className="text-xs font-mono uppercase tracking-widest hover:underline hover:underline-offset-4">Pricing</Link>
          <Link href="#about" className="text-xs font-mono uppercase tracking-widest hover:underline hover:underline-offset-4">About</Link>
        </nav>
        <nav className="hidden md:flex items-center gap-6">
          <SignedOut>
            <Link href="/login" className="text-sm font-mono uppercase tracking-widest hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hidden sm:inline-flex text-sm font-mono uppercase tracking-widest border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-100">
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-sm font-mono uppercase tracking-widest hover:underline mr-4">
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>
        </nav>
        <MobileMenu />
      </header>

      <main className="flex-1 pt-20">
        <section className="px-6 md:px-12 py-32 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9]">
              Reduction <br /> to <span className="italic font-light">Essence.</span>
            </h1>
            <p className="max-w-md font-serif text-xl md:text-2xl leading-relaxed text-muted-foreground">
              Your digital identity, stripped of distractions. Pure black, pure white, and typography that commands respect.
            </p>
            <div className="pt-8 flex items-center gap-6">
              <Link href="/signup" className="inline-flex items-center gap-2 bg-black text-white px-10 py-5 font-mono text-sm uppercase tracking-widest hover:invert transition-all">
                Create Card <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
            <div className="scale-75 md:scale-100 lg:scale-110">
                <CardCanvas className="h-full">
                    <div className="w-[600px] h-[350px] rounded-lg overflow-hidden border-0">
                        <RolodexCard 
                            card={LANDING_CARD} 
                            className="h-full border-none rounded-none bg-white text-black border-2 border-black" 
                            showBack={false}
                        />
                    </div>
                </CardCanvas>
            </div>
          </div>
        </section>

        <section id="features" className="border-t-4 border-black py-24 bg-black text-white">
          <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Zero Noise", desc: "No gradients. No shadows. Just content." }, // modify this
              { title: "Serif Typography", desc: "Editorial grade type handling." },
              { title: "Instant", desc: "No loading spinners. Pure speed." }
            ].map((feature, i) => (
              <div key={i} className="space-y-4 border-l border-white/20 pl-6 group">
                <h3 className="font-mono text-sm uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{`0${i + 1}`}</h3>
                <h2 className="font-serif text-4xl">{feature.title}</h2>
                <p className="text-white/80 font-serif text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-t-4 border-black py-32 px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="font-serif text-6xl md:text-7xl font-bold tracking-tighter">Pricing</h2>
              <p className="font-serif text-xl text-muted-foreground italic">Buy once, own forever. Just like God intended.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Free Tier */}
              <div className="border-2 border-black p-8 md:p-12 flex flex-col justify-between min-h-[500px] hover:border-4 transition-all duration-100">
                <div className="space-y-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest">Essentials</h3>
                  <div className="font-serif text-5xl">
                    $1.99<span className="text-lg text-muted-foreground italic">/forever</span>
                  </div>
                  <p className="font-serif text-lg">Thinking of yourself.</p>
                  <ul className="space-y-4 pt-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span className="font-serif">1 Digital Card</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span className="font-serif">All Design Themes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span className="font-serif">Custom Card URL</span>
                    </li>
                  </ul>
                </div>
                <Link href="/signup" className="mt-8 w-full block text-center border-2 border-black py-4 font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                  Go Essentials
                </Link>
              </div>

              {/* Premium Tier */}
              <div className="bg-black text-white p-8 md:p-12 flex flex-col justify-between min-h-[500px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="font-mono text-[10px] bg-white text-black px-2 py-1 uppercase tracking-widest">Popular</span>
                </div>
                <div className="space-y-6 z-10 relative">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-white/70">Premium</h3>
                  <div className="font-serif text-5xl">
                    $9.99<span className="text-lg text-white/50 italic">/forever</span>
                  </div>
                  <p className="font-serif text-lg text-white/90">Building an empire.</p>
                  <ul className="space-y-4 pt-4 text-white/80">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span className="font-serif">Multiple Digital Cards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span className="font-serif">All Design Themes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span className="font-serif">Custom Card URL's</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span className="font-serif">Priority Support</span>
                    </li>
                  </ul>
                </div>
                <Link href="/signup?plan=premium" className="mt-8 w-full block text-center bg-white text-black py-4 font-mono text-xs uppercase tracking-widest hover:invert transition-all z-10 relative">
                  Go Premium
                </Link>

                {/* Subtle texture for premium card */}
                <div className="absolute inset-0 opacity-[0.1] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t-4 border-black py-32 px-6 md:px-12 bg-muted">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tighter">About</h2>
            <p className="font-serif text-xl md:text-2xl leading-relaxed">
              We believe that in a world of noise, silence is the ultimate luxury.
              Cards was built for those who understand that less is not just more—it is everything.
              <br /><br />
              No tracking. No ads. Just you, your work, and the people who need to find you.
            </p>
            <div className="pt-8">
              <span className="font-mono text-xs uppercase tracking-widest border-b border-black pb-1">EST. 2026</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-black py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 bg-white">
        <Link href="/" className="font-serif text-lg font-bold">cards.</Link>
        <div className="flex gap-8">
          <a href="https://x.com/prasdud" className="font-mono text-xs uppercase tracking-widest hover:underline" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://github.com/prasdud" className="font-mono text-xs uppercase tracking-widest hover:underline" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://linkedin.com/in/mabdulmuid" className="font-mono text-xs uppercase tracking-widest hover:underline" target="_blank" rel="noopener noreferrer ">LinkedIn</a>
        </div>
        <span className="font-mono text-xs text-muted-foreground">© 2026. All rights reserved.</span>
      </footer>
    </div>
  );
}
