import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import ZkProofGameDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / ZkProofGame",
  component: ZkProofGameDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Beginner figure for `/zero-knowledge-proofs/`, used in markdown as `<ZkProofGameDiagram />`. A flat top view of the page's magic-door cave: each step is one round in which the verifier calls a side and the prover must come out of it. A meter halves a faker's chance every round (1 in 2, 1 in 4, ...). Presets: someone who knows the secret word passes all five rounds; a faker gets lucky twice and is caught in round three.",
      },
    },
  },
} satisfies Meta<typeof ZkProofGameDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Round1Door: Story = { args: { initialStep: 1 } }

export const Round2SameSide: Story = { args: { initialStep: 2 } }

export const Round5Convinced: Story = { args: { initialStep: 5 } }

export const FakerLucky: Story = {
  args: { initialPreset: "faking", initialStep: 2 },
}

export const FakerCaught: Story = {
  args: { initialPreset: "faking", initialStep: 3 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "faking", initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 1 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 1 },
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
    const label = await within(canvasElement).findByText("Door")
    label.focus()
  },
}
