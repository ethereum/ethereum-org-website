import type { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "../flex"
import TruncatedText from "../TruncatedText"

const meta = {
  title: "UI / TruncatedText",
  component: TruncatedText,
  parameters: {
    docs: {
      description: {
        component:
          "Prose with a clamped line count and a Show more / Show less toggle. `maxLines` accepts 1-4 (the values supported by `LINE_CLAMP_CLASS_MAPPING`). The toggle button is always rendered; click to expand or collapse.",
      },
    },
  },
} satisfies Meta<typeof TruncatedText>

export default meta

type Story = StoryObj<typeof meta>

const SHORT_TEXT =
  "Ethereum is a decentralized, open-source blockchain featuring smart-contract functionality."

const LONG_TEXT =
  "Ethereum is a decentralized, open-source blockchain featuring smart-contract functionality. Ether is the native cryptocurrency of the platform. Among cryptocurrencies, ether is second only to bitcoin in market capitalization. Ethereum was conceived in 2013 by programmer Vitalik Buterin. Additional founders of Ethereum included Gavin Wood, Charles Hoskinson, Anthony Di Iorio, and Joseph Lubin. In 2014, development work began and was crowdfunded, and the network went live on 30 July 2015. Ethereum allows anyone to deploy permanent and immutable decentralized applications onto it, with which users can interact."

export const Default: Story = {
  args: { children: LONG_TEXT },
  render: (args) => (
    <div className="w-[480px]">
      <TruncatedText {...args} />
    </div>
  ),
}

export const OneLine: Story = {
  args: { children: LONG_TEXT, maxLines: 1 },
  render: (args) => (
    <div className="w-[480px]">
      <TruncatedText {...args} />
    </div>
  ),
}

export const ThreeLines: Story = {
  args: { children: LONG_TEXT, maxLines: 3 },
  render: (args) => (
    <div className="w-[480px]">
      <TruncatedText {...args} />
    </div>
  ),
}

export const FourLines: Story = {
  args: { children: LONG_TEXT, maxLines: 4 },
  render: (args) => (
    <div className="w-[480px]">
      <TruncatedText {...args} />
    </div>
  ),
}

export const LineCounts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All four supported `maxLines` values side-by-side for visual comparison.",
      },
    },
  },
  render: () => (
    <VStack className="w-[480px] gap-8">
      {[1, 2, 3, 4].map((n) => (
        <div key={n}>
          <p className="mb-2 text-xs text-body-medium">maxLines = {n}</p>
          <TruncatedText maxLines={n}>{LONG_TEXT}</TruncatedText>
        </div>
      ))}
    </VStack>
  ),
}

export const ShortText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When the content fits within `maxLines`, the prose is not clamped, but the toggle button is still rendered. Consumers may want to gate `TruncatedText` behind a length check.",
      },
    },
  },
  render: () => (
    <div className="w-[480px]">
      <TruncatedText>{SHORT_TEXT}</TruncatedText>
    </div>
  ),
}
