import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import ExAnteReorgDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / ExAnteReorg",
  component: ExAnteReorgDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `reorg-schematic.png` on `/developers/docs/consensus-mechanisms/pos/attack-and-defense/`, used in markdown as `<ExAnteReorgDiagram />`. Slots are ticked `n` to `n+3` along the plate's front edge. The attacker withholds block B and its votes, a dashed ghost level in B's tank (1); honest block C appears (2); B is released (3); the committee's slot n+2 votes fill the tanks (4); block D builds on the heavier branch (5). Toy weights: 100 votes per committee, 30 of them the attacker's. Before boost, C is orphaned; with proposer boost (40 votes' weight), B is, though an attacker with more than a third of each committee would still win. Votes are blue like attestations elsewhere; orange stays gas.",
      },
    },
  },
} satisfies Meta<typeof ExAnteReorgDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Withhold: Story = { args: { initialStep: 1 } }

export const Step2Propose: Story = { args: { initialStep: 2 } }

export const Step3Release: Story = { args: { initialStep: 3 } }

export const Step4Vote: Story = { args: { initialStep: 4 } }

export const Step5Build: Story = { args: { initialStep: 5 } }

export const BoostPropose: Story = {
  args: { initialPreset: "boost", initialStep: 2 },
}

export const BoostEnd: Story = {
  args: { initialPreset: "boost", initialStep: 5 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 5 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialPreset: "boost", initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Block C")
    label.focus()
  },
}
