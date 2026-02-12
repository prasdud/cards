import Link from "next/link";
import { Plus, MoreHorizontal } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
                <Link
                    href="/dashboard/cards/new/edit"
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-widest hover:invert transition-all"
                >
                    <Plus size={16} /> New Card
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mock card item */}
                <div className="group relative aspect-[1.6] w-full border border-border bg-white transition-all hover:shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 pointer-events-none">
                        <Link href="/dashboard/cards/1/edit" className="bg-black text-white px-4 py-2 font-mono text-xs uppercase pointer-events-auto">
                            Edit
                        </Link>
                    </div>
                    <div className="p-6 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 border border-black rounded-full" />
                            <button className="text-muted-foreground hover:text-black"><MoreHorizontal size={20} /></button>
                        </div>
                        <div>
                            <h3 className="font-serif text-xl">Founder Card</h3>
                            <p className="text-xs text-muted-foreground font-mono mt-1">Last edited 2h ago</p>
                        </div>
                    </div>
                </div>

                {/* Empty state placeholder */}
                <button className="group relative aspect-[1.6] w-full border border-dashed border-border flex items-center justify-center hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground">
                        <Plus size={24} />
                        <span className="font-mono text-xs uppercase tracking-widest">Create New</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
