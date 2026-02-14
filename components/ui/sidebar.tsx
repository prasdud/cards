"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CreditCard, Settings, User, LogOut } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Cards", href: "/dashboard/cards", icon: CreditCard },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SidebarContent() {
    const pathname = usePathname();
    const { user } = useUser();

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
                        const isActive = pathname === item.href;
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
            <div className="border-t border-border p-4 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                         {user?.imageUrl && (
                            <img src={user.imageUrl} alt={user.fullName || "User"} className="h-full w-full object-cover" />
                         )}
                    </div>
                    <div className="text-sm overflow-hidden">
                        <p className="font-medium truncate">{user?.fullName || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                </div>
                <SignOutButton redirectUrl="/">
                    <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground text-left">
                        <LogOut className="h-4 w-4" />
                        Log out
                    </button>
                </SignOutButton>
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
