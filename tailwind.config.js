/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT:  '#58a6ff',
          light:    '#79c0ff',
          dark:     '#0969da',
          muted:    '#f0f6fc',
          'dark-muted': '#161b22',
        },
        navy: {
          50:  '#f0f6fc',
          100: '#dde8f0',
          200: '#b8d4e8',
          300: '#7eb5d8',
          400: '#388bfd',
          500: '#58a6ff',
          600: '#1f6feb',
          700: '#0969da',
          800: '#1c2333',
          900: '#161b22',
          950: '#0d1117',
        },
      },
      animation: {
        shine:   'shine 1s forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%':   { left: '-50%' },
          '100%': { left: '125%' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
