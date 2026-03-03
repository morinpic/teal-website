/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'teal-primary': '#008080',
        'dark-text': '#231815',
      },
      screens: {
        'tablet': '769px',
      },
    },
  },
  plugins: [],
}
