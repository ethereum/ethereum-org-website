import { DeveloperAppsResponse } from "@/lib/types"

import { DEV_APP_CATEGORIES, DEV_APP_CATEGORY_SLUGS } from "./constants"

export type DeveloperAppTag =
  | "abi-encoding"
  | "account-abstraction"
  | "analytics"
  | "api"
  | "authentication"
  | "block-explorer"
  | "bundler"
  | "censorship-resistant"
  | "chains"
  | "cli"
  | "code-analysis"
  | "code-coverage"
  | "code-quality"
  | "community-driven"
  | "compiler"
  | "continuous-integration"
  | "contract-deployment"
  | "contract-interaction"
  | "contract-management"
  | "contract-verification"
  | "cross-chain"
  | "debugging-tools"
  | "decentralized-governance"
  | "defi"
  | "developer-experience"
  | "devops"
  | "dex-aggregator"
  | "docker"
  | "education"
  | "encryption"
  | "erc721"
  | "event-logging"
  | "farcaster"
  | "formal-verification"
  | "foundry"
  | "frontend"
  | "fuzz-testing"
  | "game-development"
  | "gas-efficient"
  | "gas-optimization"
  | "github-actions"
  | "gossipsub"
  | "governance"
  | "hardhat"
  | "indexing"
  | "interactive-tools"
  | "json-rpc"
  | "layer-2"
  | "libp2p"
  | "mcp-server"
  | "merkle-trees"
  | "modular-accounts"
  | "multi-chain"
  | "multicall"
  | "natural-language-processing"
  | "networking"
  | "nextjs"
  | "peer-to-peer"
  | "performance-optimization"
  | "privacy-focused"
  | "proxy-contracts"
  | "react"
  | "react-app"
  | "real-time-data"
  | "runtime-verification"
  | "scalability"
  | "sdk"
  | "security"
  | "solidity"
  | "solidity-development"
  | "static-analysis"
  | "storage-layout"
  | "support"
  | "symbolic-execution"
  | "tailwind-css"
  | "test-automation"
  | "testing"
  | "transaction-decoding"
  | "transaction-management"
  | "transaction-optimization"
  | "transaction-signing"
  | "truffle"
  | "type-safe"
  | "upgradeable-contracts"
  | "user-experience"
  | "verification"
  | "visualization"
  | "vscode-extension"
  | "vyper"
  | "wallet"

export type DeveloperAppCategory = keyof typeof DEV_APP_CATEGORY_SLUGS

export type DeveloperAppCategorySlug =
  (typeof DEV_APP_CATEGORIES)[number]["slug"]

export type DeveloperApp = Omit<DeveloperAppsResponse, "repos"> & {
  repos: {
    href: string
    stargazers?: number
    lastUpdated?: string | number | Date | null
    downloads?: number
  }[]
}

export type DeveloperAppsByCategory = Record<
  DeveloperAppCategorySlug,
  DeveloperApp[]
>

/**
 * Pre-computed randomized selections for developer apps.
 * Computed daily in the trigger.dev task to ensure all users see the same selections.
 */
export interface DeveloperAppsComputedSelections {
  /** Main page highlights - top app from 3 random categories (3 IDs) */
  mainPageHighlights: string[]
  /** Category page highlights - top 3 apps per category (7 categories × 3 = 21 IDs) */
  categoryHighlights: Record<DeveloperAppCategorySlug, string[]>
  /** Category preview apps - 5 random apps per category for main page cards (7 × 5 = 35 IDs) */
  categoryPreviews: Record<DeveloperAppCategorySlug, string[]>
  /** ISO date when selections were computed (for debugging) */
  computedAt: string
}

/**
 * Envelope type for developer tools data.
 * Contains both the app data and pre-computed selections.
 */
export interface DeveloperToolsDataEnvelope {
  /** All apps indexed by ID for quick lookup (used by app modal) */
  appsById: Record<string, DeveloperApp>
  /** Pre-computed randomized selections (refreshed daily) */
  selections: DeveloperAppsComputedSelections
}
