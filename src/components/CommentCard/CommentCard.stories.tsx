import { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "@/components/ui/flex"

import CommentCard from "."

const meta = {
  title: "Components / Cards / CommentCard",
  component: CommentCard,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Quote-style attribution card used inline within long-form content to attribute a statement to a named person. The avatar circle shows the first letter of `name` over an accent fill.",
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
} satisfies Meta<typeof CommentCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description:
      "Ethereum is a global, decentralized platform for money and new kinds of applications.",
    name: "Tim Beiko",
    title: "Protocol Coordination, Ethereum Foundation",
  },
}

export const LongDescription: Story = {
  args: {
    description:
      "Layer 2 networks settle transactions on Ethereum mainnet while running execution off-chain, which gives users much lower fees and higher throughput without compromising on the security properties of the underlying network. This is the path the ecosystem has converged on for scaling.",
    name: "Alex Smirnov",
    title: "Co-founder, deBridge",
  },
}

export const InlineWithProse = {
  render: () => (
    <VStack className="items-stretch gap-4">
      <p>
        Block proposers and attesters earn rewards for participating honestly in
        consensus. The economic incentives have so far been sufficient to keep
        the network secure under load.
      </p>
      <CommentCard
        description="The validator set has grown faster than I expected. The security guarantees scale with it."
        name="Justin Drake"
        title="Researcher, Ethereum Foundation"
      />
      <p>
        Anyone with 32 ETH can run their own validator, and there are also
        liquid staking options for smaller stakers.
      </p>
    </VStack>
  ),
}
