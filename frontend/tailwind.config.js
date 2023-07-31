/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'classic-gray': '#e3e0d7',
        wheat: '#cdc3b7',
        coffee: '#624311'
      },
      dropShadow: {
        md: '0 3px 3px rgba(0, 0, 0, 0.651)',
        lg: '0 6px 6px rgba(0, 0, 0, 0.651)'
      },
      fontFamily: {
        playfair: 'Playfair Display',
        serif: 'serif'
      }
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px'
    }
  },
  plugins: []
};
