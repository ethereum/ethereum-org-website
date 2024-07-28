import { useRouter } from "next/router"

import { BaseLink } from "@/components/Link"

import { cn } from "@/lib/utils/cn"
import { isMobile } from "@/lib/utils/isMobile"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "../ui/command"
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
}

const LanguagePicker = ({
  children,
  handleClose,
  className,
}: LanguagePickerProps) => {
  const { asPath, push } = useRouter()
  const {
    t,
    disclosure,
    filteredNames,
    // TODO: Implement this
    // handleInputFocus,
  } = useLanguagePicker(handleClose)
  const { isOpen, setValue, onClose, onOpen } = disclosure

  /**
   * Adds a keydown event listener to focus filter input (\).
   * @param {string} event - The keydown event.
   */
  useEventListener("keydown", (e) => {
    if (e.key !== "\\") return
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
        {/* Mobile Close bar */}
        {/* avoid rendering mobile only feature on desktop */}
        {isMobile() && (
          <MobileCloseBar handleClick={handleMobileCloseBarClick} />
        )}

        <Command
          className="gap-2 p-4"
          filter={(value: string, search: string) => {
            const item = filteredNames.find(
              (name) => name.localeOption === value
            )

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
              ({filteredNames.length} {t("common:languages")})
            </span>
          </div>

          <CommandInput
            placeholder={t("page-languages-filter-placeholder")}
            className="h-9"
            icon={undefined}
          />

          <CommandList className="max-h-[75vh]">
            <CommandEmpty className="py-0 text-left text-base">
              <NoResultsCallout
                onClose={() =>
                  onClose({
                    eventAction: "Translation program link (no results)",
                    eventName: "/contributing/translation-program",
                  })
                }
              />
            </CommandEmpty>
            <CommandGroup className="p-0">
              {filteredNames.map((displayInfo) => (
                <MenuItem
                  key={"item-" + displayInfo.localeOption}
                  displayInfo={displayInfo}
                  onSelect={handleMenuItemSelect}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        {/* Footer callout */}
        <div className="sticky bottom-0 flex justify-center border-t-2 border-primary bg-primary-low-contrast p-3">
          <p className="text-center text-xs text-body">
            {t("page-languages-recruit-community")}{" "}
            {/* TODO migrate once #13411 is merged */}
            <BaseLink
              href="/contributing/translation-program"
              onClick={handleBaseLinkClose}
            >
              {t("common:learn-more")}
            </BaseLink>
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default LanguagePicker
