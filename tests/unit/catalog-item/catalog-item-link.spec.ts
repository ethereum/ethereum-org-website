import { expect, test } from "@playwright/test"

import { toCatalogItemLink } from "@/lib/utils/url"

test("drops empty, malformed and non-https links", () => {
  expect(toCatalogItemLink("x", "")).toBeUndefined()
  expect(toCatalogItemLink("x", null)).toBeUndefined()
  expect(toCatalogItemLink("x", "N/A")).toBeUndefined()
  expect(toCatalogItemLink("discord", "http://discord.gg/abc")).toBeUndefined()
  expect(toCatalogItemLink("x", "javascript:alert(1)")).toBeUndefined()
})

test("keeps the requested kind for valid links", () => {
  expect(toCatalogItemLink("x", " https://x.com/ethereum ")).toEqual({
    kind: "x",
    href: "https://x.com/ethereum",
  })
})

test("only github.com repos get the GitHub icon", () => {
  expect(toCatalogItemLink("github", "https://www.github.com/a/b")?.kind).toBe(
    "github"
  )
  expect(toCatalogItemLink("github", "https://gitlab.com/a/b")?.kind).toBe(
    "code"
  )
})
