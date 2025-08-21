import { Languages, Search as SearchIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

import LanguagePicker from "@/components/LanguagePicker"
import Search from "@/components/Search"

import { MOBILE_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"
import ThemeToggleFooterButton from "./ThemeToggleFooterButton"

const MenuFooter = async () => {
  const t = await getTranslations({ namespace: "common" })

  return (
    <div className="grid w-full grid-cols-3 items-center justify-center">
      <Search asChild>
        <FooterButton icon={SearchIcon}>
          <FooterItemText>{t("search")}</FooterItemText>
        </FooterButton>
      </Search>

      <ThemeToggleFooterButton />

      <LanguagePicker dialog>
        <FooterButton icon={Languages} name={MOBILE_LANGUAGE_BUTTON_NAME}>
          <FooterItemText>{t("languages")}</FooterItemText>
        </FooterButton>
      </LanguagePicker>
    </div>
  )
}

export default MenuFooter
