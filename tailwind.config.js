/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    colors: {
      'primary': {
        DEFAULT: '#3375d8',
      },
      'white': {
        DEFAULT: '#e6e6e6',
      },
      // 'dark': {
      //   DEFAULT: '#0c0e14',
      // }
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

