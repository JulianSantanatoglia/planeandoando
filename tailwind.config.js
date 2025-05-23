/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'accent-color': 'var(--accent-color)',
        'background-color': 'var(--background-color)',
        'text-color': 'var(--text-color)',
        'light-text': 'var(--light-text)',
      },
    },
  },
  plugins: [],
} 