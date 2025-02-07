/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      'primary': {
        DEFAULT: '#3375d8',
      },
      'dark': {
        DEFAULT: '#0c0e14',
      },
      'dark-light': {
        DEFAULT: '#10131b',
      },
      'dark-gray': {
        DEFAULT: '#3a3a3a',
      },
      'gray': {
        DEFAULT: '#9b9b9b',
      },
      'white': {
        DEFAULT: '#e6e6e6',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}



