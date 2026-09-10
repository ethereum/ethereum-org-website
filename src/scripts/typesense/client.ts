/**
 * Minimal Typesense HTTP client for the indexing pipeline.
 *
 * Two keys, deliberately: the scoped admin key can manage collections and aliases but
 * cannot search, and the search key is the reverse. Passing the wrong one produces a 401
 * that reads like a credentials problem rather than a scoping one.
 */

import { config } from "dotenv"

import i18nConfig from "../../../i18n.config.json"

// Next loads these for the app; a standalone script has to ask. `.env.local` first to
// match Next's precedence, and dotenv never overwrites a variable that is already set,
// so CI's `env:` block still wins.
config({ path: ".env.local" })
config()

const trimSlash = (s: string) => s.replace(/\/+$/, "")

/**
 * The pipeline's own variables, with the app's browser-side ones as a fallback. Reading
 * an index needs nothing the browser does not already ship, so a query script should not
 * demand the admin credentials that writing does.
 */
const publicUrl = () => {
  const host = process.env.NEXT_PUBLIC_TYPESENSE_HOST
  if (!host) return ""
  const protocol = process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL ?? "https"
  const port = process.env.NEXT_PUBLIC_TYPESENSE_PORT
  const suffix = !port || port === "443" || port === "80" ? "" : `:${port}`
  return `${protocol}://${host}${suffix}`
}

export const TYPESENSE_URL = trimSlash(process.env.TYPESENSE_URL || publicUrl())
export const ADMIN_KEY = process.env.TYPESENSE_API_KEY ?? ""
export const SEARCH_KEY =
  process.env.TYPESENSE_API_SEARCH_KEY ||
  process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY ||
  ADMIN_KEY

export const SITE_ORIGIN = "https://ethereum.org"

/**
 * The search parameters the app sends, shared so a script cannot measure something users
 * never receive. `sort_by` was missing from the relevance gate once already, which made a
 * change to page ranking invisible to the check meant to catch it.
 * See src/components/Search/index.tsx.
 */
export const QUERY_BY =
  "hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content"

export const SORT_BY =
  "_text_match(buckets: 100):desc,pagerank:desc,item_priority:desc"

/** Canonical locale list -- same source the site builds from. */
export const LOCALES = i18nConfig.map(({ code }) => code)

export type Locale = (typeof LOCALES)[number]

export interface CollectionInfo {
  name: string
  num_documents?: number
  fields?: { name: string; type: string; sort?: boolean }[]
}

export interface Alias {
  name: string
  collection_name: string
}

export class TypesenseError extends Error {
  constructor(
    readonly status: number,
    readonly body: string,
    path: string
  ) {
    super(`Typesense ${status} on ${path}: ${body.slice(0, 200)}`)
  }
}

export const requireEnv = () => {
  const missing = (
    [
      ["TYPESENSE_URL", TYPESENSE_URL],
      ["TYPESENSE_API_KEY", ADMIN_KEY],
    ] as const
  )
    .filter(([, v]) => !v)
    .map(([k]) => k)
  if (missing.length)
    throw new Error(`Missing environment variables: ${missing.join(", ")}`)
}

export const api = async <T>(
  method: string,
  path: string,
  { body, key }: { body?: unknown; key?: string } = {}
): Promise<T> => {
  const response = await fetch(`${TYPESENSE_URL}${path}`, {
    method,
    headers: {
      "X-TYPESENSE-API-KEY": key ?? ADMIN_KEY,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const text = await response.text()
  if (!response.ok) throw new TypesenseError(response.status, text, path)
  return (text ? JSON.parse(text) : null) as T
}

export const listCollections = () =>
  api<CollectionInfo[]>("GET", "/collections")

const listAliases = async () =>
  (await api<{ aliases: Alias[] }>("GET", "/aliases")).aliases

/** The collection an alias currently resolves to, or undefined if unset. */
export const resolveAlias = async (alias: string) =>
  (await listAliases()).find((a) => a.name === alias)?.collection_name

export const countByLanguage = async (collection: string, language: string) => {
  const params = new URLSearchParams({
    q: "*",
    query_by: "hierarchy.lvl1",
    filter_by: `language:=${language}`,
    per_page: "0",
  })
  const result = await api<{ found: number }>(
    "GET",
    `/collections/${collection}/documents/search?${params}`,
    { key: SEARCH_KEY }
  )
  return result.found
}
