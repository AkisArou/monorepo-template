const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,tsx,ts}",
    path.join(path.dirname("../../packages"), "**/*.tsx"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
