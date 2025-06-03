// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokémon Insight | Explore Pokémon Data, Moves, Species & More",
  description:
    "Dive into the world of Pokémon with detailed insights on abilities, species, moves, and types.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${pressStart.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
