/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: "#750E11",
        secondary: "#FCB316",
        accent: "#10A753",
        info: "#4D3E84",
        background: "#FEFEFE",
        neutral: "#CCBEB7",
      },
    },
  },
  plugins: [],
};
