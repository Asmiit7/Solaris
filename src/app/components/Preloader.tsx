"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

interface PreloaderProps {
    progress: number;
    isLoaded: boolean;
}

// Fixed star positions to avoid hydration mismatch
const STAR_CONFIGS = [
    { width: 3, height: 3, left: 25, top: 30, duration: 1.8, delay: 0.1 },
    { width: 4, height: 4, left: 55, top: 45, duration: 2.0, delay: 0.3 },
    { width: 2, height: 2, left: 70, top: 25, duration: 1.6, delay: 0.0 },
    { width: 5, height: 5, left: 35, top: 65, duration: 2.2, delay: 0.4 },
    { width: 3, height: 3, left: 60, top: 70, duration: 1.9, delay: 0.2 },
];

export default function Preloader({ progress, isLoaded }: PreloaderProps) {
    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    className="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Pulsing stars animation */}
                    <div className="relative w-32 h-32 mb-8">
                        {STAR_CONFIGS.map((star, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-white"
                                style={{
                                    width: star.width,
                                    height: star.height,
                                    left: `${star.left}%`,
                                    top: `${star.top}%`,
                                }}
                                animate={{
                                    opacity: [0.2, 0.8, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: star.duration,
                                    repeat: Infinity,
                                    delay: star.delay,
                                }}
                            />
                        ))}
                        {/* Central glow */}
                        <motion.div
                            suppressHydrationWarning
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(253,184,19,0.3) 0%, transparent 70%)",
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />
                    </div>

                    {/* Progress bar */}
                    <div className="preloader-progress">
                        <motion.div
                            className="preloader-progress-bar"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Loading text */}
                    <motion.p
                        className="preloader-text font-space uppercase"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Preparing your journey through the Solar System...
                    </motion.p>

                    {/* Progress percentage */}
                    <p className="text-2xl font-space font-bold mt-4">
                        {Math.round(progress)}%
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
