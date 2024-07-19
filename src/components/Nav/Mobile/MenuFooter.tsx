import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdSearch, MdWbSunny } from "react-icons/md"
import { MenuButton } from "@chakra-ui/react"

import LanguagePicker from "@/components/LanguagePicker"

import { MOBILE_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"

import useColorModeValue from "@/hooks/useColorModeValue"

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
  const ThemeIcon = useColorModeValue(MdBrightness2, MdWbSunny)
  const themeLabelKey = useColorModeValue("dark-mode", "light-mode")

  return (
    <div className="grid w-full grid-cols-3 items-center justify-center">
      <FooterButton
        icon={MdSearch}
        onClick={() => {
          // Workaround to ensure the input for the search modal can have focus
          onToggle()
          toggleSearch()
        }}
      >
        <FooterItemText>{t("search")}</FooterItemText>
      </FooterButton>

      <FooterButton icon={ThemeIcon} onClick={toggleColorMode}>
        <FooterItemText>{t(themeLabelKey)}</FooterItemText>
      </FooterButton>

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
        <FooterButton icon={BsTranslate} name={MOBILE_LANGUAGE_BUTTON_NAME}>
          <FooterItemText>{t("languages")}</FooterItemText>
        </FooterButton>
      </LanguagePicker>
    </div>
  )
}

export default MenuFooter
