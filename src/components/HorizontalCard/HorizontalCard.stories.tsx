import { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { VStack } from "@/components/ui/flex"

import HorizontalCard from "."

const meta = {
  title: "Components / Cards / HorizontalCard",
  component: HorizontalCard,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Borderless horizontal item with a large emoji on the left and a title + description on the right. Used in vertical lists where each row needs a glanceable icon, and the surrounding container provides the visual grouping (no card chrome of its own).",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HorizontalCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    emoji: ":fuel_pump:",
    title: "Gas fees",
    description:
      "The cost of doing an action on Ethereum, paid in ETH to validators.",
  },
}

export const WithoutTitle: Story = {
  args: {
    emoji: ":dollar:",
    description:
      "USDC is a fully-reserved stablecoin pegged 1:1 to the US dollar.",
  },
}

export const WithChildren: Story = {
  args: {
    emoji: ":wallet:",
    title: "Self-custody wallet",
    description:
      "A wallet you control directly, with no third party holding your keys.",
    children: (
      <ButtonLink href="/wallets/" variant="outline" size="sm">
        Find a wallet
      </ButtonLink>
    ),
  },
}

export const TokenList = {
  render: () => (
    <VStack className="items-stretch gap-4">
      <HorizontalCard
        emoji=":dollar:"
        description="Fiat-backed stablecoins are 1:1 redeemable for fiat currency held in reserve."
      />
      <HorizontalCard
        emoji=":chains:"
        description="Crypto-backed stablecoins are over-collateralized by other crypto assets."
      />
      <HorizontalCard
        emoji=":robot:"
        description="Algorithmic stablecoins use code-driven supply mechanics to hold their peg."
      />
    </VStack>
  ),
}
