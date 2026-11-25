import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import ErasureCodingDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / ErasureCoding",
  component: ErasureCodingDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `polynomial.png` on `/roadmap/fusaka/peerdas/`, used in markdown as `<ErasureCodingDiagram />`. A flat 2D chart, not isometric: four data values (editable with steppers or by dragging a point) and the cubic through them. The extension evaluates it at the four points in between (1), any four of the eight points are lost (2: the data, a block or the extension) and the curve is rebuilt from the other four (3). The caption notes that real blobs extend 4,096 values to 8,192 in a finite field.",
      },
    },
  },
} satisfies Meta<typeof ErasureCodingDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Extend: Story = { args: { initialStep: 1 } }

export const Step2Lose: Story = { args: { initialStep: 2 } }

export const Step3Recover: Story = { args: { initialStep: 3 } }

export const LoseBlock: Story = {
  args: { initialPreset: "block", initialStep: 2 },
}

export const RecoverExtension: Story = {
  args: { initialPreset: "extension", initialStep: 3 },
}

/** Values whose cubic overshoots: the value axis widens to keep it on the chart. */
export const SteepValues: Story = {
  args: { initialValues: [1, 9, 1, 9], initialStep: 1 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "block", initialStep: 3 },
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
    const label = await within(canvasElement).findByText("Polynomial")
    label.focus()
  },
}
