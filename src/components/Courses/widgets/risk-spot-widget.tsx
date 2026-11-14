"use client"

import { useId, useState } from "react"
import { Check, Flag } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/**
 * One skin of the spot-the-risk puzzle: a mock screen whose rows the learner
 * taps to flag. Strings: `page-courses-widget-{name}-title`, `-row-{id}-label`,
 * `-row-{id}-value`, `-row-{id}-note` (shown once solved) and `-hit`; the
 * controls' own strings are shared (`page-courses-widget-risk-*`).
 */
interface RiskSpotConfig {
  name: string
  rows: readonly { id: string; risky: boolean }[]
}

const RiskSpotWidget = ({
  config: { name, rows },
  onAnswer,
  locked,
}: WidgetProps & { config: RiskSpotConfig }) => {
  const t = useTranslations("page-courses")
  const titleId = useId()
  const [flagged, setFlagged] = useState<string[]>([])
  const key = (suffix: string) => `page-courses-widget-${name}-${suffix}`

  const toggle = (id: string) => {
    const next = flagged.includes(id)
      ? flagged.filter((f) => f !== id)
      : [...flagged, id]
    setFlagged(next)
    if (!next.length) return onAnswer(null)
    const missed = rows.filter(
      ({ id: r, risky }) => risky && !next.includes(r)
    ).length
    const extra = rows.filter(
      ({ id: r, risky }) => !risky && next.includes(r)
    ).length
    onAnswer({
      correct: !missed && !extra,
      hint: extra
        ? t("page-courses-widget-risk-hint-extra", { count: extra })
        : t("page-courses-widget-risk-hint-missed", { count: missed }),
    })
  }

  return (
    <WidgetShell>
      <p className="m-0 text-body-medium">
        {t("page-courses-widget-risk-instructions")}
      </p>
      <section
        aria-labelledby={titleId}
        className="flex flex-col gap-3 rounded-2xl border-2 border-border bg-background p-3 md:p-4"
      >
        <h3 id={titleId} className="m-0 text-md font-bold">
          {t(key("title"))}
        </h3>
        <ul className="m-0 flex list-none flex-col gap-2">
          {rows.map(({ id, risky }) => {
            const on = flagged.includes(id)
            return (
              <li key={id} className="m-0 flex flex-col gap-1">
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={locked}
                  onClick={() => toggle(id)}
                  className={cn(
                    chunkyTile,
                    "flex min-h-12 w-full cursor-pointer items-center gap-3 px-3 py-2 text-start focus-visible:outline-4 focus-visible:outline-(--course-soft)",
                    "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4",
                    on &&
                      !locked &&
                      "border-(--course) bg-(--course-softer) hover:bg-(--course-softer)",
                    on &&
                      locked &&
                      "border-green-700 bg-success-light dark:border-green-400 dark:bg-success-dark"
                  )}
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-sm text-body-medium">
                      {t(key(`row-${id}-label`))}
                    </span>
                    <span className="font-semibold break-words">
                      {t(key(`row-${id}-value`))}
                    </span>
                  </span>
                  {on &&
                    (locked ? (
                      <Check
                        className="size-5 shrink-0 text-green-700 dark:text-green-400"
                        aria-hidden
                      />
                    ) : (
                      <Flag
                        className={cn("size-5 shrink-0", courseText)}
                        aria-hidden
                      />
                    ))}
                </button>
                {locked && (
                  <p
                    className={cn(
                      "m-0 ps-3 text-sm",
                      risky ? "text-body" : "text-body-medium"
                    )}
                  >
                    {t(key(`row-${id}-note`))}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t(key("hit"))}
        </p>
      )}
    </WidgetShell>
  )
}

const skin = (config: RiskSpotConfig) => {
  const Skin = (props: WidgetProps) => (
    <RiskSpotWidget {...props} config={config} />
  )
  return Skin
}

/** Scams: a signature request that would hand over a token permission */
export const SignRequestWidget = skin({
  name: "sign-request",
  rows: [
    { id: "site", risky: true },
    { id: "account", risky: false },
    { id: "action", risky: true },
    { id: "spender", risky: true },
    { id: "amount", risky: true },
    { id: "fee", risky: false },
  ],
})

/** Scams: the claim page a free token's link leads to, and its tricks */
export const ClaimSiteWidget = skin({
  name: "claim-site",
  rows: [
    { id: "address", risky: true },
    { id: "menu", risky: false },
    { id: "banner", risky: true },
    { id: "badge", risky: true },
    { id: "connect", risky: false },
    { id: "sign", risky: true },
  ],
})
