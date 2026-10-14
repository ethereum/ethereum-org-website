"use client"

import { useLocale } from "next-intl"

import type { PrivacyLessonFixId } from "@/lib/types"

import Switch from "@/components/ui/switch"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { catalogue } from "@/data/privacy-lesson/catalogue"
import { fixes } from "@/data/privacy-lesson/fixes"
import { persona } from "@/data/privacy-lesson/persona"

import { type DossierStatus, useLesson } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"

import FixBody from "./fix-body"
import { ExposureBar } from "./fixes-meter"

const chipTone: Record<DossierStatus, string> = {
  known: "border-leak text-leak-high-contrast",
  hidden: "border-primary bg-primary-low-contrast text-primary-high-contrast",
  unknown: "border-border text-body-medium",
}

const chipStatusKey: Record<DossierStatus, string> = {
  known: "fixes-chip-visible",
  hidden: "fixes-chip-hidden",
  unknown: "fixes-chip-unknown",
}

/** Sticky summary that follows the reader down the list of fixes */
const StickySummary = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const { visibleShare, hiddenShare, activeFixes } = useLesson()
  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(visibleShare)

  return (
    <div className="sticky top-34 z-docked flex flex-wrap items-center gap-x-4 gap-y-1 rounded-base border bg-background px-4 py-2 text-sm shadow-md">
      <span>
        <span className="max-sm:sr-only">{t("fixes-visible-label")} </span>
        <strong className="text-leak-high-contrast">{percent}</strong>
      </span>
      <ExposureBar
        className="h-2 min-w-20 flex-1"
        visibleShare={visibleShare}
        hiddenShare={hiddenShare}
      />
      <span>
        {t("fixes-sticky-on", {
          count: activeFixes.length,
          total: fixes.length,
        })}
      </span>
    </div>
  )
}

const FixCard = ({
  id,
  number,
}: {
  id: PrivacyLessonFixId
  number: number
}) => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const { activeFixes, setFix, privateMode, statusOf } = useLesson()
  const fix = fixes.find((item) => item.id === id)!
  const on = activeFixes.includes(id)
  const titleId = `fix-${id}-title`

  return (
    <li
      className={cn(
        "space-y-4 rounded-base border p-6 motion-safe:transition-colors",
        on && "border-primary bg-primary-low-contrast/40"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold tracking-wide text-body-medium uppercase">
            {t("fixes-card-meta", {
              number: numberFormat(locale).format(number),
              effort: t(`fixes-fix-${id}-effort`),
            })}
          </p>
          <h3 id={titleId} className="mt-1 mb-0 text-h5">
            {t(fix.nameKey)}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-2 pt-1">
          {/* The switch is named by the card title; this label only widens the click target */}
          <label
            htmlFor={`fix-${id}-switch`}
            aria-hidden
            className={cn(
              "cursor-pointer text-sm font-semibold",
              on ? "text-primary" : "text-body-medium"
            )}
          >
            {t(on ? "fixes-switch-on" : "fixes-switch-off")}
          </label>
          <Switch
            id={`fix-${id}-switch`}
            aria-labelledby={titleId}
            checked={on}
            disabled={privateMode}
            onCheckedChange={(checked) => setFix(id, checked)}
            className="mx-1.5 scale-150"
          />
        </div>
      </div>

      <FixBody id={id} />

      <div>
        <p className="mb-2 text-sm font-bold">{t("fixes-card-hides-label")}</p>
        <ul className="m-0 flex list-none flex-wrap gap-2">
          {fix.hides.map((entryId) => {
            const entry = catalogue.find((item) => item.id === entryId)!
            const status = statusOf(entryId)
            return (
              <li
                key={entryId}
                className={cn(
                  "m-0 flex items-center rounded-full border px-3 py-1 text-xs motion-safe:transition-colors",
                  chipTone[status]
                )}
              >
                {t(entry.labelKey, { friend: persona.friend })}
                <span className="sr-only">
                  {": "}
                  {t(chipStatusKey[status])}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}

/** The 11 fix cards, easiest first, each a switch wired to the lesson state */
const FixesCards = () => (
  <div className="space-y-6">
    <StickySummary />
    <ol className="m-0 list-none space-y-6">
      {fixes.map(({ id }, index) => (
        <FixCard key={id} id={id} number={index + 1} />
      ))}
    </ol>
  </div>
)

export default FixesCards
