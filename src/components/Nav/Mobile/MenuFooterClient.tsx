"use client"

import { Languages, Search as SearchIcon } from "lucide-react"

import Search from "@/components/Search"

import { MOBILE_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"
import { useMobileMenu } from "./MobileMenuContent"
import ThemeToggleFooterButton from "./ThemeToggleFooterButton"

import { useTranslation } from "@/hooks/useTranslation"

const MenuFooterClient = () => {
  const { t } = useTranslation("common")
  const { setCurrentView } = useMobileMenu()

  const handleLanguageClick = () => {
    setCurrentView("language-picker")
  }

  return (
    <div className="grid w-full grid-cols-3 items-center justify-center">
      <Search asChild>
        <FooterButton icon={SearchIcon}>
          <FooterItemText>{t("search")}</FooterItemText>
        </FooterButton>
      </Search>

      <ThemeToggleFooterButton />

      <FooterButton
        icon={Languages}
        name={MOBILE_LANGUAGE_BUTTON_NAME}
        onClick={handleLanguageClick}
      >
        <FooterItemText>{t("languages")}</FooterItemText>
      </FooterButton>
    </div>
  )
}

export default MenuFooterClient
