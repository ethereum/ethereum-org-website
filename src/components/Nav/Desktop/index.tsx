import { useRef } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdWbSunny } from "react-icons/md"

import LanguagePicker from "@/components/LanguagePicker"
import { Button } from "@/components/ui/buttons/Button"
import { HStack } from "@/components/ui/flex"

import { DESKTOP_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

import useColorModeValue from "@/hooks/useColorModeValue"
import { useEventListener } from "@/hooks/useEventListener"

type DesktopNavMenuProps = {
  toggleColorMode: () => void
}

const DesktopNavMenu = ({ toggleColorMode }: DesktopNavMenuProps) => {
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const languagePickerRef = useRef<HTMLButtonElement>(null)

  const ThemeIcon = useColorModeValue(MdBrightness2, MdWbSunny)
  const themeIconAriaLabel = useColorModeValue(
    // TODO: Add i18n support
    "Switch to Dark Theme",
    "Switch to Light Theme"
  )

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
      // TODO add this to the language picker
      // if (languagePickerState.isOpen) return
      // languagePickerRef.current?.click()
    }
  })

  return (
    <HStack className="hidden gap-0 md:flex">
      <Button
        aria-label={themeIconAriaLabel}
        variant="ghost"
        isSecondary
        className="group px-2 xl:px-3 [&>svg]:transition-transform [&>svg]:duration-500 [&>svg]:hover:rotate-12 [&>svg]:hover:text-primary-hover"
        onClick={toggleColorMode}
      >
        <ThemeIcon className="transform-transform duration-500 group-hover:rotate-12 group-hover:transition-transform group-hover:duration-500" />
      </Button>

      {/* Locale-picker menu */}
      <LanguagePicker>
        <Button
          name={DESKTOP_LANGUAGE_BUTTON_NAME}
          ref={languagePickerRef}
          variant="ghost"
          className="gap-0 px-2 text-body transition-transform duration-500 active:bg-primary-low-contrast active:text-primary-hover data-[state='open']:bg-primary-low-contrast data-[state='open']:text-primary-hover xl:px-3 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:hover:rotate-12"
        >
          <BsTranslate className="me-2 align-middle text-2xl" />
          <span className="hidden lg:inline-block">
            {t("common:languages")}&nbsp;
          </span>
          {locale!.toUpperCase()}
        </Button>
      </LanguagePicker>
    </HStack>
  )
}

export default DesktopNavMenu
