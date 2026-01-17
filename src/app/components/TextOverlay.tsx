"use client";

import { motion } from "framer-motion";
import { narrativeText } from "../data/solarSystemData";

interface TextOverlayProps {
    scrollProgress: number;
}

export default function TextOverlay({ scrollProgress }: TextOverlayProps) {
    return (
        <>
            {narrativeText.map((item, index) => {
                // Calculate opacity based on scroll progress
                const fadeInStart = item.start;
                const fadeInEnd = item.start + 0.03;
                const fadeOutStart = item.end - 0.03;
                const fadeOutEnd = item.end;

                let opacity = 0;
                if (scrollProgress >= fadeInStart && scrollProgress <= fadeInEnd) {
                    opacity = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
                } else if (scrollProgress > fadeInEnd && scrollProgress < fadeOutStart) {
                    opacity = 1;
                } else if (scrollProgress >= fadeOutStart && scrollProgress <= fadeOutEnd) {
                    opacity = 1 - (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
                }

                if (opacity <= 0) return null;

                return (
                    <motion.div
                        key={index}
                        className={`text-overlay text-overlay--${item.position}`}
                        style={{ opacity }}
                        aria-hidden={opacity < 0.5}
                    >
                        <h2 className="font-space">{item.text}</h2>
                    </motion.div>
                );
            })}

            {/* Final CTA */}
            {scrollProgress >= 0.96 && (
                <motion.div
                    className="text-overlay text-overlay--center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="font-space text-3xl mb-4">Explore Our Solar System</h2>
                    <p className="text-white/70 mb-6">
                        Click on any celestial body to discover more
                    </p>
                    <button className="cta-button font-space">
                        Discover More
                    </button>
                </motion.div>
            )}
        </>
    );
}
