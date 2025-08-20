"use client"

import { Moon, Sun } from "lucide-react"

import { useThemeToggle } from "../useThemeToggle"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"

import useColorModeValue from "@/hooks/useColorModeValue"
import { useTranslation } from "@/hooks/useTranslation"

const ThemeToggleButton = () => {
  const { t } = useTranslation("common")
  const ThemeIcon = useColorModeValue(Moon, Sun)
  const themeLabelKey = useColorModeValue("dark-mode", "light-mode")
  const { toggleColorMode } = useThemeToggle()

  return (
    <FooterButton icon={ThemeIcon} onClick={toggleColorMode}>
      <FooterItemText>{t(themeLabelKey)}</FooterItemText>
    </FooterButton>
  )
}

export default ThemeToggleButton
