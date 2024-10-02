import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { FilterInputState, Lang } from "@/lib/types"

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
  const { locale } = useRouter()
  const { t } = useTranslation("page-wallets-find-wallet")
  const languageCountWalletsData = getLanguageCountWalletsData(locale as string)
  const countSortedLanguagesCount = languageCountWalletsData.sort(
    (a, b) => b.count - a.count
  )

  return (
    <div className="flex flex-col gap-2">
      <Select
        value={inputState as string}
        onValueChange={(e: Lang) => {
          trackCustomEvent({
            eventCategory: "WalletFilterSidebar",
            eventAction: "Language search",
            eventName: getLanguageCodeName(e, locale!),
          })
          updateFilterState(filterIndex, itemIndex, e)
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languageCountWalletsData.map((language) => {
            return (
              <SelectItem key={language.langCode} value={language.langCode}>
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
