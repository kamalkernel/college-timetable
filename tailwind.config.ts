import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0f172a",
          panel: "#1e293b",
          raised: "#334155",
          line: "#475569",
        },
        retro: {
          window: "#c0c7d0",
          menubar: "#dcdfe4",
          blue: "#1c3a6b",
          accent: "#2563eb",
          sky: "#90bde6",
          skyLight: "#c7e0f4",
          card: "#ffffff",
          btn: "#d1d5db",
          planeOrange: "#f97316",
          planeRed: "#e11d48",
          planeYellow: "#fbbf24",
        },
        board: {
          amber: "#f59e0b",
          teal: "#0d9488",
          rose: "#e11d48",
          sky: "#0284c7",
          violet: "#7c3aed",
          mist: "#64748b",
          paper: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        retro: "8px",
      },
      boxShadow: {
        retroWindow: "0 25px 60px -15px rgba(0, 0, 0, 0.45), 0 0 0 2px #000000",
        retroCard: "3px 3px 0px 0px #000000",
        retroBtn: "inset -2px -2px 0px #000000, inset 2px 2px 0px #ffffff",
        retroBtnActive: "inset 2px 2px 0px #000000, inset -2px -2px 0px #ffffff",
        retroInset: "inset 2px 2px 0px #888888, inset -2px -2px 0px #ffffff",
      },
      keyframes: {
        floatPlane: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        bankPlane: {
          "0%, 100%": { transform: "translate(0px, 0px) rotate(-35deg)" },
          "50%": { transform: "translate(10px, -15px) rotate(-32deg)" },
        },
        cloudDrift: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(25px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "float-plane": "floatPlane 5s ease-in-out infinite",
        "bank-plane": "bankPlane 6s ease-in-out infinite",
        "cloud-drift": "cloudDrift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
