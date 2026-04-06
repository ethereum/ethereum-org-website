/**
 * Tests for inert-value propagation.
 * Tests detection of inert changes (URL/path/code drift) and
 * context-aware replacement in translated files.
 */

import { parseMarkdown, serialize } from "intl-content-tree"
import { expect, test } from "@playwright/test"

import type { LocaleTranslationManifest } from "@/scripts/i18n/lib/ai/manifest-adapter"
import {
  applyInertChanges,
  detectInertChanges,
  updateTranslationManifest,
} from "@/scripts/i18n/lib/ai/propagate-inert"

// ---------------------------------------------------------------------------
// Shared config (must match ETHEREUM_ORG_CONFIG in manifest-adapter.ts)
// ---------------------------------------------------------------------------

const TREE_CONFIG = {
  depth: "element" as const,
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a source manifest JSON string from English markdown. */
function buildSourceManifest(content: string): string {
  const tree = parseMarkdown(content, TREE_CONFIG)
  return JSON.stringify(serialize(tree, "test.md"), null, 2)
}

/** Build a minimal translation manifest with placeholder entries. */
function buildTranslationManifest(
  sourceManifest: string,
  placeholders: Record<string, { type: string; values: Record<string, string> }>
): LocaleTranslationManifest {
  const parsed = JSON.parse(sourceManifest)
  return {
    version: 1,
    locale: "es",
    translatedAt: new Date().toISOString(),
    englishManifestHash: parsed.rootHash,
    placeholderOrder: Object.keys(placeholders),
    placeholderMap: placeholders,
    sections: {},
  }
}

// ---------------------------------------------------------------------------
// detectInertChanges
// ---------------------------------------------------------------------------

test.describe("detectInertChanges", () => {
  test("detects a link URL change", () => {
    const oldEnglish =
      "## Section {#test-section}\n\nSome [link](http://old.com) text.\n"
    const newEnglish =
      "## Section {#test-section}\n\nSome [link](http://new.com) text.\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const translationManifest = buildTranslationManifest(sourceManifest, {
      "LINK-001": {
        type: "link",
        values: { href: "http://old.com" },
      },
    })

    const changes = detectInertChanges(
      newEnglish,
      sourceManifest,
      translationManifest
    )
    expect(changes).toHaveLength(1)
    expect(changes[0].oldValue).toBe("http://old.com")
    expect(changes[0].newValue).toBe("http://new.com")
    expect(changes[0].elementType).toBe("link")
    expect(changes[0].key).toBe("href")
    expect(changes[0].placeholderId).toBe("LINK-001")
  })

  test("detects an image path change", () => {
    const oldEnglish =
      "## Images {#img-section}\n\n![Alt text](/old/path.png)\n"
    const newEnglish =
      "## Images {#img-section}\n\n![Alt text](/new/path.png)\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const translationManifest = buildTranslationManifest(sourceManifest, {
      "IMG-001": {
        type: "image",
        values: { src: "/old/path.png" },
      },
    })

    const changes = detectInertChanges(
      newEnglish,
      sourceManifest,
      translationManifest
    )
    expect(changes).toHaveLength(1)
    expect(changes[0].oldValue).toBe("/old/path.png")
    expect(changes[0].newValue).toBe("/new/path.png")
    expect(changes[0].elementType).toBe("image")
    expect(changes[0].key).toBe("src")
  })

  test("returns empty when nothing changed", () => {
    const english =
      "## Section {#test-section}\n\nSome [link](http://same.com) text.\n"

    const sourceManifest = buildSourceManifest(english)
    const translationManifest = buildTranslationManifest(sourceManifest, {
      "LINK-001": {
        type: "link",
        values: { href: "http://same.com" },
      },
    })

    const changes = detectInertChanges(
      english,
      sourceManifest,
      translationManifest
    )
    expect(changes).toHaveLength(0)
  })

  test("handles duplicate URLs with consume-on-match", () => {
    const oldEnglish =
      "## Section {#dup-section}\n\n[first](http://same.com) and [second](http://same.com) links.\n"
    const newEnglish =
      "## Section {#dup-section}\n\n[first](http://changed.com) and [second](http://changed.com) links.\n"

    const sourceManifest = buildSourceManifest(oldEnglish)

    // Two distinct placeholder entries with the same old value
    const translationManifest = buildTranslationManifest(sourceManifest, {
      "LINK-001": {
        type: "link",
        values: { href: "http://same.com" },
      },
      "LINK-002": {
        type: "link",
        values: { href: "http://same.com" },
      },
    })

    const changes = detectInertChanges(
      newEnglish,
      sourceManifest,
      translationManifest
    )

    // Both links changed, each should match a distinct placeholder
    expect(changes).toHaveLength(2)
    const ids = changes.map((c) => c.placeholderId)
    expect(ids).toContain("LINK-001")
    expect(ids).toContain("LINK-002")
  })

  test("detects multiple inert changes in one section", () => {
    const oldEnglish =
      "## Section {#multi}\n\nA [link](http://old.com) and ![img](/old.png).\n"
    const newEnglish =
      "## Section {#multi}\n\nA [link](http://new.com) and ![img](/new.png).\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const translationManifest = buildTranslationManifest(sourceManifest, {
      "LINK-001": {
        type: "link",
        values: { href: "http://old.com" },
      },
      "IMG-001": {
        type: "image",
        values: { src: "/old.png" },
      },
    })

    const changes = detectInertChanges(
      newEnglish,
      sourceManifest,
      translationManifest
    )
    expect(changes).toHaveLength(2)
    expect(changes.find((c) => c.key === "href")?.newValue).toBe(
      "http://new.com"
    )
    expect(changes.find((c) => c.key === "src")?.newValue).toBe("/new.png")
  })

  test("ignores sections without inert drift", () => {
    // Only prose changed -- no inert drift
    const oldEnglish =
      "## Section {#prose-only}\n\nOld prose with [link](http://same.com).\n"
    const newEnglish =
      "## Section {#prose-only}\n\nNew prose with [link](http://same.com).\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const translationManifest = buildTranslationManifest(sourceManifest, {
      "LINK-001": {
        type: "link",
        values: { href: "http://same.com" },
      },
    })

    const changes = detectInertChanges(
      newEnglish,
      sourceManifest,
      translationManifest
    )
    // Link didn't change, so no inert changes detected
    expect(changes).toHaveLength(0)
  })
})

// ---------------------------------------------------------------------------
// applyInertChanges
// ---------------------------------------------------------------------------

test.describe("applyInertChanges", () => {
  test("replaces link URL in markdown syntax", () => {
    const locale = "Texto con [enlace](http://old.com) aqui."
    const { content, applied, skipped } = applyInertChanges(locale, [
      {
        elementType: "link",
        key: "href",
        oldValue: "http://old.com",
        newValue: "http://new.com",
      },
    ])
    expect(content).toBe("Texto con [enlace](http://new.com) aqui.")
    expect(applied).toBe(1)
    expect(skipped).toBe(0)
  })

  test("replaces link URL in href attribute", () => {
    const locale = '<a href="http://old.com">enlace</a>'
    const { content } = applyInertChanges(locale, [
      {
        elementType: "link",
        key: "href",
        oldValue: "http://old.com",
        newValue: "http://new.com",
      },
    ])
    expect(content).toBe('<a href="http://new.com">enlace</a>')
  })

  test("replaces image path in markdown syntax", () => {
    const locale = "![Texto alt](/old/path.png)"
    const { content } = applyInertChanges(locale, [
      {
        elementType: "image",
        key: "src",
        oldValue: "/old/path.png",
        newValue: "/new/path.png",
      },
    ])
    expect(content).toBe("![Texto alt](/new/path.png)")
  })

  test("replaces inline code", () => {
    const locale = "Usa el comando `old-command` aqui."
    const { content } = applyInertChanges(locale, [
      {
        elementType: "inline-code",
        key: "value",
        oldValue: "old-command",
        newValue: "new-command",
      },
    ])
    expect(content).toBe("Usa el comando `new-command` aqui.")
  })

  test("replaces component attribute", () => {
    const locale = '<InfoBanner emoji=":wave:">\nTexto\n</InfoBanner>'
    const { content } = applyInertChanges(locale, [
      {
        elementType: "component-attribute",
        key: "emoji",
        oldValue: ":wave:",
        newValue: ":rocket:",
      },
    ])
    expect(content).toBe('<InfoBanner emoji=":rocket:">\nTexto\n</InfoBanner>')
  })

  test("replaces value inside code fences only", () => {
    const locale = [
      "old-value in prose.",
      "```js",
      "const x = 'old-value';",
      "```",
    ].join("\n")
    const { content } = applyInertChanges(locale, [
      {
        elementType: "code-body",
        key: "value",
        oldValue: "old-value",
        newValue: "new-value",
      },
    ])
    // Prose occurrence is NOT replaced (code-body targets fences only)
    expect(content).toContain("old-value in prose.")
    expect(content).toContain("const x = 'new-value';")
  })

  test("skips when old value not found in content", () => {
    const locale = "No matching content here."
    const { content, applied, skipped } = applyInertChanges(locale, [
      {
        elementType: "link",
        key: "href",
        oldValue: "http://not-here.com",
        newValue: "http://new.com",
      },
    ])
    expect(content).toBe(locale)
    expect(applied).toBe(0)
    expect(skipped).toBe(1)
  })

  test("applies multiple changes in sequence", () => {
    const locale = "[A](http://old-a.com) and ![B](/old-b.png) and `old-code`."
    const { content, applied } = applyInertChanges(locale, [
      {
        elementType: "link",
        key: "href",
        oldValue: "http://old-a.com",
        newValue: "http://new-a.com",
      },
      {
        elementType: "image",
        key: "src",
        oldValue: "/old-b.png",
        newValue: "/new-b.png",
      },
      {
        elementType: "inline-code",
        key: "value",
        oldValue: "old-code",
        newValue: "new-code",
      },
    ])
    expect(content).toBe(
      "[A](http://new-a.com) and ![B](/new-b.png) and `new-code`."
    )
    expect(applied).toBe(3)
  })

  test("handles $ in replacement values without injection", () => {
    const locale = "[link](http://old.com) text."
    const { content } = applyInertChanges(locale, [
      {
        elementType: "link",
        key: "href",
        oldValue: "http://old.com",
        newValue: "http://new.com/$1/path",
      },
    ])
    // $1 must appear literally, not be treated as a regex backreference
    expect(content).toBe("[link](http://new.com/$1/path) text.")
  })
})

// ---------------------------------------------------------------------------
// updateTranslationManifest
// ---------------------------------------------------------------------------

test.describe("updateTranslationManifest", () => {
  test("updates specific placeholder values", () => {
    const manifest: LocaleTranslationManifest = {
      version: 1,
      locale: "es",
      translatedAt: "2024-01-01T00:00:00Z",
      englishManifestHash: "oldhash",
      placeholderOrder: ["LINK-001"],
      placeholderMap: {
        "LINK-001": { type: "link", values: { href: "http://old.com" } },
      },
      sections: {},
    }

    const updated = updateTranslationManifest(
      manifest,
      [
        {
          elementType: "link",
          key: "href",
          oldValue: "http://old.com",
          newValue: "http://new.com",
          placeholderId: "LINK-001",
        },
      ],
      "newhash"
    )

    expect(updated.englishManifestHash).toBe("newhash")
    expect(updated.placeholderMap["LINK-001"].values.href).toBe(
      "http://new.com"
    )
  })

  test("does not modify entries without matching placeholderId", () => {
    const manifest: LocaleTranslationManifest = {
      version: 1,
      locale: "es",
      translatedAt: "2024-01-01T00:00:00Z",
      englishManifestHash: "oldhash",
      placeholderOrder: ["LINK-001", "LINK-002"],
      placeholderMap: {
        "LINK-001": { type: "link", values: { href: "http://old.com" } },
        "LINK-002": { type: "link", values: { href: "http://keep.com" } },
      },
      sections: {},
    }

    const updated = updateTranslationManifest(
      manifest,
      [
        {
          elementType: "link",
          key: "href",
          oldValue: "http://old.com",
          newValue: "http://new.com",
          placeholderId: "LINK-001",
        },
      ],
      "newhash"
    )

    expect(updated.placeholderMap["LINK-001"].values.href).toBe(
      "http://new.com"
    )
    // LINK-002 should be untouched
    expect(updated.placeholderMap["LINK-002"].values.href).toBe(
      "http://keep.com"
    )
  })
})
