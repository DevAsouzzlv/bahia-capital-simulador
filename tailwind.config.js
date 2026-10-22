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
        fintech: {
          dark: "#0F172A",
          surface: "#1E293B",
          card: "#162032",
          border: "#334155",
          primary: "#1E40AF",
          accent: "#3B82F6",
          profit: "#10B981",
          loss: "#EF4444",
          warning: "#F59E0B",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
