import { expect, test } from "@playwright/test"

import { formatTimeAgo } from "@/lib/utils/date"

const now = new Date("2026-10-14T12:00:00Z")

test("uses days within the first month", () => {
  expect(formatTimeAgo("en", "2026-10-14T08:00:00Z", now)).toBe("today")
  expect(formatTimeAgo("en", "2026-10-13T08:00:00Z", now)).toBe("yesterday")
  expect(formatTimeAgo("en", "2026-09-20", now)).toBe("24 days ago")
})

test("rounds down to months, then years", () => {
  expect(formatTimeAgo("en", "2026-09-10", now)).toBe("last month")
  expect(formatTimeAgo("en", "2026-04-01", now)).toBe("6 months ago")
  expect(formatTimeAgo("en", "2025-07-26", now)).toBe("last year")
  expect(formatTimeAgo("en", "2023-09-01", now)).toBe("3 years ago")
})

test("returns undefined for missing or invalid dates", () => {
  expect(formatTimeAgo("en", "", now)).toBeUndefined()
  expect(formatTimeAgo("en", "not a date", now)).toBeUndefined()
})

test("uses Extended Arabic numerals for Urdu", () => {
  expect(formatTimeAgo("ur", "2026-10-04T12:00:00Z", now)).toContain("۱۰")
})
