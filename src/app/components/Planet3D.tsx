"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Planet3DProps {
    textureUrl: string;
    isSun?: boolean;
    isSaturn?: boolean;
    accentColor?: string;
    className?: string;
}

export default function Planet3D({
    textureUrl,
    isSun = false,
    accentColor = "#4A90E2",
    className = "",
}: Planet3DProps) {


    const hoverGlow = isSun
        ? `drop-shadow(0 0 60px ${accentColor}) drop-shadow(0 0 120px ${accentColor})`
        : `drop-shadow(0 0 40px ${accentColor}) drop-shadow(-20px 20px 40px rgba(0,0,0,0.6))`;

    // Default glow is now visible (but softer) to ensure planets look good without hover (mobile)
    const baseGlow = isSun
        ? `drop-shadow(0 0 20px ${accentColor})`
        : `drop-shadow(0 0 10px ${accentColor}) drop-shadow(-10px 10px 20px rgba(0,0,0,0.4))`;

    return (
        <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
            {/* Planet container with floating interaction */}
            <motion.div
                className="relative"
                style={{
                    width: "100%",
                    height: "100%",
                    willChange: "transform",
                }}
                animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 2, 0, -2, 0],
                }}
                transition={{
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                {/* Planet image - Glow intensifies on hover */}
                <motion.div
                    className="relative w-full h-full rounded-full"
                    initial={{ filter: baseGlow, scale: 1 }}
                    animate={{ filter: baseGlow, scale: 1 }}
                    whileHover={{
                        scale: 1.1,
                        filter: hoverGlow,
                        transition: { duration: 0.3, ease: "easeOut" }
                    }}
                >
                    <Image
                        src={textureUrl}
                        alt="Planet"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                        className="object-contain scale-[1.8] pointer-events-none"
                        priority
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
