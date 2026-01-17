import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Starfield from "./components/Starfield";
import BackgroundMusic from "./components/BackgroundMusic";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Solaris | Explore Our Solar System",
    description:
        "An immersive scrollytelling journey through our solar system. Explore the Sun, planets, and discover fascinating facts about our cosmic neighborhood.",
    keywords: [
        "solar system",
        "planets",
        "space",
        "astronomy",
        "sun",
        "earth",
        "mars",
        "jupiter",
        "saturn",
    ],
    openGraph: {
        title: "Solaris | Explore Our Solar System",
        description: "An immersive scrollytelling journey through our solar system.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
                <CustomCursor />
                <Starfield />
                <BackgroundMusic />
                {children}
            </body>
        </html>
    );
}
