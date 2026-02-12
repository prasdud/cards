import { CardCanvas } from "@/components/card/card-canvas";
import { CardElement } from "@/components/card/card-element";
import { CardSurface } from "@/components/card/card-surface";
import { ThemeSidebar } from "@/components/theme/theme-sidebar";

export default function EditCardPage() {
    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
            {/* Editor Canvas Area */}
            <div className="flex-1 bg-muted/10 relative flex flex-col items-center justify-center p-8">
                <div className="absolute top-4 left-4 z-10">
                    <h1 className="font-serif text-2xl">Editor</h1>
                    <p className="text-xs text-muted-foreground font-mono">Untitled Card</p>
                </div>

                <CardCanvas>
                    <CardSurface theme="light">
                        {/* Mock Content */}
                        <div className="space-y-4 pt-8">
                            <CardElement
                                type="text"
                                value="JANE DOE"
                                editable
                                className="text-4xl font-serif font-bold tracking-tight"
                            />
                            <CardElement
                                type="text"
                                value="Creative Director"
                                editable
                                className="text-sm font-mono uppercase tracking-widest"
                            />
                        </div>

                        <div className="space-y-2 pb-8">
                            <CardElement type="text" value="+1 (555) 000-0000" editable className="text-sm font-serif block" />
                            <CardElement type="text" value="jane@example.com" editable className="text-sm font-serif block" />
                        </div>
                    </CardSurface>
                </CardCanvas>

                {/* Canvas Controls */}
                <div className="absolute bottom-8 flex gap-4">
                    <button className="px-4 py-2 border border-black bg-white text-xs font-mono uppercase hover:bg-black hover:text-white transition-colors">
                        Reset View
                    </button>
                    <button className="px-4 py-2 border border-black bg-black text-white text-xs font-mono uppercase hover:invert transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Helper Sidebar (Theme/Settings) */}
            <ThemeSidebar />
        </div>
    );
}
