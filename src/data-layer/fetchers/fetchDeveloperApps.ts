import type {
  Category,
  DeveloperAppContent,
  DeveloperAppMeta,
} from "@/data/developer-apps/types"

export interface DeveloperAppsData {
  apps: DeveloperAppContent[]
  categories: Category[]
}

/**
 * Fetch developer apps data.
 * Currently returns static data, but can be updated to fetch from an external source.
 */
export async function fetchDeveloperApps(): Promise<DeveloperAppsData> {
  const apps: DeveloperAppContent[] = [
    {
      id: "hardhat",
      title: "Hardhat",
      summary: "Ethereum development environment for professionals",
      category: "Development Environment",
      website: "https://hardhat.org",
      github: "https://github.com/NomicFoundation/hardhat",
      description: `
Hardhat is a development environment for Ethereum software. It consists of different components for editing, compiling, debugging and deploying your smart contracts and dApps.

## Features

- **Flexible**: You can bring your own tools
- **Extensible**: Plugin ecosystem for customization
- **Fast**: Incremental compilation and caching

## Getting Started

\`\`\`bash
npm install --save-dev hardhat
npx hardhat init
\`\`\`

Hardhat comes built-in with Hardhat Network, a local Ethereum network node designed for development, with features like stack traces and console.log.
    `.trim(),
    },
    {
      id: "foundry",
      title: "Foundry",
      summary: "Blazing fast, portable and modular toolkit for Ethereum",
      category: "Development Environment",
      website: "https://getfoundry.sh",
      github: "https://github.com/foundry-rs/foundry",
      description: `
Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.

## Components

- **Forge**: Ethereum testing framework
- **Cast**: Swiss army knife for interacting with contracts
- **Anvil**: Local Ethereum node
- **Chisel**: Solidity REPL

## Installation

\`\`\`bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
\`\`\`

## Why Foundry?

- Tests written in Solidity
- Extremely fast compilation
- Fuzz testing built-in
- Gas snapshots and optimization
    `.trim(),
    },
    {
      id: "wagmi",
      title: "Wagmi",
      summary: "React Hooks for Ethereum",
      category: "Frontend Library",
      website: "https://wagmi.sh",
      github: "https://github.com/wevm/wagmi",
      description: `
Wagmi is a collection of React Hooks containing everything you need to start working with Ethereum.

## Features

- **20+ hooks** for working with wallets, ENS, contracts, and more
- **TypeScript ready**: Infer types from ABIs and EIP-712 Typed Data
- **Caching & deduplication**: Efficient data fetching
- **Wallet connectors**: MetaMask, WalletConnect, Coinbase Wallet, and more

## Quick Start

\`\`\`tsx
import { useAccount, useConnect } from 'wagmi'

function App() {
  const { address } = useAccount()
  const { connect, connectors } = useConnect()

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      {address ?? 'Connect Wallet'}
    </button>
  )
}
\`\`\`
    `.trim(),
    },
    {
      id: "viem",
      title: "Viem",
      summary: "TypeScript Interface for Ethereum",
      category: "Library",
      website: "https://viem.sh",
      github: "https://github.com/wevm/viem",
      description: `
Viem is a TypeScript Interface for Ethereum that provides low-level stateless primitives for interacting with Ethereum.

## Why Viem?

- **Modular**: Import only what you need
- **Type-safe**: Full TypeScript support with inferred types
- **Lightweight**: Small bundle size
- **Performant**: Optimized for speed

## Example

\`\`\`typescript
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const blockNumber = await client.getBlockNumber()
\`\`\`
    `.trim(),
    },
    {
      id: "remix",
      title: "Remix IDE",
      summary: "Browser-based IDE for Solidity development",
      category: "IDE",
      website: "https://remix.ethereum.org",
      github: "https://github.com/ethereum/remix-project",
      description: `
Remix IDE is a powerful, open source tool that helps you write Solidity contracts straight from the browser.

## Features

- **No setup required**: Start coding immediately in your browser
- **Built-in compiler**: Compile Solidity with multiple versions
- **Debugger**: Step through transactions
- **Static analysis**: Security analysis built-in
- **Plugin system**: Extend functionality

## Use Cases

- Learning Solidity
- Quick prototyping
- Deploying to testnets
- Debugging transactions

Access it at [remix.ethereum.org](https://remix.ethereum.org)
    `.trim(),
    },
  ]

  const categories: Category[] = [
    {
      id: "development-environment",
      title: "Development Environment",
      description:
        "Tools and frameworks for building and testing smart contracts",
    },
    {
      id: "frontend-library",
      title: "Frontend Library",
      description: "Libraries for building web3 frontends and dApps",
    },
    {
      id: "library",
      title: "Library",
      description: "Low-level libraries for interacting with Ethereum",
    },
    {
      id: "ide",
      title: "IDE",
      description: "Integrated development environments for Ethereum",
    },
  ]

  return { apps, categories }
}

/**
 * Helper function to get all apps metadata from the data.
 */
export function getAllAppsFromData(
  data: DeveloperAppsData
): DeveloperAppMeta[] {
  return data.apps.map(({ id, title, summary, icon, category }) => ({
    id,
    title,
    summary,
    icon,
    category,
  }))
}

/**
 * Helper function to get an app by ID from the data.
 */
export function getAppByIdFromData(
  data: DeveloperAppsData,
  id: string
): DeveloperAppContent | undefined {
  return data.apps.find((app) => app.id === id)
}

/**
 * Helper function to get all app IDs from the data.
 */
export function getAllAppIdsFromData(data: DeveloperAppsData): string[] {
  return data.apps.map((app) => app.id)
}

/**
 * Helper to convert category title to ID format.
 */
function categoryTitleToId(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-")
}

/**
 * Helper function to get all categories from the data.
 */
export function getAllCategoriesFromData(data: DeveloperAppsData): Category[] {
  return data.categories
}

/**
 * Helper function to get a category by ID from the data.
 */
export function getCategoryByIdFromData(
  data: DeveloperAppsData,
  id: string
): Category | undefined {
  return data.categories.find((cat) => cat.id === id)
}

/**
 * Helper function to get apps filtered by category from the data.
 */
export function getAppsByCategoryFromData(
  data: DeveloperAppsData,
  categoryId: string
): DeveloperAppMeta[] {
  return data.apps
    .filter((app) => categoryTitleToId(app.category) === categoryId)
    .map(({ id, title, summary, icon, category }) => ({
      id,
      title,
      summary,
      icon,
      category,
    }))
}

/**
 * Helper function to get all category IDs from the data.
 */
export function getAllCategoryIdsFromData(data: DeveloperAppsData): string[] {
  return data.categories.map((cat) => cat.id)
}
