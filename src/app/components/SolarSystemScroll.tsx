"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { solarSystem } from "../data/solarSystemData";

interface SolarSystemScrollProps {
    onIndexChange: (index: number) => void;
    onImageClick: (index: number) => void;
    onScrollProgress: (progress: number) => void;
    onImagesLoaded: (loaded: boolean, progress: number) => void;
}

export default function SolarSystemScroll({
    onIndexChange,
    onImageClick,
    onScrollProgress,
    onImagesLoaded,
}: SolarSystemScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Transform scroll progress to image index
    const imageIndex = useTransform(scrollYProgress, [0, 1], [0, 8]);

    // Load all images
    useEffect(() => {
        const loadImages = async () => {
            const imagePaths = solarSystem.map((body) => body.image);
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 0; i < imagePaths.length; i++) {
                const img = new Image();
                img.src = imagePaths[i];

                await new Promise<void>((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = () => {
                        console.error(`Failed to load image: ${imagePaths[i]}`);
                        resolve(); // Continue even if an image fails
                    };
                });

                loadedImages.push(img);
                onImagesLoaded(false, ((i + 1) / imagePaths.length) * 100);
            }

            imagesRef.current = loadedImages;
            setIsLoaded(true);
            onImagesLoaded(true, 100);
        };

        loadImages();
    }, [onImagesLoaded]);

    // Handle canvas resize
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
    }, []);

    useEffect(() => {
        resizeCanvas();

        const debouncedResize = debounce(resizeCanvas, 100);
        window.addEventListener("resize", debouncedResize);

        return () => {
            window.removeEventListener("resize", debouncedResize);
        };
    }, [resizeCanvas]);

    // Draw images with crossfade
    const drawImages = useCallback((progress: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const images = imagesRef.current;

        if (!canvas || !ctx || images.length === 0) return;

        const rect = canvas.getBoundingClientRect();
        const canvasWidth = rect.width;
        const canvasHeight = rect.height;

        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Calculate current and next image indices
        const currentIndex = Math.floor(progress);
        const nextIndex = Math.min(currentIndex + 1, images.length - 1);
        const fadeAmount = progress - currentIndex;

        // Calculate image dimensions (60-70% of viewport height)
        const targetHeight = canvasHeight * 0.65;

        const drawCenteredImage = (img: HTMLImageElement, alpha: number) => {
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const aspectRatio = img.naturalWidth / img.naturalHeight;
            let drawWidth = targetHeight * aspectRatio;
            let drawHeight = targetHeight;

            // Ensure image doesn't exceed canvas width
            if (drawWidth > canvasWidth * 0.9) {
                drawWidth = canvasWidth * 0.9;
                drawHeight = drawWidth / aspectRatio;
            }

            const x = (canvasWidth - drawWidth) / 2;
            const y = (canvasHeight - drawHeight) / 2;

            ctx.globalAlpha = alpha;
            ctx.drawImage(img, x, y, drawWidth, drawHeight);
        };

        // Draw current image (fading out)
        if (images[currentIndex]) {
            drawCenteredImage(images[currentIndex], 1 - fadeAmount);
        }

        // Draw next image (fading in)
        if (images[nextIndex] && currentIndex !== nextIndex) {
            drawCenteredImage(images[nextIndex], fadeAmount);
        }

        // Reset alpha
        ctx.globalAlpha = 1;
    }, []);

    // Animation loop
    useEffect(() => {
        if (!isLoaded) return;

        const animate = () => {
            const progress = imageIndex.get();
            drawImages(progress);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isLoaded, imageIndex, drawImages]);

    // Track index changes
    useMotionValueEvent(imageIndex, "change", (latest) => {
        const roundedIndex = Math.round(latest);
        onIndexChange(roundedIndex);
    });

    // Track scroll progress
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        onScrollProgress(latest);
    });

    // Handle canvas click
    const handleCanvasClick = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check if click is within the image area (center 70%)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const imageRadius = Math.min(rect.width, rect.height) * 0.35;

            const distance = Math.sqrt(
                Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );

            if (distance <= imageRadius) {
                const currentIdx = Math.round(imageIndex.get());
                onImageClick(currentIdx);
            }
        },
        [imageIndex, onImageClick]
    );

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: "900vh" }}
            role="region"
            aria-label="Solar system scroll explorer"
        >
            <div className="canvas-container">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-pointer"
                    onClick={handleCanvasClick}
                    style={{ display: isLoaded ? "block" : "none" }}
                    role="img"
                    aria-label={`Currently viewing ${solarSystem[Math.round(imageIndex.get())]?.name || "celestial body"}`}
                />
            </div>
        </div>
    );
}

// Utility function for debouncing
function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
