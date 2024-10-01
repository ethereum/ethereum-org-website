import {
  darkTheme as oldDarkTheme,
  lightTheme as oldLightTheme,
} from "../theme"

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
      base: { _light: "purple.600", _dark: "purple.400" },
      highContrast: { _light: "purple.800", _dark: "purple.200" },
      lowContrast: { _light: "purple.100", _dark: "purple.900" },
      hover: { _light: "purple.500", _dark: "purple.300" },
      visited: { _light: "purple.700", _dark: "purple.300" },
      action: { _light: "purple.600", _dark: "purple.600" },
      actionHover: { _light: "purple.500", _dark: "purple.500" },
      // ! Deprecating primary.light
      light: { _light: "blue.100", _dark: "orange.100" },
      // ! Deprecating primary.dark
      dark: { _light: "blue.700", _dark: "orange.800" },
      // ! Deprecating primary.pressed
      pressed: { _light: "blue.400", _dark: "orange.800" },
    },
    body: {
      base: { _light: "gray.800", _dark: "gray.100" },
      medium: { _light: "gray.500", _dark: "gray.400" },
      light: { _light: "gray.200", _dark: "gray.600" },
    },
    background: {
      base: { _light: "white", _dark: "black" },
      highlight: { _light: "gray.100", _dark: "gray.900" },
    },
    disabled: { _light: "gray.400", _dark: "gray.500" },
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
    hubHeroContentBg: {
      _light: "rgba(255, 255, 255, 0.80)",
      _dark: "rgba(34, 34, 34, 0.80)",
    },
  },
  gradients: {
    bgMainGradient: {
      _light:
        "linear-gradient(102.7deg, rgba(185, 185, 241, 0.2) 0%, rgba(84, 132, 234, 0.2) 51.56%, rgba(58, 142, 137, 0.2) 100%)",
      _dark:
        "linear-gradient(102.7deg, rgba(185, 185, 241, 0.2) 0%, rgba(84, 132, 234, 0.2) 51.56%, rgba(58, 142, 137, 0.2) 100%)",
    },
  },
  shadows: {
    menu: {
      accordion:
        "0px 2px 2px 0px rgba(0, 0, 0, 0.12) inset, 0px -3px 2px 0px rgba(0, 0, 0, 0.14) inset",
    },
  },
}

export default semanticTokens
