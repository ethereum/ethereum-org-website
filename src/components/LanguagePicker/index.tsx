import { useParams } from "next/navigation"
import { useLocale } from "next-intl"

import { ButtonLink } from "@/components/ui/buttons/Button"

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
import { useTranslation } from "@/hooks/useTranslation"
import { usePathname, useRouter } from "@/i18n/routing"

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
  const pathname = usePathname()
  const { push } = useRouter()
  const params = useParams()
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
  const locale = useLocale()

  return (
    <div className="sticky bottom-0 flex border-t-2 border-primary bg-primary-low-contrast p-0 pb-1 pt-1">
      <div className="flex w-full max-w-sm items-center justify-between px-4">
        <div className="flex min-w-0 flex-col items-start">
          {locale == "en" ? (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold text-body">
              Translate Ethereum.org
            </p>
          ) : (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold text-body">
              Translate to {t(`language-${locale}`)}
            </p>
          )}
          <p className="text-xs text-body">
            {t("page-languages-recruit-community")}
          </p>
        </div>
        <ButtonLink
          className="w-min whitespace-nowrap px-1 py-0 text-xs sm:flex-shrink-0 sm:flex-grow-0"
          href="/contributing/translation-program/"
          customEventOptions={onTranslationProgramClick}
        >
          {t("get-involved")}
        </ButtonLink>
      </div>
    </div>
  )
}

export default LanguagePicker
