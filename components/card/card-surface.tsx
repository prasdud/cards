import { cn } from "@/lib/utils";

interface CardSurfaceProps {
    className?: string;
    children?: React.ReactNode;
    theme?: "dark" | "light"; // Simple theme prop for now
}

export function CardSurface({ className, children, theme = "light" }: CardSurfaceProps) {
    return (
        <div
            className={cn(
                "absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between p-12 overflow-hidden",
                theme === "light" ? "bg-white text-black border-4 border-black" : "bg-black text-white border-4 border-white",
                className
            )}
        >
            {/* Background Noise/Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-lines-diagonal z-0" />

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
                {children}
            </div>
        </div>
    );
}
