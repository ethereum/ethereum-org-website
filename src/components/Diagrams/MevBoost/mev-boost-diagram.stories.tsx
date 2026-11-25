import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import MevBoostDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / MevBoost",
  component: MevBoostDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `mev.png` on `/developers/docs/mev/`, used in markdown as `<MevBoostDiagram />`. The proposer's node (consensus client plus MEV-Boost), a pad of relays, a pad of builders and, behind the node, the network. The proposer registers with relays (1), builders bid (2), MEV-Boost passes on the highest bid's header (3), the proposer signs a blinded block (4) and the relay publishes the full block (5), as the Builder API works since Fulu (`submitBlindedBlockV2`: the relay publishes, the proposer never receives the payload). Builder API method names are written without their version suffix.",
      },
    },
  },
} satisfies Meta<typeof MevBoostDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Register: Story = { args: { initialStep: 1 } }

export const Step2Bid: Story = { args: { initialStep: 2 } }

export const Step3Header: Story = { args: { initialStep: 3 } }

export const Step4Sign: Story = { args: { initialStep: 4 } }

export const Step5Publish: Story = { args: { initialStep: 5 } }

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
  args: { initialStep: 5 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 2 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Relays")
    label.focus()
  },
}
