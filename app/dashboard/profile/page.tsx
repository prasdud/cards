"use client";

import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
    return (
        <div className="w-full h-full flex items-start justify-center">
            <UserProfile 
                routing="hash"
                appearance={{
                    variables: {
                        borderRadius: "0rem",
                        colorPrimary: "#000000",
                        colorText: "#000000",
                        colorTextSecondary: "#525252",
                        colorBackground: "#FFFFFF",
                        fontFamily: "var(--font-source-serif-4), serif",
                        fontFamilyButtons: "var(--font-jetbrains-mono), monospace",
                    },
                    elements: {
                        rootBox: "w-full h-full shadow-none",
                        cardBox: "w-full h-full shadow-none border-0 rounded-none max-w-none mx-0",
                        scrollBox: "rounded-none h-full",
                        navbar: "hidden md:flex border-r border-black/10 h-full",
                        navbarButton: "rounded-none font-mono text-xs uppercase tracking-widest hover:bg-black/5 text-black/60",
                        navbarButtonActive: "text-black font-bold bg-transparent before:bg-black",
                        headerTitle: "font-serif text-2xl font-bold tracking-tight",
                        headerSubtitle: "font-serif italic text-muted-foreground",
                        formButtonPrimary: "rounded-none bg-black text-white font-mono text-xs uppercase tracking-widest hover:invert transition-all duration-100 shadow-none",
                        formButtonReset: "rounded-none text-black font-mono text-xs uppercase tracking-widest hover:bg-black/5",
                        formFieldInput: "rounded-none border-b-2 border-black border-t-0 border-x-0 bg-transparent px-0 focus:border-black focus:ring-0 placeholder:italic",
                        formFieldLabel: "font-mono text-xs uppercase tracking-widest text-black/60",
                        avatarImageActionsUpload: "text-black",
                        badge: "rounded-none bg-black text-white font-mono text-[10px] uppercase tracking-widest",
                        pageScrollBox: "h-full py-8 pr-8 pl-8",
                    }
                }}
            />
        </div>
    );
}
