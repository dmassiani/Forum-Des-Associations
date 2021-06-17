const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      'pomegranate': {
        DEFAULT: '#F44336',
        '50': '#FFFFFF',
        '100': '#FFF8F7',
        '200': '#FCCBC7',
        '300': '#F99D97',
        '400': '#F77066',
        '500': '#F44336',
        '600': '#EA1C0D',
        '700': '#BA160A',
        '800': '#891008',
        '900': '#590B05'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}

// f44336
