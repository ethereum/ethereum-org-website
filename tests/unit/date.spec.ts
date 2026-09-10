import { expect, test } from "@playwright/test"

import {
  formatDate,
  formatDateRange,
  formatDateTime,
  getLocaleFormattedDate,
  getLocaleYear,
} from "@/lib/utils/date"

test("date helpers normalize ICU whitespace", () => {
  const originalDateTimeFormat = Intl.DateTimeFormat

  class MockDateTimeFormat {
    format() {
      return "Jan\u202f 1,\u00a0 2026"
    }

    formatRange() {
      return "Jan\u202f1 \u00a0–\u202f Jan  2"
    }
  }

  Object.defineProperty(Intl, "DateTimeFormat", {
    configurable: true,
    value: MockDateTimeFormat,
  })

  try {
    const date = new Date("2026-01-01T00:00:00Z")

    expect(formatDateTime("en-US", date)).toBe("Jan 1, 2026")
    expect(formatDate("2026-01-01", "en-US")).toBe("Jan 1, 2026")
    expect(getLocaleFormattedDate("en", "2026-01-01")).toBe("Jan 1, 2026")
    expect(getLocaleYear("en-US", date)).toBe("Jan 1, 2026")
    expect(formatDateRange("2026-01-01", "2026-01-02")).toBe("Jan 1 – Jan 2")
  } finally {
    Object.defineProperty(Intl, "DateTimeFormat", {
      configurable: true,
      value: originalDateTimeFormat,
    })
  }
})
