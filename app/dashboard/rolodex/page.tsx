import Link from "next/link";
import { MoreHorizontal, Search, Download } from "lucide-react";

export default function SavedContactsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black pb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold tracking-tight">Rolodex</h1>
                    <p className="text-muted-foreground font-serif italic mt-1">Your curated collection of digital identities.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input 
                            type="text" 
                            placeholder="Search contacts..." 
                            className="pl-9 pr-4 py-2 border-b-2 border-black bg-transparent focus:outline-none focus:border-black/50 transition-colors w-full md:w-64 font-mono text-xs placeholder:italic"
                        />
                    </div>
                </div>
            </div>

            {/* Empty State (Hidden when content exists) */}
            {/* 
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 opacity-50">
                <div className="w-16 h-16 border-2 border-black flex items-center justify-center rounded-none">
                    <span className="font-serif text-2xl italic">?</span>
                </div>
                <p className="font-serif text-lg">No saved contacts yet.</p>
            </div>
            */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Mock Contact 1 */}
                <div className="group relative aspect-[1.586] w-full bg-white border border-black hover:border-l-[8px] transition-all duration-200">
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-black hover:text-white transition-colors">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-between h-full">
                        <div className="space-y-1">
                            <h3 className="font-serif text-2xl font-bold tracking-tight">Patrick Bateman</h3>
                            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Vice President</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="h-px w-8 bg-black/20" />
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="font-serif text-sm italic text-muted-foreground">Pierce & Pierce</p>
                                    <p className="font-mono text-[10px] text-muted-foreground">Added 2 days ago</p>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                    <Link href="/u/patrick" className="font-mono text-xs underline decoration-black/30 hover:decoration-black underline-offset-4">
                                        View Card
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mock Contact 2 */}
                <div className="group relative aspect-[1.586] w-full bg-black text-white border border-black hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white hover:text-black transition-colors border border-white/20">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-between h-full">
                        <div className="space-y-1">
                            <h3 className="font-serif text-2xl font-bold tracking-tight">Paul Allen</h3>
                            <p className="font-mono text-xs uppercase tracking-widest text-white/60">Managing Director</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="h-px w-8 bg-white/20" />
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="font-serif text-sm italic text-white/80">Fisher Account</p>
                                    <p className="font-mono text-[10px] text-white/40">Added 5 days ago</p>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                    <Link href="/u/paul" className="font-mono text-xs underline decoration-white/30 hover:decoration-white underline-offset-4">
                                        View Card
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Mock Contact 3 */}
                 <div className="group relative aspect-[1.586] w-full bg-white border border-black hover:border-l-[8px] transition-all duration-200">
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-black hover:text-white transition-colors">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-between h-full">
                        <div className="space-y-1">
                            <h3 className="font-serif text-2xl font-bold tracking-tight">David Van Patten</h3>
                            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">President</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="h-px w-8 bg-black/20" />
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="font-serif text-sm italic text-muted-foreground">Mergers & Acquisitions</p>
                                    <p className="font-mono text-[10px] text-muted-foreground">Added 1 week ago</p>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                    <Link href="/u/david" className="font-mono text-xs underline decoration-black/30 hover:decoration-black underline-offset-4">
                                        View Card
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
