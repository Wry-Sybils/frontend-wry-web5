/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        light: {
          text: 'black',
          background: 'white',
        },
        dark: {
          text: 'white',
          background: 'black',
        },
      }
    },
    fontFamily:{
      taruno: [
        'Taruno Wide', "sans-serif",
      ],
      gilroy: [
        'SVN-Gilroy', "sans-serif",
      ],
    },

    colors: {
      'black': "rgba(8, 7, 8, 1)",
      'tr-black': "rgba(8, 7, 8, 0.8)",
      'white': "rgba(242, 242, 242, 1)",
      'tr-white': "rgba(242, 242, 242, 0.3)",
      'dk-white': "rgba(200, 194, 194, 1)",
      'aqua': "rgba(0, 240, 181, 1)",
      'tr-aqua': "rgba(0, 240, 181, 0.5)",
      'pink': "rgba(246, 16, 103, 1)",
      'tr-pink': "rgba(246, 16, 103, 0.5)",
      'gold': "rgba(255, 215, 0, 1)",
      'gray': "rgba(43, 41, 43, 1)",
      'tr-gray': "rgba(43, 41, 43, 0.6)",
    }
  },
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}