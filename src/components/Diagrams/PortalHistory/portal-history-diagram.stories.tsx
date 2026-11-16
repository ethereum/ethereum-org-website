import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import PortalHistoryDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / PortalHistory",
  component: PortalHistoryDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `portal-network-devp2p-libp2p.png` on `/developers/docs/networking-layer/portal-network/`, used in markdown as `<PortalHistoryDiagram />`. An execution client that keeps every header but no longer stores an old block's receipts finds their content ID on the History network's ID ring (1), asks a known peer with `FindContent` and gets closer nodes back (2), gets the receipts from the node whose radius covers the ID (3) and checks them against the header's `receiptsRoot` (4).",
      },
    },
  },
} satisfies Meta<typeof PortalHistoryDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Locate: Story = { args: { initialStep: 1 } }

export const Step2Ask: Story = { args: { initialStep: 2 } }

export const Step3Fetch: Story = { args: { initialStep: 3 } }

export const Step4Verify: Story = { args: { initialStep: 4 } }

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 2 },
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
  args: { initialStep: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Closest node")
    label.focus()
  },
}
