import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { ClientSetupDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / ClientSetup",
  component: ClientSetupDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `diagram.png` on `/developers/docs/nodes-and-clients/run-a-node/`, used in markdown as `<ClientSetupDiagram />`. The `NodeClientsDiagram` drawing with a validator client off the plate and a lock on the Engine API for its JWT secret. One connection per step, with its default port from the page: the Engine API (8551, JWT authenticated), the peer-to-peer port (30303), the validator client's Beacon API link (port set by the client) and JSON-RPC (8545, local by default). Ports are code values, never grouped or localized.",
      },
    },
  },
} satisfies Meta<typeof ClientSetupDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Engine: Story = { args: { initialStep: 1 } }

export const Step2Peers: Story = { args: { initialStep: 2 } }

export const Step3Validator: Story = { args: { initialStep: 3 } }

export const Step4JsonRpc: Story = { args: { initialStep: 4 } }

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 1 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
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
    const label = await within(canvasElement).findByText("Validator client")
    label.focus()
  },
}
