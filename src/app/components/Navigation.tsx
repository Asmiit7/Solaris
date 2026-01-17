"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { solarSystem } from "../data/solarSystemData";

interface NavigationProps {
    currentIndex: number;
    onNavigate: (index: number) => void;
}

export default function Navigation({ currentIndex, onNavigate }: NavigationProps) {
    const handlePrevious = () => {
        if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < solarSystem.length - 1) {
            onNavigate(currentIndex + 1);
        }
    };

    return (
        <>
            {/* Planet name display */}
            <AnimatePresence mode="wait">
                <motion.h1
                    key={currentIndex}
                    className="planet-name font-space"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    aria-live="polite"
                >
                    {solarSystem[currentIndex].name}
                </motion.h1>
            </AnimatePresence>

            {/* Left arrow */}
            <button
                className="nav-arrow nav-arrow--left"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                aria-label="Navigate to previous celestial body"
                style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
            >
                <ChevronLeft size={32} color="white" />
            </button>

            {/* Right arrow */}
            <button
                className="nav-arrow nav-arrow--right"
                onClick={handleNext}
                disabled={currentIndex === solarSystem.length - 1}
                aria-label="Navigate to next celestial body"
                style={{ opacity: currentIndex === solarSystem.length - 1 ? 0.3 : 1 }}
            >
                <ChevronRight size={32} color="white" />
            </button>

            {/* Bottom indicator dots */}
            <nav className="nav-dots" role="navigation" aria-label="Solar system navigation">
                {solarSystem.map((body, index) => (
                    <button
                        key={body.id}
                        className={`nav-dot ${index === currentIndex ? "nav-dot--active" : ""}`}
                        onClick={() => onNavigate(index)}
                        aria-label={`Navigate to ${body.name}`}
                        aria-current={index === currentIndex ? "true" : undefined}
                        style={{
                            backgroundColor: index === currentIndex ? body.accentColor : undefined,
                        }}
                    >
                        <span className="nav-dot-tooltip">{body.name}</span>
                    </button>
                ))}
            </nav>
        </>
    );
}
