import { execSync } from "child_process"
import fs from "fs"
import path from "path"

import { type ChainIdNetworkResponse } from "@/lib/types"

/**
 * Fetches the chain ID network data from the specified endpoint.
 *
 * @returns A promise that resolves to an array of ChainIdNetwork objects.
 */
export async function fetchChainIdNetworks(): Promise<
  ChainIdNetworkResponse[]
> {
  const response = await fetch("https://chainid.network/chains.json")
  const data = await response.json()
  return data as ChainIdNetworkResponse[]
}

/**
 * Updates the chains data by calling the ChainIdNetworkImport function and
 * writing the result to a TypeScript file.
 */
export async function updateChainsTsFile() {
  // Get the data from ChainIdNetworkImport
  const chains = await fetchChainIdNetworks()

  // Path to the new TypeScript file
  const chainsTsPath = path.join(process.cwd(), "src/data/chains.ts")

  // Create the TypeScript content
  const tsConst = `const chains = ${JSON.stringify(chains, null, 2)} as const`
  const tsExport = `export default chains`

  // Write the TypeScript content to the new file
  fs.writeFileSync(chainsTsPath, tsConst + `\n\n` + tsExport, "utf-8")

  console.log(`Generated/updated ${chainsTsPath}`)

  // Run auto-linter on chainsTsPath
  execSync(`npx prettier ${chainsTsPath} --write`)
}

updateChainsTsFile()
