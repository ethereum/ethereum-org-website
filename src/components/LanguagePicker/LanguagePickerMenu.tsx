import { useEffect } from "react"
import { useCommandState } from "cmdk"
import { useTranslations } from "next-intl"

import type { LocaleDisplayInfo } from "@/lib/types"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "../ui/command"

import MenuItem from "./MenuItem"

type LanguagePickerMenuProps = {
  className?: string
  languages: LocaleDisplayInfo[]
  onSelect: (value: string) => void
  onNoResults: (query: string) => void
}

// Only mounted inside CommandEmpty, so `search` is always a no-results query
const NoResultsReporter = ({
  onNoResults,
}: Pick<LanguagePickerMenuProps, "onNoResults">) => {
  const search = useCommandState((state) => state.search)

  useEffect(() => {
    onNoResults(search)
  }, [search, onNoResults])

  return null
}

const LanguagePickerMenu = ({
  className,
  languages,
  onSelect,
  onNoResults,
}: LanguagePickerMenuProps) => {
  const t = useTranslations("common")

  return (
    <Command
      className={className}
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
          ({languages.length} {t("languages")})
        </span>
      </div>

      <CommandInput
        placeholder={t("page-languages-filter-placeholder")}
        className="h-9"
        kbdShortcut="\"
        data-testid="language-filter-input"
      />

      <CommandList className="max-h-full">
        <CommandEmpty className="py-0 text-left text-base">
          <p className="mb-2 font-bold">
            {t("page-languages-no-results-header")}
          </p>
          <p className="text-body-medium">
            {t("page-languages-no-results-description")}
          </p>
          <NoResultsReporter onNoResults={onNoResults} />
        </CommandEmpty>
        <CommandGroup className="p-0">
          {languages.map((displayInfo) => (
            <MenuItem
              key={"item-" + displayInfo.localeOption}
              displayInfo={displayInfo}
              onSelect={onSelect}
              data-testid={`language-option-${displayInfo.localeOption}`}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default LanguagePickerMenu
