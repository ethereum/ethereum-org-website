import { useArgs } from "storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/nextjs"

import FilterBar from "./"

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
  args: {
    onValueChange: () => {},
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs<{ value?: string }>()
    const count = value ? 12 : args.totalCount

    return (
      <FilterBar
        {...args}
        value={value}
        count={count}
        onValueChange={(next) => updateArgs({ value: next })}
      />
    )
  },
} satisfies Meta<typeof FilterBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: sampleItems,
    value: undefined,
    count: 48,
    totalCount: 48,
  },
}

export const WithActiveFilter: Story = {
  args: {
    items: sampleItems,
    value: "defi",
    count: 12,
    totalCount: 48,
  },
}

export const ManyItems: Story = {
  args: {
    items: manyItems,
    value: undefined,
    count: 120,
    totalCount: 120,
  },
}
