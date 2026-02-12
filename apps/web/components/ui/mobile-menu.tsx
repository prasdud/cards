"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 -mr-2 text-black hover:bg-black/5 rounded-full transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-24 px-6 animate-in fade-in slide-in-from-top-4 duration-200">
                    <nav className="flex flex-col gap-8 text-center">
                        <Link
                            href="#features"
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-serif hover:underline"
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-serif hover:underline"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#about"
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-serif hover:underline"
                        >
                            About
                        </Link>
                        <hr className="border-black w-24 mx-auto" />
                        <Link
                            href="/login"
                            className="text-sm font-mono uppercase tracking-widest"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sm font-mono uppercase tracking-widest bg-black text-white py-4 hover:invert transition-colors"
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            )}
        </div>
    );
}
