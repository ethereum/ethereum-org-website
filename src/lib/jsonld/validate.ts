export type JsonLdValidationRule =
  | "invalid-document"
  | "duplicate-id"
  | "unresolved-reference"
  | "date-format"
  | "untranslated-key"
  | "canonical-url"

export interface JsonLdValidationError {
  rule: JsonLdValidationRule
  path: string
  message: string
}

type JsonLdObject = Record<string, unknown>

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(?:$|T)/
const I18N_KEY =
  /^(?:[a-z0-9]+-)+(?:title|subtitle|description|headline|label|name|text|copy)$/
const TRANSLATABLE_TEXT_PROPERTIES = new Set([
  "abstract",
  "alternativeHeadline",
  "articleBody",
  "caption",
  "description",
  "headline",
  "name",
  "text",
])

const isObject = (value: unknown): value is JsonLdObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const isDateProperty = (property: string): boolean =>
  property === "expires" ||
  property === "validFrom" ||
  property === "validThrough" ||
  property.endsWith("Date") ||
  /^date[A-Z]/.test(property)

const typesFor = (value: JsonLdObject): string[] => {
  const type = value["@type"]
  return typeof type === "string"
    ? [type]
    : Array.isArray(type)
      ? type.filter((entry): entry is string => typeof entry === "string")
      : []
}

const pathFor = (path: string, key: string | number): string =>
  typeof key === "number" ? `${path}[${key}]` : `${path}.${key}`

/**
 * Validate the inexpensive invariants that should hold for one JSON-LD
 * document. This deliberately does not attempt full schema.org validation.
 */
export function validateJsonLdDocument(
  document: unknown,
  canonicalUrl?: string
): JsonLdValidationError[] {
  const errors: JsonLdValidationError[] = []

  if (!isObject(document)) {
    return [
      {
        rule: "invalid-document",
        path: "$",
        message: "JSON-LD document must be an object",
      },
    ]
  }

  const graph = document["@graph"]
  if (!Array.isArray(graph)) {
    return [
      {
        rule: "invalid-document",
        path: "$.@graph",
        message: "JSON-LD document must contain an @graph array",
      },
    ]
  }

  const nodeIds = new Map<string, string>()
  const breadcrumbLists: JsonLdObject[] = []

  const addError = (
    rule: JsonLdValidationRule,
    path: string,
    message: string
  ) => errors.push({ rule, path, message })

  graph.forEach((entry, index) => {
    if (!isObject(entry)) {
      addError(
        "invalid-document",
        `$.@graph[${index}]`,
        "graph entries must be objects"
      )
      return
    }

    const id = entry["@id"]
    if (typeof id === "string" && typesFor(entry).length > 0) {
      const path = `$.@graph[${index}].@id`
      const previousPath = nodeIds.get(id)
      if (previousPath) {
        addError(
          "duplicate-id",
          path,
          `@id ${id} duplicates the node at ${previousPath}`
        )
      } else {
        nodeIds.set(id, path)
      }
    }
  })

  const walk = (value: unknown, path: string, property?: string): void => {
    if (Array.isArray(value)) {
      value.forEach((entry, index) =>
        walk(entry, `${path}[${index}]`, property)
      )
      return
    }
    if (!isObject(value)) {
      if (
        property &&
        isDateProperty(property) &&
        value !== undefined &&
        value !== null &&
        (typeof value !== "string" || !ISO_DATE.test(value))
      ) {
        addError(
          "date-format",
          path,
          `date-valued property ${property} must start with YYYY-MM-DD`
        )
      }
      return
    }

    const id = value["@id"]
    if (typeof id === "string" && typesFor(value).length === 0) {
      if (!nodeIds.has(id)) {
        addError(
          "unresolved-reference",
          `${path}.@id`,
          `@id reference ${id} does not resolve to a typed node in this graph`
        )
      }
    }

    if (typesFor(value).includes("BreadcrumbList")) breadcrumbLists.push(value)

    for (const [key, child] of Object.entries(value)) {
      const childPath = pathFor(path, key)
      if (
        typeof child === "string" &&
        TRANSLATABLE_TEXT_PROPERTIES.has(key) &&
        I18N_KEY.test(child.trim())
      ) {
        addError(
          "untranslated-key",
          childPath,
          `string looks like an untranslated i18n key: ${child}`
        )
      }

      walk(child, childPath, key)
    }
  }

  walk(graph, "$.@graph")

  if (canonicalUrl) {
    const webPages = graph.filter(
      (entry): entry is JsonLdObject =>
        isObject(entry) && typesFor(entry).includes("WebPage")
    )

    for (const [index, page] of webPages.entries()) {
      const pagePath = `$.@graph[WebPage:${index}]`
      if (page["@id"] !== canonicalUrl) {
        addError(
          "canonical-url",
          `${pagePath}.@id`,
          `WebPage @id must equal canonical URL ${canonicalUrl}`
        )
      }
      if (page.url !== canonicalUrl) {
        addError(
          "canonical-url",
          `${pagePath}.url`,
          `WebPage url must equal canonical URL ${canonicalUrl}`
        )
      }
    }

    const articles = graph.filter(
      (entry): entry is JsonLdObject =>
        isObject(entry) && typesFor(entry).includes("Article")
    )
    for (const [index, article] of articles.entries()) {
      const mainEntity = article.mainEntityOfPage
      const mainEntityUrl = isObject(mainEntity)
        ? mainEntity["@id"]
        : mainEntity
      if (typeof mainEntityUrl === "string" && mainEntityUrl !== canonicalUrl) {
        addError(
          "canonical-url",
          `$.@graph[Article:${index}].mainEntityOfPage`,
          `Article mainEntityOfPage must equal canonical URL ${canonicalUrl}`
        )
      }
    }

    breadcrumbLists.forEach((breadcrumb, index) => {
      const items = breadcrumb.itemListElement
      if (!Array.isArray(items) || items.length === 0) return
      const last = items[items.length - 1]
      const item = isObject(last) ? last.item : undefined
      const itemUrl = isObject(item) ? item["@id"] : item
      if (typeof itemUrl === "string" && itemUrl !== canonicalUrl) {
        addError(
          "canonical-url",
          `$.@graph[BreadcrumbList:${index}].itemListElement[last].item`,
          `last breadcrumb item must equal canonical URL ${canonicalUrl}`
        )
      }
    })
  }

  return errors
}
