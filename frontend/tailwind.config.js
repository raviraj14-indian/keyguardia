const colors = require("tailwindcss/colors");
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    colors: {
      // primary: "#EB0A53",
      // "primary-darker": "#D60954",
      // secondary: "#8C0468",
      // accent: "#73026B",
      // dark: "#012340",
      // light: "#BFBFBF",
      ...colors,
    },
  },
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};
