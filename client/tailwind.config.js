/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        black1: "#070606",
        card: "#212121",
        pink: "#eb0945",
        pink1: "#e0104b",
      },
      screens: {
        phone: "414px",

        tablet: "640px",

        laptop: "1024px",

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
