/**
 * Tests for inert-value propagation.
 * Tests detection of inert changes and deterministic,
 * section-scoped, occurrence-counted replacement.
 */

import { expect, test } from "@playwright/test"

import type { LocaleTranslationManifest } from "@/scripts/i18n/lib/ai/manifest-adapter"
import {
  applyInertChanges,
  type InertChange,
  updateTranslationManifest,
} from "@/scripts/i18n/lib/ai/propagate-inert"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mkChange(
  overrides: Partial<InertChange> & { oldValue: string; newValue: string }
): InertChange {
  return {
    elementType: "link",
    key: "href",
    path: "test/link:0",
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// applyInertChanges: markdown basic
// ---------------------------------------------------------------------------

test.describe("applyInertChanges markdown basic", () => {
  test("replaces link URL in markdown syntax", () => {
    const { content, applied } = applyInertChanges(
      "## S {#s}\n\nTexto [enlace](http://old.com) aqui.",
      [
        mkChange({
          oldValue: "http://old.com",
          newValue: "http://new.com",
          path: "s/link:0",
        }),
      ]
    )
    expect(content).toContain("[enlace](http://new.com)")
    expect(applied).toHaveLength(1)
  })

  test("replaces HTML href", () => {
    const { content } = applyInertChanges(
      '## S {#s}\n\n<a href="http://old.com">enlace</a>',
      [
        mkChange({
          elementType: "html-tag",
          key: "href",
          oldValue: "http://old.com",
          newValue: "http://new.com",
          path: "s/html-tag:0",
        }),
      ]
    )
    expect(content).toContain('href="http://new.com"')
  })

  test("replaces image path", () => {
    const { content } = applyInertChanges("## S {#s}\n\n![Alt](/old.png)", [
      mkChange({
        elementType: "image",
        key: "src",
        oldValue: "/old.png",
        newValue: "/new.png",
        path: "s/image:0",
      }),
    ])
    expect(content).toContain("![Alt](/new.png)")
  })

  test("replaces inline code", () => {
    const { content } = applyInertChanges("## S {#s}\n\nUsa `old-cmd` aqui.", [
      mkChange({
        elementType: "inline-code",
        key: "value",
        oldValue: "old-cmd",
        newValue: "new-cmd",
        path: "s/inline-code:0",
      }),
    ])
    expect(content).toContain("`new-cmd`")
  })

  test("replaces component attribute string", () => {
    const { content } = applyInertChanges(
      '## S {#s}\n\n<InfoBanner emoji=":wave:">\nTexto\n</InfoBanner>',
      [
        mkChange({
          elementType: "component-attribute",
          key: "emoji",
          oldValue: ":wave:",
          newValue: ":rocket:",
          path: "s/component:0/attr:emoji",
        }),
      ]
    )
    expect(content).toContain('emoji=":rocket:"')
  })

  test("replaces component attribute JSX expression", () => {
    const { content } = applyInertChanges("## S {#s}\n\n<Emoji size={1} />", [
      mkChange({
        elementType: "component-attribute",
        key: "size",
        oldValue: "1",
        newValue: "2",
        path: "s/component:0/attr:size",
      }),
    ])
    expect(content).toContain("size={2}")
  })

  test("replaces frontmatter field", () => {
    const { content } = applyInertChanges(
      "---\ntitle: Titulo\nimage: /old.png\nlang: es\n---\n\n## S {#s}\n\nC.",
      [
        mkChange({
          elementType: "frontmatter-field",
          key: "image",
          oldValue: "/old.png",
          newValue: "/new.png",
          path: "frontmatter:image",
        }),
      ]
    )
    expect(content).toContain("image: /new.png")
    expect(content).toContain("title: Titulo")
  })

  test("handles $ in replacement values", () => {
    const { content } = applyInertChanges(
      "## S {#s}\n\n[link](http://old.com) text.",
      [
        mkChange({
          oldValue: "http://old.com",
          newValue: "http://new.com/$1/path",
          path: "s/link:0",
        }),
      ]
    )
    expect(content).toContain("http://new.com/$1/path")
  })
})

// ---------------------------------------------------------------------------
// applyInertChanges: markdown precision
// ---------------------------------------------------------------------------

test.describe("applyInertChanges markdown precision", () => {
  test("duplicate URL: changes only link:1, not link:0", () => {
    const locale =
      "## Sec {#sec}\n\n[A](http://x.com) and [B](http://x.com) here."
    const { content } = applyInertChanges(locale, [
      mkChange({
        oldValue: "http://x.com",
        newValue: "http://y.com",
        path: "sec/link:1",
      }),
    ])
    expect(content).toContain("[A](http://x.com)")
    expect(content).toContain("[B](http://y.com)")
  })

  test("cross-section isolation", () => {
    const locale = [
      "## First {#first}",
      "",
      "[link](http://x.com) in first.",
      "",
      "## Second {#second}",
      "",
      "[link](http://x.com) in second.",
    ].join("\n")
    const { content } = applyInertChanges(locale, [
      mkChange({
        oldValue: "http://x.com",
        newValue: "http://y.com",
        path: "first/link:0",
      }),
    ])
    expect(content).toContain("[link](http://y.com) in first.")
    expect(content).toContain("[link](http://x.com) in second.")
  })

  test("innermost section scope", () => {
    const locale = [
      "## Parent {#parent}",
      "",
      "[link](http://x.com) in parent.",
      "",
      "### Child {#child}",
      "",
      "[link](http://x.com) in child.",
    ].join("\n")
    const { content } = applyInertChanges(locale, [
      mkChange({
        oldValue: "http://x.com",
        newValue: "http://y.com",
        path: "parent/child/link:0",
      }),
    ])
    expect(content).toContain("[link](http://x.com) in parent.")
    expect(content).toContain("[link](http://y.com) in child.")
  })

  test("frontmatter scoping: body unaffected", () => {
    const locale =
      "---\nimage: /path.png\n---\n\n## S {#s}\n\n![alt](/path.png)"
    const { content } = applyInertChanges(locale, [
      mkChange({
        elementType: "frontmatter-field",
        key: "image",
        oldValue: "/path.png",
        newValue: "/new.png",
        path: "frontmatter:image",
      }),
    ])
    expect(content).toContain("image: /new.png")
    expect(content).toContain("![alt](/path.png)")
  })

  test("preamble scoping", () => {
    const locale =
      "---\ntitle: T\n---\n\n[link](http://x.com) preamble.\n\n## S {#s}\n\n[link](http://x.com) section."
    const { content } = applyInertChanges(locale, [
      mkChange({
        oldValue: "http://x.com",
        newValue: "http://y.com",
        path: "prose:0/link:0",
      }),
    ])
    expect(content).toContain("[link](http://y.com) preamble.")
    expect(content).toContain("[link](http://x.com) section.")
  })

  test("two YouTube components: change one", () => {
    const locale = [
      "## S {#s}",
      "",
      '<YouTube id="aaa" />',
      "",
      '<YouTube id="bbb" />',
    ].join("\n")
    const { content } = applyInertChanges(locale, [
      mkChange({
        elementType: "component-attribute",
        key: "id",
        oldValue: "bbb",
        newValue: "ccc",
        path: "s/component:1/attr:id",
      }),
    ])
    expect(content).toContain('id="aaa"')
    expect(content).toContain('id="ccc"')
    expect(content).not.toContain('id="bbb"')
  })

  test("code fence exclusion", () => {
    const locale = [
      "## S {#s}",
      "",
      '<YouTube id="abc" />',
      "",
      "```jsx",
      '<YouTube id="abc" />',
      "```",
    ].join("\n")
    const { content } = applyInertChanges(locale, [
      mkChange({
        elementType: "component-attribute",
        key: "id",
        oldValue: "abc",
        newValue: "xyz",
        path: "s/component:0/attr:id",
      }),
    ])
    // Real component changes, code example stays
    expect(content).toMatch(/<YouTube id="xyz" \/>/)
    expect(content).toMatch(/```jsx\n<YouTube id="abc" \/>/)
  })

  test("value verification: skips if unexpected value", () => {
    const locale = "## S {#s}\n\n[link](http://different.com) here."
    const { applied, skipped } = applyInertChanges(locale, [
      mkChange({
        oldValue: "http://x.com",
        newValue: "http://y.com",
        path: "s/link:0",
      }),
    ])
    expect(applied).toHaveLength(0)
    expect(skipped).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// applyInertChanges: JSON precision
// ---------------------------------------------------------------------------

test.describe("applyInertChanges JSON precision", () => {
  test("key-scoped replacement", () => {
    const json = JSON.stringify(
      {
        "key-a": 'Visit <a href="http://x.com">here</a>.',
        "key-b": 'Also <a href="http://x.com">there</a>.',
      },
      null,
      2
    )
    const { content, applied } = applyInertChanges(
      json,
      [
        mkChange({
          elementType: "html-tag",
          key: "href",
          oldValue: "http://x.com",
          newValue: "http://y.com",
          path: "key-a/html-tag:0",
        }),
      ],
      "json"
    )
    const result = JSON.parse(content)
    expect(result["key-a"]).toContain("http://y.com")
    expect(result["key-b"]).toContain("http://x.com")
    expect(applied).toHaveLength(1)
  })

  test("occurrence counting in value", () => {
    const json = JSON.stringify(
      {
        multi: '<a href="http://x.com">A</a> and <a href="http://x.com">B</a>.',
      },
      null,
      2
    )
    const { content } = applyInertChanges(
      json,
      [
        mkChange({
          elementType: "html-tag",
          key: "href",
          oldValue: "http://x.com",
          newValue: "http://y.com",
          path: "multi/html-tag:1",
        }),
      ],
      "json"
    )
    const result = JSON.parse(content)
    const hrefs = [...result.multi.matchAll(/href="([^"]+)"/g)].map(
      (m: RegExpMatchArray) => m[1]
    )
    expect(hrefs[0]).toBe("http://x.com")
    expect(hrefs[1]).toBe("http://y.com")
  })

  test("full nested path navigation", () => {
    const json = JSON.stringify(
      {
        nested: {
          subsection: {
            hint: 'See <a href="http://old.com">docs</a>.',
          },
          other: 'Also <a href="http://old.com">here</a>.',
        },
      },
      null,
      2
    )
    const { content } = applyInertChanges(
      json,
      [
        mkChange({
          elementType: "html-tag",
          key: "href",
          oldValue: "http://old.com",
          newValue: "http://new.com",
          path: "nested/subsection/hint/html-tag:0",
        }),
      ],
      "json"
    )
    const result = JSON.parse(content)
    expect(result.nested.subsection.hint).toContain("http://new.com")
    expect(result.nested.other).toContain("http://old.com")
  })

  test("ICU variable context", () => {
    const json = JSON.stringify(
      {
        msg: "Your address is {address}. Send to the address below.",
      },
      null,
      2
    )
    const { content } = applyInertChanges(
      json,
      [
        mkChange({
          elementType: "icu-variable",
          key: "value",
          oldValue: "address",
          newValue: "walletAddress",
          path: "msg/icu:0",
        }),
      ],
      "json"
    )
    const result = JSON.parse(content)
    expect(result.msg).toContain("{walletAddress}")
    expect(result.msg).toContain("the address below")
  })

  test("skips when key not found", () => {
    const json = JSON.stringify({ existing: "value" }, null, 2)
    const { skipped } = applyInertChanges(
      json,
      [
        mkChange({
          oldValue: "old",
          newValue: "new",
          path: "nonexistent/link:0",
        }),
      ],
      "json"
    )
    expect(skipped).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// updateTranslationManifest
// ---------------------------------------------------------------------------

test.describe("updateTranslationManifest", () => {
  test("updates placeholder values by matching old value + type", () => {
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
        mkChange({
          oldValue: "http://old.com",
          newValue: "http://new.com",
          path: "test/link:0",
        }),
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
        mkChange({
          oldValue: "http://old.com",
          newValue: "http://new.com",
          path: "test/link:0",
        }),
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

  test("applied tracking: returns applied and skipped lists", () => {
    const locale = "## S {#s}\n\n[found](http://x.com) and no match."
    const { applied, skipped } = applyInertChanges(locale, [
      mkChange({
        oldValue: "http://x.com",
        newValue: "http://y.com",
        path: "s/link:0",
      }),
      mkChange({
        oldValue: "http://nothere.com",
        newValue: "http://z.com",
        path: "s/link:1",
      }),
    ])
    expect(applied).toHaveLength(1)
    expect(applied[0].newValue).toBe("http://y.com")
    expect(skipped).toHaveLength(1)
    expect(skipped[0].oldValue).toBe("http://nothere.com")
  })
})
