/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'lred': "#F91515",
        background: '#000000',        // body background
        card: 'rgba(26, 26, 26, 0.6)', // glass card
        primary: '#f91515',           // brand red
        'primary-hover': '#ff2a2a',
        'primary-pressed': '#cc1010',
        'text-main': '#f5f5f5',
        'text-secondary': '#c4c4c4',
        'text-muted': '#888888',
      },
      backdropBlur: {
        xl: '12px',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.5)',
        glow: '0 0 10px #f91515',
        'glow-lg': '0 0 20px #f91515aa',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}

