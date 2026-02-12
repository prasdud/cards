"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SidebarContent } from "@/components/ui/sidebar";

export function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
                aria-label="Open sidebar"
            >
                <Menu size={20} />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="relative w-64 h-full bg-background border-r border-border shadow-xl animate-in slide-in-from-left duration-200">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground"
                        >
                            <X size={20} />
                        </button>
                        <div className="h-full pt-4">
                            {/* Reusing content, but overriding the header part via CSS or structure if needed. 
                     SidebarContent includes the header by default. 
                     We might have double headers if we aren't careful, 
                     but SidebarContent has the logo which is good.
                  */}
                            <SidebarContent />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
