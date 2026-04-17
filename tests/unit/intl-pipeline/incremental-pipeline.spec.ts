/**
 * Incremental Translation Pipeline Tests
 *
 * Contract: pipeline(englishA, englishB, localeA, format, llmMock?) -> localeB
 *
 * Phase 1-2 tests verify the intl-content-tree package produces correct
 * detection and classification. These pass now.
 *
 * Phase 3-5 tests verify the pipeline implementation produces correct output.
 * These call pipeline() which must be wired to the real implementation.
 *
 * LLM is mocked: returns corresponding sections from locale-B fixtures.
 */

import {
  type ContentTreeConfig,
  diff,
  extractChanges,
  parseJson,
  parseMarkdown,
} from "intl-content-tree"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { expect, test } from "@playwright/test"

import { pipeline } from "../../../src/scripts/intl-pipeline"

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const FIXTURES = join(__dirname, "../../fixtures/incremental")
const read = (p: string) => readFileSync(join(FIXTURES, p), "utf-8")

const EN_A_MD = read("english-a/fixture-1.md")
const EN_B_MD = read("english-b/fixture-1.md")
const EN_A_JSON = read("english-a/fixture-1.json")
const EN_B_JSON = read("english-b/fixture-1.json")
const EN_A_JSON2 = read("english-a/fixture-2.json")
const EN_B_JSON2 = read("english-b/fixture-2.json")

const locA = (lang: string, ext: string) =>
  read(`locale-a/${lang}/fixture-1.${ext}`)
const locA2 = (lang: string) => read(`locale-a/${lang}/fixture-2.json`)
const locB = (lang: string, ext: string) =>
  read(`locale-b/${lang}/fixture-1.${ext}`)
const locExpected = (lang: string, ext: string) =>
  read(`locale-expected/${lang}/fixture-1.${ext}`)

const CONFIG: Partial<ContentTreeConfig> = {
  depth: "element",
  translatableAttributes: [
    "title",
    "description",
    "alt",
    "label",
    "aria-label",
    "placeholder",
    "buttonLabel",
    "name",
    "caption",
    "contentPreview",
    "location",
  ],
}

const LANGS = ["es", "ko", "ur"] as const

// ---------------------------------------------------------------------------
// Pipeline: imported from src/scripts/intl-pipeline
// ---------------------------------------------------------------------------

// ===================================================================
// PHASE 1: Change Detection -- passes now (package only)
// ===================================================================

test.describe("Phase 1: Markdown change detection", () => {
  const treeA = parseMarkdown(EN_A_MD, CONFIG)
  const treeB = parseMarkdown(EN_B_MD, CONFIG)
  const cs = extractChanges(treeA, treeB)
  const dr = diff(treeA, treeB)

  // --- DiffResult section-level ---

  test("28 unchanged entries", () => {
    expect(dr.unchanged).toHaveLength(28)
  })

  test("7 inertDrift entries", () => {
    expect(dr.inertDrift).toHaveLength(7)
    const ids = dr.inertDrift.map((e) => e.id)
    expect(ids).toContain("frontmatter:image")
    expect(ids).toContain("code-review")
    expect(ids).toContain("sbom-generation")
  })

  test("3 structuralDrift entries", () => {
    expect(dr.structuralDrift).toHaveLength(3)
    const ids = dr.structuralDrift.map((e) => e.id)
    expect(ids).toContain("community-collaboration")
    expect(ids).toContain("compliance-and-auditing")
    expect(ids).toContain("license-scanning")
  })

  test("7 translatableDrift entries (includes parent sections)", () => {
    expect(dr.translatableDrift).toHaveLength(7)
    expect(
      dr.translatableDrift.some((e) => e.id === "frontmatter:description")
    ).toBe(true)
    expect(dr.translatableDrift.some((e) => e.id === "copyleft-licenses")).toBe(
      true
    )
    expect(
      dr.translatableDrift.some((e) => e.id === "permissive-licenses")
    ).toBe(true)
    expect(dr.translatableDrift.some((e) => e.id === "the-four-freedoms")).toBe(
      true
    )
  })

  test("2 added entries", () => {
    expect(dr.added).toHaveLength(2)
    const ids = dr.added.map((e) => e.id)
    expect(ids).toContain("dual-licensing")
    expect(ids).toContain("how-to-contribute")
  })

  test("2 removed entries", () => {
    expect(dr.removed).toHaveLength(2)
    const ids = dr.removed.map((e) => e.id)
    expect(ids).toContain("contributing-to-projects")
    expect(ids).toContain("component:2") // Divider
  })

  test("comparison-table, key-terms, further-reading are unchanged", () => {
    const ids = dr.unchanged.map((e) => e.id)
    expect(ids).toContain("comparison-table")
    expect(ids).toContain("key-terms")
    expect(ids).toContain("further-reading")
  })

  // --- ChangeSet node-level ---

  test("30 node-level changes", () => {
    expect(cs.changes).toHaveLength(30)
  })

  test("1 section rename: contributing-to-projects -> how-to-contribute", () => {
    expect(cs.sectionRenames).toHaveLength(1)
    expect(cs.sectionRenames[0].oldId).toBe("contributing-to-projects")
    expect(cs.sectionRenames[0].newId).toBe("how-to-contribute")
  })

  test("1 relocation detected", () => {
    expect(cs.relocations).toHaveLength(1)
  })

  test("specific inert changes detected", () => {
    // M4: OSI href
    expect(
      cs.changes.some(
        (c) =>
          c.oldValue === "https://opensource.org/osd" &&
          c.newValue === "https://opensource.org/osd/annotated"
      )
    ).toBe(true)

    // M5: inline code LICENSE -> LICENSE.md
    expect(
      cs.changes.some(
        (c) =>
          c.elementType === "inline-code" &&
          c.oldValue === "LICENSE" &&
          c.newValue === "LICENSE.md"
      )
    ).toBe(true)

    // M6: choosealicense href
    expect(
      cs.changes.some(
        (c) =>
          c.oldValue === "https://choosealicense.com/" &&
          c.newValue === "https://choosealicense.com/?lang=en"
      )
    ).toBe(true)
  })

  test("specific translatable changes detected", () => {
    // M10: solidity code comment
    expect(
      cs.changes.some(
        (c) =>
          c.contentType === "translatable" &&
          c.elementType === "code-comment" &&
          c.oldValue?.includes("demonstrates a simple registry")
      )
    ).toBe(true)

    // M9: InfoBanner title attr
    expect(
      cs.changes.some(
        (c) =>
          c.key === "title" &&
          c.oldValue === "Important distinction" &&
          c.newValue === "Key concept"
      )
    ).toBe(true)
  })
})

test.describe("Phase 1: JSON change detection", () => {
  const treeA = parseJson(EN_A_JSON, CONFIG)
  const treeB = parseJson(EN_B_JSON, CONFIG)
  const cs = extractChanges(treeA, treeB)
  const dr = diff(treeA, treeB)

  test("5 unchanged keys", () => {
    expect(dr.unchanged).toHaveLength(5)
    const ids = dr.unchanged.map((e) => e.id)
    expect(ids).toContain("page-title")
    expect(ids).toContain("hero-cta-primary")
    expect(ids).toContain("filter-label")
  })

  test("5 inertDrift keys", () => {
    expect(dr.inertDrift).toHaveLength(5)
    const ids = dr.inertDrift.map((e) => e.id)
    expect(ids).toContain("banner-text")
    expect(ids).toContain("footer-note")
    expect(ids).toContain("welcome-user")
    expect(ids).toContain("project-count")
    expect(ids).toContain("multi-link")
  })

  test("3 translatableDrift keys", () => {
    expect(dr.translatableDrift).toHaveLength(3)
    const ids = dr.translatableDrift.map((e) => e.id)
    expect(ids).toContain("page-description")
    expect(ids).toContain("stat-label-contributors")
    expect(ids).toContain("nested")
  })

  test("1 added key (new-key)", () => {
    expect(dr.added).toHaveLength(1)
    expect(dr.added[0].id).toBe("new-key")
  })

  test("1 removed key (empty-results)", () => {
    expect(dr.removed).toHaveLength(1)
    expect(dr.removed[0].id).toBe("empty-results")
  })

  test("11 node-level changes", () => {
    expect(cs.changes).toHaveLength(11)
  })

  test("ICU variable renames detected", () => {
    expect(
      cs.changes.some(
        (c) =>
          c.elementType === "icu-variable" && c.path.includes("welcome-user")
      )
    ).toBe(true)
    expect(
      cs.changes.some(
        (c) =>
          c.elementType === "icu-variable" && c.path.includes("project-count")
      )
    ).toBe(true)
  })

  test("HTML href changes in values detected", () => {
    expect(
      cs.changes.some((c) => c.key === "href" && c.path.includes("banner-text"))
    ).toBe(true)
    expect(
      cs.changes.some((c) => c.key === "href" && c.path.includes("footer-note"))
    ).toBe(true)
    expect(
      cs.changes.some((c) => c.key === "href" && c.path.includes("multi-link"))
    ).toBe(true)
  })
})

// ===================================================================
// PHASE 2: Routing -- passes now (package only)
// ===================================================================

test.describe("Phase 2: Routing", () => {
  const treeA = parseMarkdown(EN_A_MD, CONFIG)
  const treeB = parseMarkdown(EN_B_MD, CONFIG)
  const dr = diff(treeA, treeB)

  test("inertDrift entries have anchorHashChanged but not contentHashChanged", () => {
    for (const e of dr.inertDrift) {
      expect(e.contentHashChanged).toBe(false)
      expect(e.anchorHashChanged).toBe(true)
    }
  })

  test("translatableDrift entries have contentHashChanged", () => {
    for (const e of dr.translatableDrift) {
      expect(e.contentHashChanged).toBe(true)
    }
  })

  test("no section in both inertDrift and translatableDrift", () => {
    const inertIds = new Set(dr.inertDrift.map((e) => e.id))
    for (const e of dr.translatableDrift) {
      expect(inertIds.has(e.id)).toBe(false)
    }
  })

  test("leaf-level deduplication: deepest translatableDrift entries", () => {
    const paths = dr.translatableDrift.map((e) => e.path)
    const leaves = paths.filter(
      (p) => !paths.some((o) => o !== p && o.startsWith(p + "/"))
    )
    // Leaves should include the deepest sections, not their parents
    expect(leaves).toContain(
      "understanding-open-source-licensing/what-is-open-source/the-four-freedoms"
    )
    expect(leaves).toContain(
      "understanding-open-source-licensing/choosing-a-license/copyleft-licenses"
    )
    expect(leaves).toContain(
      "understanding-open-source-licensing/choosing-a-license/permissive-licenses"
    )
    // Parents should NOT be leaves
    expect(leaves).not.toContain("understanding-open-source-licensing")
    expect(leaves).not.toContain(
      "understanding-open-source-licensing/choosing-a-license"
    )
  })
})

// ===================================================================
// PHASE 3-5: Pipeline output -- fails until implemented
// ===================================================================

for (const lang of LANGS) {
  test.describe(`Pipeline output [${lang}] Markdown`, () => {
    // --- Inert changes (deterministic, no LLM) ---

    test("M1: frontmatter image path updated", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("hero-licensing-v2.png")
      expect(result).not.toContain("hero-licensing.png")
    })

    test("M4: OSI link href updated", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("opensource.org/osd/annotated")
    })

    test("M5: inline code LICENSE -> LICENSE.md", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("`LICENSE.md`")
    })

    test("M6: HTML href choosealicense ?lang=en", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("choosealicense.com/?lang=en")
    })

    test("M7: image path updated to v2", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("license-comparison-v2.png")
    })

    test("M12: ExpandableCard eventCategory updated", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("copyleft-guide")
    })

    test("M13: GPL FAQ href #AllCompatibility", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("gpl-faq.html#AllCompatibility")
    })

    test("M18: DocLink href /getting-started/", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("/contributing/getting-started/")
    })

    test("M19: AlertEmoji text :eyes:", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain(":eyes:")
      expect(result).not.toContain(":mag:")
    })

    test("M22: YouTube id spec-fixture-002", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("spec-fixture-002")
      expect(result).not.toContain("spec-fixture-001")
    })

    test("M25: ButtonLink href /quick-start/", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("/contributing/quick-start/")
    })

    test("M26: Emoji text :star: in heading", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain(":star:")
      expect(result).not.toContain(":bulb:")
    })

    test("M27: Card href /license-audit/", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("/tools/license-audit/")
    })

    test("M28: QuizWidget quizKey oss-licensing-v2", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("oss-licensing-v2")
    })

    // --- Structural changes (deterministic, no LLM) ---

    test("M3: <Divider /> removed", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).not.toContain("<Divider />")
    })

    test("M20: className='featured' added to DocLink", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain('className="featured"')
    })

    test("M21: JSON code fence added", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain('"license-scan"')
    })

    // --- Rename ---

    test("M17: heading ID renamed to how-to-contribute", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("{#how-to-contribute}")
      expect(result).not.toContain("{#contributing-to-projects}")
    })

    // --- Reorder ---

    test("M24: compliance-and-auditing before community-collaboration", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      const compIdx = result.indexOf("{#compliance-and-auditing}")
      const commIdx = result.indexOf("{#community-collaboration}")
      expect(compIdx).toBeGreaterThan(-1)
      expect(commIdx).toBeGreaterThan(-1)
      expect(compIdx).toBeLessThan(commIdx)
    })

    // --- Added section ---

    test("M23: #dual-licensing section present", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      expect(result).toContain("{#dual-licensing}")
    })

    // --- Do no harm ---

    test("unchanged: comparison-table section preserved from locale-A", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      const loc = locA(lang, "md")
      // Extract the comparison-table section from both
      const extract = (s: string) => {
        const start = s.indexOf("{#comparison-table}")
        if (start === -1) return ""
        const lineStart = s.lastIndexOf("\n", start) + 1
        const nextH = s.indexOf("\n#", start + 1)
        return s.slice(lineStart, nextH > -1 ? nextH : undefined).trim()
      }
      expect(extract(result)).toBe(extract(loc))
    })

    test("unchanged: further-reading section preserved from locale-A", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      const loc = locA(lang, "md")
      const extract = (s: string) => {
        const start = s.indexOf("{#further-reading}")
        if (start === -1) return ""
        const lineStart = s.lastIndexOf("\n", start) + 1
        return s.slice(lineStart).trim()
      }
      expect(extract(result)).toBe(extract(loc))
    })
  })

  test.describe(`Pipeline output [${lang}] JSON`, () => {
    test("J3: banner-text href /getting-started/", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      expect(result["banner-text"]).toContain("/contributing/getting-started/")
      expect(result["banner-text"]).not.toContain('"/contributing/"')
    })

    test("J4: footer-note href ?sortBy=name", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      expect(result["footer-note"]).toContain("?sortBy=name")
    })

    test("J5: ICU {username} -> {displayName}", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      expect(result["welcome-user"]).toContain("{displayName}")
      expect(result["welcome-user"]).not.toContain("{username}")
    })

    test("J6: ICU {count} -> {total}", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      expect(result["project-count"]).toContain("{total,")
      expect(result["project-count"]).not.toContain("{count,")
    })

    test("J8: multi-link third href spdx.org/licenses/", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      expect(result["multi-link"]).toContain("spdx.org/licenses/")
    })

    test("J9: new-key added", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      expect(result["new-key"]).toBeDefined()
    })

    test("J10: empty-results removed", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      expect(result["empty-results"]).toBeUndefined()
    })

    test("unchanged: page-title preserved from locale-A", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      const orig = JSON.parse(locA(lang, "json"))
      expect(result["page-title"]).toBe(orig["page-title"])
    })

    test("unchanged: hero-cta-primary preserved from locale-A", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      const orig = JSON.parse(locA(lang, "json"))
      expect(result["hero-cta-primary"]).toBe(orig["hero-cta-primary"])
    })

    test("unchanged: contribution-status preserved from locale-A", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      const orig = JSON.parse(locA(lang, "json"))
      expect(result["contribution-status"]).toBe(orig["contribution-status"])
    })

    test("unchanged: filter-label preserved from locale-A", () => {
      const result = JSON.parse(
        pipeline(EN_A_JSON, EN_B_JSON, locA(lang, "json"), "json")
      )
      const orig = JSON.parse(locA(lang, "json"))
      expect(result["filter-label"]).toBe(orig["filter-label"])
    })
  })
}

// ===================================================================
// SOV: Inline element ordering -- fails until implemented
// ===================================================================

for (const lang of ["ko", "ur"] as const) {
  test.describe(`SOV [${lang}]`, () => {
    test("multi-link: correct href updated regardless of element order", () => {
      const result = pipeline(EN_A_MD, EN_B_MD, locA(lang, "md"), "markdown")
      // Sepolia href replaced with Holesky
      expect(result).toContain("holesky.dev")
      expect(result).not.toContain("sepolia.dev")
      // Other three links untouched
      expect(result).toContain("remix.ethereum.org")
      expect(result).toContain("eth.blockscout.com")
      expect(result).toContain("/glossary/#smart-contract")
    })
  })
}

// ===================================================================
// E2E: full pipeline output matches expected fixtures
// ===================================================================

for (const lang of LANGS) {
  test(`E2E [${lang}] markdown: output matches expected`, () => {
    const expected = locExpected(lang, "md")
    const result = pipeline(
      EN_A_MD,
      EN_B_MD,
      locA(lang, "md"),
      "markdown",
      (sectionId, _englishContent) => {
        // Mock LLM: extract section from locale-B by heading ID
        const lb = locB(lang, "md")
        const pattern = new RegExp(
          `(^#{1,6}\\s+[^\\n]*\\{#${sectionId}\\}[^\\n]*$)`,
          "m"
        )
        const match = lb.match(pattern)
        if (!match) return _englishContent
        const start = lb.indexOf(match[0])
        const nextH = lb.indexOf("\n#", start + 1)
        return lb.slice(start, nextH > -1 ? nextH : undefined).trim()
      }
    )
    expect(result).toBe(expected)
  })

  test(`E2E [${lang}] JSON: output matches expected`, () => {
    const expected = locExpected(lang, "json")
    const result = pipeline(
      EN_A_JSON,
      EN_B_JSON,
      locA(lang, "json"),
      "json",
      (key, _englishContent) => {
        const lb = JSON.parse(locB(lang, "json"))
        return lb[key] ?? _englishContent
      }
    )
    expect(result).toBe(expected)
  })
}

// ===================================================================
// Fixture-2: No-drift JSON (identical english-a and english-b)
// ===================================================================

for (const lang of LANGS) {
  test(`No-drift [${lang}] JSON fixture-2: output matches locale-A exactly`, () => {
    const result = pipeline(EN_A_JSON2, EN_B_JSON2, locA2(lang), "json")
    // No drift = output should be byte-for-byte identical to locale-A
    expect(result).toBe(locA2(lang))
  })
}
