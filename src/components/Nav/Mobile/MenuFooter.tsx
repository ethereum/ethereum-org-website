import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdSearch, MdWbSunny } from "react-icons/md"

import LanguagePicker from "@/components/LanguagePicker"

import { MOBILE_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import { DrawerFooter } from "@/components/ui/drawer"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

type MenuFooterProps = {
  onToggle: () => void
  toggleColorMode: () => void
  toggleSearch: () => void
}

const MenuFooter = ({
  onToggle,
  toggleColorMode,
  toggleSearch,
}: MenuFooterProps) => {
  const { t } = useTranslation("common")
  const { theme } = useTheme()
  const ThemeIcon = theme === "dark" ? MdBrightness2 : MdWbSunny
  const themeLabelKey = theme === "dark" ? "dark-mode" : "light-mode"

  return (
    <DrawerFooter className="flex justify-between h-[108px] px-4 py-0 mt-auto border-t">
      <div className="grid grid-cols-3 w-full">
        <Button
          variant="ghost"
          onClick={() => {
            // Workaround to ensure the input for the search modal can have focus
            onToggle()
            toggleSearch()
          }}
        >
          <MdSearch />
          <p className="text-sm leading-base font-normal tracking-wider mt-2 uppercase text-center opacity-70 hover:opacity-100">
            {t("search")}
          </p>
        </Button>

        <Button variant="ghost" onClick={toggleColorMode}>
          <p className="text-sm leading-base font-normal tracking-wider mt-2 uppercase text-center opacity-70 hover:opacity-100">
            {t(themeLabelKey)}
          </p>
        </Button>
        <LanguagePicker
          hideFrom="md"
          position="fixed"
          w="calc(100vw - var(--eth-sizes-8))"
          inset="4"
          handleClose={onToggle}
          _before={{
            content: '""',
            position: "fixed",
            inset: 0,
            bg: "black",
            opacity: 0.4,
          }} // TODO: Replace with overlay component
        >
          <Button variant="ghost" name={MOBILE_LANGUAGE_BUTTON_NAME}>
            <BsTranslate />
            <p className="text-sm leading-base font-normal tracking-wider mt-2 uppercase text-center opacity-70 hover:opacity-100">
              {t("languages")}
            </p>
          </Button>
        </LanguagePicker>
      </div>
    </DrawerFooter>
  )
}

export default MenuFooter
