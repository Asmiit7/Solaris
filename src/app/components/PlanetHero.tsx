"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { solarSystem, CelestialBody } from "../data/solarSystemData";
import InteractiveText from "./InteractiveText";

// Dynamically import Planet3D to avoid SSR issues with Three.js
const Planet3D = dynamic(() => import("./Planet3D"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-white/20 rounded-full animate-pulse" />
        </div>
    ),
});

interface PlanetHeroProps {
    currentBody: CelestialBody;
    currentIndex: number;
    onNavigate: (direction: "prev" | "next") => void;
    onLearnMore: () => void;
}

export default function PlanetHero({
    currentBody,
    currentIndex,
    onNavigate,
    onLearnMore,
}: PlanetHeroProps) {
    const prevBody = currentIndex > 0 ? solarSystem[currentIndex - 1] : null;
    const nextBody =
        currentIndex < solarSystem.length - 1 ? solarSystem[currentIndex + 1] : null;

    // Get subtitle based on body type
    const getSubtitle = () => {
        switch (currentBody.id) {
            case "sun":
                return "THE HEART OF OUR SYSTEM";
            case "mercury":
                return "THE SWIFT MESSENGER";
            case "venus":
                return "THE EVENING STAR";
            case "earth":
                return "THE BLUE PLANET";
            case "mars":
                return "THE RED PLANET";
            case "jupiter":
                return "THE GAS GIANT";
            case "saturn":
                return "THE RINGED BEAUTY";
            case "uranus":
                return "THE ICE GIANT";
            case "neptune":
                return "THE DISTANT BLUE";
            default:
                return "SOLAR SYSTEM";
        }
    };

    return (
        <section className="relative h-screen flex items-center overflow-hidden z-10 pt-20 md:pt-0">
            {/* Background gradient */}

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 md:gap-12 items-center h-full md:h-auto overflow-y-auto md:overflow-visible py-8 md:py-0 no-scrollbar">
                {/* Left side - Text content */}
                <div className="space-y-4 md:space-y-6 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentBody.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4"
                        >
                            {/* ... text content ... */}
                            {/* Subtitle */}
                            <p
                                className="text-xs md:text-sm tracking-[0.3em] font-space"
                                style={{ color: currentBody.accentColor }}
                            >
                                {getSubtitle()}
                            </p>

                            {/* Planet Name */}
                            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-space font-bold text-white leading-none">
                                {currentBody.name.toUpperCase().replace("THE ", "")}
                            </h1>

                            {/* Divider */}
                            <div
                                className="w-16 h-0.5 mt-4 md:mx-0 mx-auto"
                                style={{ backgroundColor: currentBody.accentColor }}
                            />

                            {/* Description */}
                            <InteractiveText className="text-white/60 text-sm md:text-base leading-relaxed max-w-md font-inter mx-auto md:mx-0">
                                {currentBody.description.slice(0, 200) + "..."}
                            </InteractiveText>

                            {/* CTA Buttons */}
                            <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                                <button
                                    onClick={onLearnMore}
                                    className="px-8 py-3 bg-white/10 border border-white/30 rounded-full text-white font-space text-sm hover:bg-white/20 transition-all hover:scale-105"
                                >
                                    LEARN MORE
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right side - Planet 3D */}
                <div className="relative flex justify-center lg:justify-end lg:mr-0 lg:translate-x-0 order-1 md:order-2 h-[40vh] md:h-auto items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentBody.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* 3D Planet */}
                            <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[420px] lg:h-[420px]">
                                <Planet3D
                                    textureUrl={currentBody.image}
                                    isSun={currentBody.id === "sun"}
                                    isSaturn={currentBody.id === "saturn"}
                                    accentColor={currentBody.accentColor}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


            {/* Bottom navigation dots */}
            <div className="absolute bottom-8 right-8 flex gap-2">
                {solarSystem.map((body, index) => (
                    <button
                        key={body.id}
                        onClick={() => {
                            const diff = index - currentIndex;
                            if (diff !== 0) {
                                onNavigate(diff > 0 ? "next" : "prev");
                            }
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                            ? "w-8"
                            : "bg-white/30 hover:bg-white/50"
                            }`}
                        style={{
                            backgroundColor:
                                index === currentIndex ? currentBody.accentColor : undefined,
                        }}
                        aria-label={`Go to ${body.name}`}
                    />
                ))}
            </div>
        </section>
    );
}
