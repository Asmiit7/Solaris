import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                sun: "#FDB813",
                mercury: "#8C7853",
                venus: "#FFC649",
                earth: "#4A90E2",
                mars: "#E27B58",
                jupiter: "#C88B3A",
                saturn: "#FAD5A5",
                uranus: "#4FD0E7",
                neptune: "#4166F5",
            },
            fontFamily: {
                space: ["var(--font-space-grotesk)", "sans-serif"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
