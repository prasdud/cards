"use client";

import { cn } from "@/lib/utils";

const themes = [
    { id: "classic", name: "Classic", color: "#000000" },
    { id: "inverted", name: "Inverted", color: "#FFFFFF" },
    { id: "lined", name: "Lined", color: "#F5F5F5" },
];

export function ThemeSidebar() {
    return (
        <div className="w-80 border-l border-border bg-background p-6 overflow-y-auto">
            <h2 className="mb-6 font-serif text-2xl font-bold">Theme</h2>

            <div className="space-y-8">
                <div>
                    <h3 className="mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Preset</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {themes.map((theme) => (
                            <button
                                key={theme.id}
                                className={cn(
                                    "aspect-[1.6] w-full border border-border transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                    theme.id === "inverted" ? "bg-black" : "bg-white"
                                )}
                            >
                                <div className={cn("w-full h-full flex items-center justify-center p-2", theme.id === "inverted" ? "text-white" : "text-black")}>
                                    <span className="font-serif text-sm">{theme.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Typography</h3>
                    {/* Font picker placeholder */}
                    <div className="space-y-2">
                        <div className="p-3 border border-border font-serif text-lg">Playfair Display</div>
                        <div className="p-3 border border-border font-body text-lg">Source Serif 4</div>
                        <div className="p-3 border border-border font-mono text-sm">JetBrains Mono</div>
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Texture & Grain</h3>
                    {/* Texture slider placeholder */}
                    <div className="h-2 w-full bg-muted rounded-none overflow-hidden">
                        <div className="h-full w-1/3 bg-black" />
                    </div>
                </div>
            </div>
        </div>
    );
}
