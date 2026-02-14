import { ContactCard } from "@/types/card";

export interface RolodexProps {
    cards: ContactCard[];
}

export type FlipDirection = 'up' | 'down' | null;
