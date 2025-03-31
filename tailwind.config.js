/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      colors: {
        ednavy: "#032434",
        edorange: "#E24E1B",
        edgreen: "#177C4C",
        edcream: "#FFF5E0",
      },
    },
  },
  variants: {},
  plugins: [],
};
