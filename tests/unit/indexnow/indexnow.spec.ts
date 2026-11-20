import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import {
  changedPageUrls,
  chunk,
  fileToUrl,
  INDEXNOW_KEY,
  parseLocs,
  urlLocale,
} from "../../../plugins/indexnow/lib.js"

test("the key file at the site root holds exactly the key", () => {
  // Engines reject every submission if /<key>.txt is missing or differs
  const file = path.join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`)
  expect(fs.readFileSync(file, "utf8")).toBe(INDEXNOW_KEY)
  expect(INDEXNOW_KEY).toMatch(/^[a-f0-9]{8,128}$/)
})

test("English markdown maps to the unprefixed, slashed URL", () => {
  expect(fileToUrl("public/content/developers/docs/bridges/index.md")).toBe(
    "https://ethereum.org/developers/docs/bridges/"
  )
  expect(fileToUrl("public/content/eth/index.md")).toBe(
    "https://ethereum.org/eth/"
  )
})

test("translated markdown maps to the locale-prefixed URL", () => {
  expect(
    fileToUrl("public/content/translations/de/developers/docs/index.md")
  ).toBe("https://ethereum.org/de/developers/docs/")
  expect(fileToUrl("public/content/translations/zh-tw/eth/index.md")).toBe(
    "https://ethereum.org/zh-tw/eth/"
  )
})

test("files that are not live pages map to nothing", () => {
  expect(fileToUrl("public/content/eth/image.png")).toBeNull()
  expect(fileToUrl("public/content/translations/nl/eth/index.md")).toBeNull()
  expect(fileToUrl("src/intl/en/common.json")).toBeNull()
  expect(fileToUrl("app/[locale]/page.tsx")).toBeNull()
})

test("removed pages are reported separately from changed ones", () => {
  const diff = [
    "M\tpublic/content/eth/index.md",
    "A\tpublic/content/translations/de/eth/index.md",
    "D\tpublic/content/old-page/index.md",
    "M\tpublic/content/eth/index.md",
    "M\tsrc/intl/en/common.json",
    "",
  ].join("\n")
  expect(changedPageUrls(diff)).toEqual({
    changed: ["https://ethereum.org/eth/", "https://ethereum.org/de/eth/"],
    removed: ["https://ethereum.org/old-page/"],
  })
})

test("sitemap locs are extracted and unescaped", () => {
  const xml =
    "<urlset><url><loc>https://ethereum.org/a/</loc></url>" +
    "<url><loc> https://ethereum.org/b/?x=1&amp;y=2 </loc></url></urlset>"
  expect(parseLocs(xml)).toEqual([
    "https://ethereum.org/a/",
    "https://ethereum.org/b/?x=1&y=2",
  ])
})

test("URLs resolve to their sitemap shard locale", () => {
  expect(urlLocale("https://ethereum.org/eth/")).toBe("en")
  expect(urlLocale("https://ethereum.org/de/eth/")).toBe("de")
  expect(urlLocale("https://ethereum.org/")).toBe("en")
})

test("batches respect the 10K-per-request limit", () => {
  const batches = chunk(Array.from({ length: 17_087 }), 10_000)
  expect(batches.map((b) => b.length)).toEqual([10_000, 7_087])
})
