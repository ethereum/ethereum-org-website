import humanizeDuration from "humanize-duration"

import { Lang } from "../types"

import { dateTimeFormat } from "./date"
import { numberFormat } from "./numbers"

export const getLocaleTimestamp = (
  locale: Lang,
  timestamp: string,
  options?: Intl.DateTimeFormatOptions
) => {
  const opts =
    options ||
    ({
      year: "numeric",
      month: "long",
      day: "numeric",
    } as Intl.DateTimeFormatOptions)
  const date = new Date(timestamp)
  return (
    dateTimeFormat(locale, opts)
      .format(date)
      // Normalize whitespace to avoid SSR/client hydration mismatches: Node's
      // ICU and the browser's ICU can emit different space characters (e.g.
      // U+202F narrow no-break space vs a regular U+0020) around date parts.
      // The two render identically but differ byte-for-byte, tripping React's
      // hydration check. Collapsing whitespace makes the output deterministic.
      // Same fix as formatDateRange in ./date.ts.
      .replace(/\s+/g, " ")
  )
}

/**
 * Convert duration from "H:MM:SS" or "M:SS" format to ISO 8601 (PTxHxMxS).
 *
 * @param duration - Duration string in "H:MM:SS" or "M:SS" format
 * @returns ISO 8601 duration string (e.g., "PT1H2M30S")
 */
export function toIsoDuration(duration: string): string {
  const parts = duration.split(":").map(Number)
  if (parts.length === 3) {
    const [h, m, s] = parts
    return `PT${h > 0 ? `${h}H` : ""}${m}M${s}S`
  }
  if (parts.length === 2) {
    const [m, s] = parts
    return `PT${m}M${s}S`
  }
  return duration
}

type DurationUnit = "y" | "mo" | "w" | "d" | "h" | "m" | "s" | "ms"

export type DurationFormatOptions = {
  units?: DurationUnit[]
  round?: boolean
  largest?: number
  delimiter?: string
  spacer?: string
}

// humanize-duration names some languages differently than our locale codes
const LANGUAGE_ALIASES: Record<string, string> = {
  "pt-br": "pt",
  zh: "zh_CN",
  "zh-tw": "zh_TW",
}

/**
 * A wrapper for humanize-duration that enforces the numeral standards of
 * numberFormat by deriving digits from it, overriding the library's own
 * per-language digit defaults. Unknown locales fall back to English.
 */
export function formatDuration(
  ms: number,
  locale: string,
  options?: DurationFormatOptions
): string {
  // Hoisted: the digit callback runs 10x; construct the formatter once
  const { format } = numberFormat(locale)
  const digitReplacements = Array.from({ length: 10 }, (_, i) => format(i))

  return humanizeDuration(ms, {
    language: LANGUAGE_ALIASES[locale] || locale,
    fallbacks: ["en"],
    digitReplacements,
    ...options,
  })
}
