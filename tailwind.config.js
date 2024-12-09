/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#335343',
        secondary: '#809173',
        bone: '#D0D0BC',
      },
    },
  },
  plugins: [],
};
