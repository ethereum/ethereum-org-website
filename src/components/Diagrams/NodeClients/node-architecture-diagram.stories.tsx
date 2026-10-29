import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { NodeArchitectureDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / NodeArchitecture",
  component: NodeArchitectureDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // Only key states snapshot (opted in per story): idle, final,
    // failure end state, dark, RTL and mobile.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `node-architecture-text-background.png` on `/developers/docs/nodes-and-clients/node-architecture/`, used in markdown as `<NodeArchitectureDiagram />`. The `NodeClientsDiagram` drawing with internals shown: the consensus client's chain, the execution client's transaction pool and EVM. Scenario New block: the block arrives over consensus gossip (1), its execution payload goes to the execution client with `engine_newPayload` (2), the EVM executes it and the reply is `VALID` (3), fork choice makes it the head and `engine_forkchoiceUpdated` tells the execution client (4). Scenario New transaction: it arrives over execution gossip (1), is checked into the pool (2) and passed on to other peers (3). Engine API methods are named without their version suffix, which changes with network upgrades.",
      },
    },
  },
} satisfies Meta<typeof NodeArchitectureDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
}

export const BlockStep1Gossip: Story = { args: { initialStep: 1 } }

export const BlockStep2Payload: Story = { args: { initialStep: 2 } }

export const BlockStep3Execute: Story = { args: { initialStep: 3 } }

export const BlockStep4ForkChoice: Story = {
  args: { initialStep: 4 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const TransactionIdle: Story = { args: { initialPreset: "tx" } }

export const TxStep1Arrive: Story = {
  args: { initialPreset: "tx", initialStep: 1 },
}

export const TxStep2Pool: Story = {
  args: { initialPreset: "tx", initialStep: 2 },
}

export const TxStep3Regossip: Story = {
  args: { initialPreset: "tx", initialStep: 3 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const DarkTransaction: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "tx", initialStep: 2 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 2 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 4 },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("EVM")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}
