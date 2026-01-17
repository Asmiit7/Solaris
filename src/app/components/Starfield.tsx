"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
}

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Canvas for twinkling stars
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let stars: Star[] = [];
        let animationFrameId: number;
        let width = 0;
        let height = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const starCount = Math.floor((width * height) / 8000); // Optimized density for performance
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5,
                    opacity: Math.random(),
                    speed: Math.random() * 0.02 + 0.005, // Twinkle speed
                });
            }
        };

        const update = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                // Twinkle effect: oscillate opacity
                star.opacity += star.speed;
                if (star.opacity > 1 || star.opacity < 0) {
                    star.speed = -star.speed;
                }
                const currentOpacity = Math.abs(Math.sin(star.opacity)); // Smooth sine wave

                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener("resize", resize);
        resize();
        update();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden bg-black">
            {/* Layer 1: The Realistic Milky Way Texture (Slowly Rotating) */}
            {/* Layer 1: The Realistic Milky Way Texture (Slowly Rotating) */}
            <div
                className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[spin_600s_linear_infinite]"
                style={{
                    backgroundImage: "url('/Texture/2k_stars_milky_way.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.85,
                    willChange: "transform", // Force GPU acceleration
                }}
            />

            {/* Layer 2: Twinkling Canvas Stars (Foreground) */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
            />
        </div>
    );
}
