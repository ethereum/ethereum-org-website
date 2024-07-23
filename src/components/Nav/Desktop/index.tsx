import { useRef } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdWbSunny } from "react-icons/md"
import {
  Button,
  HStack,
  Icon,
  MenuButton,
  Text,
  useEventListener,
} from "@chakra-ui/react"

import { IconButton } from "@/components/Buttons"
import LanguagePicker from "@/components/LanguagePicker"

import { DESKTOP_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import useColorModeValue from "@/hooks/useColorModeValue"
import { useDisclosure } from "@/hooks/useDisclosure"

type DesktopNavMenuProps = {
  toggleColorMode: () => void
}

const DesktopNavMenu = ({ toggleColorMode }: DesktopNavMenuProps) => {
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const languagePickerState = useDisclosure()
  const languagePickerRef = useRef<HTMLButtonElement>(null)

  const ThemeIcon = useColorModeValue(<MdBrightness2 />, <MdWbSunny />)
  const themeIconAriaLabel = useColorModeValue(
    "Switch to Dark Theme",
    "Switch to Light Theme"
  )

  const desktopHoverFocusStyles = {
    "& > svg": {
      transform: "rotate(10deg)",
      color: "primary.hover",
      transition: "transform 0.5s, color 0.2s",
    },
  }

  /**
   * Adds a keydown event listener to toggle color mode (ctrl|cmd + \)
   * or open the language picker (\).
   * @param {string} event - The keydown event.
   */
  useEventListener("keydown", (e) => {
    if (e.key !== "\\") return
    e.preventDefault()
    if (e.metaKey || e.ctrlKey) {
      toggleColorMode()
    } else {
      if (languagePickerState.isOpen) return
      languagePickerRef.current?.click()
    }
  })

  return (
    <HStack hideBelow="md" gap="0">
      <IconButton
        icon={ThemeIcon}
        aria-label={themeIconAriaLabel}
        variant="ghost"
        isSecondary
        px={{ base: "2", xl: "3" }}
        _hover={desktopHoverFocusStyles}
        _focus={desktopHoverFocusStyles}
        onClick={toggleColorMode}
      />

      {/* Locale-picker menu */}
      <LanguagePicker
        placement="bottom-end"
        minH="unset"
        maxH="75vh"
        w="xs"
        inset="unset"
        top="unset"
        menuState={languagePickerState}
      >
        <MenuButton
          as={Button}
          name={DESKTOP_LANGUAGE_BUTTON_NAME}
          ref={languagePickerRef}
          variant="ghost"
          color="body.base"
          transition="color 0.2s"
          px={{ base: "2", xl: "3" }}
          _hover={{
            color: "primary.hover",
            "& svg": {
              transform: "rotate(10deg)",
              transition: "transform 0.5s",
            },
          }}
          _active={{
            color: "primary.hover",
            bg: "primary.lowContrast",
          }}
          sx={{
            "& svg": {
              transform: "rotate(0deg)",
              transition: "transform 0.5s",
            },
          }}
        >
          <Icon as={BsTranslate} fontSize="2xl" verticalAlign="middle" me={2} />
          <Text hideBelow="lg" as="span">
            {t("common:languages")}&nbsp;
          </Text>
          {locale!.toUpperCase()}
        </MenuButton>
      </LanguagePicker>
    </HStack>
  )
}

export default DesktopNavMenu
