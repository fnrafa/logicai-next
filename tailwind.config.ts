import type {Config} from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            animation: {
                bounceSlow: 'bounce 3s infinite',
                pulseFast: 'pulse 1s infinite',
            },
            colors: {
                primary: {
                    50: "#1a1a1a",
                    100: "#1f1f1f",
                    200: "#2b2b2b",
                    300: "#333333",
                    400: "#3d3d3d",
                    500: "#474747",
                    600: "#2f2f2f",
                    700: "#1e1e1e",
                    800: "#141414",
                    900: "#0d0d0d",
                },
                secondary: {
                    50: "#2e2e2e",
                    100: "#373737",
                    200: "#414141",
                    300: "#4b4b4b",
                    400: "#555555",
                    500: "#5f5f5f",
                    600: "#666666",
                    700: "#707070",
                    800: "#7a7a7a",
                    900: "#858585",
                },
                accent: {
                    400: "#0066ff",
                    500: "#004de6",
                    600: "#0033b3",
                },
                background: {
                    DEFAULT: "#0a0a0a",
                    light: "#1a1a1a",
                    dark: "#0a0a0a",
                },
            },
            fontFamily: {
                Nunito: ["Nunito", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
