"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useCallback } from "react";
import FactCard from "./FactCard";
import { CelestialBody } from "../data/solarSystemData";

import InteractiveText from "./InteractiveText";

interface InfoPanelProps {
    body: CelestialBody | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoPanel({ body, isOpen, onClose }: InfoPanelProps) {
    // Handle ESC key to close
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        },
        [isOpen, onClose]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Prevent body scroll when panel is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!body) return null;

    const isSun = body.type === "star";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="info-panel-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        role="button"
                        tabIndex={0}
                        aria-label="Close panel"
                        onKeyDown={(e) => e.key === "Enter" && onClose()}
                    />

                    {/* Panel */}
                    <motion.aside
                        className="info-panel"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="panel-title"
                    >
                        {/* Close button */}
                        <button
                            className="info-panel-close"
                            onClick={onClose}
                            aria-label="Close information panel"
                        >
                            <X size={28} />
                        </button>

                        {/* Content */}
                        <div className="pt-12 px-8">
                            <h2
                                id="panel-title"
                                className="text-5xl font-space font-bold mb-2"
                                style={{ color: body.accentColor }}
                            >
                                {body.name}
                            </h2>
                            <p className="text-white/60 text-sm uppercase tracking-wider">
                                {body.type === "star"
                                    ? "G-type Main-Sequence Star"
                                    : body.type === "terrestrial"
                                        ? "Terrestrial Planet"
                                        : body.type === "gas-giant"
                                            ? "Gas Giant"
                                            : "Ice Giant"}
                            </p>
                        </div>

                        {/* Image */}
                        <div className="px-8 mt-6">
                            <div
                                className="w-full h-48 rounded-xl overflow-hidden"
                                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                            >
                                <img
                                    src={body.panelImage}
                                    alt={body.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 px-8 mt-8">
                            {isSun ? (
                                <>
                                    {[
                                        { label: "Type", value: "G-type Star" },
                                        { label: "Age", value: body.age || "Unknown" },
                                        { label: "Diameter", value: body.diameter || "Unknown" },
                                        { label: "Mass", value: body.mass || "Unknown" },
                                        { label: "Surface Temp", value: body.surfaceTemp || "Unknown" },
                                        { label: "Core Temp", value: body.coreTemp || "Unknown" },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{
                                                scale: 1.05,
                                                borderColor: "rgba(255, 255, 255, 0.5)",
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            }}
                                            className="rounded-lg transition-colors"
                                        >
                                            <FactCard label={stat.label} value={stat.value} />
                                        </motion.div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {[
                                        { label: "Diameter", value: body.diameter || "Unknown" },
                                        { label: "Mass", value: body.mass || "Unknown" },
                                        { label: "Distance from Sun", value: body.distanceFromSun || "Unknown" },
                                        { label: "Orbital Period", value: body.orbitalPeriod || "Unknown" },
                                        { label: "Day Length", value: body.dayLength || "Unknown" },
                                        { label: "Temperature", value: body.temperature || "Unknown" },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{
                                                scale: 1.05,
                                                borderColor: "rgba(255, 255, 255, 0.5)",
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            }}
                                            className="rounded-lg transition-colors"
                                        >
                                            <FactCard label={stat.label} value={stat.value} />
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </div>

                        {/* About section */}
                        <div className="px-8 mt-8">
                            <h3 className="text-xl font-semibold mb-3 text-white/90">About</h3>
                            <InteractiveText className="text-white/70 leading-relaxed font-inter">
                                {body.description}
                            </InteractiveText>
                        </div>

                        {/* Did You Know section */}
                        <div className="px-8 mt-8 pb-12">
                            <h3 className="text-xl font-semibold mb-4 text-white/90">
                                Did You Know?
                            </h3>
                            <ul className="space-y-3">
                                {body.facts.map((fact, index) => (
                                    <li key={index} className="flex gap-3 text-white/70">
                                        <span style={{ color: body.accentColor }}>●</span>
                                        <InteractiveText className="font-inter">{fact}</InteractiveText>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
