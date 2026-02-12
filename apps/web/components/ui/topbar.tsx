"use client";

import { usePathname } from "next/navigation";
import { MobileSidebar } from "@/components/ui/mobile-sidebar";

export function Topbar() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
            <div className="flex items-center gap-4">
                <MobileSidebar />
                <div className="flex items-center gap-2 text-sm text-muted-foreground hidden md:flex">
                    <span className="font-serif text-foreground">Cards</span>
                    {segments.map((segment, index) => (
                        <div key={segment} className="flex items-center gap-2">
                            <span>/</span>
                            <span className={index === segments.length - 1 ? "text-foreground font-medium capitalize" : "capitalize"}>
                                {segment}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-4">
                {/* Placeholder for topbar actions */}
                <button className="text-sm font-medium hover:underline">Feedback</button>
                <button className="text-sm font-medium hover:underline">Help</button>
            </div>
        </header>
    );
}
