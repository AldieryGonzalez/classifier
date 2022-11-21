/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        info: "hsla(210 60% 60%)",
        success: "hsl(120, 100%, 40%)",
        error: "hsla(0, 100%, 50%)",
        primary: "hsl(205, 26%, 49%)",
        disabled: "hsl(0, 0%, 45%)",
      },
      keyframes: {
        fill: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        slide: {
          "0%": { transform: "translateX(0%)" },
          "80%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(101%)" },
        },
      },
      animation: {
        load: "fill 2s linear 1 forwards",
        slide_out: "slide 2.5s cubic-bezier(0.4, 0, 0.2, 1) 1 forwards",
      },
    },
  },
  plugins: [],
};
