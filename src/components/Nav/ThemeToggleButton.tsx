"use client"

import { Button } from "../ui/buttons/Button"

import { useThemeToggle } from "./useThemeToggle"

export const ThemeToggleButton = () => {
  const { toggleColorMode, ThemeIcon, themeIconAriaLabel } = useThemeToggle()

  return (
    <Button
      aria-label={themeIconAriaLabel}
      variant="ghost"
      isSecondary
      className="group animate-fade-in px-2 max-md:hidden xl:px-3 [&>svg]:transition-transform [&>svg]:duration-500 [&>svg]:hover:rotate-12 [&>svg]:hover:text-primary-hover"
      onClick={toggleColorMode}
    >
      <ThemeIcon className="transform-transform duration-500 group-hover:rotate-12 group-hover:transition-transform group-hover:duration-500" />
    </Button>
  )
}
