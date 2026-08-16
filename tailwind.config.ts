import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#070A12",
          panel: "#0D1322",
          raised: "#111A2D",
          line: "#26324A",
        },
        board: {
          amber: "#F5A524",
          teal: "#2DD4BF",
          rose: "#FB7185",
          sky: "#38BDF8",
          violet: "#A78BFA",
          mist: "#8892A6",
          paper: "#EEF1F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        board: "0 18px 60px rgba(0,0,0,0.28), inset 0 1px 0 0 rgba(255,255,255,0.08)",
        glow: "0 0 50px rgba(45,212,191,0.18)",
      },
      keyframes: {
        flip: {
          "0%": { transform: "translateY(14px) scale(0.98)", opacity: "0" },
          "60%": { transform: "translateY(-2px) scale(1.01)", opacity: "1" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(45,212,191,0)" },
          "50%": { boxShadow: "0 0 34px rgba(45,212,191,0.28)" },
        },
      },
      animation: {
        flip: "flip 0.35s ease-out forwards",
        "pulse-glow": "pulseGlow 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
