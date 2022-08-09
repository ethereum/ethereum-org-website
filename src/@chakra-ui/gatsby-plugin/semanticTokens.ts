import {
  lightTheme as oldLightTheme,
  darkTheme as oldDarkTheme,
} from "../../theme"

const oldColors = Object.keys(oldLightTheme).reduce((colors, color) => {
  const lightColor = oldLightTheme[color]
  const darkColor = oldDarkTheme[color]

  return {
    ...colors,
    [color]: { _light: lightColor, _dark: darkColor },
  }
}, {})

const semanticTokens = {
  colors: {
    primary: { _light: "blue.500", _dark: "orange.500" },
    primaryDark: { _light: "blue.700", _dark: "orange.800" },
    // TODO: add docs explaining more
    // TODO: remove these colors as we migrate away from them
    ...oldColors,
  },
}

export default semanticTokens
