import { expect, test } from "@playwright/test"

import { truncateDescription } from "@/lib/utils/metadata"

test.describe("truncateDescription", () => {
  test("keeps short text as is", () => {
    expect(truncateDescription("  Short text.  ")).toBe("Short text.")
  })

  test("cuts at the last word boundary", () => {
    const text = `${"word ".repeat(31)}wordytail and more`
    const result = truncateDescription(text)
    expect(result).toBe(`${"word ".repeat(31).trimEnd()}...`)
  })

  test("keeps the whole word when the cut lands on a space", () => {
    const text = `${"a".repeat(160)} rest`
    expect(truncateDescription(text)).toBe(`${"a".repeat(160)}...`)
  })

  test("falls back to a character cut without spaces (CJK)", () => {
    const text = "以".repeat(200)
    expect(truncateDescription(text)).toBe(`${"以".repeat(160)}...`)
  })
})
