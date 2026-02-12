import { CardCanvas } from "@/components/card/card-canvas";
import { CardElement } from "@/components/card/card-element";
import { CardSurface } from "@/components/card/card-surface";

export default function PublicProfilePage({ params }: { params: { username: string } }) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="font-serif text-3xl font-bold mb-2">@{params.username}</h1>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Digital Business Card</p>
            </div>

            <CardCanvas className="scale-100 md:scale-125">
                <CardSurface theme="light">
                    {/* Mock Content (Read Only) */}
                    <div className="space-y-4 pt-8">
                        <CardElement
                            type="text"
                            value="JANE DOE"
                            className="text-4xl font-serif font-bold tracking-tight"
                        />
                        <CardElement
                            type="text"
                            value="Creative Director"
                            className="text-sm font-mono uppercase tracking-widest"
                        />
                    </div>

                    <div className="space-y-2 pb-8">
                        <CardElement type="text" value="+1 (555) 000-0000" className="text-sm font-serif block" />
                        <CardElement type="text" value="jane@example.com" className="text-sm font-serif block" />
                    </div>
                </CardSurface>
            </CardCanvas>

            <div className="mt-16 flex gap-4">
                <button className="px-6 py-3 bg-black text-white font-mono text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                    Save Contact
                </button>
                <button className="px-6 py-3 border border-black font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                    Share Card
                </button>
            </div>
        </div>
    );
}
