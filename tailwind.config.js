/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
const scrollbarPlugin = require("tailwind-scrollbar-hide");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, scrollbarPlugin],
  daisyui: {
    themes: ["emerald"],
  },
};
