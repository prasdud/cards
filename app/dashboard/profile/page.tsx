"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
    const { user } = useUser();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold tracking-tight">Profile</h1>
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h2 className="text-xl font-serif font-bold">Hello, {user?.fullName || "User"}!</h2>
                <p className="text-muted-foreground">
                    Your account status is {typeof user?.publicMetadata?.status === "string"
                        ? user.publicMetadata.status
                        : "active"}
                    .
                </p>
                <p className="text-muted-foreground">
                    Your subscription status is {typeof user?.publicMetadata?.subscriptionStatus === "string"
                        ? user.publicMetadata.subscriptionStatus
                        : "active"}  // change this to be either essential or premium, after billing
                    .
                </p>
                <p className="text-muted-foreground">Your email is {user?.primaryEmailAddress?.emailAddress || "not set"}.</p>
                <p className="text-muted-foreground">Your account was created at {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "not set"}.</p>
        
                </div>
            </div>
    );
}
