import type { Meta, StoryObj } from "@storybook/react"

import { VStack } from "@/components/atoms/flex"

import HorizontalCard from "./HorizontalCard"

const meta = {
  title: "Molecules / Display Content / HorizontalCard",
  component: HorizontalCard,
  args: {
    emoji: ":woman_student:",
    title: "Learn about Ethereum",
    description:
      "Ethereum is a platform for building decentralized applications.",
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HorizontalCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithChildren: Story = {
  args: {
    emoji: ":shield:",
    title: "Secure your wallet",
    description: "Learn best practices for keeping your crypto safe.",
    children: (
      <a href="#" className="text-primary underline">
        Read the guide →
      </a>
    ),
  },
}

export const LongContent: Story = {
  args: {
    emoji: ":books:",
    title: "Understanding smart contracts",
    description:
      "Smart contracts are programs that run on the Ethereum blockchain. They automatically execute when predetermined conditions are met, enabling trustless transactions and agreements.",
  },
}

export const MultipleCards: Story = {
  render: (args) => (
    <VStack className="gap-8">
      <HorizontalCard
        {...args}
        emoji=":rocket:"
        title="Get started"
        description="Begin your journey into the world of Ethereum and Web3."
      />
      <HorizontalCard
        {...args}
        emoji=":hammer_and_wrench:"
        title="Build on Ethereum"
        description="Start building decentralized applications with our developer tools."
      />
      <HorizontalCard
        {...args}
        emoji=":seedling:"
        title="Proof of stake"
        description="Learn about Ethereum's energy-efficient consensus mechanism."
      />
    </VStack>
  ),
}

export const CustomEmojiSize: Story = {
  args: {
    emoji: ":globe_with_meridians:",
    emojiClassName: "text-7xl",
    title: "Global network",
    description: "Ethereum operates across thousands of nodes worldwide.",
  },
}
