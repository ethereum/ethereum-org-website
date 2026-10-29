import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import NodeClientsDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / NodeClients",
  component: NodeClientsDiagram,
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
          "Interactive replacement for `eth1eth2client.png` on `/developers/docs/nodes-and-clients/`, used in markdown as `<NodeClientsDiagram />`. A node's plate carries the consensus client and the execution client, joined by the Engine API arching between them; each client has its own peers off the plate, and a wallet or app in front has one pipe to each. An app calls the execution client's JSON-RPC API (1), then the consensus client's Beacon API (2); the consensus client drives the execution client over the Engine API while both gossip with their peers (3). The drawing is shared with `NodeArchitectureDiagram` and reads only from `NodeRigView` in `model.ts`, so a new figure on the same node is a new step list, not a new rig. Messages flow blue: they are not gas.",
      },
    },
  },
} satisfies Meta<typeof NodeClientsDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Step1JsonRpc: Story = { args: { initialStep: 1 } }

export const Step2BeaconApi: Story = { args: { initialStep: 2 } }

export const Step3EngineApi: Story = {
  args: { initialStep: 3 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 1 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const DarkEngine: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 2 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Engine API")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}
