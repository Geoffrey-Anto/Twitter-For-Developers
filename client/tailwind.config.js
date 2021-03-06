/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      textWhiteH: "#E7E9EA",
      textWhite: "#C4C5C6",
      black: "#000000",
      gray100: "#2F3336",
      twitterBlue: "#1D9BF0",
      accentGray: "#64686D",
      lightGray: "#E0E0E0",
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
