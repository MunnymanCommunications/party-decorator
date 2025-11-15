/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{,src/**/}*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#c0844f', // A pleasant tan color
        'brand-secondary': '#d4a276', // A lighter tan
        'brand-background': '#fdfaf6', // Light tan/beige background
        'brand-surface': '#f8f5f1', // A slightly different off-white for contrast
        'brand-text-primary': '#5f442c', // A rich, dark brown
        'brand-text-secondary': '#8c7664', // A muted, softer brown
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-down': 'fadeInDown 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
