/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customBlack: 'rgb(17,10,0)',
        customGray: 'rgb(131,127,118)',
        customWhite: 'rgb(227,222,213)',
      },
    },
  },
  plugins: [],
};
