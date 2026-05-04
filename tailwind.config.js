/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. CRITICAL: Enable class-based dark mode so use-dark-mode can trigger it
  darkMode: 'class', 

  content: [
    // 2. IMPORTANT: Added "./app/**/*.{js,ts,jsx,tsx}" since your structure uses the App Router
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated to a neutral monochrome palette
        primary: {
          DEFAULT: "#000000", 
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      animation: {
        shine: "shine 1s forwards",[cite: 5]
      },
      keyframes: {
        shine: {
          "0%": { left: "-50%" },
          "100%": { left: "125%" },
        },[cite: 5]
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],[cite: 5]
}