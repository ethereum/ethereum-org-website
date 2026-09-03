/**
 * Minimal Typesense HTTP client for the indexing pipeline.
 *
 * Two keys, deliberately: the scoped admin key can manage collections and aliases but
 * cannot search, and the search key is the reverse. Passing the wrong one produces a 401
 * that reads like a credentials problem rather than a scoping one.
 */

import i18nConfig from "../../../i18n.config.json"

const trimSlash = (s: string) => s.replace(/\/+$/, "")

export const TYPESENSE_URL = trimSlash(process.env.TYPESENSE_URL ?? "")
export const ADMIN_KEY = process.env.TYPESENSE_API_KEY ?? ""
export const SEARCH_KEY = process.env.TYPESENSE_API_SEARCH_KEY || ADMIN_KEY

export const SITE_ORIGIN = "https://ethereum.org"

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

export const listAliases = async () =>
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
