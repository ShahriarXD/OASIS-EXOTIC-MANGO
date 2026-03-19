/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mango: {
          50: "#FFF8E1",
          100: "#FFE0B2",
          400: "#FFD54F",
          500: "#FFA726",
          600: "#FF8F00",
        },
      },
      boxShadow: {
        glow: "0 10px 30px rgba(255, 143, 0, 0.45)",
        soft: "0 20px 45px rgba(102, 54, 2, 0.15)",
      },
      borderRadius: {
        blob: "2rem",
      },
      fontFamily: {
        display: ['"Baloo 2"', '"Nunito"', "sans-serif"],
        body: ['"Nunito"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
