"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CardCanvasProps {
    children?: React.ReactNode;
    className?: string;
}

export function CardCanvas({ children, className }: CardCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let requestID: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from center, normalized -1 to 1
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);

            // Limit rotation to 15 degrees
            targetX = -y * 15;
            targetY = x * 15;
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => {
            setIsHovering(false);
            targetX = 0;
            targetY = 0;
        };

        const animate = () => {
            // Smooth easing
            const ease = 0.1;
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;

            setRotation({ x: currentX, y: currentY });
            requestID = requestAnimationFrame(animate);
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
        requestID = requestAnimationFrame(animate);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(requestID);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex items-center justify-center w-full h-[600px] perspective-1000",
                className
            )}
            style={{
                perspective: "1000px",
            }}
        >
            <div
                className={cn("w-[600px] h-[350px] relative transition-transform duration-75 ease-linear will-change-transform transform-style-3d shadow-2xl")} // Added shadow-2xl for depth
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </div>
        </div>
    );
}
