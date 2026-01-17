"use client";

import { motion } from "framer-motion";

export default function Header() {
    const handleLogoClick = () => {
        window.location.href = "/";
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-8 bg-gradient-to-b from-black/60 to-transparent transition-all duration-300">
            <nav className="flex items-center justify-center max-w-7xl mx-auto">
                {/* Minimalist Logo */}
                <button onClick={handleLogoClick} className="group cursor-pointer">
                    <motion.div
                        className="relative flex items-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                        {/* Logo text - elegant and minimal */}
                        <span
                            className="font-space font-light text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/90"
                            style={{
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            S<span className="text-amber-400">O</span>LARIS
                        </span>
                    </motion.div>
                </button>
            </nav>
        </header>
    );
}
