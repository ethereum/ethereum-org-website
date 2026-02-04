import type { Meta, StoryObj } from "@storybook/react"

import { HStack, VStack } from "@/components/atoms/flex"
import { CardParagraph, CardTitle } from "@/components/ui/card"

import GhostCard from "./GhostCard"

const meta = {
  title: "Molecules / Display Content / GhostCard",
  component: GhostCard,
  args: {
    children: null,
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GhostCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <GhostCard {...args} className="max-w-sm">
      <CardTitle>Ghost Card</CardTitle>
      <CardParagraph>
        This card has an offset shadow effect created with an absolutely
        positioned background element.
      </CardParagraph>
    </GhostCard>
  ),
}

export const WithContent: Story = {
  render: (args) => (
    <GhostCard {...args} className="max-w-md">
      <div className="space-y-4">
        <div className="text-4xl">🔮</div>
        <CardTitle>Decentralized Finance</CardTitle>
        <CardParagraph>
          DeFi refers to financial services built on blockchain technology,
          offering open access to financial products without traditional
          intermediaries.
        </CardParagraph>
      </div>
    </GhostCard>
  ),
}

export const MultipleCards: Story = {
  render: (args) => (
    <HStack className="flex-wrap gap-8">
      <GhostCard {...args} className="w-64">
        <div className="space-y-2">
          <div className="text-3xl">📈</div>
          <CardTitle>Trading</CardTitle>
          <CardParagraph>Swap tokens directly from your wallet.</CardParagraph>
        </div>
      </GhostCard>
      <GhostCard {...args} className="w-64">
        <div className="space-y-2">
          <div className="text-3xl">💰</div>
          <CardTitle>Lending</CardTitle>
          <CardParagraph>Earn interest on your crypto assets.</CardParagraph>
        </div>
      </GhostCard>
      <GhostCard {...args} className="w-64">
        <div className="space-y-2">
          <div className="text-3xl">🏦</div>
          <CardTitle>Staking</CardTitle>
          <CardParagraph>Secure the network and earn rewards.</CardParagraph>
        </div>
      </GhostCard>
    </HStack>
  ),
}

export const InGrid: Story = {
  render: (args) => (
    <div className="grid max-w-2xl grid-cols-2 gap-6">
      <GhostCard {...args}>
        <VStack className="gap-2">
          <CardTitle>Security</CardTitle>
          <CardParagraph>
            Built on battle-tested cryptographic primitives.
          </CardParagraph>
        </VStack>
      </GhostCard>
      <GhostCard {...args}>
        <VStack className="gap-2">
          <CardTitle>Transparency</CardTitle>
          <CardParagraph>
            All transactions are publicly verifiable.
          </CardParagraph>
        </VStack>
      </GhostCard>
      <GhostCard {...args}>
        <VStack className="gap-2">
          <CardTitle>Composability</CardTitle>
          <CardParagraph>Protocols can build on each other.</CardParagraph>
        </VStack>
      </GhostCard>
      <GhostCard {...args}>
        <VStack className="gap-2">
          <CardTitle>Permissionless</CardTitle>
          <CardParagraph>
            Anyone can participate without approval.
          </CardParagraph>
        </VStack>
      </GhostCard>
    </div>
  ),
}
