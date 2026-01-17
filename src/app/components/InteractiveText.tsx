import React from "react";

interface InteractiveTextProps {
    children: string;
    className?: string;
}

export default function InteractiveText({
    children,
    className = "",
}: InteractiveTextProps) {
    if (!children) return null;

    // Split text into words, preserving spaces
    const words = children.split(" ");

    return (
        <p className={`${className} flex flex-wrap gap-x-[0.25em]`}>
            {words.map((word, index) => (
                <span
                    key={index}
                    className="inline-block cursor-none transition-all duration-200 ease-out hover:text-white hover:scale-[1.35] hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)] hover:z-50 mx-[0.1em]"
                    style={{
                        color: "rgba(255, 255, 255, 0.6)", // Initial state matches previous
                    }}
                >
                    {word}
                </span>
            ))}
        </p>
    );
}
