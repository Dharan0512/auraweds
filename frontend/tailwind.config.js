/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
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
        // Deep royal purple — primary brand color (landing)
        royal: {
          DEFAULT: "#4c1d95",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        // Warm ivory backgrounds (landing)
        ivory: {
          DEFAULT: "#fbf7f0",
          50: "#fffefb",
          100: "#fdfbf6",
          200: "#fbf7f0",
          300: "#f6efe2",
          400: "#efe3cd",
          500: "#e6d5b6",
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
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(76, 29, 149, 0.08), 0 8px 24px -8px rgba(76, 29, 149, 0.10)",
        "soft-lg": "0 4px 16px -4px rgba(76, 29, 149, 0.10), 0 24px 48px -12px rgba(76, 29, 149, 0.16)",
        gold: "0 8px 30px -8px rgba(201, 162, 39, 0.35)",
        royal: "0 12px 40px -12px rgba(76, 29, 149, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "spin-slow": "spin 22s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "royal-gradient": "linear-gradient(135deg, #2e1065 0%, #4c1d95 45%, #6d28d9 100%)",
        "gold-gradient": "linear-gradient(135deg, #ead08a 0%, #c9a227 50%, #b08a20 100%)",
        "ivory-radial":
          "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(124,58,237,0.08), transparent), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(201,162,39,0.10), transparent)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
