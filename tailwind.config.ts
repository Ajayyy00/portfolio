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
        bg: "#0A0A0F",
        surface: "#111117",
        border: "#1E1E2E",
        text: {
          DEFAULT: "#E4E4ED",
          muted: "#6B6B80",
        },
        // Domain-tagged accents
        ai: "#3B82F6", // blue   → AI / primary
        fullstack: "#10B981", // green  → Full-Stack / success
        security: "#F59E0B", // amber  → Security / warning
        systems: "#8B5CF6", // purple → Systems / hardware
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-ai": "0 12px 40px -12px rgba(59, 130, 246, 0.45)",
        "glow-fullstack": "0 12px 40px -12px rgba(16, 185, 129, 0.45)",
        "glow-security": "0 12px 40px -12px rgba(245, 158, 11, 0.45)",
        "glow-systems": "0 12px 40px -12px rgba(139, 92, 246, 0.45)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
