import { expect, test } from "@playwright/test"

import { validateJsonLdDocument } from "@/lib/jsonld/validate"

const pageUrl = "https://example.test/learn/"

const validDocument = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://example.test/#website",
      url: "https://example.test/",
      name: "Example",
    },
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Learn",
      isPartOf: { "@id": "https://example.test/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: pageUrl },
        ],
      },
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: "Learn",
      dateModified: "2025-03-31T00:00:00Z",
      mainEntityOfPage: { "@id": pageUrl },
    },
  ],
}

function rulesFor(document: unknown, canonical = pageUrl) {
  return validateJsonLdDocument(document, canonical).map((error) => error.rule)
}

test.describe("JSON-LD invariant validator", () => {
  test("accepts a graph with typed nodes and resolvable references", () => {
    expect(rulesFor(validDocument)).toEqual([])
  })

  test("rejects a document without an @graph", () => {
    expect(rulesFor({ "@context": "https://schema.org" })).toContain(
      "invalid-document"
    )
  })

  test("rejects duplicate typed @id values", () => {
    const document = {
      ...validDocument,
      "@graph": [
        ...validDocument["@graph"],
        { "@type": "Thing", "@id": "https://example.test/#website" },
      ],
    }

    expect(rulesFor(document)).toContain("duplicate-id")
  })

  test("rejects references that do not resolve within the graph", () => {
    const document = {
      ...validDocument,
      "@graph": validDocument["@graph"].map((node, index) =>
        index === 1
          ? {
              ...node,
              isPartOf: { "@id": "https://example.test/#missing" },
            }
          : node
      ),
    }

    expect(rulesFor(document)).toContain("unresolved-reference")
  })

  test("rejects non-ISO date values", () => {
    const document = {
      ...validDocument,
      "@graph": validDocument["@graph"].map((node, index) =>
        index === 2 ? { ...node, dateModified: "March 31, 2025" } : node
      ),
    }

    expect(rulesFor(document)).toContain("date-format")
  })

  test("rejects raw kebab-case translation keys", () => {
    const document = {
      ...validDocument,
      "@graph": validDocument["@graph"].map((node, index) =>
        index === 1 ? { ...node, description: "quizzes-subtitle" } : node
      ),
    }

    expect(rulesFor(document)).toContain("untranslated-key")
  })

  test("rejects JSON-LD URLs that disagree with the page canonical", () => {
    expect(rulesFor(validDocument, "https://example.test/learn")).toContain(
      "canonical-url"
    )
  })

  test("rejects an Article mainEntityOfPage that disagrees with canonical", () => {
    const document = {
      ...validDocument,
      "@graph": validDocument["@graph"].map((node, index) =>
        index === 2
          ? { ...node, mainEntityOfPage: "https://example.test/other/" }
          : node
      ),
    }

    expect(rulesFor(document)).toContain("canonical-url")
  })
})
