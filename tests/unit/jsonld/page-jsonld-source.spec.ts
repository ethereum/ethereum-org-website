import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { expect, test } from "@playwright/test"

const REPO_ROOT = path.resolve(__dirname, "../../..")

const files = readdirSync(path.join(REPO_ROOT, "app"), { recursive: true })
  .map(String)
  .filter((f) => path.basename(f) === "page-jsonld.tsx")

test("page-jsonld files are discovered", () => {
  expect(files.length).toBeGreaterThan(30)
})

for (const file of files) {
  test(file, () => {
    const src = readFileSync(path.join(REPO_ROOT, "app", file), "utf8")
    expect(
      src,
      "dateModified needs an ISO date (lastEditDate), not the localized display string"
    ).not.toContain("lastEditLocaleTimestamp")
    expect(src, "build site URLs from SITE_URL").not.toContain(
      "https://ethereum.org"
    )
  })
}
