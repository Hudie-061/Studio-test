import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        newsreader: ["var(--font-newsreader)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        "bg-primary":  "#0F0E0C",
        "bg-warm":     "#F5F1EA",
        "bg-elevated": "#1A1816",
        "accent-amber": "#C8895A",
        "accent-sage":  "#6B7A6E",
      },
      animation: {
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
        grain:           "grain 8s steps(10) infinite",
      },
      keyframes: {
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(8px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":      { transform: "translate(-5%, -10%)" },
          "20%":      { transform: "translate(-15%, 5%)" },
          "30%":      { transform: "translate(7%, -25%)" },
          "40%":      { transform: "translate(20%, 25%)" },
          "50%":      { transform: "translate(-25%, 10%)" },
          "60%":      { transform: "translate(15%, 5%)" },
          "70%":      { transform: "translate(0, 15%)" },
          "80%":      { transform: "translate(3%, 35%)" },
          "90%":      { transform: "translate(-10%, 10%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
