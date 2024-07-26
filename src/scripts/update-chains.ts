import { execSync } from "child_process"
import fs from "fs"
import path from "path"

import type { Chain, ChainIdNetworkResponse } from "@/lib/types"

import {
  CHAINID_NETWORK_ENDPOINT,
  ETH,
  EXCLUDED_NAMES,
  TESTNETS,
} from "../lib/constants"

/**
 * Fetches the chain data from the chainid.network endpoint.
 *
 * @returns A promise that resolves to an array of ChainIdNetwork objects.
 */
export const fetchChainIdNetworks = async (): Promise<
  ChainIdNetworkResponse[]
> => {
  try {
    const response = await fetch(CHAINID_NETWORK_ENDPOINT)

    if (!response.ok) throw new Error("Failed to fetch chains.json data")

    return await response.json()
  } catch (error) {
    console.error((error as Error).message)
    return []
  }
}

const parseChains = async (
  chains: ChainIdNetworkResponse[]
): Promise<Chain[]> =>
  chains
    .filter((item: ChainIdNetworkResponse) => {
      const { name, status, chain, nativeCurrency } = item

      const containsEther = nativeCurrency.name.toLowerCase().includes("ether")
      const containsETH = nativeCurrency.symbol.includes(ETH)
      const isEthereum = chain === ETH || containsETH || containsEther

      const isActive = !["deprecated", "incubating"].includes(status || "")
      const isExcluded = [...EXCLUDED_NAMES, ...TESTNETS].some((word) =>
        name.toLowerCase().includes(word)
      )

      return isEthereum && isActive && !isExcluded
    })
    // Map into simplified Chain object
    .map(({ chain, name, infoURL, chainId, nativeCurrency }) => ({
      name,
      infoURL,
      chainId,
      nativeCurrency,
      chain,
    }))

/**
 * Updates the chains data by calling the ChainIdNetworkImport function and
 * writing the result to a TypeScript file.
 */
export const updateChainsTsFile = async () => {
  // Get the data from ChainIdNetworkImport
  const returnedChains = await fetchChainIdNetworks()

  // Parse the chains data
  const chains = await parseChains(returnedChains)

  // Path to the new TypeScript file
  const chainsTsPath = path.join(process.cwd(), "src/data/chains.ts")

  // Create the TypeScript content
  const tsConst = `const chains = ${JSON.stringify(chains, null, 2)} as const`
  const tsExport = `export default chains`

  // Write the TypeScript content to the new file
  fs.writeFileSync(chainsTsPath, tsConst + `\n\n` + tsExport, "utf-8")

  // Log results
  console.log(chains)
  console.log(`Generated/updated ${chainsTsPath}`)

  // Run auto-linter on updated TypeScript file
  execSync(`npx prettier ${chainsTsPath} --write`)
}

updateChainsTsFile()
