/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lred: "#FF4D4D",
        background: "#161616",
        foreground: "#b1b8c2",
        textSecondary: "#a2a9b5",
        lyellow: "#ffff00",
        glass: "rgba(255, 255, 255, 0.05)",
        cardDark: "#1f1f1f",
        cardDarker: "#2a2a2a",
        input: "#1e1e1e",
      },
      backdropBlur: {
        xl: "12px",
      },
      boxShadow: {
       glow: '0 0 10px rgba(255, 77, 77, 0.6)',
  'glow-lg': '0 0 20px rgba(255, 77, 77, 0.8)',
      },
      borderRadius: {
        xl: "1rem",
      },
      textColor: {
        muted: "#a2a9b5",
      },
      borderColor: {
        glow: "#ffff00",
      },
    },
  },
  plugins: [],
};
