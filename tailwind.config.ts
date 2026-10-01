import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FAF6EE",
          100: "#F5EFE4",
          200: "#E9DFCE",
          300: "#D9CBB4",
        },
        maroon: {
          700: "#631720",
          800: "#4A0E17",
          900: "#31080D",
        },
        saffron: {
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        gold: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        spiritual: {
          bg: "#FAF6EE",
          card: "#F5EFE4",
          border: "#E4D9C5",
          text: "#3A2A20",
          heading: "#4A0E17",
          accent: "#D97706",
        }
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(74, 14, 23, 0.05)",
        card: "0 2px 12px rgba(74, 14, 23, 0.06)",
        hover: "0 8px 24px rgba(74, 14, 23, 0.12)",
      }
    },
  },
  plugins: [],
};
export default config;
