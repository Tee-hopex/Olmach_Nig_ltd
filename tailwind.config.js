/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "navy" now maps to charcoal/black shades
        navy: {
          950: '#050505',
          900: '#111111',
          800: '#1C1C1E',
          700: '#2C2C2E',
          600: '#3D3D3F',
          500: '#555557',
        },
        // "gold" now maps to red shades
        gold: {
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
        },
        // "cream" now maps to neutral warm whites
        cream: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.18)',
        gold: '0 4px 20px rgba(239, 68, 68, 0.35)',
      },
    },
  },
  plugins: [],
};
