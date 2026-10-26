/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        walnut: '#2b1a10',
        'deep-wood': '#1a0f08',
        cognac: '#8b4a22',
        oxblood: '#5a1a1f',
        forest: '#1f3a2b',
        brass: {
          DEFAULT: '#b8923a',
          light: '#d9b866',
          dark: '#8c6820',
          muted: '#9a7b2e'
        },
        parchment: {
          DEFAULT: '#efe3c8',
          light: '#f7efe1',
          dark: '#dfd2b5'
        },
        ink: {
          DEFAULT: '#1b1410',
          light: '#2d221c',
          dark: '#0e0a08'
        },
        phosphor: '#33ff66',
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'brass': '0 0 15px rgba(184, 146, 58, 0.25)',
        'brass-glow': '0 0 25px rgba(217, 184, 102, 0.4)',
        'vignette': 'inset 0 0 120px rgba(10, 6, 4, 0.85)',
        'case': '0 20px 45px -10px rgba(10, 6, 4, 0.75)',
        'card': '0 8px 24px -4px rgba(27, 20, 16, 0.35)',
      },
      transitionTimingFunction: {
        'weighty': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
