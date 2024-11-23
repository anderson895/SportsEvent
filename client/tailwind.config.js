/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customBlack: 'rgb(17,10,0)', // For rgba(17,10,0,1)
        customGray: 'rgb(131,127,118)', // For rgba(131,127,118,1)
        customWhite: 'rgb(227,222,213)', // For rgba(227,222,213,1)
      },
    },
  },
  plugins: [],
}
