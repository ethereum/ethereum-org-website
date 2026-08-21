/**
 * Reports upgrade facts the English content pages do not yet cover.
 *
 *   pnpm exec tsx src/scripts/sync-upgrades/coverage.ts
 *
 * Deterministic by design: it lists candidates for a human to judge, it never
 * decides that prose is owed. Only unshipped upgrades are checked — a live
 * fork's EIP set is frozen, so a missing explainer there is not news.
 *
 * Translated pages are out of scope: the intl pipeline owns them, and English
 * is where a gap gets closed.
 */
import { readFileSync } from "node:fs"

import { upgrades } from "@/data/upgrades"
import type { UpgradeData, UpgradeEip } from "@/data/upgrades/types"

/**
 * Store slugs are Forkcast's; content directories are ours and predate them.
 * Only the ones that disagree need an entry.
 */
const CONTENT_DIR_OVERRIDES: Record<string, string> = {
  "the-merge": "merge",
}

const contentPath = (slug: string) =>
  `public/content/roadmap/${CONTENT_DIR_OVERRIDES[slug] ?? slug}/index.md`

const readPage = (path: string): string | null => {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return null
  }
}

/**
 * Any `EIP-1234` in the prose counts as covered. Deliberately generous: the
 * check is for an unwritten section, not for how well it is written.
 */
export const mentionedEips = (markdown: string): Set<number> =>
  new Set(
    [...markdown.matchAll(/EIPs?[-–\u2011\s]?(\d{4})/gi)].map((m) =>
      Number(m[1])
    )
  )

export interface CoverageGap {
  upgrade: UpgradeData
  path: string
  /** No English page exists yet — that is one PR, not one section per EIP. */
  pageMissing: boolean
  uncovered: UpgradeEip[]
}

/**
 * `planning` and `research` forks can sit page-less for months, so chasing one
 * is a row that repeats every week. Their EIPs are checked once a page exists.
 */
const owesAPage = (upgrade: UpgradeData) => upgrade.status === "upcoming"

export const findGaps = (store = upgrades): CoverageGap[] =>
  Object.values(store)
    .filter((upgrade) => upgrade.status !== "live")
    .map((upgrade) => {
      const path = contentPath(upgrade.slug)
      const page = readPage(path)
      const mentioned = page ? mentionedEips(page) : new Set<number>()
      return {
        upgrade,
        path,
        pageMissing: page === null,
        uncovered: upgrade.eips.filter((eip) => !mentioned.has(eip.id)),
      }
    })
    .filter((gap) =>
      gap.pageMissing ? owesAPage(gap.upgrade) : gap.uncovered.length > 0
    )

export const renderReport = (gaps: CoverageGap[]): string => {
  if (gaps.length === 0) {
    return "Every scheduled EIP is named on its page."
  }

  const sections = gaps.map(({ upgrade, path, pageMissing, uncovered }) => {
    if (pageMissing) {
      const count = upgrade.eips.length
      return `**${upgrade.name}** — no page yet · ${count} EIP${count === 1 ? "" : "s"} · ${upgrade.status}`
    }
    const rows = uncovered.map((eip) => {
      const suffix = eip.networking ? " · networking" : ""
      return `- [EIP-${eip.id}](https://eips.ethereum.org/EIPS/eip-${eip.id})${suffix}`
    })
    return [`**${upgrade.name}** — \`${path}\``, ...rows].join("\n")
  })

  // Networking EIPs are usually introduced by their wire-protocol name
  // (`eth/72`), so a number-only match under-reports coverage there.
  const anyNetworking = gaps.some((g) => g.uncovered.some((e) => e.networking))
  if (anyNetworking) {
    sections.push(
      "<sub>Networking EIPs may appear under a wire name (`eth/72`) rather than a number.</sub>"
    )
  }

  return sections.join("\n\n")
}

if (process.argv[1]?.endsWith("coverage.ts")) {
  console.log(renderReport(findGaps()))
}
