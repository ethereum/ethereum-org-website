"use client"

import { useParams } from "next/navigation"

import type { LocaleDisplayInfo } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

import LanguagePickerBody from "./LanguagePickerBody"
import { useLanguagePicker } from "./useLanguagePicker"

import { useEventListener } from "@/hooks/useEventListener"
import { usePathname, useRouter } from "@/i18n/routing"

type DesktopLanguagePickerProps = {
  children: React.ReactNode
  languages: LocaleDisplayInfo[]
  className?: string
  handleClose?: () => void
}

const DesktopLanguagePicker = ({
  children,
  languages,
  handleClose,
  className,
}: DesktopLanguagePickerProps) => {
  const pathname = usePathname()
  const { push } = useRouter()
  const params = useParams()
  const {
    disclosure,
    languages: sortedLanguages,
    intlLanguagePreference,
  } = useLanguagePicker(languages, handleClose)
  const { isOpen, setValue, onClose, onOpen } = disclosure

  /**
   * Adds a keydown event listener to focus filter input (\).
   * @param {string} event - The keydown event.
   */
  useEventListener("keydown", (e) => {
    if (e.key !== "\\" || e.metaKey || e.ctrlKey) return
    e.preventDefault()
    onOpen()
  })

  // onClick handlers
  const handleMenuItemSelect = (currentValue: string) => {
    push(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      {
        locale: currentValue,
      }
    )
    onClose({
      eventAction: "Locale chosen",
      eventName: currentValue,
    })
  }
  const handleBaseLinkClose = () =>
    onClose({
      eventAction: "Translation program link (menu footer)",
      eventName: "/contributing/translation-program",
    })

  return (
    <Popover open={isOpen} onOpenChange={setValue}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className={cn(
          "flex w-[320px] flex-col bg-background-highlight p-0",
          className
        )}
      >
        <LanguagePickerBody
          languages={sortedLanguages}
          onSelect={handleMenuItemSelect}
          onNoResultsClose={() =>
            onClose({
              eventAction: "Translation program link (no results)",
              eventName: "/contributing/translation-program",
            })
          }
          intlLanguagePreference={intlLanguagePreference}
          onTranslationProgramClick={handleBaseLinkClose}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DesktopLanguagePicker
