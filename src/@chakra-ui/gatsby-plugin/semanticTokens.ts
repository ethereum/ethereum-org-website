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
    primary: { _light: "blue.500", _dark: "orange.500" },
    primaryHighContrast: { _light: "blue.700", _dark: "orange.100" },
    primaryLowContrast: { _light: "blue.100", _dark: "orange.800" },
    // ! Deprecating primaryLight
    primaryLight: { _light: "blue.100", _dark: "orange.100" },
    // ! Deprecating primaryDark
    primaryDark: { _light: "blue.700", _dark: "orange.800" },
    primaryHover: { _light: "blue.300", _dark: "orange.300" },
    primaryVisited: { _light: "blue.600", _dark: "orange.600" },
    // ! Deprecating primaryPressed
    primaryPressed: { _light: "blue.300", _dark: "orange.800" },
    body: { _light: "gray.700", _dark: "gray.100" },
    // ! Deprecating bodyInverted
    bodyInverted: { _light: "gray.100", _dark: "gray.700" },
    bodyMedium: { _light: "gray.500", _dark: "gray.300" },
    bodyLight: { _light: "gray.200", _dark: "gray.600" },
    disabled: { _light: "gray.300", _dark: "gray.500" },
    background: { _light: "white", _dark: "gray.700" },
    backgroundHighlight: { _light: "gray.100", _dark: "gray.900" },
    // ! Deprecating neutral
    neutral: { _light: "white", _dark: "gray.900" },
    success: "green.500",
    successLight: "green.100",
    successOutline: { _light: "success", _dark: "successLight" },
    // ! Deprecating successNeutral
    successNeutral: { _light: "green.100", _dark: "green.900" },
    // ? Keep "error" or rename to "fail" ?
    error: "red.500",
    errorLight: "red.100",
    errorOutline: { _light: "error", _dark: "errorLight" },
    // ! Deprecating errorNeutral
    errorNeutral: { _light: "red.100", _dark: "red.900" },
    attention: "yellow.500",
    attentionLight: "yellow.200",
    attentionOutline: { _light: "attention", _dark: "attentionLight" },
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
