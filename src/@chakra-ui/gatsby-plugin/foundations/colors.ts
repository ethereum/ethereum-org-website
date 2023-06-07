export type Colors = typeof colors

const colors = {
  gray: {
    100: "#f7f7f7",
    200: "#e7e7e7",
    300: "#d4d4d4",
    400: "#b0b0b0",
    500: "#646464",
    600: "#333333",
    700: "#222222",
    900: "#141414",
  },
  blue: {
    100: "#dedeff",
    300: "#8282ff",
    500: "#1c1cff",
    600: "#090990",
    700: "#0b0b66",
  },
  orange: {
    100: "#ffe3d3",
    300: "#ffb991",
    500: "#ff7324",
    600: "#c95d20",
    800: "#6a3301",
  },
  red: {
    100: "#f7c8c8",
    500: "#b80000",
    // ! Deprecating 900
    900: "#1B0C0C",
  },
  green: {
    100: "#ddf4e4",
    // ! Deprecating 400
    400: "#48BB78",
    500: "#0a7146",
    // ! Deprecating 900
    900: "#0A160E",
  },
  yellow: {
    200: "#fff8df",
    500: "#bd8400",
  },
}

export default colors
