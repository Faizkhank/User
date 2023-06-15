/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "765px",
      lg: "1440px",
    },
    extend: {
      fontFamily: {
        Rampart: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
