import { Languages } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils/cn"

import { DESKTOP_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import LanguagePicker from "../LanguagePicker"
import Search from "../Search"
import { Button } from "../ui/buttons/Button"

import Menu from "./Menu"
import { ThemeToggleButton } from "./ThemeToggleButton"

const DesktopNav = async ({ className }: { className?: string }) => {
  const t = await getTranslations({ namespace: "common" })

  const locale = await getLocale()

  return (
    <div
      className={cn("flex w-full justify-end md:justify-between", className)}
    >
      <Menu className="animate-fade-in max-md:hidden" />

      <div className="flex items-center">
        <Search />

        <ThemeToggleButton />

        <LanguagePicker className="max-md:hidden">
          <Button
            name={DESKTOP_LANGUAGE_BUTTON_NAME}
            variant="ghost"
            className="animate-fade-in gap-0 px-2 text-body transition-transform duration-500 active:bg-primary-low-contrast active:text-primary-hover data-[state='open']:bg-primary-low-contrast data-[state='open']:text-primary-hover max-md:hidden xl:px-3 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:hover:rotate-12"
          >
            <Languages className="align-middle text-2xl" />
            &nbsp;
            <span className="max-lg:hidden">{t("languages")}&nbsp;</span>
            {locale.toUpperCase()}
          </Button>
        </LanguagePicker>
      </div>
    </div>
  )
}

export default DesktopNav
