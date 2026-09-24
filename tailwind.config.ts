import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F6F4",
        ink: "#132520",
        forest: "#155E4F",
        "forest-dark": "#0C3B32",
        "forest-mist": "#E3EDE9",
        alert: "#B45309",
        "alert-bg": "#FEF3C7",
        found: "#15803D",
        "found-bg": "#DCFCE7",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
