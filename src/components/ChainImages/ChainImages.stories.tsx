import { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "@/components/ui/flex"

import ChainImages from "."

const meta = {
  title: "Components / Widgets / ChainImages",
  component: ChainImages,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Horizontal row of circular chain logos with a name tooltip on each. Filters the supplied `chains` array to those known in `data/networks/networks` -- unrecognised names are silently dropped. Default size is 24px.",
      },
    },
  },
} satisfies Meta<typeof ChainImages>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    chains: ["Ethereum Mainnet", "Arbitrum One", "Base", "OP Mainnet"],
  },
}

export const SingleChain: Story = {
  args: {
    chains: ["Ethereum Mainnet"],
  },
}

export const ManyChains: Story = {
  args: {
    chains: [
      "Ethereum Mainnet",
      "Arbitrum One",
      "Base",
      "OP Mainnet",
      "Scroll",
      "Linea",
      "zkSync Mainnet",
    ],
  },
}

export const SizeComparison = {
  render: () => (
    <VStack className="items-start gap-4">
      {[16, 24, 32, 48].map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-12 text-sm text-body-medium">{size}px</span>
          <ChainImages
            chains={["Ethereum Mainnet", "Arbitrum One", "Base"]}
            size={size}
          />
        </div>
      ))}
    </VStack>
  ),
}
