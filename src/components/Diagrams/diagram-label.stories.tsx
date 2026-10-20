import type { Meta, StoryObj } from "@storybook/nextjs"

import { DiagramPill, DiagramTitle } from "./diagram-label"

const meta = {
  title: "Components / Data Viz / Diagrams / Label",
  component: DiagramPill,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          '`DiagramPill` is the short label on a connector: `shape="pill"` for most, `shape="tab"` for one flush against a line. `tone="revert"` is the out-of-gas state, the only red in the grammar. `DiagramTitle` is the bold mono section title; it is a `<p>`, never a heading.',
      },
    },
  },
  args: { children: "Message" },
} satisfies Meta<typeof DiagramPill>

export default meta

type Story = StoryObj<typeof meta>

export const Pill: Story = {}

export const Variants: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <DiagramTitle>Message call</DiagramTitle>
      <DiagramPill>web3.eth</DiagramPill>
      <DiagramPill shape="tab">Broadcast aggregate</DiagramPill>
      <DiagramPill tone="revert">State changes reverted</DiagramPill>
    </div>
  ),
}
