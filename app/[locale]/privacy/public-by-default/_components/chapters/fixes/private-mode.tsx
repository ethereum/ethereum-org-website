"use client"

import { useLocale, useTranslations } from "next-intl"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import Switch from "@/components/ui/switch"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { fixes } from "@/data/privacy-lesson/fixes"

import { useLesson } from "../../lesson-provider"
import { LESSON_NS, useLessonTranslations } from "../../use-lesson-translations"

/** One switch for all eleven fixes; switching off restores the reader's own set */
const PrivateMode = () => {
  const t = useLessonTranslations()
  const tRich = useTranslations(LESSON_NS)
  const locale = useLocale()
  const { privateMode, setPrivateMode, fixesOn, visibleShare } = useLesson()
  const total = fixes.length
  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(visibleShare)

  return (
    <div
      className={cn(
        "space-y-4 rounded-base border-2 p-6 motion-safe:transition-colors",
        privateMode
          ? "border-primary bg-primary-low-contrast/40"
          : "border-border"
      )}
    >
      <div className="flex flex-wrap items-center gap-4">
        <Switch
          id="fixes-private-switch"
          checked={privateMode}
          onCheckedChange={setPrivateMode}
          className="mx-2 scale-[1.75]"
        />
        <label
          htmlFor="fixes-private-switch"
          className="cursor-pointer text-xl font-bold"
        >
          {t("fixes-private-switch")}
        </label>
        <span
          aria-hidden
          className={cn(
            "text-sm font-semibold",
            privateMode ? "text-primary" : "text-body-medium"
          )}
        >
          {t(privateMode ? "fixes-switch-on" : "fixes-switch-off")}
        </span>
      </div>
      <div aria-live="polite" className="space-y-1">
        <p className="m-0">
          {privateMode
            ? t("fixes-private-result-all", {
                total: numberFormat(locale).format(total),
              })
            : fixesOn.length
              ? t("fixes-private-result-some", {
                  count: numberFormat(locale).format(fixesOn.length),
                  total: numberFormat(locale).format(total),
                })
              : t("fixes-private-result-none")}
        </p>
        <p className="m-0">
          {tRich.rich(`${LESSON_NS}-fixes-visible-sentence`, {
            ...richTags(),
            percent,
          })}
        </p>
      </div>
    </div>
  )
}

export default PrivateMode
