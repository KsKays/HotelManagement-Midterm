/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chonburi: ["Chonburi", "serif"],
        jamjuree: ["Bai Jamjuree", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
