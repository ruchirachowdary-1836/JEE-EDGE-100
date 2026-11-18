import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: { 950: "#050816", 900: "#0a1028", 850: "#0e1533", 800: "#131c40", 700: "#1c2754", 600: "#28356b" },
        electric: { 300: "#7cc4ff", 400: "#4aa8ff", 500: "#2b8cff", 600: "#1a6fe0", 700: "#1457b3" },
        violet: { 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed" },
        phy: "#38bdf8",
        chem: "#34d399",
        math: "#f472b6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
