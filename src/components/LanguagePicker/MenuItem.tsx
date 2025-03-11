import { ComponentPropsWithoutRef } from "react"
import { useLocale } from "next-intl"
import { BsCheck } from "react-icons/bs"

import type { LocaleDisplayInfo } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { CommandItem } from "../ui/command"
import { Tag } from "../ui/tag"

import ProgressBar from "./ProgressBar"

import { useTranslation } from "@/hooks/useTranslation"

type ItemProps = ComponentPropsWithoutRef<typeof CommandItem> & {
  displayInfo: LocaleDisplayInfo
}

const MenuItem = ({ displayInfo, ...props }: ItemProps) => {
  const {
    localeOption,
    sourceName,
    targetName,
    approvalProgress,
    wordsApproved,
    isBrowserDefault,
  } = displayInfo
  const { t } = useTranslation("common")
  const locale = useLocale()
  const isCurrent = localeOption === locale

  const getProgressInfo = (approvalProgress: number, wordsApproved: number) => {
    const percentage = new Intl.NumberFormat(locale!, {
      style: "percent",
    }).format(approvalProgress / 100)
    const progress =
      approvalProgress === 0 ? "<" + percentage.replace("0", "1") : percentage
    const words = new Intl.NumberFormat(locale!).format(wordsApproved)
    return { progress, words }
  }

  const { progress, words } = getProgressInfo(approvalProgress, wordsApproved)

  return (
    <CommandItem
      value={localeOption}
      className={cn(
        "group mb-1 flex-col items-start rounded pt-2 text-body hover:bg-primary-low-contrast",
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
                "language-name text-lg group-aria-selected:text-primary",
                isCurrent ? "text-primary-high-contrast" : "text-body"
              )}
            >
              {targetName}
            </p>
            {isBrowserDefault && (
              <Tag variant="outline" size="small">
                {t("page-languages-browser-default")}
              </Tag>
            )}
          </div>
          <p className="text-xs uppercase text-body">{sourceName}</p>
        </div>
        {isCurrent && (
          <BsCheck className="text-2xl text-primary-high-contrast" />
        )}
      </div>
      <p className="max-w-full text-xs lowercase text-body-medium">
        {progress} {t("page-languages-translated")} • {words}{" "}
        {t("page-languages-words")}
      </p>
      <ProgressBar value={approvalProgress} />
    </CommandItem>
  )
}

export default MenuItem
