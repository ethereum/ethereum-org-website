import type { Category, DeveloperAppContent, DeveloperAppMeta } from "./types"

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
    description: "Tools and frameworks for building and testing smart contracts",
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

// Map from app category string to category id
function categoryToId(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-")
}

export async function getAllApps(): Promise<DeveloperAppMeta[]> {
  // sleep for 2 seconds for testing
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return apps.map(({ id, title, summary, icon, category }) => ({
    id,
    title,
    summary,
    icon,
    category,
  }))
}

export function getAppById(id: string): DeveloperAppContent | undefined {
  return apps.find((app) => app.id === id)
}

export function getAllAppIds(): string[] {
  return apps.map((app) => app.id)
}

export function getAllCategories(): Category[] {
  return categories
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id)
}

export function getAppsByCategory(categoryId: string): DeveloperAppMeta[] {
  return apps
    .filter((app) => categoryToId(app.category) === categoryId)
    .map(({ id, title, summary, icon, category }) => ({
      id,
      title,
      summary,
      icon,
      category,
    }))
}

export function getAllCategoryIds(): string[] {
  return categories.map((cat) => cat.id)
}
