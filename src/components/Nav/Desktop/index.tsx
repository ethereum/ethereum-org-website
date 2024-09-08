import { useRef } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdWbSunny } from "react-icons/md"
import { HStack, useColorModeValue, useEventListener } from "@chakra-ui/react"

import LanguagePicker from "@/components/LanguagePicker"
import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { DESKTOP_LANGUAGE_BUTTON_NAME } from "@/lib/constants"

type DesktopNavMenuProps = {
  toggleColorMode: () => void
}

const DesktopNavMenu = ({ toggleColorMode }: DesktopNavMenuProps) => {
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const languagePickerRef = useRef<HTMLButtonElement>(null)

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
    <HStack hideBelow="md" gap="0">
      <Button
        variant="ghost"
        isSecondary
        className="group p-2 hover:!text-primary-hover xl:p-3"
        onClick={toggleColorMode}
        aria-label={themeIconAriaLabel}
      >
        <MdBrightness2
          className={cn(
            "dark:hidden",
            "transform-transform duration-500 group-hover:rotate-12 group-hover:transition-transform group-hover:duration-500"
          )}
        />
        <MdWbSunny
          className={cn(
            "hidden dark:block",
            "transform-transform duration-500 group-hover:rotate-12 group-hover:transition-transform group-hover:duration-500"
          )}
        />
      </Button>

      {/* Locale-picker menu */}
      <LanguagePicker>
        <Button
          name={DESKTOP_LANGUAGE_BUTTON_NAME}
          ref={languagePickerRef}
          variant="ghost"
          className="gap-0 px-2 text-body transition-colors duration-500 active:bg-primary-low-contrast active:text-primary-hover data-[state='open']:bg-primary-low-contrast data-[state='open']:text-primary-hover xl:px-3 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:hover:rotate-12"
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
