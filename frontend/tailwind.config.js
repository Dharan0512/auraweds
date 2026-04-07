/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        background: "#020617",
        foreground: "#f8fafc",
        primary: "#8b5cf6",
        secondary: "#d4af37",
        navy: {
          900: "#020617",
          950: "#010413",
        },
        gold: {
          DEFAULT: "#d4af37",
          50: "#fdfbf5",
          100: "#fbf6eb",
          200: "#f5e9ce",
          300: "#eedcb0",
          400: "#e8cf93",
          500: "#d4af37",
          600: "#bc9b31",
          700: "#9e8229",
          800: "#7f6921",
          900: "#67561b",
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
