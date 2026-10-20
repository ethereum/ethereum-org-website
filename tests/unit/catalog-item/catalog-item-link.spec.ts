import { expect, test } from "@playwright/test"

import { toCatalogItemLink, toWebHref } from "@/lib/utils/url"

test("drops empty, malformed and non-web links", () => {
  expect(toCatalogItemLink("x", "")).toBeUndefined()
  expect(toCatalogItemLink("x", null)).toBeUndefined()
  expect(toCatalogItemLink("discord", "N/A")).toBeUndefined()
  expect(toCatalogItemLink("x", "N/A")).toBeUndefined()
  expect(toCatalogItemLink("x", "none")).toBeUndefined()
  expect(toCatalogItemLink("x", "TBD")).toBeUndefined()
  expect(toCatalogItemLink("x", "javascript:alert(1)")).toBeUndefined()
  expect(toCatalogItemLink("discord", "mailto:a@b.co")).toBeUndefined()
})

test("keeps the requested kind for valid links", () => {
  expect(toCatalogItemLink("x", " https://x.com/ethereum ")).toEqual({
    kind: "x",
    href: "https://x.com/ethereum",
  })
  expect(toCatalogItemLink("discord", "http://discord.gg/abc")?.href).toBe(
    "http://discord.gg/abc"
  )
})

test("normalises hand-entered handles and bare domains", () => {
  expect(toCatalogItemLink("x", "@thirdweb")?.href).toBe(
    "https://x.com/thirdweb"
  )
  expect(toCatalogItemLink("x", "dexkit")?.href).toBe("https://x.com/dexkit")
  expect(toCatalogItemLink("x", "twitter.com/alchemy")?.href).toBe(
    "https://twitter.com/alchemy"
  )
  expect(toWebHref("www.alchemy.com")).toBe("https://www.alchemy.com/")
  expect(toWebHref("fe-lang.org")).toBe("https://fe-lang.org/")
})

test("only github.com repos get the GitHub icon", () => {
  expect(toCatalogItemLink("github", "https://www.github.com/a/b")?.kind).toBe(
    "github"
  )
  expect(toCatalogItemLink("github", "https://gitlab.com/a/b")?.kind).toBe(
    "code"
  )
})
