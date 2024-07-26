import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdSearch, MdWbSunny } from "react-icons/md"
import {
  Button,
  ButtonProps,
  Icon,
  MenuButton,
  useColorModeValue,
} from "@chakra-ui/react"

import LanguagePicker from "@/components/LanguagePicker"

import { MOBILE_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"

/**
 * This is necessary to be backwards compatible with the old FooterButton
 * component where the ref was NOT passed to the Button component in order to
 * render the MenuList with an undefined position (not relative to the button).
 *
 * TODO: remove this component once the LanguagePicker component is migrated
 */
function ButtonWORef(props: ButtonProps) {
  return <Button {...props} />
}

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
        <MenuButton
          as={ButtonWORef}
          name={MOBILE_LANGUAGE_BUTTON_NAME}
          leftIcon={<Icon as={BsTranslate} />}
          sx={{ span: { m: 0 } }}
          variant="ghost"
          flexDir="column"
          alignItems="center"
          color="body.base"
          px="1"
        >
          <FooterItemText>{t("languages")}</FooterItemText>
        </MenuButton>
      </LanguagePicker>
    </div>
  )
}

export default MenuFooter
