import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cards - Minimalist Digital Identity",
  description: "Create stunning, minimalist digital business cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body
          className={cn(
            "min-h-full bg-background font-body text-foreground antialiased",
            playfair.variable,
            sourceSerif.variable,
            jetbrainsMono.variable
          )}
        >
          <div className="noise-bg fixed inset-0 z-50 pointer-events-none opacity-[0.02]" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
