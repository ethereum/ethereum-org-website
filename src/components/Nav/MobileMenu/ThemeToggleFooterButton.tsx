"use client"

import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"

import { useThemeToggle } from "../useThemeToggle"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"

import useColorModeValue from "@/hooks/useColorModeValue"

const ThemeToggleFooterButton = () => {
  const t = useTranslations("common")
  const ThemeIcon = useColorModeValue(Moon, Sun)
  const themeLabelKey = useColorModeValue("dark-mode", "light-mode")
  const { toggleColorMode } = useThemeToggle()

  return (
    <FooterButton
      icon={ThemeIcon}
      onClick={toggleColorMode}
      data-testid="mobile-menu-theme-toggle"
    >
      <FooterItemText>{t(themeLabelKey)}</FooterItemText>
    </FooterButton>
  )
}

export default ThemeToggleFooterButton
