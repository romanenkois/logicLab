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
      'primary-light': {
        DEFAULT: '#3481f5',
      },
      'primary-dark': {
        DEFAULT: '#2d65b9',
      },
      'pure-black': {
        DEFAULT: '#000000',
      },
      'black': {
        DEFAULT: '#080a0f',
      },
      'dark': {
        DEFAULT: '#0c0e14',
      },
      'dark-light': {
        DEFAULT: '#10131b',
      },
      'dark-gray': {
        DEFAULT: '#545a64',
      },
      'gray': {
        DEFAULT: '#8c94a5',
      },
      'white': {
        DEFAULT: '#e6e6e6',
      },
      'pure-white': {
        DEFAULT: '#ffffff',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/postcss'),
  ],
}



