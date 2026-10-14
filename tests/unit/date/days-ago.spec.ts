import { expect, test } from "@playwright/test"

import { formatDaysAgo } from "@/lib/utils/date"

const now = new Date("2026-10-14T12:00:00Z")

test("formats elapsed days relative to now", () => {
  expect(formatDaysAgo("en", "2026-10-14T08:00:00Z", now)).toBe("today")
  expect(formatDaysAgo("en", "2026-10-13T08:00:00Z", now)).toBe("yesterday")
  expect(formatDaysAgo("en", "2025-07-26", now)).toBe("445 days ago")
})

test("returns undefined for missing or invalid dates", () => {
  expect(formatDaysAgo("en", "", now)).toBeUndefined()
  expect(formatDaysAgo("en", "not a date", now)).toBeUndefined()
})

test("uses Extended Arabic numerals for Urdu", () => {
  expect(formatDaysAgo("ur", "2026-10-04T12:00:00Z", now)).toContain("۱۰")
})
