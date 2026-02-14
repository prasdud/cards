"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function AvatarSync() {
    const { user, isLoaded } = useUser();
    const isSyncing = useRef(false);

    useEffect(() => {
        if (!isLoaded || !user) return;
        
        const syncAvatar = async () => {
            // Use unsafeMetadata because it's client-writable.
            // Check if user has already synced their avatar.
            const unsafeMetadata = user.unsafeMetadata as { hasCustomAvatar?: boolean };
            if (unsafeMetadata?.hasCustomAvatar) return;

            if (isSyncing.current) return;
            isSyncing.current = true;

            try {
                // Generate a consistent seed based on available user info
                const seed = user.username || user.firstName || user.id;
                
                // Fetch the generated Facehash image from our internal API
                const response = await fetch(`/api/avatar?name=${encodeURIComponent(seed)}`);
                
                if (!response.ok) {
                    console.error("Avatar fetch failed", response.status);
                    return;
                }
                
                const blob = await response.blob();
                const file = new File([blob], "avatar.png", { type: "image/png" });

                // Upload the image to Clerk
                await user.setProfileImage({ file });

                // Mark as synced in metadata so we don't overwrite user changes later
                await user.update({
                    unsafeMetadata: {
                        ...user.unsafeMetadata,
                        hasCustomAvatar: true
                    }
                });
                
                console.log("Facehash avatar synced successfully");
            } catch (error) {
                console.error("Failed to sync avatar:", error);
            } finally {
                isSyncing.current = false;
            }
        };

        syncAvatar();
    }, [user, isLoaded]);

    return null;
}
