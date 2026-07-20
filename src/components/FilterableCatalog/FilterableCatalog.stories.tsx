import { Meta, StoryObj } from "@storybook/nextjs"

import CatalogCheckboxGroup from "./CatalogCheckboxGroup"
import CatalogNavGroup from "./CatalogNavGroup"
import FilterableCatalog from "./index"
import type {
  CatalogCheckboxGroupConfig,
  CatalogFilterState,
  CatalogNavGroupConfig,
} from "./types"
import { toggleId } from "./utils"

const meta = {
  title: "Components / FilterableCatalog",
  component: FilterableCatalog,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FilterableCatalog>

export default meta

type DemoWallet = {
  name: string
  devices: string[]
  networks: string[]
  purchases: string[]
}

const demoWallets: DemoWallet[] = [
  {
    name: "Alpha Wallet",
    devices: ["mobile", "browser"],
    networks: ["ethereum", "op-mainnet", "arbitrum-one"],
    purchases: ["buy"],
  },
  {
    name: "Beacon Vault",
    devices: ["hardware", "desktop"],
    networks: ["ethereum"],
    purchases: [],
  },
  {
    name: "Cursive",
    devices: ["mobile"],
    networks: ["ethereum", "base"],
    purchases: ["buy", "sell"],
  },
  {
    name: "Denominator",
    devices: ["desktop", "browser"],
    networks: ["ethereum", "op-mainnet", "base"],
    purchases: ["sell"],
  },
  {
    name: "Ellipsis",
    devices: ["mobile", "desktop"],
    networks: ["arbitrum-one"],
    purchases: ["buy"],
  },
]

const walletAttributes = (wallet: DemoWallet) => [
  ...wallet.devices,
  ...wallet.networks,
  ...wallet.purchases,
]

// The find-wallet filter sidebar shape planned for PR 2: independent checkbox
// groups combined with AND semantics by the consumer's filterFn. The consumer
// owns the state key; the block config is presentational only.
const walletFilterGroups: Array<{ key: string } & CatalogCheckboxGroupConfig> =
  [
    {
      key: "devices",
      label: "Devices",
      options: [
        { id: "desktop", label: "Desktop" },
        { id: "mobile", label: "Mobile" },
        { id: "browser", label: "Browser" },
        { id: "hardware", label: "Hardware" },
      ],
    },
    {
      key: "networks",
      label: "Networks",
      options: [
        { id: "ethereum", label: "Ethereum Mainnet" },
        { id: "op-mainnet", label: "OP Mainnet" },
        { id: "arbitrum-one", label: "Arbitrum One" },
        { id: "base", label: "Base" },
      ],
    },
    {
      key: "purchases",
      label: "Buy / sell crypto",
      options: [
        { id: "buy", label: "Buy crypto" },
        { id: "sell", label: "Sell crypto" },
      ],
    },
  ]

const andFilterWallet = (
  wallet: DemoWallet,
  state: CatalogFilterState,
  query: string
) => {
  const attributes = walletAttributes(wallet)
  const selectedIds = Object.values(state)
    .filter(Array.isArray)
    .flat() as string[]
  if (!selectedIds.every((id) => attributes.includes(id))) return false

  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return true
  return wallet.name.toLowerCase().includes(normalizedQuery)
}

const renderWalletResults = (wallets: DemoWallet[]) => (
  <div className="grid grid-cols-auto-3 gap-4">
    {wallets.map((wallet) => (
      <div key={wallet.name} className="space-y-1 rounded-xl border p-4">
        <p className="font-bold">{wallet.name}</p>
        <p className="text-sm text-body-medium">
          {walletAttributes(wallet).join(" · ")}
        </p>
      </div>
    ))}
  </div>
)

/**
 * Checkbox filter groups with AND semantics in the consumer's filterFn --
 * the shape the find-wallet revamp consumes.
 */
export const CheckboxFilters: StoryObj = {
  render: () => (
    <FilterableCatalog
      locale="en"
      items={demoWallets}
      filterFn={andFilterWallet}
      labels={{
        searchPlaceholder: "Search wallets",
        resultsLabel: "Results",
        noResults: "No results",
      }}
      renderSidebar={({ state, setFilter }) =>
        walletFilterGroups.map(({ key, ...config }) => {
          const raw = state[key]
          const selectedIds = Array.isArray(raw) ? raw : []
          return (
            <CatalogCheckboxGroup
              key={key}
              locale="en"
              config={config}
              selectedIds={selectedIds}
              onToggle={(optionId) =>
                setFilter(key, toggleId(selectedIds, optionId), {
                  scroll: false,
                })
              }
            />
          )
        })
      }
      renderResults={renderWalletResults}
    />
  ),
}

const NAV_KEY = "device"

const navConfig: CatalogNavGroupConfig = {
  allLabel: "All categories",
  allHref: "#all",
  allCount: demoWallets.length,
  items: [
    {
      id: "software",
      label: "Software",
      href: "#software",
      count: 4,
      isCurrent: true,
      children: [
        { id: "mobile", label: "Mobile", count: 3 },
        { id: "desktop", label: "Desktop", count: 3 },
        { id: "browser", label: "Browser", count: 2 },
      ],
    },
    {
      id: "hardware",
      label: "Hardware",
      href: "#hardware",
      count: 1,
    },
  ],
}

/**
 * Nav-tree sidebar as used by /developers/tools: top-level entries are route
 * links; children of the current entry are a single-select client filter.
 */
export const NavigationSidebar: StoryObj = {
  render: () => (
    <FilterableCatalog
      locale="en"
      items={demoWallets}
      filterFn={(wallet, state, query) => {
        const device = state[NAV_KEY]
        if (typeof device === "string" && !wallet.devices.includes(device)) {
          return false
        }
        const normalizedQuery = query.toLowerCase().trim()
        if (!normalizedQuery) return true
        return wallet.name.toLowerCase().includes(normalizedQuery)
      }}
      labels={{
        searchPlaceholder: "Search wallets",
        resultsLabel: "Results",
        noResults: "No results",
      }}
      renderSidebar={({ state, setFilter }) => {
        const raw = state[NAV_KEY]
        return (
          <CatalogNavGroup
            locale="en"
            config={navConfig}
            selectedChildId={typeof raw === "string" ? raw : undefined}
            onSelectChild={(childId) => setFilter(NAV_KEY, childId)}
          />
        )
      }}
      renderResults={renderWalletResults}
    />
  ),
}
