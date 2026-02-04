import type { Meta, StoryObj } from "@storybook/react"

import { HStack, VStack } from "@/components/atoms/flex"

import CommentCard from "."

const meta = {
  title: "Molecules / Display Content / CommentCard",
  component: CommentCard,
  args: {
    name: "Vitalik Buterin",
    title: "Co-founder of Ethereum",
    description:
      "Ethereum is a technology that lets you send cryptocurrency to anyone for a small fee.",
  },
} satisfies Meta<typeof CommentCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongQuote: Story = {
  args: {
    name: "Gavin Wood",
    title: "Co-founder of Ethereum",
    description:
      "The vision was to create a world computer - a single, shared computational resource that anyone could use. A platform for building unstoppable applications that would reshape how we interact with digital systems.",
  },
}

export const WithReactNodeDescription: Story = {
  args: {
    name: "Developer",
    title: "Ethereum Community",
    description: (
      <span>
        Building on Ethereum has been <strong>transformative</strong> for our
        team. The tools and community support are exceptional.
      </span>
    ),
  },
}

export const MultipleCards: Story = {
  render: (args) => (
    <HStack className="flex-wrap gap-6">
      <CommentCard
        {...args}
        name="Vitalik Buterin"
        title="Co-founder"
        description="Ethereum is a decentralized platform that runs smart contracts."
      />
      <CommentCard
        {...args}
        name="Joseph Lubin"
        title="Co-founder"
        description="ConsenSys is building the infrastructure for Web3."
      />
      <CommentCard
        {...args}
        name="Gavin Wood"
        title="Co-founder"
        description="Polkadot enables cross-chain communication and interoperability."
      />
    </HStack>
  ),
}

export const DifferentInitials: Story = {
  render: (args) => (
    <VStack className="gap-4">
      <CommentCard
        {...args}
        name="Alice"
        title="Developer"
        description="Great platform for building dApps!"
      />
      <CommentCard
        {...args}
        name="Bob"
        title="Researcher"
        description="The cryptographic foundations are solid."
      />
      <CommentCard
        {...args}
        name="Charlie"
        title="Designer"
        description="Love the ecosystem and tooling."
      />
    </VStack>
  ),
}
