/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        accent: '#7c3aed',
        accentLight: '#c4b5fd',
        cyan: '#06b6d4',
        secondary: '#f59e0b',
        surface: '#0b1220',
        'surface-soft': '#071022'
      },
      boxShadow: {
        'brand-lg': '0 35px 90px rgba(124, 58, 237, 0.12)',
        md: '0 24px 80px rgba(2, 6, 23, 0.6)'
      },
      borderRadius: {
        'lg-2xl': '28px'
      }
    }
  },
  plugins: []
}
