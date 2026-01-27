import { useState } from "react"
import type { Meta } from "@storybook/react"

import FilterBar from "./"

const meta = {
  title: "Molecules / Navigation / FilterBar",
  component: FilterBar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-screen-2xl p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterBar>

export default meta

const sampleItems = [
  { value: "defi", label: "DeFi" },
  { value: "nft", label: "NFTs" },
  { value: "gaming", label: "Gaming" },
  { value: "social", label: "Social" },
  { value: "identity", label: "Identity" },
]

const manyItems = [
  { value: "analytics", label: "Analytics" },
  { value: "bridges", label: "Bridges" },
  { value: "dao", label: "DAOs" },
  { value: "defi", label: "DeFi" },
  { value: "developer-tools", label: "Developer Tools" },
  { value: "gaming", label: "Gaming" },
  { value: "identity", label: "Identity" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "marketplaces", label: "Marketplaces" },
  { value: "nft", label: "NFTs" },
  { value: "payments", label: "Payments" },
  { value: "security", label: "Security" },
  { value: "social", label: "Social" },
  { value: "storage", label: "Storage" },
  { value: "wallets", label: "Wallets" },
]

export const Default = {
  render: () => {
    const [value, setValue] = useState<string>()
    const filteredCount = value ? 12 : 48

    return (
      <FilterBar
        items={sampleItems}
        value={value}
        onValueChange={setValue}
        count={filteredCount}
        totalCount={48}
      />
    )
  },
}

export const WithActiveFilter = {
  render: () => {
    const [value, setValue] = useState<string | undefined>("defi")
    const filteredCount = value ? 12 : 48

    return (
      <FilterBar
        items={sampleItems}
        value={value}
        onValueChange={setValue}
        count={filteredCount}
        totalCount={48}
      />
    )
  },
}

export const ManyItems = {
  render: () => {
    const [value, setValue] = useState<string>()
    const filteredCount = value ? 8 : 120

    return (
      <FilterBar
        items={manyItems}
        value={value}
        onValueChange={setValue}
        count={filteredCount}
        totalCount={120}
      />
    )
  },
}
