import * as Sentry from "@sentry/nextjs"

import { KNOWN_ORGANIZATIONS } from "./organizations"
import { KNOWN_PERSONS } from "./persons"
import { REFERENCE } from "./references"
import type { KnownEntity } from "./types"

/**
 * Helper to get an @id reference for a known Person
 */
export const personReference = (key: keyof typeof KNOWN_PERSONS) => ({
  "@id": KNOWN_PERSONS[key]["@id"],
})

/**
 * Helper to get an @id reference for a known Organization
 */
export const organizationReference = (
  key: keyof typeof KNOWN_ORGANIZATIONS
) => ({
  "@id": KNOWN_ORGANIZATIONS[key]["@id"],
})

/**
 * Alias map for entity lookup.
 * Auto-generated from KNOWN_PERSONS, KNOWN_ORGANIZATIONS, and the core
 * Ethereum Foundation / Community organizations -- no manual maintenance
 * needed. Allows frontmatter to use profile key (for KNOWN_* entries),
 * display name, or GitHub handle. Keys are lowercased for
 * case-insensitive lookup.
 *
 * Warns (console + Sentry) if two entities claim the same alias.
 */
const ENTITY_ALIASES: Record<string, KnownEntity> = buildEntityAliases()

function buildEntityAliases(): Record<string, KnownEntity> {
  const aliases: Record<string, KnownEntity> = {}

  const addAlias = (alias: string, entity: KnownEntity) => {
    const lower = alias.toLowerCase()
    const existing = aliases[lower]
    if (existing && existing !== entity) {
      const message = `JSON-LD alias collision: "${alias}" maps to both ${existing["@id"]} and ${entity["@id"]}. Keeping the first.`
      console.warn(message)
      Sentry.captureMessage(message, "warning")
      return
    }
    aliases[lower] = entity
  }

  const entries: Array<[string | null, KnownEntity]> = [
    [null, KNOWN_ORGANIZATIONS["ethereum-foundation"]],
    [null, KNOWN_ORGANIZATIONS["ethereum-community"]],
    ...Object.entries(KNOWN_PERSONS),
    ...Object.entries(KNOWN_ORGANIZATIONS),
  ]

  for (const [key, entity] of entries) {
    if (key) addAlias(key, entity)
    addAlias(entity.name, entity)
    for (const url of "sameAs" in entity ? (entity.sameAs ?? []) : []) {
      const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/?$/)
      if (match) addAlias(match[1], entity)
    }
  }

  return aliases
}

/**
 * Resolve frontmatter author field(s) into JSON-LD @graph nodes and @id
 * references. Matches against both KNOWN_PERSONS and KNOWN_ORGANIZATIONS
 * by profile key, display name, or GitHub handle. Handles both the
 * `authors` array and legacy singular `author` string.
 *
 * Falls back to the community organization reference when nothing
 * resolves.
 */
export function resolveAuthorsFromFrontmatter(authors?: string | string[]): {
  authorGraphNodes: KnownEntity[]
  authorIds: Array<{ "@id": string }>
} {
  const values = !authors ? [] : Array.isArray(authors) ? authors : [authors]
  const entities = values
    .map((v): KnownEntity | null => ENTITY_ALIASES[v.toLowerCase()] ?? null)
    .filter((e): e is KnownEntity => e !== null)

  return {
    authorGraphNodes: entities,
    authorIds: [
      ...entities.map((e) => ({ "@id": e["@id"] })),
      REFERENCE.ETHEREUM_COMMUNITY,
    ],
  }
}
