"use client";

import { motion } from "framer-motion";
import zxcvbn from "zxcvbn";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
    password?: string;
    className?: string;
    onScoreChange?: (score: number) => void;
}

export function PasswordStrength({ password = "", className, onScoreChange }: PasswordStrengthProps) {
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        if (!password) {
            setScore(0);
            setFeedback("");
            onScoreChange?.(0);
            return;
        }

        const result = zxcvbn(password);
        setScore(result.score);
        setFeedback(getFeedbackLabel(result.score));
        onScoreChange?.(result.score);
    }, [password, onScoreChange]);

    const getFeedbackLabel = (score: number) => {
        switch (score) {
            case 0: return "VERY WEAK";
            case 1: return "WEAK";
            case 2: return "FAIR";
            case 3: return "GOOD";
            case 4: return "STRONG";
            default: return "";
        }
    };

    // Calculate width based on score (0-4 => 0-100%)
    // But ensure even a 0 score with input shows something tiny
    const widthPercentage = password ? Math.max((score + 1) * 20, 5) : 0;
    
    // Opacity increases with score
    const opacity = password ? 0.2 + (score * 0.2) : 0;

    return (
        <div className={cn("space-y-2", className)}>
            <div className="h-1 w-full bg-muted overflow-hidden relative">
                <motion.div
                    className="h-full bg-foreground absolute top-0 left-0"
                    initial={{ width: "0%" }}
                    animate={{ 
                        width: `${widthPercentage}%`,
                        opacity: opacity
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                <span>Password Strength</span>
                <motion.span
                    key={feedback}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "font-bold",
                        score >= 3 ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    {feedback}
                </motion.span>
            </div>
        </div>
    );
}
