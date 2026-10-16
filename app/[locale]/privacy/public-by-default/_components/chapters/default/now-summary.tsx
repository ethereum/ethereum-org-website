"use client"

import { useLocale, useTranslations } from "next-intl"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { useLesson } from "../../lesson-provider"
import { LESSON_NS } from "../../use-lesson-translations"

/** "What they know about you, right now": live tiles from the reader's dossier */
const NowSummary = () => {
  // Full keys here: these messages carry <link> tags, so they need t.rich
  const t = useTranslations(LESSON_NS)
  const key = (name: string) => `${LESSON_NS}-${name}`
  const locale = useLocale()
  const { collected, hiddenCount, visibleShare } = useLesson()
  const count = numberFormat(locale)
  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  })

  if (!collected.length) {
    return (
      <p
        aria-live="polite"
        className="rounded-base bg-background-highlight p-4"
      >
        {t.rich(key("default-now-empty"), richTags({ link: "#send" }))}
      </p>
    )
  }

  const tiles = [
    {
      id: "known",
      label: t(key("default-now-known")),
      value: count.format(collected.length),
      tone: "text-body",
    },
    {
      id: "hidden",
      label: t(key("default-now-hidden")),
      value: count.format(hiddenCount),
      tone: "text-primary-high-contrast",
    },
    {
      id: "visible",
      label: t(key("default-now-visible")),
      value: percent.format(visibleShare),
      tone: "text-leak-high-contrast",
    },
  ]

  return (
    <div aria-live="polite" className="space-y-3">
      <h3 className="text-h5">{t(key("default-now-title"))}</h3>
      <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tiles.map(({ id, label, value, tone }) => (
          <div key={id} className="rounded-base bg-background-highlight p-4">
            <dt className="text-sm text-body-medium">{label}</dt>
            <dd className={cn("m-0 text-3xl font-bold", tone)}>{value}</dd>
          </div>
        ))}
      </dl>
      {hiddenCount === 0 && (
        <p className="text-sm text-body-medium">
          {t.rich(key("default-now-none-hidden"), richTags({ link: "#fixes" }))}
        </p>
      )}
    </div>
  )
}

export default NowSummary
