/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        blue: '#00318d',
        red: '#a21e00',
        green: '#32880b',
        white: '#eae2dc'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

