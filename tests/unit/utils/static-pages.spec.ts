import { mkdirSync, writeFileSync } from "fs"
import { join } from "path"

import { expect, test } from "@playwright/test"

import { discoverStaticPages } from "@/lib/utils/staticPages"

test("discoverStaticPages excludes non-public Next.js route segments", (_, testInfo) => {
  const root = testInfo.outputPath("routes")
  const publicPage = join(root, "public")
  const excluded = ["[slug]", "_private", "@modal", "(.)intercept"]

  mkdirSync(publicPage, { recursive: true })
  writeFileSync(join(publicPage, "page.tsx"), "")
  for (const segment of excluded) {
    const dir = join(root, segment)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, "page.tsx"), "")
  }

  expect(discoverStaticPages(root)).toEqual(["/public"])
})
