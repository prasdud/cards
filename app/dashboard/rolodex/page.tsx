"use client";

import { Rolodex } from "@/components/rolodex/rolodex";
import { ContactCard } from "@/types/card";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

const DUMMY_CARDS: ContactCard[] = [
    {
        id: "1",
        slug: "patrick-bateman",
        name: "Patrick Bateman",
        role: "Vice President",
        company: "Pierce & Pierce",
        email: "patrick.b@pierce.com",
        theme: {
            variant: "monochrome",
            fontHead: "serif",
            fontBody: "sans",
            texture: "lines"
        }
    },
    {
        id: "2",
        slug: "paul-allen",
        name: "Paul Allen",
        role: "Managing Director",
        company: "Fisher Account",
        email: "paul.allen@pierce.com",
        theme: {
            variant: "luxury",
            fontHead: "serif",
            fontBody: "serif",
            texture: "noise"
        }
    },
    {
        id: "3",
        slug: "k",
        name: "K",
        role: "Blade Runner",
        company: "LAPD",
        email: "kd6-3.7@lapd.gov",
        theme: {
            variant: "cyberpunk",
            fontHead: "mono",
            fontBody: "mono",
            texture: "grid"
        }
    },
    {
        id: "4",
        slug: "tyler-durden",
        name: "Tyler Durden",
        role: "Soap Maker",
        company: "Paper Street Soap Co.",
        email: "tyler@paperstreet.com",
        theme: {
            variant: "brutalist",
            fontHead: "sans",
            fontBody: "mono",
            texture: "noise"
        }
    },
    {
        id: "5",
        slug: "david-van-patten",
        name: "David Van Patten",
        role: "President",
        company: "P&P Mergers",
        email: "david.vp@pierce.com",
        theme: {
            variant: "monochrome",
            fontHead: "serif",
            fontBody: "sans",
            texture: "lines"
        }
    }
];

export default function RolodexPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (!query) return;

        // Find the first matching card
        const index = DUMMY_CARDS.findIndex(card => 
            card.name.toLowerCase().includes(query.toLowerCase()) ||
            card.company.toLowerCase().includes(query.toLowerCase()) ||
            card.role.toLowerCase().includes(query.toLowerCase())
        );

        if (index !== -1) {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="h-full flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black pb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold tracking-tight">Rolodex</h1>
                    <p className="text-muted-foreground font-serif italic mt-1">Your curated collection of digital identities.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input 
                        type="text" 
                        placeholder="Search contacts..." 
                        value={searchQuery}
                        onChange={handleSearch}
                        className="pl-6 pr-4 py-2 border-b-2 border-black bg-transparent focus:outline-none focus:border-b-4 transition-all w-full md:w-64 font-mono text-xs placeholder:italic placeholder:text-muted-foreground/50"
                    />
                </div>
            </div>

            <div className="flex-1 w-full relative">
                <Rolodex 
                    cards={DUMMY_CARDS} 
                    currentIndex={currentIndex}
                    onIndexChange={setCurrentIndex}
                />
            </div>
        </div>
    );
}
