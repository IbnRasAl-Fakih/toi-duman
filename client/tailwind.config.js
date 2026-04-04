/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5e7dc",
        wine: "#7f1118",
        "wine-dark": "#5d0b11",
      },
    },
  },
  plugins: [],
};
