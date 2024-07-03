import { useRouter } from "next/router"

import { Lang, LocaleDisplayInfo } from "@/lib/types"

import { BaseLink } from "@/components/Link"

import { isMobile } from "@/lib/utils/isMobile"
import { isLangRightToLeft } from "@/lib/utils/translations"

import { MobileCloseBar } from "./MobileCloseBar"
import { useLanguagePicker } from "./useLanguagePicker"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

type LanguagePickerProps = {
  children: React.ReactNode
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
  handleClose?: () => void
  menuState?: { isOpen: boolean; onOpen: () => void; onClose: () => void }
}

const LanguagePicker = ({
  children,
  placement,
  handleClose,
  menuState,
  ...props
}: LanguagePickerProps) => {
  const {
    t,
    refs,
    disclosure,
    filterValue,
    setFilterValue,
    filteredNames,
    handleInputFocus,
  } = useLanguagePicker(handleClose, menuState)
  const { inputRef, firstItemRef, noResultsRef, footerRef } = refs
  const { onClose } = disclosure

  /**
   * Adds a keydown event listener to focus filter input (\).
   * @param {string} event - The keydown event.
   */
  // useEventListener("keydown", (e) => {
  //   if (e.key !== "\\") return
  //   e.preventDefault()
  //   inputRef.current?.focus()
  // })

  // onClick handlers
  const handleMobileCloseBarClick = () => onClose()
  const handleMenuItemClose = (displayInfo: LocaleDisplayInfo) =>
    onClose({
      eventAction: "Locale chosen",
      eventName: displayInfo.localeOption,
    })
  const handleBaseLinkClose = () =>
    onClose({
      eventAction: "Translation program link (menu footer)",
      eventName: "/contributing/translation-program",
    })

  const { locale } = useRouter()
  const isRtl = isLangRightToLeft(locale! as Lang)

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 relative overflow-auto rounded py-0">
        {/* Mobile Close bar */}
        {/* avoid rendering mobile only feature on desktop */}
        {isMobile() && (
          <MobileCloseBar handleClick={handleMobileCloseBarClick} />
        )}

        {/* Main Language selection menu */}
        <div className="relative w-full min-h-[calc(100%-53px)] p-4 bg-background-highlight">
          {/* <FormControl>
    <FormLabel className="text-xs text-body-medium">
      {t("page-languages-filter-label")}{" "}
      <span className="lowercase">
        ({filteredNames.length} {t("common:languages")})
      </span>
    </FormLabel>
    <InputGroup>
      <Input
        type="search"
        autoComplete="off"
        placeholder={t("page-languages-filter-placeholder")}
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        onBlur={(e) => {
          if (e.relatedTarget?.tagName.toLowerCase() === "div") {
            e.currentTarget.focus();
          }
        }}
        ref={inputRef}
        className="h-8 mt-1 mb-2 bg-background-base text-body-base"
        style={isRtl ? { paddingLeft: '2.5rem', paddingRight: '0.5rem' } : {}}
        onKeyDown={(e) => {
          // Navigate to first result on enter
          if (e.key === "Enter") {
            e.preventDefault();
            firstItemRef.current?.click();
          }
          // If Tab/ArrowDown, focus on first item if available, NoResults link otherwise
          if (e.key === "Tab" || e.key === "ArrowDown") {
            e.preventDefault();
            (filteredNames.length === 0 ? noResultsRef : firstItemRef).current?.focus();
            e.stopPropagation();
          }
        }}
        onFocus={handleInputFocus}
      />
      {isRtl ? (
        <InputLeftElement className="hidden md:flex cursor-text">
          <Kbd
            className="text-sm leading-none ml-4 p-1 py-0.5 mr-auto border border-disabled text-disabled rounded-base"
          >
            /
          </Kbd>
        </InputLeftElement>
      ) : (
        <InputRightElement className="hidden md:flex cursor-text">
          <Kbd
            className="text-sm leading-none mr-2 p-1 py-0.5 ml-auto border border-disabled text-disabled rounded-base"
          >
            \
          </Kbd>
        </InputRightElement>
      )}
    </InputGroup>

    {filteredNames.map((displayInfo, index) => (
      <MenuItem
        key={"item-" + displayInfo.localeOption}
        displayInfo={displayInfo}
        ref={index === 0 ? firstItemRef : null}
        onKeyDown={(e) => {
          if (e.key !== "\\") return;
          e.preventDefault();
          inputRef.current?.focus();
        }}
        onClick={() => handleMenuItemClose(displayInfo)}
      />
    ))}

    {filteredNames.length === 0 && (
      <NoResultsCallout
        ref={noResultsRef}
        onClose={() =>
          onClose({
            eventAction: "Translation program link (no results)",
            eventName: "/contributing/translation-program",
          })
        }
      />
    )}
  </FormControl> */}
        </div>

        {/* Footer callout */}
        <div className="border-t-2 border-primary-base bg-primary-lowContrast p-3 sticky bottom-0 flex justify-center">
          <p className="text-xs text-center text-body-base">
            {t("page-languages-recruit-community")}{" "}
            <BaseLink
              ref={footerRef}
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
