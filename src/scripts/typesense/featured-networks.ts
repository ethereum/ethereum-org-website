import { readFileSync } from "fs"
import path from "path"

import chains from "../../data/chains"

/**
 * The networks ethereum.org features, read from the same file `/layer-2/networks` renders
 * from, so adding or removing an L2 there is the only edit needed.
 *
 * Parsed rather than imported: `networks.ts` imports logo images, which resolve through
 * the bundler and not in a plain Node script. The shapes matched here are the ones the
 * `Rollup` interface enforces, and `explorer-coverage.spec.ts` fails if this stops finding
 * them.
 */
export interface FeaturedNetwork {
  /** Display nickname, e.g. "Optimism" */
  name: string
  /** Canonical name, matching `chains.ts`, e.g. "OP Mainnet" */
  chainName: string
  /** Filename within `public/images/layer-2/` */
  icon: string
  /** Undefined for non-EVM networks, which `chains.ts` does not carry */
  chainId?: number
}

const NETWORKS_PATH = path.join(process.cwd(), "src/data/networks/networks.ts")

const chainIdFor = (chainName: string) =>
  chains.find((chain) => chain.name === chainName)?.chainId

export const readFeaturedNetworks = (): FeaturedNetwork[] => {
  const source = readFileSync(NETWORKS_PATH, "utf-8")

  // `import BaseLogo from "@/public/images/layer-2/base.png"`
  const logos = new Map(
    [...source.matchAll(/import\s+(\w+)\s+from\s+"[^"]*\/([^/"]+\.\w+)"/g)].map(
      (m) => [m[1], m[2]]
    )
  )

  const networks: FeaturedNetwork[] = []
  const seen = new Set<string>()
  // Both `ethereumNetworkData` and each `layer2Data` entry carry these three keys in this
  // order; `logo` sits between them for the rollups and after for mainnet.
  const entry =
    /name:\s*"([^"]+)",\s*\n\s*chainName:\s*"([^"]+)",[\s\S]{0,400}?logo:\s*(\w+),/g
  for (const [, name, chainName, logoIdent] of source.matchAll(entry)) {
    if (seen.has(chainName)) continue
    seen.add(chainName)
    networks.push({
      name,
      chainName,
      icon: logos.get(logoIdent) ?? "",
      chainId: chainIdFor(chainName),
    })
  }
  return networks
}
