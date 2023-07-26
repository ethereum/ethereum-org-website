import {
  lightTheme as oldLightTheme,
  darkTheme as oldDarkTheme,
} from "../../theme"

/** @deprecated */
const oldLightThemeColors = oldLightTheme.colors
const oldDarkThemeColors = oldDarkTheme.colors
/**
 * @deprecated
 *
 * define each of the old colors as a `semanticToken`:
 * `name: { _light: lightColor, _dark: darkColor }`
 */
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

    // Main Set
    primary: {
      base: { _light: "blue.500", _dark: "orange.500" },
      highContrast: { _light: "blue.700", _dark: "orange.100" },
      lowContrast: { _light: "blue.100", _dark: "orange.800" },
      hover: { _light: "blue.300", _dark: "orange.300" },
      visited: { _light: "blue.600", _dark: "orange.600" },
      // ! Deprecating primary.light
      light: { _light: "blue.100", _dark: "orange.100" },
      // ! Deprecating primary.dark
      dark: { _light: "blue.700", _dark: "orange.800" },
      // ! Deprecating primary.pressed
      pressed: { _light: "blue.300", _dark: "orange.800" },
    },
    body: {
      base: { _light: "gray.700", _dark: "gray.100" },
      medium: { _light: "gray.500", _dark: "gray.300" },
      light: { _light: "gray.200", _dark: "gray.600" },
      // ! Deprecating body.inverted
      inverted: { _light: "gray.100", _dark: "gray.700" },
    },
    background: {
      base: { _light: "white", _dark: "gray.700" },
      highlight: { _light: "gray.100", _dark: "gray.900" },
    },
    disabled: { _light: "gray.300", _dark: "gray.500" },
    // ! Deprecating neutral
    neutral: { _light: "white", _dark: "gray.900" },

    // Complementary Set
    attention: {
      base: "yellow.500",
      light: "yellow.200",
      outline: { _light: "attention.base", _dark: "attention.light" },
    },
    // ? Keep "error" or rename to "fail" ?
    error: {
      base: "red.500",
      light: "red.100",
      outline: { _light: "error.base", _dark: "error.light" },
      // ! Deprecating error.neutral
      neutral: { _light: "red.100", _dark: "red.900" },
    },
    success: {
      base: "green.500",
      light: "green.100",
      outline: { _light: "success.base", _dark: "success.light" },
      // ! Deprecating success.neutral
      neutral: { _light: "green.100", _dark: "green.900" },
    },

    // Misc
    tooltipShadow: {
      _light: "blackAlpha.400",
      _dark: "whiteAlpha.400",
    },
    switchBackground: { _light: "gray.300", _dark: "whiteAlpha.400" },
  },
  gradients: {
    bgMainGradient: {
      _light:
        "linear-gradient(102.7deg, rgba(185, 185, 241, 0.2) 0%, rgba(84, 132, 234, 0.2) 51.56%, rgba(58, 142, 137, 0.2) 100%)",
      _dark:
        "linear-gradient(102.7deg, rgba(185, 185, 241, 0.2) 0%, rgba(84, 132, 234, 0.2) 51.56%, rgba(58, 142, 137, 0.2) 100%)",
    },
  },
}

export default semanticTokens
