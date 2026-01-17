"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Header from "./components/Header";
import PlanetHero from "./components/PlanetHero";
import InfoPanel from "./components/InfoPanel";
import Preloader from "./components/Preloader";
import { solarSystem } from "./data/solarSystemData";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const currentBody = solarSystem[currentIndex];

    // Preload all images
    useEffect(() => {
        const loadImages = async () => {
            const imagePaths = solarSystem.map((body) => body.image);

            for (let i = 0; i < imagePaths.length; i++) {
                const img = new Image();
                img.src = imagePaths[i];

                await new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                });

                setLoadProgress(((i + 1) / imagePaths.length) * 100);
            }

            setTimeout(() => setIsLoaded(true), 500);
        };

        loadImages();
    }, []);

    // Handle navigation
    const handleNavigate = useCallback(
        (direction: "prev" | "next") => {
            if (direction === "prev" && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            } else if (direction === "next" && currentIndex < solarSystem.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        },
        [currentIndex]
    );

    // Handle learn more click - opens info panel
    const handleLearnMore = useCallback(() => {
        setIsPanelOpen(true);
    }, []);

    // Handle panel close
    const handleClosePanel = useCallback(() => {
        setIsPanelOpen(false);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isPanelOpen) return;

            switch (e.key) {
                case "ArrowLeft":
                    handleNavigate("prev");
                    break;
                case "ArrowRight":
                    handleNavigate("next");
                    break;
                case "Enter":
                case " ":
                    e.preventDefault();
                    setIsPanelOpen(true);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPanelOpen, handleNavigate]);

    // Scroll wheel navigation
    const lastScrollTime = useRef(0);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isPanelOpen) return;

            const now = Date.now();
            const timeSinceLastScroll = now - lastScrollTime.current;
            const scrollCooldown = 1200; // Increased cooldown to prevent skipping

            // If we are in cooldown, ignore everything
            if (timeSinceLastScroll < scrollCooldown) return;

            // Lowered threshold for trackpads (which often report small deltas)
            const deltaThreshold = 15;

            if (Math.abs(e.deltaY) > deltaThreshold) {
                if (e.deltaY > 0) {
                    handleNavigate("next");
                } else {
                    handleNavigate("prev");
                }
                lastScrollTime.current = now;
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        // Clean up
        return () => window.removeEventListener("wheel", handleWheel);
    }, [isPanelOpen, handleNavigate]);

    return (
        <main className="relative min-h-screen bg-transparent overflow-hidden">
            {/* Preloader */}
            <Preloader progress={loadProgress} isLoaded={isLoaded} />

            {/* Header */}
            {isLoaded && <Header />}

            {/* Planet Hero Section */}
            {isLoaded && (
                <PlanetHero
                    currentBody={currentBody}
                    currentIndex={currentIndex}
                    onNavigate={handleNavigate}
                    onLearnMore={handleLearnMore}
                />
            )}

            {/* Info Panel Sidebar */}
            <InfoPanel
                body={currentBody}
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
            />

            {/* Screen reader announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {isLoaded && `Now viewing ${currentBody.name}`}
            </div>
        </main>
    );
}
