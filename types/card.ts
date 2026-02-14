export type CardTheme = 'monochrome' | 'cyberpunk' | 'luxury' | 'brutalist';
export type CardTexture = 'noise' | 'grid' | 'lines' | 'circuit' | 'leather';

export interface ContactCard {
    id: string;
    name: string;
    role: string;
    company: string;
    email: string;
    theme: {
        variant: CardTheme;
        fontHead: string;
        fontBody: string;
        texture: CardTexture;
        customColors?: {
            bg?: string;
            fg?: string;
            accent?: string;
        }
    }
}
