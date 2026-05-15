import { Meta, StoryObj } from "@storybook/nextjs"

import Emoji from "@/components/Emoji"
import { VStack } from "@/components/ui/flex"

import GhostCard from "."

const meta = {
  title: "Components / Cards / GhostCard",
  component: GhostCard,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Card with a subtle offset shadow plate behind it (the 'ghost' layer), used to give a sidebar callout extra visual weight inside long-form content. Accepts arbitrary children -- the wrapper applies the layered look only.",
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
} satisfies Meta<typeof GhostCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p>A simple card surface with a layered shadow plate behind it.</p>
    ),
  },
}

export const WithEmojiAndHeading: Story = {
  args: {
    children: (
      <>
        <Emoji text=":pizza:" className="text-5xl" />
        <h3 className="mt-12 mb-8">Bitcoin pizza day</h3>
        <p className="mb-0">
          The first known commercial Bitcoin transaction in 2010 -- two pizzas
          for 10,000 BTC -- is a reminder that volatile assets make poor units
          of account. Stablecoins exist to fix that.
        </p>
      </>
    ),
  },
}

export const SideBySide = {
  render: () => (
    <VStack className="items-stretch gap-6 md:flex-row md:items-stretch">
      <GhostCard className="flex-1">
        <Emoji text=":bank:" className="text-4xl" />
        <h3 className="mt-6 mb-4">For savers</h3>
        <p className="mb-0">
          Hold value without exposure to short-term volatility against the US
          dollar.
        </p>
      </GhostCard>
      <GhostCard className="flex-1">
        <Emoji text=":globe_with_meridians:" className="text-4xl" />
        <h3 className="mt-6 mb-4">For payments</h3>
        <p className="mb-0">
          Move dollar-denominated value across borders in minutes, settled on
          public infrastructure.
        </p>
      </GhostCard>
    </VStack>
  ),
}
