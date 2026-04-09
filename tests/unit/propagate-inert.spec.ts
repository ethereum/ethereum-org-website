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

// ---------------------------------------------------------------------------
// detectInertChanges
// ---------------------------------------------------------------------------

test.describe("detectInertChanges", () => {
  test("detects a link URL change", async () => {
    const oldEnglish =
      "## Section {#test-section}\n\nSome [link](http://old.com) text.\n"
    const newEnglish =
      "## Section {#test-section}\n\nSome [link](http://new.com) text.\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const changes = await detectInertChanges(
      newEnglish,
      sourceManifest,
      "markdown",
      oldEnglish
    )

    expect(changes).toHaveLength(1)
    expect(changes[0].oldValue).toBe("http://old.com")
    expect(changes[0].newValue).toBe("http://new.com")
    expect(changes[0].elementType).toBe("link")
    expect(changes[0].key).toBe("href")
  })

  test("detects an image path change", async () => {
    const oldEnglish =
      "## Images {#img-section}\n\n![Alt text](/old/path.png)\n"
    const newEnglish =
      "## Images {#img-section}\n\n![Alt text](/new/path.png)\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const changes = await detectInertChanges(
      newEnglish,
      sourceManifest,
      "markdown",
      oldEnglish
    )

    expect(changes).toHaveLength(1)
    expect(changes[0].oldValue).toBe("/old/path.png")
    expect(changes[0].newValue).toBe("/new/path.png")
    expect(changes[0].elementType).toBe("image")
  })

  test("returns empty when nothing changed", async () => {
    const english =
      "## Section {#test-section}\n\nSome [link](http://same.com) text.\n"

    const sourceManifest = buildSourceManifest(english)
    const changes = await detectInertChanges(
      english,
      sourceManifest,
      "markdown",
      english
    )

    expect(changes).toHaveLength(0)
  })

  test("handles duplicate URLs", async () => {
    const oldEnglish =
      "## Section {#dup-section}\n\n[first](http://same.com) and [second](http://same.com) links.\n"
    const newEnglish =
      "## Section {#dup-section}\n\n[first](http://changed.com) and [second](http://changed.com) links.\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const changes = await detectInertChanges(
      newEnglish,
      sourceManifest,
      "markdown",
      oldEnglish
    )

    expect(changes).toHaveLength(2)
    expect(changes.every((c) => c.oldValue === "http://same.com")).toBe(true)
    expect(changes.every((c) => c.newValue === "http://changed.com")).toBe(true)
  })

  test("detects multiple inert changes in one section", async () => {
    const oldEnglish =
      "## Section {#multi}\n\nA [link](http://old.com) and ![img](/old.png).\n"
    const newEnglish =
      "## Section {#multi}\n\nA [link](http://new.com) and ![img](/new.png).\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const changes = await detectInertChanges(
      newEnglish,
      sourceManifest,
      "markdown",
      oldEnglish
    )

    expect(changes).toHaveLength(2)
    expect(changes.find((c) => c.elementType === "link")?.newValue).toBe(
      "http://new.com"
    )
    expect(changes.find((c) => c.elementType === "image")?.newValue).toBe(
      "/new.png"
    )
  })

  test("ignores sections without inert drift", async () => {
    const oldEnglish =
      "## Section {#prose-only}\n\nOld prose with [link](http://same.com).\n"
    const newEnglish =
      "## Section {#prose-only}\n\nNew prose with [link](http://same.com).\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const changes = await detectInertChanges(
      newEnglish,
      sourceManifest,
      "markdown",
      oldEnglish
    )

    expect(changes).toHaveLength(0)
  })

  test("detects component attribute changes", async () => {
    const oldEnglish = '## Test {#test}\n\n<YouTube id="abc123" />\n'
    const newEnglish = '## Test {#test}\n\n<YouTube id="def456" />\n'

    const sourceManifest = buildSourceManifest(oldEnglish)
    const changes = await detectInertChanges(
      newEnglish,
      sourceManifest,
      "markdown",
      oldEnglish
    )

    expect(changes).toHaveLength(1)
    expect(changes[0].oldValue).toBe("abc123")
    expect(changes[0].newValue).toBe("def456")
    expect(changes[0].elementType).toBe("component-attribute")
    expect(changes[0].key).toBe("id")
  })

  test("detects frontmatter field changes", async () => {
    const oldEnglish =
      "---\ntitle: Test\nimage: /old.png\n---\n\n## Sec {#sec}\n\nBody.\n"
    const newEnglish =
      "---\ntitle: Test\nimage: /new.png\n---\n\n## Sec {#sec}\n\nBody.\n"

    const sourceManifest = buildSourceManifest(oldEnglish)
    const changes = await detectInertChanges(
      newEnglish,
      sourceManifest,
      "markdown",
      oldEnglish
    )

    expect(changes).toHaveLength(1)
    expect(changes[0].oldValue).toBe("/old.png")
    expect(changes[0].newValue).toBe("/new.png")
    expect(changes[0].elementType).toBe("frontmatter-field")
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
        elementType: "html-tag",
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

  test("replaces component attribute with string value", () => {
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

  test("replaces component attribute with JSX expression", () => {
    const locale = "<Emoji size={1} />"
    const { content } = applyInertChanges(locale, [
      {
        elementType: "component-attribute",
        key: "size",
        oldValue: "1",
        newValue: "2",
      },
    ])
    expect(content).toBe("<Emoji size={2} />")
  })

  test("replaces frontmatter field", () => {
    const locale =
      "---\ntitle: Titulo\nimage: /old/path.png\nlang: es\n---\n\nContenido."
    const { content } = applyInertChanges(locale, [
      {
        elementType: "frontmatter-field",
        key: "image",
        oldValue: "/old/path.png",
        newValue: "/new/path.png",
      },
    ])
    expect(content).toContain("image: /new/path.png")
    expect(content).toContain("title: Titulo")
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
    expect(content).toBe("[link](http://new.com/$1/path) text.")
  })
})

// ---------------------------------------------------------------------------
// updateTranslationManifest
// ---------------------------------------------------------------------------

test.describe("updateTranslationManifest", () => {
  test("updates placeholder values by matching old value", () => {
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
        },
      ],
      "newhash"
    )

    expect(updated.englishManifestHash).toBe("newhash")
    expect(updated.placeholderMap["LINK-001"].values.href).toBe(
      "http://new.com"
    )
  })

  test("does not modify entries with different values", () => {
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
        },
      ],
      "newhash"
    )

    expect(updated.placeholderMap["LINK-001"].values.href).toBe(
      "http://new.com"
    )
    expect(updated.placeholderMap["LINK-002"].values.href).toBe(
      "http://keep.com"
    )
  })
})
