/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "noto": ["Noto", "Montserrat", "sans-serif"]
      },
      screens: {
        "2md": "992px"
      },
    },
  },
  plugins: [],
};
