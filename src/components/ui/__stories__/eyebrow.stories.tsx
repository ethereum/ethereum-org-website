import type { Meta, StoryObj } from "@storybook/nextjs"

import Eyebrow from "../eyebrow"
import { VStack } from "../flex"

const meta = {
  title: "UI / Eyebrow",
  component: Eyebrow,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Small uppercase kicker in the high-contrast primary color, for the label slot above a heading. Renders a `<p>` -- it is deliberately not a heading, so it never enters the document outline. `PageHero` takes an `eyebrow` prop for this slot; `HubHero` is the exception where the eyebrow is intentionally the `<h1>`.",
      },
    },
  },
} satisfies Meta<typeof Eyebrow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "Upgrade your knowledge" },
}

export const AboveAHeading: Story = {
  parameters: {
    docs: {
      description: {
        story: "The intended shape: kicker, then the real heading below it.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-1">
      <Eyebrow>Ethereum basics</Eyebrow>
      <h2 className="text-h2">What is Ethereum?</h2>
    </VStack>
  ),
}
