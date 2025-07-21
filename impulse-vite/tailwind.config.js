/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        neon: {
          blue: '#00f0ff',
          pink: '#ff00ea',
          green: '#39ff14',
        },
        dark: {
          900: '#0a0a23',
          800: '#1a1a2e',
        },
      },
      boxShadow: {
        neon: '0 0 8px #00f0ff, 0 0 16px #ff00ea',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

