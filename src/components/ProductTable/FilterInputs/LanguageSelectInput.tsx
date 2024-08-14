import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

import { FilterInputState, Lang } from "@/lib/types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getLanguageCountWalletsData } from "@/lib/utils/wallets"

interface LanguageSelectInputProps {
  filterIndex: number
  itemIndex: number
  inputState: FilterInputState
  updateFilterState: (
    filterIndex: number,
    itemIndex: number,
    newInputState: boolean
  ) => void
}

// TODO: Abstract wallet logic out of here
const LanguageSelectInput = ({
  filterIndex,
  itemIndex,
  inputState,
  updateFilterState,
}: LanguageSelectInputProps) => {
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

export default LanguageSelectInput
