/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,}'],
  theme: {
    extend: {},
    screens: {
      sm: '599px',

      ml: { min: '600px', max: '1024px' },
    },
  },
  plugins: [],
};
