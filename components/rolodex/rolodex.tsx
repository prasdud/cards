"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { ContactCard } from "@/types/card";
import { FlipDirection } from "@/types/rolodex";
import { RolodexCard } from "./rolodex-card";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { CardCanvas } from "@/components/card/card-canvas";

interface RolodexProps {
    cards: ContactCard[];
    currentIndex?: number;
    onIndexChange?: (index: number) => void;
}

export function Rolodex({ 
    cards, 
    currentIndex: controlledIndex, 
    onIndexChange 
}: RolodexProps) {
    const [internalIndex, setInternalIndex] = useState(0);
    const [direction, setDirection] = useState<FlipDirection>(null);
    const [isFlipping, setIsFlipping] = useState(false);

    // Determine current index (controlled vs uncontrolled)
    const currentIndex = controlledIndex ?? internalIndex;

    const setIndex = useCallback((newIndex: number) => {
        if (isFlipping) return;
        
        const dir = newIndex > currentIndex ? 'down' : 'up';
        
        setDirection(dir);
        setIsFlipping(true);
        
        if (onIndexChange) {
            onIndexChange(newIndex);
        } else {
            setInternalIndex(newIndex);
        }
        
        setTimeout(() => setIsFlipping(false), 600);
    }, [currentIndex, cards.length, isFlipping, onIndexChange]);


    // Sync internal direction when controlled prop changes
    useEffect(() => {
        if (controlledIndex !== undefined && controlledIndex !== internalIndex) {
             const dir = controlledIndex > internalIndex ? 'down' : 'up';
             setDirection(dir);
             setInternalIndex(controlledIndex); // Sync internal state for reference
        }
    }, [controlledIndex, internalIndex]);


    // Circular Navigation Logic
    const handleNext = useCallback(() => {
        if (!cards.length) return;
        const nextIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
        setDirection('down');
        
        if (isFlipping) return;
        setIsFlipping(true);
        
        if (onIndexChange) {
            onIndexChange(nextIndex);
        } else {
            setInternalIndex(nextIndex);
        }
        setTimeout(() => setIsFlipping(false), 600);
    }, [isFlipping, cards.length, currentIndex, onIndexChange]);

    const handlePrev = useCallback(() => {
        if (!cards.length) return;
        const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        setDirection('up');
        
        if (isFlipping) return;
        setIsFlipping(true);

        if (onIndexChange) {
            onIndexChange(prevIndex);
        } else {
            setInternalIndex(prevIndex);
        }
        setTimeout(() => setIsFlipping(false), 600);
    }, [isFlipping, cards.length, currentIndex, onIndexChange]);

    // Keyboard Support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                handleNext();
            }
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrev();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev]);

    const handleCardClick = () => {
        const currentCard = cards[currentIndex];
        if (currentCard && currentCard.slug) {
            window.open(`/u/${currentCard.slug}`, '_blank');
        }
    };

    if (!cards.length) {
        return (
            <div className="flex h-[500px] items-center justify-center text-muted-foreground font-serif italic">
                Your rolodex is empty.
            </div>
        );
    }

    const currentCard = cards[currentIndex];

    // Animation Variants
    const variants: Variants = {
        enter: (dir: FlipDirection) => ({
            rotateX: dir === 'down' ? -90 : 90,
            opacity: 0,
            y: dir === 'down' ? -50 : 50,
            scale: 0.95,
        }),
        center: {
            rotateX: 0,
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                rotateX: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
                y: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
            }
        },
        exit: (dir: FlipDirection) => ({
            rotateX: dir === 'down' ? 90 : -90,
            opacity: 0,
            y: dir === 'down' ? 50 : -50,
            scale: 0.95,
            transition: {
                rotateX: { duration: 0.4, ease: "easeIn" },
                y: { duration: 0.4 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
            }
        })
    };

    return (
        <div className="w-full h-[700px] flex flex-col items-center justify-center relative overflow-hidden bg-[#1a1a1a] select-none p-8 rounded-xl shadow-2xl border border-white/5">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-[#222] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* 3D Stage */}
            <div className="relative w-[600px] h-[350px] perspective-1000 z-10">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full preserve-3d cursor-pointer"
                        style={{ transformOrigin: "bottom center" }}
                        onClick={handleCardClick}
                    >
                        {/* The Card Component */}
                        <div className="w-full h-full pointer-events-none">
                            <CardCanvas className="h-full">
                                <div className="w-[600px] h-[350px] shadow-[0_16px_48px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-white/10 bg-[#f8f7f3] pointer-events-auto">
                                    <RolodexCard 
                                        card={currentCard} 
                                        className="h-full border-none rounded-none" 
                                    />
                                    {/* Card Shine Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none mix-blend-overlay" />
                                </div>
                            </CardCanvas>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8 mt-12 z-20">
                <button
                    onClick={handlePrev}
                    disabled={isFlipping}
                    className="w-12 h-12 rounded-full bg-[#d4af37] border-2 border-[#d4af37] text-[#1a1a1a] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:bg-[#e8e5db] hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous Card"
                >
                    <ChevronUp size={24} strokeWidth={3} />
                </button>

                <div className="flex flex-col items-center">
                    <span className="font-serif text-[#d4af37] text-2xl font-bold tracking-widest">
                        {currentIndex + 1}
                    </span>
                    <span className="font-mono text-white/40 text-xs uppercase tracking-widest mt-1">
                        of {cards.length}
                    </span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={isFlipping}
                    className="w-12 h-12 rounded-full bg-[#d4af37] border-2 border-[#d4af37] text-[#1a1a1a] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:bg-[#e8e5db] hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next Card"
                >
                    <ChevronDown size={24} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
