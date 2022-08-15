import {
  lightTheme as oldLightTheme,
  darkTheme as oldDarkTheme,
} from "../../theme"

const oldLightThemeColors = oldLightTheme.colors
const oldDarkThemeColors = oldDarkTheme.colors

// define each of the old colors as a `semanticToken`:
// `name: { _light: lightColor, _dark: darkColor }`
const oldColors = Object.keys(oldLightThemeColors).reduce((colors, color) => {
  const lightColor = oldLightThemeColors[color]
  const darkColor = oldDarkThemeColors[color]

  if (typeof lightColor !== "string" || typeof darkColor !== "string") {
    return colors
  }

  return {
    ...colors,
    [color]: { _light: lightColor, _dark: darkColor },
  }
}, {})

const semanticTokens = {
  colors: {
    // define old colors from the old theme as semanticTokens to transition
    // from emotion components to chakra
    // TODO: remove these colors as we migrate away from them
    ...oldColors,

    // Design System colors
    primary: { _light: "blue.500", _dark: "orange.500" },
    primaryDark: { _light: "blue.700", _dark: "orange.800" },
    primaryHover: { _light: "blue.300", _dark: "orange.300" },
    primaryLight: { _light: "blue.100", _dark: "orange.100" },
    body: { _light: "grey.700", _dark: "grey.100" },
    bodyLight: { _light: "grey.500", _dark: "grey.100" },
    disabled: { _light: "grey.300", _dark: "grey.500" },
    background: { _light: "white", _dark: "grey.700" },
    success: "green.500",
    error: "red.600",
    attention: "yellow.200",
  },
}

export default semanticTokens
