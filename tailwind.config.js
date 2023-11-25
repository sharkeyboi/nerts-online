/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  "./app.vue",
  "./error.vue",
],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    colors: {
      primary: colors.violet,
      secondary: colors.rose,
      slate: colors.slate,
      gray: colors.slate,
      white: colors.white
    },
    extend: {},
  },
  plugins: [],
}

