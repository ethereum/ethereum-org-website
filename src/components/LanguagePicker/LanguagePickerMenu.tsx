import type { LocaleDisplayInfo } from "@/lib/types"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "../ui/command"

import MenuItem from "./MenuItem"
import NoResultsCallout from "./NoResultsCallout"

import { useTranslation } from "@/hooks/useTranslation"

type LanguagePickerMenuProps = {
  languages: LocaleDisplayInfo[]
  onClose: () => void
  onSelect: (value: string) => void
}

const LanguagePickerMenu = ({
  languages,
  onClose,
  onSelect,
}: LanguagePickerMenuProps) => {
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
        data-testid="language-filter-input"
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
              data-testid={`language-option-${displayInfo.localeOption}`}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default LanguagePickerMenu
