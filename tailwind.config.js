/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as necessary
    "./public/index.html",
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // Make sure this line is present
  ],
};
