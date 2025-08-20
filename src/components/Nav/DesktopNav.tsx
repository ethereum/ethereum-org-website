"use client"

import { Languages } from "lucide-react"
import { useLocale } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { DESKTOP_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import LanguagePicker from "../LanguagePicker"
import Search from "../Search"
import { Button } from "../ui/buttons/Button"

import Menu from "./Menu"
import { useThemeToggle } from "./useThemeToggle"

import { useTranslation } from "@/hooks/useTranslation"

export const DesktopNav = ({ className }: { className?: string }) => {
  const { t } = useTranslation()
  const { toggleColorMode, ThemeIcon, themeIconAriaLabel } = useThemeToggle()
  const locale = useLocale()

  return (
    <div
      className={cn("flex w-full justify-end md:justify-between", className)}
    >
      <Menu className="animate-fade-in max-md:hidden" />

      <div className="flex items-center">
        <Search />

        <Button
          aria-label={themeIconAriaLabel}
          variant="ghost"
          isSecondary
          className="group animate-fade-in px-2 max-md:hidden xl:px-3 [&>svg]:transition-transform [&>svg]:duration-500 [&>svg]:hover:rotate-12 [&>svg]:hover:text-primary-hover"
          onClick={toggleColorMode}
        >
          <ThemeIcon className="transform-transform duration-500 group-hover:rotate-12 group-hover:transition-transform group-hover:duration-500" />
        </Button>

        <LanguagePicker className="max-md:hidden">
          <Button
            name={DESKTOP_LANGUAGE_BUTTON_NAME}
            variant="ghost"
            className="animate-fade-in gap-0 px-2 text-body transition-transform duration-500 active:bg-primary-low-contrast active:text-primary-hover data-[state='open']:bg-primary-low-contrast data-[state='open']:text-primary-hover max-md:hidden xl:px-3 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:hover:rotate-12"
          >
            <Languages className="align-middle text-2xl" />
            &nbsp;
            <span className="max-lg:hidden">{t("languages")}&nbsp;</span>
            {locale!.toUpperCase()}
          </Button>
        </LanguagePicker>
      </div>
    </div>
  )
}
