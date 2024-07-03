import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdWbSunny } from "react-icons/md"

import LanguagePicker from "@/components/LanguagePicker"

import { DESKTOP_LANGUAGE_BUTTON_NAME } from "@/lib/constants"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

type DesktopNavMenuProps = {
  toggleColorMode: () => void
}

const DesktopNavMenu = ({ toggleColorMode }: DesktopNavMenuProps) => {
  const { t } = useTranslation("common")
  const { theme } = useTheme()
  const useColorModeValue = (light: any, dark: any) =>
    theme === "light" ? light : dark
  const { locale } = useRouter()
  const [isOpen, setOpen] = useState(false)
  const languagePickerRef = useRef<HTMLButtonElement>(null)

  const ThemeIcon = useColorModeValue(<MdBrightness2 />, <MdWbSunny />)
  const themeIconAriaLabel = useColorModeValue(
    "Switch to Dark Theme",
    "Switch to Light Theme"
  )

  const languagePickerState = {
    isOpen,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  }

  /**
   * Adds a keydown event listener to toggle color mode (ctrl|cmd + \)
   * or open the language picker (\).
   * @param {string} event - The keydown event.
   */
  // useEventListener("keydown", (e) => {
  //   if (e.key !== "\\") return
  //   e.preventDefault()
  //   if (e.metaKey || e.ctrlKey) {
  //     toggleColorMode()
  //   } else {
  //     if (languagePickerState.isOpen) return
  //     languagePickerRef.current?.click()
  //   }
  // })

  return (
    <div className="hidden md:flex gap-0">
      <button
        aria-label={themeIconAriaLabel}
        className="transition-transform duration-500 ease-in-out transform hover:rotate-10 text-current hover:text-primary-hover"
        onClick={toggleColorMode}
      >
        {ThemeIcon}
      </button>

      {/* Locale-picker menu */}
      <LanguagePicker placement="bottom-end" menuState={languagePickerState}>
        <Button
          name={DESKTOP_LANGUAGE_BUTTON_NAME}
          ref={languagePickerRef}
          className="transition-colors duration-200 ease-in-out text-body-base hover:text-primary-hover active:text-primary-hover active:bg-primary-lowContrast"
          style={{ padding: "0.5rem 0.75rem" }}
        >
          <BsTranslate className="text-2xl align-middle mr-2" />
          <span className="hidden lg:inline">
            {t("common:languages")}&nbsp;
          </span>
          {locale!.toUpperCase()}
        </Button>
      </LanguagePicker>
    </div>
  )
}

export default DesktopNavMenu
