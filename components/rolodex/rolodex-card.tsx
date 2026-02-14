import { cn } from "@/lib/utils";
import { ContactCard } from "@/types/card";

interface RolodexCardProps {
    card: ContactCard;
    className?: string;
    showBack?: boolean; // New prop to optionally render back
}

export function RolodexCard({ card, className, showBack = false }: RolodexCardProps) {
    const { theme } = card;

    // Base styles
    const baseStyles = "w-full h-full p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 backface-hidden border-b-0 rounded-t-lg";

    // Theme variants
    const variantStyles = {
        monochrome: "bg-white text-black border-2 border-black",
        cyberpunk: "bg-black text-[#0f0] border-2 border-[#0f0] shadow-[0_0_15px_rgba(0,255,0,0.3)] font-mono",
        luxury: "bg-[#0a0a0a] text-[#d4af37] border-2 border-[#d4af37]",
        brutalist: "bg-[#e0e0e0] text-black border-4 border-black font-mono uppercase tracking-tighter"
    };

    // Textures
    const renderTexture = () => {
        switch (theme.texture) {
            case 'grid':
                return (
                    <div 
                        className={cn(
                            "absolute inset-0 opacity-[0.1] pointer-events-none z-0",
                            theme.variant === 'cyberpunk' ? "opacity-[0.2]" : ""
                        )}
                        style={{
                            backgroundImage: `linear-gradient(${theme.variant === 'cyberpunk' ? '#0f0' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${theme.variant === 'cyberpunk' ? '#0f0' : '#000'} 1px, transparent 1px)`,
                            backgroundSize: '20px 20px'
                        }}
                    />
                );
            case 'lines':
                return (
                    <div 
                        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
                        style={{
                            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)`,
                            backgroundSize: '100% 4px'
                        }}
                    />
                );
            case 'noise':
                return <div className="absolute inset-0 opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] pointer-events-none z-0" />;
            case 'circuit':
                return (
                    <div className="absolute inset-0 opacity-[0.1] pointer-events-none z-0" 
                        style={{
                            backgroundImage: `radial-gradient(${theme.variant === 'cyberpunk' ? '#0f0' : '#000'} 1px, transparent 1px)`,
                            backgroundSize: '10px 10px'
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={cn(baseStyles, variantStyles[theme.variant], className)}>
            {/* Punch Holes for Rolodex Rail */}
            <div className="absolute bottom-0 left-0 w-full h-4 z-20 flex justify-center gap-12 pointer-events-none">
                <div className="w-6 h-8 bg-background rounded-t-full border-t-2 border-x-2 border-foreground translate-y-1/2" />
                <div className="w-6 h-8 bg-background rounded-t-full border-t-2 border-x-2 border-foreground translate-y-1/2" />
            </div>

            {renderTexture()}
            
            {/* Header */}
            <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <h3 className={cn(
                        "text-2xl font-bold tracking-tight",
                        theme.variant === 'cyberpunk' && "animate-pulse"
                    )}>
                        {card.name}
                    </h3>
                    {theme.variant === 'cyberpunk' && (
                        <div className="text-[10px] border border-[#0f0] px-1 animate-pulse">NET.RUNNER</div>
                    )}
                </div>
                <p className={cn(
                    "text-sm mt-1 opacity-80",
                    theme.variant === 'brutalist' && "font-bold"
                )}>
                    {card.role}
                </p>
            </div>

            {/* Footer */}
            <div className="relative z-10 space-y-4 mb-4">
                <div className={cn(
                    "h-px w-full opacity-20",
                    theme.variant === 'cyberpunk' ? "bg-[#0f0]" : 
                    theme.variant === 'luxury' ? "bg-[#d4af37]" : "bg-black"
                )} />
                
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-xs opacity-70">{card.company}</p>
                        <p className="text-[10px] opacity-50">{card.email}</p>
                    </div>
                    {theme.variant === 'cyberpunk' && (
                        <div className="w-4 h-4 bg-[#0f0] animate-pulse" />
                    )}
                </div>
            </div>
        </div>
    );
}
