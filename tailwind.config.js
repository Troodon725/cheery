/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        holiday: {
          red: {
            50: '#fff1f2',
            100: '#ffe4e6',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c'
          },
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d'
          }
        }
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop')",
      }
    },
  },
  plugins: [],
};