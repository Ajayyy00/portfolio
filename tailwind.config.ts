import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#171310",
        surface: "#1F1A15",
        raised: "#282119",
        border: "#362D23",
        text: {
          DEFAULT: "#F0EAE0",
          muted: "#A89C8C",
        },
        // Domain-tagged accents (warm-tuned)
        ai: "#E29D71", // copper → AI / primary
        fullstack: "#A9C39B", // sage → Full-Stack
        security: "#E4C57E", // honey → Security
        systems: "#BCA7DA", // lavender → Systems / hardware
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-ai": "0 12px 40px -12px rgba(226, 157, 113, 0.4)",
        "glow-fullstack": "0 12px 40px -12px rgba(169, 195, 155, 0.4)",
        "glow-security": "0 12px 40px -12px rgba(228, 197, 126, 0.4)",
        "glow-systems": "0 12px 40px -12px rgba(188, 167, 218, 0.4)",
        card: "0 1px 2px rgba(0,0,0,0.25), 0 8px 24px -12px rgba(0,0,0,0.5)",
        "card-hover":
          "0 2px 4px rgba(0,0,0,0.25), 0 24px 48px -16px rgba(0,0,0,0.55)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        drift1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(6vw, 4vh) scale(1.12)" },
        },
        drift2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-5vw, -5vh) scale(1.08)" },
        },
        drift3: {
          "0%, 100%": { transform: "translate(0, 0) scale(1.05)" },
          "50%": { transform: "translate(4vw, -4vh) scale(0.95)" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        drift1: "drift1 26s ease-in-out infinite",
        drift2: "drift2 32s ease-in-out infinite",
        drift3: "drift3 38s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
