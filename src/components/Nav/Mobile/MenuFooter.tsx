import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdSearch, MdWbSunny } from "react-icons/md"
import { DrawerFooter, Grid, useColorModeValue } from "@chakra-ui/react"

import LanguagePicker from "@/components/LanguagePicker"

import { MOBILE_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import FooterButton from "./FooterButton"
import FooterItemText from "./FooterItemText"

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
    <DrawerFooter
      bg="background.base"
      borderTop="1px"
      borderColor="primary.lowContrast"
      justifyContent="space-between"
      height="108px"
      px={4}
      py={0}
      mt="auto"
    >
      <Grid templateColumns="repeat(3, 1fr)" w="full">
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
          className="fixed inset-4 h-[calc(100vh-var(--eth-sizes-8))]"
          handleClose={onToggle}
        >
          {/* TODO migrate once #13449 is merged */}
          <FooterButton icon={BsTranslate} name={MOBILE_LANGUAGE_BUTTON_NAME}>
            <FooterItemText>{t("languages")}</FooterItemText>
          </FooterButton>
        </LanguagePicker>
      </Grid>
    </DrawerFooter>
  )
}

export default MenuFooter
