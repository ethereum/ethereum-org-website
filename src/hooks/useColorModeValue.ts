import { useTheme } from "next-themes"

/**
 * Returns the value for the current color mode.
 *
 * @param light The value to return when the color mode is light.
 * @param dark The value to return when the color mode is dark.
 *
 * @example
 * const color = useColorModeValue("white", "black")
 */
function useColorModeValue<TLight = unknown, TDark = unknown>(
  light: TLight,
  dark: TDark
) {
  const { resolvedTheme } = useTheme()

  return resolvedTheme === "light" ? light : dark
}

export default useColorModeValue
