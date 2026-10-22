/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        nexora: {
          bg: "#060A17",
          dark: "#090E23",
          surface: "#0D1533",
          card: "rgba(16, 26, 60, 0.65)",
          cardHover: "rgba(24, 38, 86, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
          borderGlow: "rgba(59, 130, 246, 0.3)",
          electric: "#0066FF",
          cyan: "#00D2FF",
          emerald: "#10B981",
          gold: "#F59E0B",
          rose: "#FF4757",
        },
        fintech: {
          dark: "#060A17",
          surface: "#0D1533",
          card: "#101A3C",
          border: "rgba(255, 255, 255, 0.1)",
          primary: "#0066FF",
          accent: "#00D2FF",
          profit: "#10B981",
          loss: "#FF4757",
          warning: "#F59E0B",
          muted: "#8E9BB5"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-blue': '0 0 35px -5px rgba(0, 102, 255, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(0, 210, 255, 0.3)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
