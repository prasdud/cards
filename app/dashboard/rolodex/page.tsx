"use client";

import { Rolodex } from "@/components/rolodex/rolodex";
import { ContactCard } from "@/types/card";

const DUMMY_CARDS: ContactCard[] = [
    {
        id: "1",
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

export default function SavedContactsPage() {
    return (
        <div className="h-full flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black pb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold tracking-tight">Rolodex</h1>
                    <p className="text-muted-foreground font-serif italic mt-1">Your curated collection of digital identities.</p>
                </div>
            </div>

            <div className="flex-1 w-full relative">
                <Rolodex cards={DUMMY_CARDS} />
            </div>
        </div>
    );
}
