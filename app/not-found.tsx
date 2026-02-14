"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);

  useEffect(() => {
    // Fetch a random quote from dummyjson (reliable, free, public)
    fetch("https://dummyjson.com/quotes/random")
      .then((res) => res.json())
      .then((data) => setQuote({ quote: data.quote, author: data.author }))
      .catch(() => {
        // Fallback if API fails
        setQuote({
          quote: "We believe that in a world of noise, silence is the ultimate luxury.",
          author: "Cards"
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Texture Pattern from style.xml (Inverted Section) */}
        <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 1px, #fff 1px, #fff 2px)`,
                backgroundSize: '4px 100%'
            }}
        />
        
        {/* Content */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-2xl text-center space-y-12"
        >
            {/* Oversized 404 - 9xl+ scale */}
            <h1 className="font-serif text-[12rem] leading-none tracking-tighter opacity-10 select-none font-bold">
                404
            </h1>
            
            <div className="space-y-8 -mt-20">
                <h2 className="font-serif text-5xl md:text-6xl tracking-tight">
                    Page not found.
                </h2>
                
                {/* Thick Horizontal Rule */}
                <div className="h-1 w-24 bg-white mx-auto" />
                
                {/* Quote Section */}
                <div className="min-h-[120px] flex flex-col justify-center py-4 px-4">
                    {quote ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-white/80">
                                &ldquo;{quote.quote}&rdquo;
                            </p>
                            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-white/50">
                                — {quote.author}
                            </p>
                        </motion.div>
                    ) : (
                        <div className="animate-pulse h-20 w-full max-w-md mx-auto bg-white/5 rounded-none" />
                    )}
                </div>
            </div>

            {/* Primary Button (Inverted for black bg) */}
            <Link 
                href="/" 
                className="inline-flex items-center gap-2 bg-white text-black px-10 py-5 font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white hover:border hover:border-white transition-all duration-200 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Return Home
            </Link>
        </motion.div>
    </div>
  );
}
