"use client";

import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold tracking-tight">Settings</h1>
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h2 className="text-xl font-serif font-bold">Account</h2>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                
                <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-mono uppercase tracking-widest mb-4">Danger Zone</h3>
                    <SignOutButton redirectUrl="/">
                        <button className="flex items-center gap-2 px-4 py-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}
