/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#070a0f',
        surface: '#0f1419',
        elevated: '#161b22',
        border: '#1f2632',
        fg: '#e6edf3',
        muted: '#8b949e',
        subtle: '#6e7681',
        accent: '#cbd5e1',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: [
          '"Geist Variable"',
          'Geist',
          '"Inter Variable"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
