/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050D1A',
          900: '#0D1B2E',
          800: '#1A2F4E',
          700: '#243B55',
          600: '#2E4A6A',
          500: '#3B5E84',
        },
        gold: {
          300: '#F0D97A',
          400: '#E8C547',
          500: '#D4AF37',
          600: '#C9A84C',
          700: '#B8962E',
          800: '#9A7D22',
        },
        cream: {
          50: '#FEFCF8',
          100: '#F8F6F0',
          200: '#F0EBE0',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 20px rgba(13, 27, 46, 0.08)',
        'card-hover': '0 8px 40px rgba(13, 27, 46, 0.16)',
        gold: '0 4px 20px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
};

