/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    borderRadius:{
      'none': '0',
      DEFAULT:'4px',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      'xl':'0.75rem'
    },
    extend: {
      colors:{
      'configuration':{
        'back':'#363635',
        'buttons':'#D7D7D3',
      }
    },
    },
  },
  plugins: [],
}