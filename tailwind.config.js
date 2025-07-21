/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontWeight: {
        bold: '700',
        extrabold: '800',
      },
      boxShadow: {
        'neon': '0 0 8px 2px #00fff7, 0 0 24px 4px #00fff7',
        'glow': '0 0 16px 4px #00fff7',
      },
      colors: {
        impulse: {
          neon: '#00fff7',
          dark: '#0a0a23',
          accent: '#ff00e0',
          gradient1: '#00fff7',
          gradient2: '#ff00e0',
        },
      },
    },
  },
  plugins: [],
}

