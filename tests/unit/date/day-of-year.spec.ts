/**
 * getDayOfYear used to subtract two local timestamps, so a daylight saving
 * shift between January and the given date left a remainder that pushed the
 * floored result onto the neighbouring day. It is the seed for the daily app
 * rotation, so an off-by-one there repeats or skips a day's order.
 *
 * The timezone is set per assertion because the bug is invisible in UTC, which
 * is where CI runs.
 */

import { expect, test } from "@playwright/test"

import { getDayOfYear } from "@/lib/utils/date"

test("getDayOfYear is unaffected by daylight saving shifts", () => {
  const originalTZ = process.env.TZ
  try {
    // Clocks go forward in March, so June used to read one day low.
    process.env.TZ = "America/New_York"
    expect(getDayOfYear(new Date(2026, 5, 15, 0, 30))).toBe(166)

    // Southern hemisphere shifts the other way, one day high.
    process.env.TZ = "Australia/Sydney"
    expect(getDayOfYear(new Date(2026, 5, 15, 23, 30))).toBe(166)

    // Leap year boundaries.
    process.env.TZ = "Europe/Berlin"
    expect(getDayOfYear(new Date(2024, 1, 29, 12, 0))).toBe(60)
    expect(getDayOfYear(new Date(2024, 11, 31, 12, 0))).toBe(366)
    expect(getDayOfYear(new Date(2026, 0, 1, 12, 0))).toBe(1)
  } finally {
    process.env.TZ = originalTZ
  }
})
