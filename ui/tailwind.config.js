
/** @type {import('tailwindcss').Config} */
// tailwind.config.js
import { colors as defaultColors } from 'tailwindcss/defaultTheme'


const colors = {
  ...defaultColors,
  ...{
    "brandgreen": {
      "800": "#0B2E02",
      "700": "#104502",
      "600": "#155A03",
      "500": "#1F8505",
      "400": "#79B669",
      "300": "#BCDBB4",
      "200": "#B8D6B0",
      "100": "#DAEDD5"
    },
    "brandblack": "#141514",
    "brandwhite": "#FCFBFA",
    "brandgray": "#E5E5E5"
  }
}
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      "colors": colors,
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")['light'],
          "primary": "#fbfcff",
        },
        // "colors": {
        //   ...colors,
        //   "--brandgreen": {
        //     "500": "#56C288",
        //     "400": "#87DBAE",
        //     "300": "#C2F0OD7",
        //     "200": "#E3FBEE",
        //     "100": "#FSFFF9"
        //   }
        // }
      }
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

