import type { Config } from "tailwindcss";
import fluid, {
  extract,
  screens,
  fontSize,
  FluidThemeConfig,
} from "fluid-tailwind";

export default {
  darkMode: "class",
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    fluid: (({ theme }) => ({
      defaultScreens: ["20rem", theme("screens.lg")],
    })) satisfies FluidThemeConfig,
    screens,
    fontSize,
    extend: {
      fontFamily: {
        sans: ["var(--font-bowlby-sc)"],
        mono: ["var(--font-dm-mono)"],
        display: ["var(--font-bowlby-sc)", "cursive"],
        body: ["var(--font-dm-mono)", "monospace"],
        anton: ["var(--font-anton)", "sans-serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        marker: ["var(--font-marker)", "cursive"],
        rubik: ["var(--font-rubik)", "sans-serif"],
        roboto: ["var(--font-roboto)", "monospace"],
        courier: ["var(--font-courier)", "monospace"],
      },
      colors: {
        // Original brand colors
        "brand-orange": "#ff6b35",
        "brand-blue": "#4876ff",
        "brand-pink": "#f7d0e9",
        "brand-purple": "#7c3aed",
        "brand-lime": "#d9f154",
        // Cart Zine Colors
        "suburbia-blue": "#2e3192",
        "suburbia-purple": "#8b5cf6",
        "suburbia-lime": "#d9f154",
        "paper-cream": "#fdfbf7",
        // Zine theme colors
        primary: "#ff6b35",
        secondary: "#8b5cf6",
        "background-light": "#f7d0e9",
        "background-dark": "#1a1a1a",
        "zine-blue": "#0057ff",
      },
      boxShadow: {
        sketch: "3px 3px 0 rgba(0,0,0,1)",
        "sketch-lg": "6px 6px 0 rgba(0,0,0,1)",
        "sketch-white": "3px 3px 0 rgba(255,255,255,1)",
      },
      keyframes: {
        squiggle: {
          "0%": { filter: 'url("#squiggle-0")' },
          "25%": { filter: 'url("#squiggle-1")' },
          "50%": { filter: 'url("#squiggle-2")' },
          "75%": { filter: 'url("#squiggle-3")' },
          "100%": { filter: 'url("#squiggle-4")' },
        },
      },
      animation: {
        squiggle: "squiggle .5s infinite",
      },
    },
  },
  plugins: [fluid],
} satisfies Config;
