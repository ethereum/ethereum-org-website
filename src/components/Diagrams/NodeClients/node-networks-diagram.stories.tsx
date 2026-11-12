import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { NodeNetworksDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / NodeNetworks",
  component: NodeNetworksDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `cons_client_net_layer.png` and `exe_client_net_layer.png` on `/developers/docs/networking-layer/`, used in markdown as `<NodeNetworksDiagram />`. The `NodeClientsDiagram` drawing with internals shown, following the page's two control flows; the readout names the network (consensus peer-to-peer, Engine API, execution peer-to-peer) and the message, gossip topic or Engine API method. Receive a block: consensus gossip (1), `engine_newPayload` (2), `VALID` (3), new head and an attestation gossiped (4). Propose a block: transactions over execution gossip into the pool (1), `engine_forkchoiceUpdated` with payload attributes (2), `engine_getPayload` (3), the signed block gossiped (4).",
      },
    },
  },
} satisfies Meta<typeof NodeNetworksDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const ReceiveStep1Gossip: Story = { args: { initialStep: 1 } }

export const ReceiveStep2Payload: Story = { args: { initialStep: 2 } }

export const ReceiveStep3Valid: Story = { args: { initialStep: 3 } }

export const ReceiveStep4Attest: Story = { args: { initialStep: 4 } }

export const ProposeIdle: Story = { args: { initialPreset: "propose" } }

export const ProposeStep1Fill: Story = {
  args: { initialPreset: "propose", initialStep: 1 },
}

export const ProposeStep2Build: Story = {
  args: { initialPreset: "propose", initialStep: 2 },
}

export const ProposeStep3Get: Story = {
  args: { initialPreset: "propose", initialStep: 3 },
}

export const ProposeStep4Broadcast: Story = {
  args: { initialPreset: "propose", initialStep: 4 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "propose", initialStep: 2 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 4 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 4 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialPreset: "propose", initialStep: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Execution peers")
    label.focus()
  },
}
