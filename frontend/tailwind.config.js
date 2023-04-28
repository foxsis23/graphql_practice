/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        darkBlue:'#3D5866',
        lightBlue:'#91D0F2',
        lightDarkBlue:'#7AAFCC'
      }
    },
  },
  plugins: [],
}
