export type Colors = typeof colors

const colors = {
  gray: {
    50: "#f7f7f7",
    100: "#eeeeee",
    150: "#ececec",
    200: "#cecece",
    300: "#acacac",
    400: "#8C8C8C",
    500: "#616161",
    600: "#333333",
    700: "#222222",
    800: "#1b1b1b",
    900: "#121212",
    950: "#0a0a0a",
  },
  blue: {
    50: "#F8FBFF",
    100: "#E8F1FF",
    200: "#CADFFB",
    300: "#88AAF1",
    400: "#6995F7",
    500: "#4473EF",
    600: "#3C4CEB",
    700: "#2B36A8",
    800: "#232F71",
    900: "#1B273A",
  },
  orange: {
    50: "#FFF3ED",
    100: "#FFF0DB",
    200: "#FFD7A7",
    300: "#FEB077",
    400: "#FD8640",
    500: "#FB610E",
    600: "#EC4A0A",
    700: "#C4350A",
    800: "#7D2711",
    900: "#3A291D",
  },
  purple: {
    50: "#F3ECFF",
    100: "#EDE2FF",
    200: "#DAC5FC",
    300: "#CCAFFC",
    400: "#B38DF0",
    500: "#945AF4",
    600: "#6C24DF",
    700: "#561BB5",
    800: "#41128B",
    900: "#1E0546",
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
