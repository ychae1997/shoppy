/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#ff8787"
      },
      backgroundImage: {
        banner: "url('/public/images/banner.jpg')"
      }
    }
  },
  plugins: []
};
