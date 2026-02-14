"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CreditCard, Settings, User, LogOut, BookUser } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState, useRef } from "react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Rolodex", href: "/dashboard/rolodex", icon: BookUser },
    { name: "Profile", href: "/dashboard/profile", icon: User },

    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];


export function SidebarContent() {
    const pathname = usePathname();
    const { user } = useUser();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsUserMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsUserMenuOpen(false);
        }, 500);
    };

    return (
        <div className="flex h-full flex-col bg-background text-foreground">
            <div className="flex h-16 items-center border-b border-border px-6">
                <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight">
                    CARDS.
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-2">
                    {navigation.map((item) => {
                        const isActive = item.href === '/dashboard' 
                            ? pathname === '/dashboard' 
                            : pathname?.startsWith(item.href);
                            
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-foreground text-background"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-border p-4 relative">
                <div 
                    className="flex items-center gap-3 cursor-pointer group hover:bg-muted/50 p-2 -mx-2 transition-colors rounded-none relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="h-8 w-8 bg-muted overflow-hidden border border-black/10">
                         {user?.imageUrl && (
                            <img src={user.imageUrl} alt={user.fullName || "User"} className="h-full w-full object-cover" />
                         )}
                    </div>
                    <div className="text-sm overflow-hidden">
                        <p className="font-medium truncate font-serif">{user?.fullName || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate font-mono">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>

                    {/* Popover Menu */}
                    {isUserMenuOpen && (
                        <div className="absolute bottom-full left-0 w-full px-4 z-50 pb-2">
                            <div className="bg-white border border-black shadow-none p-1">
                                <SignOutButton redirectUrl="/">
                                    <button className="flex w-full items-center gap-3 px-3 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors text-left font-mono uppercase tracking-widest text-xs">
                                        <LogOut className="h-3 w-3" />
                                        Log out
                                    </button>
                                </SignOutButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function Sidebar() {
    return (
        <div className="hidden md:flex h-full w-64 flex-col border-r border-border bg-background">
            <SidebarContent />
        </div>
    );
}
