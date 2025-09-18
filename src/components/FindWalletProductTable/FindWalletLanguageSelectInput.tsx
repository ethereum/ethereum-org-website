import { useEffect, useRef, useState } from "react"
import { useLocale } from "next-intl"

import { FilterInputState, Lang } from "@/lib/types"

import Input from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getLanguageCodeName } from "@/lib/utils/intl"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLanguageCountWalletsData } from "@/lib/utils/wallets"

import { useTranslation } from "@/hooks/useTranslation"

interface FindWalletLanguageSelectInputProps {
  filterIndex: number
  itemIndex: number
  inputState: FilterInputState
  updateFilterState: (
    filterIndex: number,
    itemIndex: number,
    newInputState: FilterInputState
  ) => void
}

const FindWalletLanguageSelectInput = ({
  filterIndex,
  itemIndex,
  inputState,
  updateFilterState,
}: FindWalletLanguageSelectInputProps) => {
  const locale = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation("page-wallets-find-wallet")
  const languageCountWalletsData = getLanguageCountWalletsData(locale as string)
  const countSortedLanguagesCount = [...languageCountWalletsData].sort(
    (a, b) => b.count - a.count
  )

  useEffect(() => {
    if (isSelectOpen) {
      //Delay focus to ensure input is rendered
      const frame = requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })

      return () => clearTimeout(frame)
    }
  }, [isSelectOpen])

  return (
    <div className="flex flex-col gap-2">
      <Select
        open={isSelectOpen}
        onOpenChange={setIsSelectOpen}
        value={inputState as string}
        onValueChange={(e: Lang) => {
          trackCustomEvent({
            eventCategory: "WalletFilterSidebar",
            eventAction: "Language search",
            eventName: getLanguageCodeName(e, locale!),
          })
          updateFilterState(filterIndex, itemIndex, e)
          setSearchQuery("") // Reset search when selection is made
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <div
            className="sticky -top-2 z-10 bg-background p-2"
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInputRef}
              type="search"
              placeholder={t("page-find-wallet-search-languages")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return

                const selectedLanguage = languageCountWalletsData.find((lang) =>
                  lang.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                if (!selectedLanguage) return

                trackCustomEvent({
                  eventCategory: "WalletFilterSidebar",
                  eventAction: "Language search",
                  eventName: selectedLanguage.name,
                })
                updateFilterState(
                  filterIndex,
                  itemIndex,
                  selectedLanguage.langCode
                )
                setIsSelectOpen(false)
                setSearchQuery("")
              }}
              className="w-full"
            />
          </div>
          {languageCountWalletsData.map((language) => {
            const isVisible = language.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
            return (
              <SelectItem
                key={language.langCode}
                value={language.langCode}
                className={!isVisible ? "hidden" : ""}
              >
                {`${language.name} (${language.count})`}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <p className="text-sm text-body-medium">
        {t("page-find-wallet-popular-languages")}
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        {countSortedLanguagesCount.slice(0, 5).map((language, index, array) => {
          return (
            <span
              key={language.langCode}
              className="cursor-pointer text-sm text-primary"
              onClick={() => {
                trackCustomEvent({
                  eventCategory: "WalletFilterSidebar",
                  eventAction: "Language search",
                  eventName: getLanguageCodeName(language.langCode, locale!),
                })
                updateFilterState(filterIndex, itemIndex, language.langCode)
              }}
            >
              {`${language.name} (${language.count})${index < array.length - 1 ? ", " : ""}`}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default FindWalletLanguageSelectInput
