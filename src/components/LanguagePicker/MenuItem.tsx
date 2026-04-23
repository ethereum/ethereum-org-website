import { ComponentPropsWithoutRef } from "react"
import { Check } from "lucide-react"
import { useLocale } from "next-intl"

import type { LocaleDisplayInfo } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { CommandItem } from "../ui/command"

type ItemProps = ComponentPropsWithoutRef<typeof CommandItem> & {
  displayInfo: LocaleDisplayInfo
}

const MenuItem = ({ displayInfo, ...props }: ItemProps) => {
  const { localeOption, sourceName, targetName } = displayInfo
  const locale = useLocale()
  const isCurrent = localeOption === locale

  return (
    <CommandItem
      value={localeOption}
      className={cn(
        "group text-body hover:bg-primary-low-contrast mb-1 flex-col items-start rounded pt-2",
        isCurrent
          ? "bg-background hover:bg-primary-low-contrast"
          : "bg-transparent"
      )}
      {...props}
    >
      <div className="flex w-full items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "language-name group-aria-selected:text-primary text-lg",
                isCurrent ? "text-primary-high-contrast" : "text-body"
              )}
            >
              {targetName}
            </p>
          </div>
          <p className="text-body text-xs uppercase">{sourceName}</p>
        </div>
        {isCurrent && (
          <Check
            aria-hidden={true}
            className="text-primary-high-contrast text-2xl"
          />
        )}
      </div>
    </CommandItem>
  )
}

export default MenuItem
