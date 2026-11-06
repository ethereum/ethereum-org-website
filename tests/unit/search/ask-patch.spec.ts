import { readFileSync } from "fs"

import { expect, test } from "@playwright/test"

test.describe("defaultActiveItemId patch", () => {
  test("the library takes the prop that leaves nothing highlighted", () => {
    // Without it the first result is always active, Enter always opens it, and Ask AI
    // cannot have the key. The value is hardcoded in the vendor's createAutocomplete
    // call, so a prop is the only way to reach it.
    const pkg = JSON.parse(readFileSync("package.json", "utf-8"))
    expect(
      pkg.pnpm?.patchedDependencies?.["typesense-docsearch-react"],
      "the vendor patch is no longer registered"
    ).toBeTruthy()

    const modal = readFileSync(
      "node_modules/typesense-docsearch-react/dist/esm/DocSearchModal.js",
      "utf-8"
    )
    expect(modal).toContain("_ref.defaultActiveItemId")
    expect(modal).toContain("defaultActiveItemId: defaultActiveItemId")
  })
})
