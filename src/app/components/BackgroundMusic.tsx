"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false); // Default to false for SSR
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        if (audioRef.current) {
            audioRef.current.volume = 0.4;

            // Try to play immediately
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    setIsPlaying(false);
                });
            }
        }
    }, [isMounted]);

    useEffect(() => {
        const startAudio = () => {
            if (audioRef.current && !hasInteracted) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => { });
                setHasInteracted(true);
            }
        };

        window.addEventListener("click", startAudio, { once: true });
        window.addEventListener("keydown", startAudio, { once: true });

        return () => {
            window.removeEventListener("click", startAudio);
            window.removeEventListener("keydown", startAudio);
        };
    }, [hasInteracted]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (!isMounted) return null;

    return (
        <motion.div
            className="fixed bottom-8 left-8 z-50 mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <audio ref={audioRef} loop autoPlay>
                <source src="/audio/background.mp3" type="audio/mpeg" />
            </audio>

            <button
                onClick={togglePlay}
                suppressHydrationWarning
                className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all group cursor-none"
                aria-label={isPlaying ? "Mute background music" : "Play background music"}
            >
                {isPlaying ? (
                    <Volume2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                ) : (
                    <VolumeX className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                )}
            </button>
        </motion.div>
    );
}
