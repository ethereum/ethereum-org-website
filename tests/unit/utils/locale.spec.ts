import { expect, test } from "@playwright/test"

import { dateTimeFormat, safeLocale } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { DEFAULT_LOCALE } from "@/lib/constants"

const date = new Date("2026-01-15T12:30:00Z")
const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
}
const numberOptions: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

test.describe("malformed locale fallback", () => {
  for (const locale of ["undefined", "en_US", "wp_admin", "", "en--US"]) {
    test(`falls back for ${JSON.stringify(locale)} in both wrappers`, () => {
      expect(safeLocale(locale)).toBe(DEFAULT_LOCALE)

      const dateFormatter = dateTimeFormat(locale, dateOptions)
      const defaultDateFormatter = dateTimeFormat(DEFAULT_LOCALE, dateOptions)
      expect(dateFormatter.resolvedOptions()).toEqual(
        defaultDateFormatter.resolvedOptions()
      )
      expect(dateFormatter.format(date)).toBe(defaultDateFormatter.format(date))

      const numberFormatter = numberFormat(locale, numberOptions)
      const defaultNumberFormatter = numberFormat(DEFAULT_LOCALE, numberOptions)
      expect(numberFormatter.resolvedOptions()).toEqual(
        defaultNumberFormatter.resolvedOptions()
      )
      expect(numberFormatter.format(1234.56)).toBe(
        defaultNumberFormatter.format(1234.56)
      )
    })
  }
})

test.describe("valid locale preservation", () => {
  // Unknown but structurally valid tags are left to Intl's locale negotiation.
  // This helper is not a validator for the site's supported route locales.
  for (const locale of [
    "en",
    "pt-br",
    "de-DE",
    "ar",
    "ur",
    "xx-XX",
    "static",
  ]) {
    test(`preserves ${locale} and wrapper defaults`, () => {
      expect(safeLocale(locale)).toBe(locale)
      const numberingSystem = locale === "ur" ? "arabext" : "latn"

      // Native formatters are the oracle for existing valid-locale behavior.
      const expectedDate = new Intl.DateTimeFormat(locale, {
        ...dateOptions,
        calendar: "gregory",
        numberingSystem,
      })
      const actualDate = dateTimeFormat(locale, dateOptions)
      expect(actualDate.resolvedOptions()).toEqual(
        expectedDate.resolvedOptions()
      )
      expect(actualDate.format(date)).toBe(expectedDate.format(date))

      const expectedNumber = new Intl.NumberFormat(locale, {
        ...numberOptions,
        numberingSystem,
      })
      const actualNumber = numberFormat(locale, numberOptions)
      expect(actualNumber.resolvedOptions()).toEqual(
        expectedNumber.resolvedOptions()
      )
      expect(actualNumber.format(1234.56)).toBe(expectedNumber.format(1234.56))
    })
  }
})

test("preserves explicit numbering-system options during fallback", () => {
  expect(
    dateTimeFormat("en_US", { numberingSystem: "arab" }).resolvedOptions()
      .numberingSystem
  ).toBe("arab")
  expect(
    numberFormat("en_US", { numberingSystem: "arab" }).resolvedOptions()
      .numberingSystem
  ).toBe("arab")
})

test("does not hide invalid formatter options", () => {
  expect(() =>
    dateTimeFormat("en_US", { timeZone: "invalid/timezone" })
  ).toThrow(RangeError)
  expect(() => numberFormat("en_US", { style: "currency" })).toThrow(TypeError)
})
