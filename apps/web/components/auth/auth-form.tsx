"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthFormProps {
    type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
    return (
        <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
                <h1 className="font-serif text-4xl font-bold tracking-tight">cards.</h1>
                <p className="mt-2 text-muted-foreground font-serif italic">
                    {type === "login" ? "Welcome back to the studio." : "Begin your legacy."}
                </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {type === "signup" && (
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="Jane Doe"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                        placeholder="jane@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-xs font-mono uppercase tracking-widest">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-foreground text-background py-4 font-mono text-xs uppercase tracking-widest hover:invert transition-all duration-100"
                >
                    {type === "login" ? "Sign in" : "Create account"}
                </button>
            </form>

            <div className="text-center text-sm">
                <Link
                    href={type === "login" ? "/signup" : "/login"}
                    className="font-serif italic underline hover:text-muted-foreground"
                >
                    {type === "login" ? "No account? Create one." : "Already have an account? Sign in."}
                </Link>
            </div>
        </div>
    );
}
