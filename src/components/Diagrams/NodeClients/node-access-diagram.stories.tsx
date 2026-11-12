import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { NodeAccessDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / NodeAccess",
  component: NodeAccessDiagram,
  tags: ["autodocs"],
  args: { fig: 2 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `nodes.png` on `/developers/docs/nodes-and-clients/`, used in markdown as `<NodeAccessDiagram />`. The `NodeClientsDiagram` drawing with internals shown. A wallet asks your node for a balance with `eth_getBalance` (1) and gets an answer from state the node verified itself (2), submits a transaction with `eth_sendRawTransaction` into the pool (3), which the execution client passes on to its peers (4); then a block arrives and the node verifies it (5). The readout names the message and where it goes.",
      },
    },
  },
} satisfies Meta<typeof NodeAccessDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Query: Story = { args: { initialStep: 1 } }

export const Step2Answer: Story = { args: { initialStep: 2 } }

export const Step3Send: Story = { args: { initialStep: 3 } }

export const Step4Gossip: Story = { args: { initialStep: 4 } }

export const Step5Verify: Story = { args: { initialStep: 5 } }

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 4 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 2 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Transaction pool")
    label.focus()
  },
}
