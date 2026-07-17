/**
 * Shared JSON-LD structured data definitions
 * These can be imported and reused across page-jsonld.tsx files
 */

import { KNOWN_ORGANIZATIONS } from "./organizations"
import { REFERENCE } from "./references"

/**
 * ethereum.org WebSite entity
 * Anchors the site in the knowledge graph. Every page's JSON-LD graph
 * should include this as a top-level node and reference it via @id from
 * the page's `isPartOf`.
 */
export const ETHEREUM_ORG_WEBSITE = {
  "@type": "WebSite" as const,
  name: "ethereum.org",
  url: "https://ethereum.org",
  ...REFERENCE.ETHEREUM_ORG_WEBSITE,
}

/**
 * Core entities present in every page's JSON-LD @graph.
 * Spread at the top of each page's `@graph` array so that `@id`
 * references (e.g. `ethereumFoundationReference`) resolve within the
 * same graph.
 */
export const BASE_GRAPH_NODES = [
  KNOWN_ORGANIZATIONS["ethereum-foundation"],
  KNOWN_ORGANIZATIONS["ethereum-community"],
  ETHEREUM_ORG_WEBSITE,
]
