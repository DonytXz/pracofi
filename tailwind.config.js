// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#54bcd7",
          regular: "#243964",
          dark: "#2e7a9a",
        },
        mattBlack: "#191814",
        mattWhite: "#f6f6f6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
