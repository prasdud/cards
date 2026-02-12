"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardElementProps {
    type: "text" | "image" | "icon";
    value: string;
    label?: string; // For accessibility/editing
    className?: string;
    editable?: boolean;
}

export function CardElement({ type, value, label, className, editable = false }: CardElementProps) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <motion.div
            onClick={(e) => {
                e.stopPropagation();
                if (editable) setIsSelected(!isSelected);
            }}
            className={cn(
                "relative group cursor-default",
                editable && "cursor-pointer hover:outline hover:outline-1 hover:outline-black/20",
                isSelected && "outline outline-2 outline-blue-500", // Example selection state
                className
            )}
            layout // Framer motion layout animation
        >
            {type === "text" && (
                <span className="whitespace-pre-wrap">{value}</span>
            )}
            {/* Add more types later */}

            {isSelected && (
                <div className="absolute -top-6 left-0 bg-black text-white text-[10px] px-2 py-0.5 uppercase tracking-wider font-mono">
                    {label || "Edit"}
                </div>
            )}
        </motion.div>
    );
}
