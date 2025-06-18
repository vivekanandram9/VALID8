/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lred: "#FF3C57",
        background: "#060010",
        foreground: "#E5E5E5",
        textSecondary: "#B0B0B0",

        glass: "rgba(255, 255, 255, 0.05)",
      },
      backdropBlur: {
        xl: "12px",
      },
      boxShadow: {
        glow: '0 0 10px rgba(255, 60, 87, 0.6)',
    'glow-lg': '0 0 20px rgba(255, 60, 87, 0.8)',
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
