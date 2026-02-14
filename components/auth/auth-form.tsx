"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordStrength } from "./password-strength";

interface AuthFormProps {
    type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
    const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
    const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [error, setError] = useState("");
    const [passwordScore, setPasswordScore] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (type === "login") {
            if (!isSignInLoaded) return;

            try {
                const result = await signIn.create({
                    identifier: email,
                    password,
                });

                if (result.status === "complete") {
                    await setSignInActive({ session: result.createdSessionId });
                    router.push("/dashboard");
                } else {
                    console.log(result);
                }
            } catch (err: any) {
                console.error("Error:", err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            }
        } else {
            if (!isSignUpLoaded) return;

            if (passwordScore < 3) {
                setError("Password is too weak. Please choose a stronger password.");
                return;
            }

            try {
                // If username is empty, don't include it (Clerk will complain if empty string provided when not required)
                // But user wanted username support, so we assume it's provided.
                await signUp.create({
                    emailAddress: email,
                    password,
                    firstName,
                    lastName,
                    username,
                });

                await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                setPendingVerification(true);
            } catch (err: any) {
                console.error("Error:", err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            }
        }
    };

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isSignUpLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setSignUpActive({ session: completeSignUp.createdSessionId });
                router.push("/dashboard");
            } else {
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err: any) {
            console.error("Error:", err.errors[0].longMessage);
            setError(err.errors[0].longMessage);
        }
    };

    return (
        <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
                <h1 className="font-serif text-4xl font-bold tracking-tight">cards.</h1>
                <p className="mt-2 text-muted-foreground font-serif italic">
                    {type === "login" ? "Welcome back to the studio." : "Begin your legacy."}
                </p>
            </div>

            {pendingVerification ? (
                <form className="space-y-6" onSubmit={handleVerification}>
                    <div className="space-y-2">
                        <label htmlFor="code" className="block text-xs font-mono uppercase tracking-widest">
                            Verification Code
                        </label>
                        <input
                            id="code"
                            type="text"
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="123456"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-foreground text-background py-4 font-mono text-xs uppercase tracking-widest hover:invert transition-all duration-100"
                    >
                        Verify Email
                    </button>
                </form>
            ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {type === "signup" && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="block text-xs font-mono uppercase tracking-widest">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="block text-xs font-mono uppercase tracking-widest">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-xs font-mono uppercase tracking-widest">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                                    placeholder="jane_doe"
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest">
                            {type === "login" ? "Email or Username" : "Email address"}
                        </label>
                        <input
                            id="email"
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder={type === "login" ? "jane@example.com or jane_doe" : "jane@example.com"}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full border-b-2 border-border bg-transparent py-2 px-0 placeholder:italic focus:border-b-4 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="••••••••"
                        />
                        {type === "signup" && (
                            <PasswordStrength password={password} onScoreChange={setPasswordScore} />
                        )}
                    </div>

                    {error && <p className="text-red-500 text-xs font-mono">{error}</p>}

                    <div id="clerk-captcha" />

                    <button
                        type="submit"
                        className="w-full bg-foreground text-background py-4 font-mono text-xs uppercase tracking-widest hover:invert transition-all duration-100"
                    >
                        {type === "login" ? "Sign in" : "Create account"}
                    </button>
                </form>
            )}

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
