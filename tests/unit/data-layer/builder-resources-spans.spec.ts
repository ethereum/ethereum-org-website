import { expect, test } from "@playwright/test"

import { getElementLineSpans } from "@/data-layer/fetchers/developer-tools/fetchBuilderResources"

test("maps each top-level element to its line span", () => {
  const json = [
    "[",
    "  {",
    '    "name": "a",',
    '    "repos": ["x"]',
    "  },",
    '  { "name": "b" }',
    "]",
  ].join("\n")
  expect(getElementLineSpans(json)).toEqual([
    [2, 5],
    [6, 6],
  ])
})

test("ignores braces and escaped quotes inside strings", () => {
  const json = [
    "[",
    "  {",
    '    "description": "uses {curly} and [square] \\"quoted\\" text"',
    "  }",
    "]",
  ].join("\n")
  expect(getElementLineSpans(json)).toEqual([[2, 4]])
})
