import { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "@/components/ui/flex"

import SocialListItem from "."

const meta = {
  title: "Components / Widgets / SocialListItem",
  component: SocialListItem,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Row item used in the community page social directory. Each row pairs a brand-coloured icon (`reddit`, `twitter`, `youtube`, `discord`, `stackExchange`, or the generic `webpage` globe) with italic content describing the channel. Layout-only -- the parent controls click/link behavior.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SocialListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    socialIcon: "webpage",
    children: "ethereum.org official community page",
  },
}

export const Twitter: Story = {
  args: {
    socialIcon: "twitter",
    children: "@ethereum on Twitter / X",
  },
}

export const AllPlatforms = {
  render: () => (
    <VStack className="items-stretch gap-1">
      <SocialListItem socialIcon="webpage">ethereum.org</SocialListItem>
      <SocialListItem socialIcon="reddit">/r/ethereum on Reddit</SocialListItem>
      <SocialListItem socialIcon="twitter">
        @ethereum on Twitter / X
      </SocialListItem>
      <SocialListItem socialIcon="youtube">
        Ethereum Foundation YouTube
      </SocialListItem>
      <SocialListItem socialIcon="discord">Ethereum on Discord</SocialListItem>
      <SocialListItem socialIcon="stackExchange">
        Ethereum Stack Exchange
      </SocialListItem>
    </VStack>
  ),
}
