import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack } from "@/components/ui/flex"

import RadialChart from "."

const meta = {
  title: "Components / Data Viz / RadialChart",
  component: RadialChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Single-series radial gauge (Recharts `RadialBarChart`) for one proportion. With `totalValue` it renders `value / totalValue`; without it, `value` is read as a percentage. `displayValue` overrides the centered readout when the raw number isn't what you want shown.\n\nAttribution works the same as `BigNumber` -- `sourceName` / `sourceUrl` / `lastUpdated` add an info tooltip. The chart gates on a mounted flag before rendering, since Recharts needs real element dimensions.",
      },
    },
  },
} satisfies Meta<typeof RadialChart>

export default meta

type Story = StoryObj<typeof meta>

export const Percentage: Story = {
  parameters: {
    docs: {
      description: {
        story: "No `totalValue` -- `value` is treated as a percentage.",
      },
    },
  },
  args: { value: 68, label: "Stake participation" },
}

export const OutOfTotal: Story = {
  parameters: {
    docs: {
      description: {
        story: "With `totalValue`, the arc fills to `value / totalValue`.",
      },
    },
  },
  args: { value: 24, totalValue: 32, label: "ETH staked" },
}

export const CustomDisplayValue: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`displayValue` replaces the centered readout -- use it when the underlying number needs units or rounding the chart shouldn't infer.",
      },
    },
  },
  args: { value: 24, totalValue: 32, displayValue: "24 ETH", label: "Staked" },
}

export const WithSource: Story = {
  parameters: {
    docs: {
      description: {
        story: "Attribution tooltip, for figures pulled from an external feed.",
      },
    },
  },
  args: {
    value: 68,
    label: "Stake participation",
    sourceName: "beaconcha.in",
    sourceUrl: "https://beaconcha.in",
    lastUpdated: "2026-08-01T00:00:00.000Z",
  },
}

export const InARow: Story = {
  args: { value: 68, label: "Participation" },
  render: () => (
    <HStack className="w-full items-stretch gap-4">
      <RadialChart value={68} label="Participation" />
      <RadialChart value={24} totalValue={32} label="ETH staked" />
      <RadialChart value={92} label="Client diversity" />
    </HStack>
  ),
}
