import { expect, test } from "@playwright/test"

import type { Lang } from "@/lib/types"

import { formatDate, formatDateRange } from "@/lib/utils/date"
import { normalizeIntlSpaces } from "@/lib/utils/intl"
import { formatCompactNumber } from "@/lib/utils/numbers"
import { getLocaleTimestamp } from "@/lib/utils/time"

const EXOTIC_SPACE = /[\u00a0\u2009\u205f\u202f\u3000\u2000-\u200a]/

// The space characters ICU actually varies between Node and the browser.
const cases: Array<[name: string, input: string, expected: string]> = [
  ["narrow no-break space (U+202F)", "123\u202fM", "123 M"],
  ["no-break space (U+00A0)", "1\u00a0Jan\u00a02026", "1 Jan 2026"],
  ["thin space (U+2009)", "5\u2009%", "5 %"],
  ["ideographic space (U+3000)", "2026\u3000\u5e74", "2026 \u5e74"],
  ["medium mathematical space (U+205F)", "a\u205fb", "a b"],
  ["run of mixed spaces collapses to one", "a\u00a0\u2009 \u202fb", "a b"],
  ["plain output is untouched", "January 1, 2026", "January 1, 2026"],
  ["empty string", "", ""],
]

for (const [name, input, expected] of cases) {
  test(`normalizeIntlSpaces: ${name}`, () => {
    expect(normalizeIntlSpaces(input)).toBe(expected)
  })
}

// Guards against a formatter being reintroduced without normalization: every
// renderer below feeds Intl output straight into JSX, where a Node-vs-browser
// space mismatch costs a full client re-render.
const formatters: Array<[name: string, produce: () => string]> = [
  ["formatDate", () => formatDate("2026-09-02", "en-US")],
  ["formatDate (ar)", () => formatDate("2026-09-02", "ar")],
  [
    "formatDateRange",
    () => formatDateRange("2026-09-02", "2026-09-05", "en-US"),
  ],
  ["formatCompactNumber", () => formatCompactNumber(123_000_000, "en-US")],
  ["formatCompactNumber (ur)", () => formatCompactNumber(123_000_000, "ur")],
  [
    "getLocaleTimestamp",
    () => getLocaleTimestamp("en" as Lang, "2026-09-02T12:00:00Z"),
  ],
]

for (const [name, produce] of formatters) {
  test(`${name} emits no exotic whitespace`, () => {
    const out = produce()
    expect(out).not.toMatch(EXOTIC_SPACE)
    expect(out).toBe(normalizeIntlSpaces(out))
  })
}
