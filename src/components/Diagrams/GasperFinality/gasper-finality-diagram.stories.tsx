import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import GasperFinalityDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / GasperFinality",
  component: GasperFinalityDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Casper FFG on `/developers/docs/consensus-mechanisms/pos/gasper/`, used in markdown as `<GasperFinalityDiagram />`. A timeline of epochs `n` to `n+4`; each starts with its checkpoint, and under each played epoch a bar spanning the epoch fills with the attesting stake, ticked at two-thirds, with an arrow to the checkpoint the votes target. One epoch per step (1-4): at the epoch's end boundary, with a supermajority, the link arches from source to target, the checkpoint is justified and the one before it finalized (locked). Scenarios: healthy, just enough (about 67%), and too few (about 60%), where finality stalls. Draws only the consecutive-epoch finality rule; the spec's 2-4 epoch rules are noted in `model.ts`.",
      },
    },
  },
} satisfies Meta<typeof GasperFinalityDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1: Story = { args: { initialStep: 1 } }

export const Step2: Story = { args: { initialStep: 2 } }

export const Step3: Story = { args: { initialStep: 3 } }

export const Step4: Story = { args: { initialStep: 4 } }

export const JustEnough: Story = {
  args: { initialPreset: "barely", initialStep: 4 },
}

export const TooFew: Story = {
  args: { initialPreset: "short", initialStep: 4 },
}

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
  args: { initialStep: 2 },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 2 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Finalized")
    label.focus()
  },
}
