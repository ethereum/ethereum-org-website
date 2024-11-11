import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { BaseLink } from "@/components/Link"

import { cn } from "@/lib/utils/cn"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "../ui/command"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

import MenuItem from "./MenuItem"
import { MobileCloseBar } from "./MobileCloseBar"
import NoResultsCallout from "./NoResultsCallout"
import { useLanguagePicker } from "./useLanguagePicker"

import { useEventListener } from "@/hooks/useEventListener"

type LanguagePickerProps = {
  children: React.ReactNode
  className?: string
  handleClose?: () => void
  dialog?: boolean
}

const LanguagePicker = ({
  children,
  handleClose,
  className,
  dialog,
}: LanguagePickerProps) => {
  const { asPath, push } = useRouter()
  const { disclosure, languages } = useLanguagePicker(handleClose)
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
  const handleMobileCloseBarClick = () => onClose()
  const handleMenuItemSelect = (currentValue: string) => {
    push(asPath, asPath, {
      locale: currentValue,
    })
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

  if (dialog) {
    return (
      <Dialog open={isOpen} onOpenChange={setValue}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="inset-4 flex h-auto w-auto transform-none flex-col bg-background-highlight p-0 [&>button]:hidden">
          {/* Mobile Close bar */}
          <MobileCloseBar handleClick={handleMobileCloseBarClick} />

          <LanguagePickerMenu
            languages={languages}
            onSelect={handleMenuItemSelect}
            onClose={() =>
              onClose({
                eventAction: "Translation program link (no results)",
                eventName: "/contributing/translation-program",
              })
            }
          />

          <LanguagePickerFooter
            onTranslationProgramClick={handleBaseLinkClose}
          />
        </DialogContent>
      </Dialog>
    )
  }

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
        <LanguagePickerMenu
          languages={languages}
          onSelect={handleMenuItemSelect}
          onClose={() =>
            onClose({
              eventAction: "Translation program link (no results)",
              eventName: "/contributing/translation-program",
            })
          }
        />

        <LanguagePickerFooter onTranslationProgramClick={handleBaseLinkClose} />
      </PopoverContent>
    </Popover>
  )
}

const LanguagePickerMenu = ({ languages, onClose, onSelect }) => {
  const { t } = useTranslation("common")

  return (
    <Command
      className="max-h-[calc(100vh-12rem)] gap-2 p-4"
      filter={(value: string, search: string) => {
        const item = languages.find((name) => name.localeOption === value)

        if (!item) return 0

        const { localeOption, sourceName, targetName, englishName } = item

        if (
          (localeOption + sourceName + targetName + englishName)
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          return 1
        }

        return 0
      }}
    >
      <div className="text-xs text-body-medium">
        {t("page-languages-filter-label")}{" "}
        <span className="lowercase">
          ({languages.length} {t("common:languages")})
        </span>
      </div>

      <CommandInput
        placeholder={t("page-languages-filter-placeholder")}
        className="h-9"
        kbdShortcut="\"
      />

      <CommandList className="max-h-full">
        <CommandEmpty className="py-0 text-left text-base">
          <NoResultsCallout onClose={onClose} />
        </CommandEmpty>
        <CommandGroup className="p-0">
          {languages.map((displayInfo) => (
            <MenuItem
              key={"item-" + displayInfo.localeOption}
              displayInfo={displayInfo}
              onSelect={onSelect}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

const LanguagePickerFooter = ({ onTranslationProgramClick }) => {
  const { t } = useTranslation("common")

  return (
    <div className="sticky bottom-0 flex justify-center border-t-2 border-primary bg-primary-low-contrast p-3">
      <p className="text-center text-xs text-body">
        {t("page-languages-recruit-community")}{" "}
        {/* TODO migrate once #13411 is merged */}
        <BaseLink
          href="/contributing/translation-program"
          onClick={onTranslationProgramClick}
        >
          {t("common:learn-more")}
        </BaseLink>
      </p>
    </div>
  )
}

export default LanguagePicker
