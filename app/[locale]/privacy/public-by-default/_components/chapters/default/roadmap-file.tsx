"use client"

import { useId, useMemo, useState } from "react"
import { useLocale } from "next-intl"

import { Label } from "@/components/ui/label"
import Switch from "@/components/ui/switch"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { catalogue, totalWeight } from "@/data/privacy-lesson/catalogue"
import { persona } from "@/data/privacy-lesson/persona"

import { useLessonTranslations } from "../../use-lesson-translations"

import {
  roadmapStateOf,
  type RoadmapTrack,
  roadmapTracks,
  stillVisibleReason,
} from "./roadmap-map"

const stateTone = {
  hidden: "text-primary",
  reduced: "text-primary-high-contrast",
  visible: "text-leak-high-contrast",
} as const

const stateDot = {
  hidden: "bg-primary",
  reduced: "border-2 border-primary",
  visible: "bg-leak",
} as const

/**
 * "What they'd know, if the roadmap lands": every dossier entry, with each
 * roadmap track switchable. Hidden entries count as zero, reduced as half.
 */
const RoadmapFile = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const id = useId()
  const [on, setOn] = useState<ReadonlySet<RoadmapTrack>>(
    () => new Set(roadmapTracks)
  )

  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  })
  const count = numberFormat(locale)

  const rows = useMemo(
    () =>
      catalogue.map((entry) => ({
        entry,
        result: roadmapStateOf(entry.id, on),
      })),
    [on]
  )

  const remaining = rows.reduce(
    (sum, { entry, result }) =>
      sum +
      (result.state === "visible"
        ? entry.weight
        : result.state === "reduced"
          ? entry.weight / 2
          : 0),
    0
  )
  const afterShare = totalWeight ? remaining / totalWeight : 0

  const toggle = (track: RoadmapTrack, value: boolean) =>
    setOn((current) => {
      const next = new Set(current)
      if (value) next.add(track)
      else next.delete(track)
      return next
    })

  return (
    <figure className="m-0 space-y-6 rounded-base border p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="m-0 text-h6">{t("default-file-demo-title")}</h4>
        <p className="m-0 text-sm text-body-medium">
          {t("default-file-on-count", {
            onCount: count.format(on.size),
            totalCount: count.format(roadmapTracks.length),
          })}
        </p>
      </div>

      <p className="text-body-medium">{t("default-file-past")}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {roadmapTracks.map((track) => {
          const inputId = `${id}-${track}`
          return (
            <div key={track} className="flex items-center gap-3">
              <Switch
                id={inputId}
                checked={on.has(track)}
                onCheckedChange={(value) => toggle(track, value)}
                className="shrink-0"
              />
              <Label htmlFor={inputId} className="text-base">
                {t(`default-file-track-${track}`)}
              </Label>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-base bg-background-highlight p-4">
          <p className="m-0 text-sm text-body-medium">
            {t("default-file-today-label")}
          </p>
          <p className="m-0 text-3xl font-bold text-leak-high-contrast">
            {percent.format(1)}
          </p>
        </div>
        <div className="rounded-base bg-background-highlight p-4">
          <p className="m-0 text-sm text-body-medium">
            {t("default-file-after-label")}
          </p>
          <p
            aria-live="polite"
            className="m-0 text-3xl font-bold text-primary-high-contrast"
          >
            {percent.format(afterShare)}
          </p>
        </div>
        {/* Flex keeps the fill at the inline start, so it reads correctly in RTL */}
        <div
          aria-hidden
          className="flex h-2.5 overflow-hidden rounded-full bg-primary sm:col-span-2"
        >
          <div
            className="bg-leak motion-safe:transition-[flex-basis] motion-safe:duration-500"
            style={{ flexBasis: `${afterShare * 100}%` }}
          />
        </div>
      </div>

      <ul className="m-0 grid list-none gap-x-6 gap-y-2 md:grid-cols-2">
        {rows.map(({ entry, result }) => (
          <li key={entry.id} className="flex items-start gap-3">
            <span
              aria-hidden
              className={cn(
                "mt-1.5 size-2.5 shrink-0 rounded-full",
                stateDot[result.state]
              )}
            />
            <div className="min-w-0">
              <p className="m-0 font-semibold">
                {t(entry.labelKey, { friend: persona.friend })}
              </p>
              <p className={cn("m-0 text-sm", stateTone[result.state])}>
                {result.state === "visible"
                  ? t("default-file-state-visible", {
                      reason: t(
                        `default-file-reason-${stillVisibleReason(entry.id)}`
                      ),
                    })
                  : t(`default-file-state-${result.state}`, {
                      track: t(`default-file-track-${result.by}`),
                    })}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {on.has("proving") && (
        <p className="text-sm text-body-medium">{t("default-file-kyc-note")}</p>
      )}

      <figcaption className="text-sm text-body-medium">
        {t("default-file-caption")}
      </figcaption>
    </figure>
  )
}

export default RoadmapFile
