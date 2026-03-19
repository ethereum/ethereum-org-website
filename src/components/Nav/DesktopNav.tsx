import { getLocale, getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils/cn"

import DesktopLanguagePicker from "../LanguagePicker/Desktop"
import Search from "../Search"

import Menu from "./Menu"
import { ThemeToggleButton } from "./ThemeToggleButton"

import { getLanguagesDisplayInfo } from "@/lib/nav/links"

const DesktopNav = async ({ className }: { className?: string }) => {
  const t = await getTranslations({ namespace: "common" })
  const languages = await getLanguagesDisplayInfo()

  const locale = await getLocale()

  return (
    <div
      className={cn("flex w-full justify-end md:justify-between", className)}
    >
      <Menu className="animate-fade-in max-md:hidden" />

      <div className="flex items-center">
        <Search />

        <ThemeToggleButton />

        <DesktopLanguagePicker
          languages={languages}
          locale={locale}
          languageLabel={t("languages")}
          className="max-md:hidden"
        />
      </div>
    </div>
  )
}

export default DesktopNav
